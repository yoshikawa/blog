---
title: 'GitHub PagesからVercelにホスティングを移行'
slug: vercel-gatsby
date: 2021-01-19
published: true
unlisted: false
language: ja
cover: ../2020-08-22-my-birthday/diary.jpg
imageShare: ../2020-08-22-my-birthday/diary.jpg
tags:
  - diary
---

どうも、よしかわです。

最近は、研究に追われていますが、ブログ更新をしていこうと思います。

[Lighthouse](https://github.com/GoogleChrome/lighthouse-ci)を用いて、webページを分析し、パフォーマンス向上を試みたのでまとめます。

結果として、GitHub PagesからVercelに移行しました。

他にやったことは、画像圧縮などです。

### なぜGitHub PagesからVercelに

僕自身が欲している3つのことを自動でしてくれるので採用しました。

- HTTPSに強制的にする
- Git Push毎にデプロイおよびURL発行
- Lighthouseによるパフォーマンス結果を表示
