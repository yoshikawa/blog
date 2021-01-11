import React from 'react'
import styled from 'styled-components'
import Bio from './Bio'
import Content from './Content'
import Share from './ShareButton'

const ArticleWrapper = styled.article`
  padding: 0 30px 30px;

  @media only screen and (max-width: 500px) {
    padding: 0;
  }
`

const ArticleFooter = styled.footer`
  position: relative;
  margin: 6rem 0 0;
  padding: 3rem 0 0;
  border-top: 1px solid #ececec;
`

const ShareFooter = styled.div`
margin: 2rem 0 0;
`
class Article extends React.Component {
  render() {
    const { post } = this.props

    return (
      <ArticleWrapper>
        <Share post={post}/>
        <Content
          content={post.body}
          date={post.frontmatter.date}
          tags={post.frontmatter.tags}
          translations={post.frontmatter.translations}
        />
        <ShareFooter>
          <Share post={post}/>
        </ShareFooter>
        <ArticleFooter>
          <Bio />
        </ArticleFooter>
      </ArticleWrapper>
    )
  }
}

export default Article
