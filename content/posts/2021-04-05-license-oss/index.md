---
title: 'OSSを作成するためにライセンスについて調べてみた'
slug: license-oss
date: 2021-04-05
published: true
unlisted: false
language: ja
cover: ../2020-08-22-my-birthday/diary.jpg
imageShare: ../2020-08-22-my-birthday/diary.jpg
tags:
  - oss
  - license
---

どうも、よしかわです。

最近、OSS を作成しようと思い立ちました。

何を商用利用して良いか詳しく知らなかったので、この記事を作成しようと思いました。

#### 対象読者

- OSS を作成したいと思う人
- ライセンスごとの特徴を知りたい人

### オープンソースの定義

OSS を規定する上で重要となる「オープンソースの定義」を知ることが大事です。

オープンソースソフトウェアライセンスは、ソフトウェアを再配布することを前提として作成されたライセンスです。

[Open Source Initiative](https://opensource.org/)が承認した OSS ライセンスだけでも、70 種類以上が挙げられています。

### ライセンス一覧

今回は、以下のライセンスについて紹介したいと思います。

1. [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)
2. [GNU General Public License, version 3](https://www.gnu.org/licenses/gpl-3.0.html)
3. [MIT License（X11 License)](https://opensource.org/licenses/mit-license.php)
4. [二条項 BSD ライセンス](https://opensource.org/licenses/BSD-2-Clause)
5. [修正 BSD ライセンス(三条項 BSD ライセンス)](https://opensource.org/licenses/BSD-3-Clause)
6. [Eclipse Public License 2.0](https://www.eclipse.org/legal/epl-2.0/)
7. [GNU Affero General Public License v3.0](https://www.gnu.org/licenses/agpl-3.0.html)
8. [GNU General Public License v2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
9. [GNU Lesser General Public License v2.1](https://www.gnu.org/licenses/lgpl-2.1.html)
10. [GNU Lesser General Public License, version 3](https://www.gnu.org/licenses/lgpl-3.0.html)
11. [Mozilla Public License 2.0](https://www.mozilla.org/en-US/MPL/2.0/)
12. [The Unlicense](http://unlicense.org/)

### ライセンスの特徴

| ライセンス                                                                                     | Required(必須)                               | Permitted(許可)                                | Forbidden(禁止)                |
| :--------------------------------------------------------------------------------------------- | -------------------------------------------- | ---------------------------------------------- | ------------------------------ |
| 1. [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)                           | 著作権の表示、変更箇所の明示                 | 商用利用、修正、配布、サブライセンス、特許許可 | トレードマークの使用、責任免除 |
| 2. [GNU General Public License, version 3](https://www.gnu.org/licenses/gpl-3.0.html)          | 著作権の表示、変更箇所の明示、ソースの明示   | 商用利用、修正、配布、特許許可                 | 責任免除、サブライセンス       |
| 3. [MIT License（X11 License)](https://opensource.org/licenses/mit-license.php)                | 著作権の表示                                 | 商用利用、修正、配布、サブライセンス           | 責任免除                       |
| 4. [二条項 BSD ライセンス](https://opensource.org/licenses/BSD-2-Clause)                       | 著作権の表示                                 | 商用利用、修正、配布、サブライセンス           | 責任免除                       |
| 5. [修正 BSD ライセンス(三条項 BSD ライセンス)](https://opensource.org/licenses/BSD-3-Clause)  | 著作権の表示                                 | 商用利用、修正、配布、サブライセンス           | 責任免除、トレードマークの使用 |
| 6. [Eclipse Public License 2.0](https://www.eclipse.org/legal/epl-2.0/)                        | ソースの明示、著作権の表示                   | 商用利用、修正、配布、サブライセンス、特許許可 | 責任免除                       |
| 7. [GNU Affero General Public License v3.0](https://www.gnu.org/licenses/agpl-3.0.html)        | 著作権の表示、変更箇所の明示、ソースの明示   | 商用利用、修正、配布                           | 責任免除、サブライセンス       |
| 8. [GNU General Public License v2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)    | 著作権の表示、変更箇所の明示、ソースの明示   | 商用利用、修正、配布、特許許可                 | 責任免除、サブライセンス       |
| 9. [GNU Lesser General Public License v2.1](https://www.gnu.org/licenses/lgpl-2.1.html)        | 著作権の表示、ライブラリの使用、ソースの明示 | 商用利用、修正、配布、サブライセンス、特許許可 | 責任免除                       |
| 10. [GNU Lesser General Public License, version 3](https://www.gnu.org/licenses/lgpl-3.0.html) | 著作権の表示、ライブラリの使用、ソースの明示 | 商用利用、修正、配布、サブライセンス、特許許可 | 責任免除                       |
| 11. [Mozilla Public License 2.0](https://www.mozilla.org/en-US/MPL/2.0/)                       | ソースの明示、著作権の表示                   | 商用利用、修正、配布、サブライセンス、特許許可 | 責任免除、トレードマークの使用 |
| 12. [The Unlicense](http://unlicense.org/)                                                     | -                                            | 個人利用、商用利用、修正、配布、サブライセンス | 責任免除                       |

#### 補足説明

| 項目                                         | 説明                                                                                                     |
| :------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Rename（リネーム）                           | 修正した場合は、ソフトウェアの名前を変えなくてはいけません。                                             |
| License and copyright notice（著作権の表示） | ライセンスと著作権のコピーをコードに含めなくてはいけません。                                             |
| Library Usage（ライブラリの使用）            | ライブラリは非オープンソースのアプリケーションで使用されるかもしれません。                               |
| State Changes（変更箇所の明示）              | コード内の重要な変更箇所を明示してください。                                                             |
| Disclose Source（ソースの明示）              | ライブラリのソースを明らかにしてください。                                                               |
| Sublicense（サブライセンス）                 | このソフトウェアはサブライセンスを与えてもよいです。                                                     |
| Modifications（修正）                        | このソフトウェアは修正してもよいです。                                                                   |
| Commercial Use（商用利用）                   | このソフトウェアは商用目的のために使用してもよいです。                                                   |
| Private Use（個人利用）                      | このソフトウェアを配布しないで、個人的に修正・使用してよいです。                                         |
| Distribution（配布）                         | このソフトウェアを配布してもよいです。                                                                   |
| Patent Grant（特許許可）                     | このライセンスは個人または企業（コントリビュータ）をはじめ全ての利用者に特許権の特別な許可を提供します。 |
| Use Trademark（トレードマークの使用）        | ロゴやトレードマークでの使用は禁止です。                                                                 |
| Hold Liable（責任免除）                      | ソフトウェアは保証無しで提供されます。ソフトウェアによる損害賠償金などの法的責任は負わされません。       |
| No Sublicense（サブライセンス禁止）          | ライセンスに含まれない変更して、ソフトウェアにサブライセンスを与えてはいけません。                       |
| Modifications（修正なし）                    | このソフトウェアは修正してはいけません。                                                                 |
| Distribution（配布の禁止）                   | このソフトウェアを配布してはいけません。                                                                 |

#### WTFPL について

上記で 11 種類ものライセンスに触れました。それ以外に、僕が好きな OSS を 1 つ紹介したいと思います。

> DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
>
> Version 2, December 2004
> Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>
>
> Everyone is permitted to copy and distribute verbatim or modified copies of this license document, and changing it is allowed as long as the name is changed.
>
> DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
> TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
>
> 0.  You just DO WHAT THE FUCK YOU WANT TO.

（[http://www.wtfpl.net/about/](http://www.wtfpl.net/about/)より引用）

- 二次利用に関すること
- 改変に関すること
- 再頒布に関すること
- ライセンス条項の表記に関すること
- 商用利用に関すること
- 再頒布の際のライセンス変更に関すること

どれも特に制限を設けないというあまりにも下品で素晴らしいライセンスです。

このライセンスは MIT ライセンスより寛容なライセンスです。そのゆるさあまりにライセンスを使うことにこだわるなら、Apache 2.0 や MIT ライセンスを推奨します。

### もっと詳しくライセンスを学びたい

IPA(独立行政法人 情報処理推進機構)の Web サイトに[https://www.ipa.go.jp/osc/osslegal.html](https://www.ipa.go.jp/osc/osslegal.html)に OSS ライセンス関連情報としてまとめられています。

### まとめ

WTFPL は特に制限を設けないライセンスということで、僕みたいな変態エンジニアには良いライセンスかもしれませんね。

GitHub など様々な機会でライセンスを選ぶときに参考にしていただければ光栄です。

ここまで読んでいただき、ありがとうございました!

### 参考文献

[たくさんあるオープンソースライセンスのそれぞれの特徴のまとめ](https://qiita.com/tukiyo3/items/58b8b3f51e9dc8e96886)

[https://www.ipa.go.jp/osc/osslegal.html](https://www.ipa.go.jp/osc/osslegal.html)

[http://www.wtfpl.net/about/](http://www.wtfpl.net/about/)
