---
templateKey: blog-post
title: "Treasure2018 3日目 React"
date: 2018-08-15
slug: treasure03
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

[Treasure2018 2 日目](https://yoshikawa.dev/treasure02/)

## Treasure2018 3 日目

今日は React 入門

普段、JavaScript は書かないので、Treasure で圧倒的成長 💪

### やったこと

React の気持ちを少しだけど理解した。

Flux, Redux などを触った。

redux-thunk に触れた。

React で TODO アプリを作成した。

TODO の追加が出来た 🎉🎉

JavaScript でテストコードを書いた!!

### わからなかったところ

**Redux** がマジでわからなかった。

js, jsx 特有のコーディングが辛かった…

アロー関数の使い方がよくわからなかったので、JavaScript の気持ちになる。

dispatch ってなに?

- ActionCreatot で生成された Action を Store に送る。
- Store のインスタンスに dispatch を行うことで Store へ変更を伝える。

非同期処理の書き方がよくわからなかった。Promise の理解をせねば…

[JavaScript Promise 本](https://azu.github.io/promises-book/)

### 今日のランチ

ラーメン屋 うさぎ さんの「冷やし担々麺」

![冷やし担々麺](./usagi-hiyashi.jpg)

### memo

#### 技術の変化は螺旋

技術の差分を見出して変化の中に見を置こう

変化はチャンスでもある

jQuery の時代はとても長かった、そこで止まったままの人も少なくない。

React などはまだまだ歴が浅いので、若手にチャンスがあるのでは!

#### JavaScript の移り変わり

DOM ツリー全体を JacaScript で構築する

HTML も、場合によって CSS も JS でやる

サーバサイドは WebAPI のみ実装する

API があると、モバイルアプリにも落とし込めるので便利!

DOM 操作は極めて重い処理

DOM 操作をへらすことがテクニックだった

#### VirtualDOM

新しい情報がきたら、その情報をもとに新しい DOM をいちから作成する。

更新したら、再描画するのめっちゃすごい

#### React

Facebook 社が開発している。

#### Component

名前が異なるかもしれないが、2 種類あるらしい。

- Stateful component
- Stateless component

#### キャッシュをわざわざ消すのめんどくさいとき

`cmd+shift+R`

#### Redux

[https://redux.js.org/](https://redux.js.org/)

Redux は、React が扱う UI の state を管理する

1. Single source of truth
2. State is read-only
3. Mutations are written as pure functions

#### Flux

[flux について](https://facebook.github.io/flux/docs/overview.html)

#### Promise

[Promise について](https://azu.github.io/promises-book/)

#### 次回の記事

[Treasure2018 4 日目](https://yoshikawa.dev/treasure04/)