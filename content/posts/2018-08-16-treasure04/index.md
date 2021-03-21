---
templateKey: blog-post
title: "Treasure2018 4日目 WebAPI"
date: 2018-08-16
slug: treasure04
published: true
unlisted: false
language: ja
cover: ../2018-09-03-summer-internship-2018/all.jpg
imageShare: ../2018-09-03-summer-internship-2018/all.jpg
tags:
  - internship
  - treasure
---


#### 前回の記事

[Treasure2018 3 日目](https://yoshikawa.dev/treasure03/)

## WebAPI について

Treasure4 日目は WebAPI を学びました。

### やったこと

共通意識 💪

API 設計はどうすればいいかを学んだ。

### わからなかったところ

Golang をもっと書けるようになりたい!

### memo

WebAPI を用意するときに現場で意識していること

- 共通意識

#### RESTful API の制約

- client-server
- stateless
- cache
- uniform interface
- layered system
- Code-On-Demand(COD)

#### client-server

クライアント/サーバアーキテクチャを分離

#### stateless/stateful

クライアントとサーバの対話に制約を追加。

認証: cookie vs token

#### cache

GET だったらキャッシュを使う

POST, PUT, DELETE のときにキャッシュを更新

#### uniform interface

- URI
- HTTP
- hypermedia

https://martinfowler.com/articles/richardsonMaturityModel.html

レベル分け

レベル 0: `POST /createComment {"body": "xxx", "repos": "xxxx", "issueid", 2}`

レベル 1: resource `POST /repos/xxx/xxx/:issues/7 {"body": "hoge"}`

レベル 2: resource + http method `POST /repos/xxx/xxx/:issues/5 {"body": "hoge"}`

レベル 3: Hypermedia REST

#### layered system

data, view を分離

#### Code-On-Demand

xml,json で返すことが多い

#### WebAPI 作成に困ったら…

良いものをコピーしよう!

- GitHub
- AWS S3
- PayPal

#### Cookie Session

Cookie はクライアント側に値を保存する。
Cookie はクライアント側に値があるので、データを改竄しやすい。

Session はサーバ側に値を保存する。
Session はサーバ側に値があるので、データを改竄しにくい。
取り出すためには、SessionID を送る必要がある。

#### URL 設計

- /{resource}/{id}
- singular vs plural(もの vs もの s)

#### URL 設計(パラメータ)

- path
- query string

検索する(search)値はクエリパラメータ

#### HTTP method

- GET,POST,PUT,PATCH,DELETE
- PUT vs PATCH

#### ためになる話

夢を追っていない人はつまらない

[https://supporterz.jp/](https://supporterz.jp/)

カッコイイオトナを増やす

VOYAGE GROUP のインターンは社員のコミットが多い!

#### 次回の記事

[Treasure2018 5 日目](https://yoshikawa.dev/treasure05/)