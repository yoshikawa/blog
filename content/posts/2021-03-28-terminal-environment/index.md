---
title: '【開発で差をつけろ！】僕が考えた最強のターミナル環境(zsh+tmux+Neovim)'
slug: terminal-environment
date: 2021-04-15
published: false
unlisted: false
language: ja
cover: ./terminal.webp
imageShare: ./terminal.webp
tags:
  - terminal
  - zsh
  - tmux
  - neovim
---

## 僕が考えた最強のターミナル環境(zsh+tmux+Neovim)

新しいパソコンを買ったときや，OS をクリーンインストールしたときに開発環境を構築するのに手間を省きたい．

就職やインターンで会社からパソコンを配給されるエンジニアは必見の記事になっている．

今回は，僕みたいな怠惰なエンジニアにオススメする dotfiles という管理方法だ．

### 対象読者

- 就職やインターンで会社からパソコンが配給される人
- 入学に伴ってパソコンを新調する人
- 開発環境を管理したいエンジニア

### リポジトリ

筆者の dotfiles は公開されている．

参考にしていただければ，光栄である．

[yoshikawa/dotfiles | GitHub](https://github.com/yoshikawa/dotfiles)

ワンコマンドで開発構築が可能．

**ターミナルを立ち上げて下記のコマンドをコピペするだけで，今回紹介する環境が整う．**

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

まずは，App Store から Xcode をインストールする．

インストール後，下記のコマンドを実行し，コマンドラインツールのインストールをする．

```shell
xcode-select --install
```

### Homebrew のインストール

[Homebrew](https://brew.sh/index_ja.html)とは，macOS（または Linux）用パッケージマネージャーである．

Homebrew は，Apple または Linux システムが提供していない必要なパッケージをインストールすることが可能である．

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### zsh

最近，[MacOSX のデフォルトシェルが bash から zsh に変更](https://support.apple.com/en-us/HT208050)になった．

zsh は，対話式シェルとしてもスクリプト言語インタプリタとしても使えるシェルである．

bash, ksh, また tcsh の便利な機能の多くが zsh に組み込まれている．

zsh は，補完機能やスペル修正機能，コマンド履歴を共有，検索することが可能である．

zsh はグローバルエイリアスという機能がある．

これは， `-g` を付けてエイリアス設定すると，コマンドの任意の場所で展開が可能である．

```shell
# グローバルエイリアスは -g をつける
alias -g @g='| grep'
alias -g @l='| less'
```

### zsh のインストール

Homebrew を用いて，`zsh` をインストールする．

```shell
brew install zsh
```

MacOSX では，上記の通りデフォルトシェルが zsh に変更されたが，デフォルトシェルを変更する方法は下記のコマンドである．

```shell
# シェルをzshに変更
chsh -s $(which zsh)
```

### zinit

前述では，シェルを zsh に設定した．

zsh の機能を拡張するためのプラグインを管理するプラグインマネージャを導入する．

[zinit(旧名 zplugin)](https://github.com/zdharma/zinit)がオススメであるので，この記事では zinit のセットアップを行う．

### zinit のインストール

[公式サイト](https://github.com/zdharma/zinit#installation)のとおり，zinit のインストールを行う．

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/zdharma/zinit/master/doc/install.sh)"
```

インストール後，zinit の設定が追記されているので，リロードを行い，zinit 自体を最新にする．

```shell
source ~/.zshrc
zinit self-update
```

これで zinit のインストール自体は完了．

### zinit のカスタマイズ

次に，zinit のカスタマイズを行う．

`~/.zshrc`を編集する．

```shell
autoload -Uz promptinit compinit;
promptinit;
compinit;

ZPLUGIN_HOME=$HOME/.zinit
if [[ ! -f $ZPLUGIN_HOME/bin/zinit.zsh ]]; then
    git clone https://github.com/zdharma/zinit $ZPLUGIN_HOME/bin
fi
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

`~/.zshrc`を編集すれば，zinit でのスニペットとプラグイン導入が完了だ．

Oh My Zsh や Prezto プラグインをロードするために，`snippet` 機能を使用する．

また，`light` や `load` 機能の詳細は[公式サイト](https://zdharma.github.io/zinit/wiki/INTRODUCTION/)で．

### tmux

tmux とは，端末多重化ソフトウェアのことである．

作業ごとにそれぞれのターミナルを立ち上げる必要があるが，tmux を用いると 1 つのターミナル上で複数のターミナルを立ち上げ，同時並行で別々の作業が可能である．

また，1 つの ssh 接続で複数のターミナルを立ち上げて作業が可能だ．

tmux のセッション状態を保存できるため，作業を途中で中断することも可能だ．

### tmux のインストール

Homebrew を用いて，`tmux` をインストールします．

```shell
brew install tmux
```

### tpm

Tmux Plugin Manager(tpm)は，tmux プラグインマネージャである．

`.tmux.conf` にプラグインを記述することで管理を行う．

### tpm のインストール

次に，tmux をプラグインマネージャである `tpm` を導入していく．

```shell
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
```

### tpm のカスタマイズ

次に， `~/.tmux.conf` を編集していく．

```shell
#List of plugins
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-sensible'
set -g @plugin 'tmux-plugins/tmux-online-status'
set -g @plugin 'tmux-plugins/tmux-cpu'
set -g @plugin 'tmux-plugins/tmux-copycat'
set -g @plugin 'tmux-plugins/tmux-yank'
set -g @plugin 'tmux-plugins/tmux-resurrect'
set -g @plugin 'tmux-plugins/tmux-continuum'
set -g @plugin 'samoshkin/tmux-plugin-sysstat'

## Run tpm
run -b '~/.tmux/plugins/tpm/tpm'
```

#### 基本操作

どのキーがどの操作に対応していかは，`prefix + ?`を入力することで確認可能である．

また，ターミナルで `tmux list-keys`で確認可能だ．

Prefix キーは，デフォルト設定だと，`ctrl + b`である．

Prefix 自体は変えることが出来，筆者の場合だと，`ctrl + a`である．

#### tmux 起動

tmux の起動は，以下の 2 通りあるので，覚えておいて損はない．

```shell
tmux
```

or

```shell
tmux new-session
```

### tpm によるプラグインインストール

次に，tpm によるプラグインインストールだが， tmux を起動中に `prefix + I(shift+I)`でインストールが始まる．

### Neovim

最後にテキストエディタの設定だ．

Neovim について詳しく知りたい場合は，[こちら](https://qiita.com/lighttiger2505/items/440c32e40082dc310c1e)を参考してほしい．

筆者は，今までに `vim + vim-plug` という環境で設定してきたが，現在は `Neovim + dein.vim` という環境である．

今回は，新世代の Vim，Neovim について設定をしていく．

Homebrew を用いて，`Neovim` をインストールする．

```shell
brew install neovim
```

### dein.vim

dein.vim は，Vim/Neovim プラグインマネージャである．

昔は，NeoBundle.vim というプラグインマネージャが主流であったが，現在は開発がされておらず，バグ修正のみ．

NeoBundle.vim から今後は，dein.vim を使ってほしいとのこと．

#### 事前準備

Neovim を使用する場合，`.zshenv` に次の一文を入れないと動かない場合があるので注意．

```shell
export XDG_CONFIG_HOME="$HOME/.config"
```

また，Python3 を使用しているプラグインを動作させるためには，Python 用のプラグインである`python3-neovim`をインストールする必要がある．

```shell
brew install python3
pip3 install -U neovim
```

### Neovim および dein.vim の設定

NeoVim の設定ファイルである `$XDG_CONFIG_HOME/nvim/init.vim` に設定を書いていく.

```vim
" reset augroup
augroup MyAutoCmd
    autocmd!
augroup END

" ENV
let $CACHE = empty($XDG_CACHE_HOME) ? expand('$HOME/.cache') : $XDG_CACHE_HOME
let $CONFIG = empty($XDG_CONFIG_HOME) ? expand('$HOME/.config') : $XDG_CONFIG_HOME
let $DATA = empty($XDG_DATA_HOME) ? expand('$HOME/.local/share') : $XDG_DATA_HOME

" Load rc file
function! s:load(file) abort
    let s:path = expand('$CONFIG/nvim/rc/' . a:file . '.vim')

    if filereadable(s:path)
        execute 'source' fnameescape(s:path)
    endif
endfunction

call s:load('plugins')
```

プラグインに関する設定は， `$XDG_CONFIG_HOME/nvim/rc/plugins.vim` に分割しているので，自分の環境に合わせて変更してほしい．

```vim
let s:dein_dir = expand('$DATA/dein')

if &runtimepath !~# '/dein.vim'
    let s:dein_repo_dir = s:dein_dir . '/repos/github.com/Shougo/dein.vim'

    " Auto Download
    if !isdirectory(s:dein_repo_dir)
        execute '!git clone https://github.com/Shougo/dein.vim ' . s:dein_repo_dir
    endif

    execute 'set runtimepath^=' . s:dein_repo_dir
endif

let g:dein#install_max_processes = 16
let g:dein#install_message_type = 'none'

if !dein#load_state(s:dein_dir)
    finish
endif

call dein#begin(s:dein_dir, expand('<sfile>'))

let s:toml_dir = expand('$CONFIG/nvim/dein')

call dein#load_toml(s:toml_dir . '/plugins.toml', {'lazy': 0})
call dein#load_toml(s:toml_dir . '/lazy.toml', {'lazy': 1})

call dein#end()
call dein#save_state()

if has('vim_starting') && dein#check_install()
    call dein#install()
endif
```

プラグインは TOML 形式で記述が可能である．

`$XDG_CONFIG_HOME/nvim/dein/plugins.toml` にインストールするプラグインを記述する．

```toml
[[plugins]]
repo = 'Shougo/dein.vim'

repo = 'itchyny/lightline.vim'
hook_add = '''
    let g:lightline = {'colorscheme': 'wombat'}
'''

# Toml
[[plugins]]
repo  = 'cespare/vim-toml'

# Golang
[[plugins]]
repo = 'fatih/vim-go'
```

`$XDG_CONFIG_HOME/nvim/dein/lazy.toml` に遅延読み込みするプラグインを記述する．

```toml
# dein.vim command
[[plugins]]
repo = 'haya14busa/dein-command.vim'
on_cmd = 'Dein'
```

### おわりに

開発環境構築の違いで，今後のパフォーマンスアップに繋がれば光栄である．

色々綴ってきたが，ミスなどがあるので，Twitter などでコメントを頂ければ，改善していく．

#### 参考文献

[Neovim がどういうプロジェクトなのかまとめ](https://qiita.com/lighttiger2505/items/440c32e40082dc310c1e)
