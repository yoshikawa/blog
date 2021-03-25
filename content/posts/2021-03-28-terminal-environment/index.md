---
title: '【開発で差をつけろ！】僕が考えた最強のターミナル環境(zsh+tmux+Neovim)'
slug: terminal-environment
date: 2021-03-28
published: true
unlisted: false
language: ja
cover: ../2020-08-22-my-birthday/diary.jpg
imageShare: ../2020-08-22-my-birthday/diary.jpg
tags:
  - terminal
  - zsh
  - tmux
  - neovim
---

## 僕が考えた最強のターミナル環境(zsh+tmux+Neovim)

新しいパソコンを買ったときや，OSをクリーンインストールしたときに開発環境を構築するのに手間を省きたい．

就職やインターンで会社からパソコンを配給されるエンジニアは必見の記事になっている．

今回は，僕みたいな怠惰なエンジニアにオススメするdotfilesという管理方法だ．

### リポジトリ

筆者のdotfilesは公開されている．

参考にしていただければ，光栄である．

[yoshikawa/dotfiles | GitHub](https://github.com/yoshikawa/dotfiles)

ワンコマンドで開発構築が可能．

ターミナルを立ち上げて下記のコマンドをコピペするだけで環境が整う．

```shell
bash -c "$(curl -L https://raw.githubusercontent.com/yoshikawa/dotfiles/main/bin/install.sh)"
```

#### 僕の開発環境

タイトルにも記載したが，再度僕の開発環境を書いておく．

- Ubuntu or MacOSX
- zsh
- tmux
- neovim

### コマンドラインツールのインストール

まずは，App StoreからXcodeをインストールする．

インストール後，下記のコマンドを実行し，コマンドラインツールのインストールをする．

```shell
xcode-select --install
```

### Homebrewのインストール

[Homebrew](https://brew.sh/index_ja.html)とは，macOS（またはLinux）用パッケージマネージャーである．

Homebrewは，AppleまたはLinuxシステムが提供していない必要なパッケージをインストールすることが可能である．

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### zsh

最近，[MacOSXのデフォルトシェルがbashからzshに変更](https://support.apple.com/en-us/HT208050)になった．

zshは，対話式シェルとしてもスクリプト言語インタプリタとしても使えるシェルである．

bash, ksh, またtcshの便利な機能の多くがzshに組み込まれている．

zshは，補完機能やスペル修正機能，コマンド履歴を共有，検索することが可能である．

zshはグローバルエイリアスという機能がある．

これは， `-g` を付けてエイリアス設定すると，コマンドの任意の場所で展開が可能である．

```shell
# グローバルエイリアスは -g をつける
alias -g @g='| grep'
alias -g @l='| less'
```

```shell
brew install zsh
```

MacOSXでは，上記の通りデフォルトシェルがzshに変更されたが，デフォルトシェルを変更する方法は下記のコマンドである．

```shell
# シェルをzshに変更
chsh -s $(which zsh)
```

### zinit

前述では，シェルをzshに設定した．

zshの機能を拡張するためのプラグインを管理するプラグインマネージャを導入する．

[zinit(旧名 zplugin)](https://github.com/zdharma/zinit)がオススメであるので，この記事ではzinitのセットアップを行う．

#### zinitのインストール

[公式サイト](https://github.com/zdharma/zinit#installation)のとおり，zinitのインストールを行う．

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/zdharma/zinit/master/doc/install.sh)"
```

インストール後，zinitの設定が追記されているので，リロードを行い，zinit自体を最新にする．

```shell
source ~/.zshrc
zinit self-update
```

これでzinitのインストール自体は完了．

#### zinitのカスタマイズ

次に，zinitのカスタマイズを行う．

`~/.zshrc`を編集する．

```shell
autoload -U promptinit; promptinit

ZPLUGIN_HOME=$HOME/.zinit
source $ZPLUGIN_HOME/bin/zinit.zsh

autoload -Uz _zinit
(( ${+_comps} )) && _comps[zinit]=_zinit

# plugins
zinit snippet 'OMZ::plugins/git/git.plugin.zsh'
zinit snippet 'OMZ::lib/clipboard.zsh'
zinit snippet 'OMZ::lib/completion.zsh'
zinit snippet 'OMZ::lib/compfix.zsh'

zinit light 'zsh-users/zsh-autosuggestions'
zinit light 'zsh-users/zsh-completions'
zinit light 'zdharma/fast-syntax-highlighting'
zinit light 'chrissicool/zsh-256color'
zinit light 'paulirish/git-open'
zinit light 'reegnz/jq-zsh-plugin'
zinit light 'b4b4r07/emoji-cli'
zinit light 'mollifier/anyframe'
zinit light 'b4b4r07/enhancd'

zinit load 'junegunn/fzf-bin'
zinit load 'zdharma/history-search-multi-word'
```

### tmux

#### tpm

```shell
```

### Neovim

最後にテキストエディタの設定です．

#### dein.vimのインストール

#### dein.vimのカスタマイズ
