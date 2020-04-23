---
title: 'Go言語 入門 2日目'
slug: golang2
date: 2020-04-22
published: true
unlisted: false
language: jp
cover: ../2020-04-21-golang/gopher.png
imageShare: ../2020-04-21-golang/gopher.png
tags:
  - golang
---

## Go 言語 入門 2 日目

どうも、[よしかわ](https://twitter.com/yoshikawataiki)です。

[Go 言語 入門 1 日目](https://yoshikawa.dev/golang/)を見た上で、今回の記事を読み進めると理解が深まると思います。

### 対象読者

- Go 言語を学びたい人
- Git が扱える人
- Mac OS X を使っている人
- 屈強な Windows ユーザー、Linux ユーザー

### 参考文献

[A Tour of Go](https://go-tour-jp.appspot.com/list)

[スターティング Go 言語](https://www.amazon.co.jp/dp/B01FH3KRTI/)

[Go 言語入門](https://www.amazon.co.jp/dp/B01KFFS1CI/)

[Golang ことはじめ - OthloBlog - オスロブログ -](http://othlotech.hatenablog.com/entry/2018/04/14/223857)

## 文

### セミコロンとその省略

Go では各々の「文」と「セミコロン」によって区切られます。

```go
package main

import (
    "fmt"
)

func main() {
    fmt.Println("Hello, World!")
}
```

各文がセミコロンで区切られるはずが、上記のコードのどこにも「;」は見当たりません。

Go はコード上のすべてのセミコロンが省略可能になるよう文法が設計されているため、見た目の上では一切セミコロンが見当たらなくても不思議なことではないです。

元の「Hello, World!」プログラムは、コンパイラによって次のようなコードとして解釈されます。

```go
package main;

import (
    "fmt"
);

func main() {
    fmt.Println("Hello, World!");
};
```

各文の末尾にセミコロンが増えていることがわかります。Go のコンパイラは各行の文末を見て「文の終端」であると判断した場合に自動的にセミコロンを挿入します。結果的に、文を区切るセミコロンが「存在しているのに見えない」状態になっているわけです。

## 変数

Go におけるすべての変数は「型」を備えます。変数の肩は、大きく分けると「値型」「参照型」「ポインタ型」の 3 種類に分かれます。
「値型」は C や Java における値型と同様に整数や実数といった「値」そのものを格納する変数です。

「参照型」は少し特殊で、Go では「スライス」「マップ」「チャネル」という 3 つのデータ構造のいずれかを指し示す変数の型になります。

最後の「ポインタ型」は C の学習障壁として悪名高い「ポインタ」を表す変数です。

### 定数の定義

#### 明示的な定義

Go の変数を定義する方法には、「明示的」な書き方と「暗黙的」な書き方の 2 種類があります。

まずは、明示的に変数を定義する書き方を見ましょう。

```go
// int型の変数nを定義する
var n int
```

予約語である var のあとに続けて「変数の名前（識別子）」を指定し、最後に「変数の型」を指定します。

このコードは int 型の変数 n の定義しています。このように、var を使用する倍位は、変数の名前と型の両方を明示的に指定して変数を定義する必要があります。

同じ型の変数であれば、次のように複数の変数をまとめて定義することも出来ます。

```go
// int型の変数x, y, zを定義する
var x, y, z int
```

次のように、var 以下の内容を()で書こうことで、異なる型の変数をまとめて定義することも可能です。変数定義を行うブロックが見やすくなるメリットがあります。

```go
// int型の変数x, yとstring型の変数nameを定義する
var (
    x,y int
    name string
)
```

定義した変数には演算子=を使用して値を代入できます。型が正しい限り、再代入への制限はありません。しかし、異なる型の値を代入しようとするとコンパイルエラーが発生します。

#### 暗黙的な定義

変則的ですが次のような書き方も許されます。次のように

```go
var a = 1 // int型の変数aに1を代入
```

演算子:=を使用する書き方に比べて明らかに冗長ですので、この例であれば間違いなく次の書き方のほうが適切でしょう。

```go
a := 1
```

しかし、次のように複数の変数を暗黙的に定義する場合を考えてみましょう。

```go
// varで変数定義をまとめる書き方
var (
    n = 1
    s = "string"
    b = true
)

// 暗黙的な定義を並べる書き方
n := 1
s := "string"
b := true
```

var で囲った書き方のほうが変数定義のブロックを目立たせることが出来るので、好ましい書き方であると言えます。

複数の変数を定義する場合は、可能な限り var にまとめることを意識しましょう。

## 型

### 論理値型

bool 型は論理値を表す型です。真を表す定数 true, 偽を表す定数 false いずれかの値をとります。

```go
var b bool // bool型の変数bを定義
b = true   // 変数bにtrueを代入
```

型推論を利用した変数定義も可能です。

```go
b := false  // bool型の変数bを定義してfalseを代入
```

### 数値型

Go には明確に定義された多数の数値型が用意されています。たとえば int64 という整数型がありますが、これは「64 ビット符号付き整数」を表します。

このように明確に定義された基本型を用意することによって、C における int 型が環境によって 32 ビット整数を表したり 64 ビット整数を表すような「実装依存」による取り扱いの難しさを軽減させています。

### 整数型

整数型は、符号付き整数と符号なし整数の 2 種類があります。符号なし整数の型は、正の整数と「0」のみを扱うことが出来ます。

一方、符号付き整数の型は、負の整数を含んだ正負の整数と「0」を扱うことが出来ます。

「int8」型や「uint8」型のように型名の最後に数値が付く型は、その数値でビット単位のサイズを表しています。

サイズを記述しない「int」型と「uint」型は、CPU アーキテクチャ次第で 4 バイト（32 ビット）か 8 バイト（64 ビット）のどちらかになります。

### 浮動小数点型

浮動小数点型は、「float32」型と「float64」型の 2 つがあります。

float32 型は Java の float 型と同じサイズです。また、float64 型は Java の double 型と同じサイズです。

### 複素数型

複素数型は、2 つの浮動小数点で実数と虚数を表す型であり、「complex64」型と「complex128」型があります。

complex64 型は、実数と虚数を float32 型で扱います。また、complex128 型は、実数と虚数を float64 型で扱います。

### 文字列型

文字列型は「string」型のみであり、文字列の値は、通常 UTF-8 のバイト列です。

文字列型の変数の領域には、メモリ上に存在する文字列の実体を格納するのではなく、代わりにその参照のみを格納します。

そのため、別の文字列型の変数に代入したとしても、文字列の実体はコピーされません。

また、Go 言語の文字列はイミュータブルです。つまり文字列を一度作成すると、そのメモリの内容を変更することが出来ません。

そのため、一部分のみ変更した文字列が必要な場合は、新しい文字列をメモリ上に作成する必要があります。

```go:title=main.go
package main

import "fmt"

func main() {
    s := "hello, world!"
    fmt.Println(len(s))
    fmt.Println(s[0], s[7])
}
```

```bash
go run main.go
13
104 119
```

### 真偽値型

真偽値型は「bool」型のみです。この型の値は、真または偽の 2 値のみを取り、それぞれ「true」（真）と「false」（偽）といった事前定義済み定数が用意されています。

比較演算の結果や条件式で使用する値も、真偽値型です。