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

### zsh

最近，[MacOSXのデフォルトシェルがbashからzshに変更](https://support.apple.com/en-us/HT208050)になった．

#### zinit

### tmux

#### tpm

### Neovim

最後にテキストエディタの設定です．
