import React from 'react'
import { minify } from 'terser'

import {
  COLOR_MODE_KEY,
  COLORS,
  INITIAL_COLOR_MODE_CSS_PROP,
} from './src/tokens/colors'

import App from './src/components/App'

function setColorsByTheme() {
  const colors = '🌈'
  const colorModeKey = '🔑'
  const colorModeCssProp = '⚡️'

  const mql = window.matchMedia('(prefers-color-scheme: dark)')
  const prefersDarkFromMQ = mql.matches
  const persistedPreference = localStorage.getItem(colorModeKey)

  let colorMode = 'light'

  const hasUsedToggle = typeof persistedPreference === 'string'

  if (hasUsedToggle) {
    colorMode = persistedPreference
  } else {
    colorMode = prefersDarkFromMQ ? 'dark' : 'light'
  }

  let root = document.documentElement

  root.style.setProperty(colorModeCssProp, colorMode)
  Object.entries(colors).forEach(([name, colorByTheme]) => {
    const cssVarName = `--color-${name}`

    typeof colorByTheme === 'object'
      ? root.style.setProperty(cssVarName, colorByTheme[colorMode])
      : root.style.setProperty(cssVarName, colorByTheme)
  })
}

const MagicScriptTag = () => {
  const boundFn = String(setColorsByTheme)
    .replace("'🌈'", JSON.stringify(COLORS))
    .replace('🔑', COLOR_MODE_KEY)
    .replace('⚡️', INITIAL_COLOR_MODE_CSS_PROP)

  const terserOption = ({
    isReadable = false,
    isDevelopment = false,
    ecma = 6, // specify one of: 5, 6, 7 or 8; use ES8/ES2017 for native async
    toplevel = false, // enable top level variable and function name mangling and to drop unused variables and functions
    globalDefineMap = {
      '__DEV__': Boolean(isDevelopment),
      'process.env.NODE_ENV': isDevelopment ? 'development' : 'production'
    }
  } = {}) => ({
    ecma,
    toplevel,
    compress: { ecma, toplevel, join_vars: false, sequences: false, global_defs: globalDefineMap },
    mangle: isReadable ? false : { toplevel },
    output: isReadable ? { ecma, beautify: true, indent_level: 2, width: 240 } : { ecma, beautify: false, semicolons: false },
    sourceMap: false
  })

  let calledFunction = `(${boundFn})()`

  calledFunction = minify(calledFunction, terserOption)

  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: calledFunction }} />
}

/**
 * If the user has JS disabled, the injected script will never fire!
 * This means that they won't have any colors set, everything will be default
 * black and white.
 * We can solve for this by injecting a `<style>` tag into the head of the
 * document, which sets default values for all of our colors.
 * Only light mode will be available for users with JS disabled.
 */
const FallbackStyles = () => {
  const cssVariableString = Object.entries(COLORS).reduce(
    (acc, [name, colorByTheme]) => {
      return `${acc}\n--color-${name}: ${colorByTheme.light};`
    },
    ''
  )

  const wrappedInSelector = `html { ${cssVariableString} }`

  return <style>{wrappedInSelector}</style>
}

export const onRenderBody = ({ setPreBodyComponents, setHeadComponents }) => {
  setHeadComponents(<FallbackStyles />)
  setPreBodyComponents(<MagicScriptTag />)
}

export const wrapPageElement = ({ element }) => {
  return <App>{element}</App>
}
