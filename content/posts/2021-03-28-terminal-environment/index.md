---
title: '僕が考えた最強のターミナル環境(zsh+tmux+Neovim)'
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

新しいパソコンを買ったときや，OSをクリーンインストールしたときに開発環境を構築するのに手間を省きたいですよね．

今回は，僕みたいな怠惰なエンジニアにオススメするdotfilesという管理方法です．

### リポジトリ

筆者のdotfilesは公開されています．

参考にしていただければ，光栄です．

[yoshikawa/dotfiles | GitHub](https://github.com/yoshikawa/dotfiles)

ワンコマンドで開発構築が可能です．

ターミナルを立ち上げて下記のコマンドをコピペするだけで環境が整います．

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

#### zinit

### tmux

#### tpm

### Neovim

最後にテキストエディタの設定です．
