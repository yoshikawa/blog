---
title: 'Go言語 入門 1日目'
slug: golang
date: 2020-04-21
published: true
unlisted: false
language: ja
cover: ./gopher.png
imageShare: ./gopher.png
tags:
  - golang
---

## Go 言語 入門 1 日目

どうも、[よしかわ](https://twitter.com/yoshikawataiki)です。今日から Go 言語についてまとめていきたいと思います。

### 対象読者

- Go 言語を学びたい人
- Git が扱える人
- Mac OS X を使っている人
- 屈強な Windows ユーザー、Linux ユーザー

### まとめ

Go 言語の環境構築からプログラムのコンパイル、実行をします。

また、パッケージについて紹介してきます。

### 参考文献

[A Tour of Go](https://go-tour-jp.appspot.com/list)

[スターティング Go 言語](https://www.amazon.co.jp/dp/B01FH3KRTI)

[Go 言語入門](https://www.amazon.co.jp/dp/B01KFFS1CI/)

[Golang ことはじめ - OthloBlog - オスロブログ -](http://othlotech.hatenablog.com/entry/2018/04/14/223857)

### 環境構築

今回は Mac OS X にフォーカスして記事を作りたいと思います。

Windows や Linux をお使いの方は[Getting Started - The Go Programming Language](https://golang.org/doc/install) を参照してください.

Mac の方は, 以下のコマンドを実行.

```bash
brew install go
```

### GOPATH 設定

.bash_profile などのファイルに追記します。

```bash
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin
```

上記では、GOPATH にユーザーのホームディレクトリ直下の go ディレクトリを指定しています。

GOPATH は、import 文の解決に使われます。

Go1.8 から GOPATH の指定がない場合、\$HOME/go がデフォルトで設定されます。

ホームディレクトリ直下に go ディレクトリの作成を行います。

```bash
mkdir go
```

GOPATH は、 **インポート文を解決するために使用されます**。これは go/build パッケージによって実装され文書化されています。

現在の GOPATH を確認するには以下のコマンドを実行します.

```bash
go env GOPATH
```

カスタム GOPATH の設定は[SettingGOPATH - golang/go](https://github.com/golang/go/wiki/SettingGOPATH)を参照してください.

GOPATH 以下のディレクトリ構成を知るのはとても良いことです.

[GOPATH environment variable](https://golang.org/cmd/go/#hdr-GOPATH_environment_variable)を参考にすると良いかもしれません.

```bash
GOPATH=/home/user/go

/home/user/go/
    src/
        foo/
            bar/               (go code in package bar)
                x.go
            quux/              (go code in package main)
                y.go
    bin/
        quux                   (installed command)
    pkg/
        linux_amd64/
            foo/
                bar.a          (installed package object)
```

### コンパイルと実行

今回は「Hello, Go!!」を出力するプログラムのコンパイルと実行について説明していきます。

以下のソースコードを入力してください。

ファイル名「hello.go」という名前で保存します。

Go 言語のソースコードは「.go」の拡張子を用います。

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!!")
}
```

#### ソースコードの解説

ソースコードの内容について解説していきます。

- 「package main」は、この hello.go がどのパッケージに所属しているかを決めています。
- コンパイルしたプログラムは、main パッケージの main 関数から実行を始めます。
- 「func main()」は main 関数の宣言です。この main 関数から実行を始めます。
- 「import "fmt"」は、このファイル上で fmt パッケージを使用するための宣言です。宣言することによって fmt.Println 関数が使用できます。
- 「fmt.Println("Hello, Go!!")」は、標準出力に「Hello, Go!!」を改行付きで出力します。

入力し終えたら hello.go ファイルをコンパイルします。

#### go build コマンド

ファイルを保存したディレクトリに移動して go build コマンドを実行します。

```bash
go build hello.go
```

今回は Mac OS X で開発するため、hello ファイルが作成されます。作成したファイルは以下のコマンドで実行出来ます。

```bash
./hello
```

「Hello, Go!!」と表示されたら成功です。

ようこそ、Go 言語の世界へ 🎉

#### go run コマンド

go run コマンドは、コンパイルと実行を続けて行います。

```bash
go run hello.go
```

go run コマンドを用いると、スクリプト言語のように開発することが出来ます。

### パッケージについて

Go 言語では、「パッケージ」という仕組みがあります。

プログラムを分割することで機能を分離し、複雑な状態にしないようにしていきましょう。

同じパッケージ内にあるソースファイルは、同一のディレクトリに配置してください。

基本的に同一ディレクトリには複数のパッケージを配置できません。

#### パッケージの書き方

ソースファイルの構成は以下のとおりです。

- 「package 文」 ソースファイルが所属するパッケージ
- 「import 宣言」 他のパッケージをインポート
- 「トップレベルの宣言」 変数や関数などの宣言

#### エクスポート

同一パッケージにある関数などは、それが他のソースファイルに記述したものであっても、特別なことをせず使用できます。

しかし、別のパッケージにある関数などは、エクスポートによって公開されていないと使用できません。

パッケージの「エクスポート」とは、トップレベルで宣言した関数などを別のパッケージに公開することです。

エクスポートされる対象は、トップレベルで宣言した対象のうち、 **名前の先頭 1 文字が大文字** になっているものだけです。

```go
// helloパッケージに所属
package hello

// 別パッケージから使用できる関数名
func Hello() {
    // ...
}

// 別パッケージから使用できない関数名
func hello() {
    // ...
}
```

#### インポート

パッケージの「インポート」とは、他のパッケージを読み込んで使用可能な状態にすることです。

エクスポートされた関数などは、そのパッケージをインポートすることで初めて使用できます。

パッケージのインポートは、「import 宣言」によって行います。

### コメント

コメントは、ソースコードの説明する際などに用います。

#### 1 行のコメント

```go
// コメント
```

#### 複数行のコメント

/_から _/まで

```go
/*
    ここから
    ここまで
*/
```

### おわりに

ここまで Go 言語の環境構築からプログラムのコンパイル、実行をしました。

また、パッケージについて紹介をしました。

次回は名前や、変数、定数、型などについて触れていきたいと思います。
