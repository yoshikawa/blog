---
title: 'Go言語で競技プログラミング始めました'
slug: competitive-programming
date: 2021-01-03
published: true
unlisted: false
language: ja
cover: ../2020-08-21-summer-intern/2020-intern-cover.jpg
imageShare: ../2020-08-21-summer-intern/2020-intern-cover.jpg
tags:
  - competitive-programming
---

どうも、よしかわです。2021年は挑戦の年として、競技プログラミングを始めます。

タイトルのように、 **Go言語で競技プログラミングを始めます。**
しかしながら、テストコードは書きません。理由は、問題を解く時間が100分と限られているからです。
どう環境構築すれば良いのかは、この記事に書いてあるので、参考にしてもらえると嬉しいです。

GitHubのリポジトリはこちらになります。

[yoshikawa/Competitive-Programming | GitHub](https://github.com/yoshikawa/Competitive-Programming)

### 競技プログラミングとは

競技プログラミング(競プロ)はプログラミングコンテストの一種で、参加者全員に同一の課題が出題され、課題に対してプログラムをより早くより正確に記述することを競うものです。

### なぜ始めようと思ったのか

**就職に有利だからではないです。自分の力で勝ち取ってください。**

なぜ、大学院1年生の最後に始めようと思ったのかを、ここに備忘録として書いておきます。

理由は、基礎的なアルゴリズムの理解や数学的な要素を自分自身の力にしたいからです。
インターンシップを通して、思考力と独創性が求められていると感じ、入社前にどれくらい身につけることができるか試したいというのもあります。

### Go言語でやる理由

いくつかの文献で、これから競プロを始める人はまず **C++** で参戦を検討したほうが良いと書かれています。
理由は、AtCoderの解説動画がほぼC++で説明されるためです。

Go言語を選んだ理由ですが、とても単純でGo言語で研究を進めているからです。
あとは、**好きな言語でやったほうが持続する**と思ったからです。
何事も継続するということが重要です。シンプルな構文で書けるとかもあるんですけど。

余談ですが、Rustでも挑戦してみようと考えています。理由は、研究でマイコンを扱う機会が増えそうだから。

### 環境構築

何事も開発環境構築から始まります。環境が良くないと作業したくないのは僕の悪いところですね。

前提として、Python3とNode.js, Node Package Manager(npm)がインストール済であること。

Go言語に限らず、2つのツールを使用していきます。

1つ目は `online-judge-tools` というツールで、サンプルケースやシステムテストケースをダウンロードしたり、コードを提出およびテストをしてくれます。

2つ目は、 `atcoder-cli` というツールで、コンテスト情報を入手したり、コンテスト用にディレクトリの作成をしてくれます。

```shell
# Install online-judge-tools
pip3 install online-judge-tools

# Install atcoder-cli
npm install -g atcoder-cli
```

### プログラミング

環境構築を終えたので、コーディングしていきましょう。

その前に、 `online-judge-tools` と `atcoder-cli` でログインをして、コードを提出できる状態にしておきましょう。

```shell
# Login AtCoder with acc
$ acc login

# Login AtCoder with oj
$ oj login https://beta.atcoder.jp/
```

次に、コンテストの問題をダウンロードします。

```shell
# コンテストの問題のダウンロード
$ acc new (コンテスト名) # Ex) acc new abc001
```

ダウンロードしてみると、以下のようなディレクトリ構成になるので、各ディレクトリにGoファイルを作成して、コーディングしていきましょう。

```shell
abc001
├── a
│   └── tests
│       ├── sample-1.in
│       ├── sample-1.out
│       ├── sample-2.in
│       ├── sample-2.out
│       ├── sample-3.in
│       └── sample-3.out
├── b
│   └── tests
│       ├── sample-1.in
│       ├── sample-1.out
│       ├── sample-2.in
│       ├── sample-2.out
│       ├── sample-3.in
│       └── sample-3.out
├── c
│   └── tests
│       ├── sample-1.in
│       ├── sample-1.out
│       ├── sample-2.in
│       ├── sample-2.out
│       ├── sample-3.in
│       ├── sample-3.out
│       ├── sample-4.in
│       ├── sample-4.out
│       ├── sample-5.in
│       ├── sample-5.out
│       ├── sample-6.in
│       ├── sample-6.out
│       ├── sample-7.in
│       ├── sample-7.out
│       ├── sample-8.in
│       └── sample-8.out
├── contest.acc.json
└── d
    └── tests
        ├── sample-1.in
        ├── sample-1.out
        ├── sample-2.in
        ├── sample-2.out
        ├── sample-3.in
        └── sample-3.out
```

#### CLIでテストと提出

`acc new` コマンドでテストケースをダウンロードしたので、テストをしていきましょう。

例えば以下のディレクトリ構成の場合、 `oj` コマンドでテストを実行することが可能です。

```shell
# ディレクトリ構成
abc001
├── a
│   ├── main.go
│   └── tests
│       ├── sample-1.in
│       ├── sample-1.out
│       ├── sample-2.in
│       ├── sample-2.out
│       ├── sample-3.in
│       └── sample-3.out
```

テストをするためのコマンドはこのようになります。

```shell
# テストをするためのコマンド
$ oj t -d tests -c "go run main.go" # ディレクトリ階層とファイル名に注意
```

### まとめ

最初はテストコード書く機会にもなるし、競技プログラミング良いなと思っていましたが、流石に100分という限りある時間で解くには、上記のツールに頼ったほうが良いですね。
