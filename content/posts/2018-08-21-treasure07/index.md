---
templateKey: blog-post
title: "Treasure2018 7日目 データベース"
date: 2018-08-21
slug: treasure07
published: true
unlisted: false
language: ja
cover: ../2018-09-03-summer-internship-2018/all.jpg
imageShare: ../2018-09-03-summer-internship-2018/all.jpg
tags:
  - internship
  - treasure
---

#### 前の記事

[Treasure2018 6 日目](https://yoshikawa.dev/treasure06/)

## データベース

### やったこと

小規模なデータモデリングをした。
モデリングの手法を学んだ。
ER 図の書き方を学んだ。

### 分からなかったこと

KEY の設定って難しいんだなぁ(みつを)

### memo

#### データモデリング

- RDB の設計手法の一つ
- 現実世界のデータからエンティティを洗い出し、関連付けをする

#### RDB

メリット

- 制約を利用することで整合性が担保される
- トランザクションを利用するとデータの操作をアトミックに行える
- SQL によって柔軟な検索が行える

デメリット

- リリース後に構造を変更するのにコストがかかる

#### モデリングの技法

ER 図

データの関係を図式化したものが ER 図

Entity Realationship

エンティティとは

- イベント

誰がいつ何に対して何を行ったか

7W2H を考える

- リソース

イベントから参照される「もの」

#### モデリング実践入門

3 人 1 組で問題解決。

#### 次の記事

[Treasure2018 8 日目](https://yoshikawa.dev/treasure08/)