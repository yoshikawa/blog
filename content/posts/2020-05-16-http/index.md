---
title: 'HTTPについて学ぶ'
slug: http
date: 2020-05-16
published: true
unlisted: false
language: jp
cover: ../2020-04-21-golang/gopher.png
imageShare: ../2020-04-21-golang/gopher.png
tags:
  - http
  - curl
  - golang
---

**この記事は、VOYAGE GROUP のサマーインターン、Treasure2018 の修了生による**

**[Treasure Advent Calendar 2018](https://qiita.com/advent-calendar/2018/treasure) 25 日目の記事です。**

---

どうも、[よしかわ](https://twitter.com/yoshikawataiki)です。

今回は HTTP の歴史について少し触れていきたいと思います。

HTTP が出来てから 30 年近く経った現代に、どう Web を学習していくかを模索している僕のような若いエンジニアに読んでもらえるように必死に書きます。

どうぞ、最後までお付き合いいただければ光栄です。

### 対象読者

- HTTP の理解をしたい人
- Web サービスを開発している人
- これから Web サービスを開発していきたい人

### 目次

- [対象読者](#%E5%AF%BE%E8%B1%A1%E8%AA%AD%E8%80%85)
- [目次](#%E7%9B%AE%E6%AC%A1)
- [はじめに](#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)
- [HTTP の歴史](#http%E3%81%AE%E6%AD%B4%E5%8F%B2)
  - [HTTP/0.9](#http09)
  - [HTTP/1.0](#http10)
  - [HTTP/1.1](#http11)
  - [HTTP/2](#http2)
- [メソッド](#%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89)
- [ヘッダー](#%E3%83%98%E3%83%83%E3%83%80%E3%83%BC)
- [ボディ](#%E3%83%9C%E3%83%87%E3%82%A3)
- [ステータスコード](#%E3%82%B9%E3%83%86%E3%83%BC%E3%82%BF%E3%82%B9%E3%82%B3%E3%83%BC%E3%83%89)
- [さいごに](#%E3%81%95%E3%81%84%E3%81%94%E3%81%AB)
- [参考文献](#%E5%8F%82%E8%80%83%E6%96%87%E7%8C%AE)

### はじめに

HTTP の歴史を話していく上で、いくつか便利なツールを紹介していきましょう。

`curl`という便利なツールを使うことにより、HTTP のメソッドを試すことが出来るので、この機会に導入してみましょう。

また、JSON を整形して表示したり集計したり、値を抜き取ったり出来る JSON 用の grep みたいなツールである`jq`を導入しましょう。

詳しくは、以下の URL からどうぞ。

[curl について学ぶ](https://yoshikawa.dev/curl)

### HTTP の歴史

HTTP/0.9 HTTP/1.0、HTTP/1.1、HTTP/2 が存在します。

|  発表年 | バージョン                                                       |
| ------: | :--------------------------------------------------------------- |
| 1991 年 | [HTTP/0.9](https://www.w3.org/Protocols/HTTP/AsImplemented.html) |
| 1996 年 | [HTTP/1.0](https://tools.ietf.org/html/rfc1945)                  |
| 1997 年 | [HTTP/1.1](https://tools.ietf.org/html/rfc2068)                  |
| 2015 年 | [HTTP/2](https://tools.ietf.org/html/rfc7540)                    |

余談ですが[HTTP/3 のドラフト](https://tools.ietf.org/html/draft-ietf-quic-http-16)が発表されましたので、興味のある方は見てみると良いかもしれません。

#### HTTP/0.9

最初のバージョンである HTTP/0.9 は、 **GET メソッドしか** 存在しませんでした。

HTTP ヘッダーは存在しません。

HTTP ステータスコードも存在しません。

応答は原則 HTML のみ。

とてもシンプルな設計です。

[HTTP/1.0](https://tools.ietf.org/html/rfc1945)の設計を読めば、シンプルさが一目瞭然ですね。

それでは、HTTP/0.9 がどんなものか試してみましょう。

ターミナルで以下のコマンドを実行します。

livedoor にアクセスしてみましょう。

```bash
❯ echo -e "GET /\r\n" | nc livedoor.com 80

<html>
<body>
<h1>It lives!</h1>
</body>
</html>
```

Amazon にもアクセスしてみましょうか。

```bash
❯ echo -e "GET /\r\n" | nc amazon.com 80

<html>
<head><title>301 Moved Permanently</title></head>
<body bgcolor="white">
<center><h1>301 Moved Permanently</h1></center>
<hr><center>Server</center>
</body>
</html>
```

HTML のみしか返ってきません。これが HTTP/0.9 です。

それでは、HTTP/1.0 では、どんな機能が追加されていくのでしょうか。

予測してみましょう。僕ならドキュメントを 1 つではなく複数個送る機能がほしいです。

あとは、ドキュメントの更新などもしたいし、クライアント側からのリクエストを明確に知りたいですね。

#### HTTP/1.0

上記の僕の欲しい機能が HTTP/1.0 には搭載しています。

HTTP/1.0 で、GET 以外に **POST や HEAD メソッド** が利用できるようになりました。

リクエスト時に HTTP バージョンが追加されました。

ヘッダーが表示されるようになりました。

例えを以下に記述しましたので、見てみましょう。

curl コマンドに、-v(もしくは --verbose)というオプションを追加して実行してみましょう。詳細な情報が表示されます。

HTTPS なら TLS handshake の様子等が出力されますが、今回は省略します。

```bash
❯ curl -v https://yoshikawa.dev

~~~~~~~~
認証まわり
~~~~~~~~

> GET / HTTP/1.1
> Host: yoshikawataiki.net
> User-Agent: curl/7.63.0
> Accept: */*
>
< HTTP/1.1 200 OK
```

GET メソッドで HTTP のバージョンは HTTP1.1。(今回はバージョンが 1.0 ではないの大目に見てほしい)

ヘッダーは Host、User-Agent、Accept。

レスポンスの先頭に HTTP バージョンと 3 桁のステータスコードが含まれるようになりました。

#### HTTP/1.1

HTTP/1.0 で目覚ましい進化をしましたが、欠点があります。それは、TCP/IP の 1 回のコネクションで 1 回のやり取りしか行なえませんでした。

HTTP/1.1 では通信の高速化を図るために追加された Keep-Alive という機能。

また、TLS による暗号化通信のサポート。

PUT や DELETE、PATCH などのメソッドの追加。

ただ、HTTP/1.1 だと 1 つのコネクションで何回もやり取りが出来るものの、その中では 1 つのリクエストが完了するまで次のリクエストが送れません。

例えば、1 枚目の画像をダウンロードし終わったら、2 枚目の画像のダウンロードが再開し、ダウンロードし終わったら、3 枚目の画像のダウンロードが始まる。100 枚あれば、どれくらい待たなければならないのか考えるだけで苦ですね。

#### HTTP/2

HTTP/1.1 でネックだった、バイナリデータを多重に送受信する仕組みに変更。

また、HTTP/2 では **ヘッダーが圧縮される** ようになりました。

僕のようなサイトでは、バイナリデータがあまりないので、HTTP/2 の恩恵を受けれないので、画像まとめサイトとかだと重要な技術になってくるわけですね。

かなり多機能になった HTTP の歴史はまだまだ続きますが、一旦メソッドの紹介をしたいと思います。

### メソッド

| メソッド名 | 説明                     |
| :--------- | :----------------------- |
| GET        | リソースの取得           |
| POST       | リソースの新規登録       |
| PUT        | 既存のリソースの更新     |
| DELETE     | リソースの削除           |
| PATCH      | リソースの一部変更       |
| HEAD       | リソースのメタ情報の取得 |

### ヘッダー

curl コマンドを使ってヘッダーを送ってみましょう。

[curl について学ぶ](https://yoshikawa.dev/curl)にも書いてありますが、こちらにも記載します。

まず以下の URL からリポジトリをクローンしてください。

**Golang で書かれているため、配置ディレクトリに気をつけてください。**

[https://github.com/yoshikawataiki/simple-api](https://github.com/yoshikawataiki/simple-api)

```bash
git clone git@github.com:yoshikawataiki/simple-api.git
```

それではワークディレクトリを`simple-api`にして、以下のコマンドを実行します。

Docker が起動していることが前提ですので、ご了承を。

1. make docker/start
2. make api/init
3. make migrate/init
4. make migrate/up
5. make run

では curl コマンドで POST してみましょう。

JSON を見やすくするために、`| jq`をつけています。

```bash
curl -X POST -H "Content-Type:application/json" -d '{"name":"yoshikawa","email":"yoshikawa@hoge.com"}' localhost:8080/users | jq
```

上記の`-H "Content-Type:application/json"`について説明します。

curl コマンドのオプションである`-H`は`--header`の省略でヘッダーを指定出来ます。

今回は、Content-Type で json を指定しています。

### ボディ

ヘッダーとの間に空行を挟んで、それ以降がすべてボディになります。

```bash
❯ curl -I https://yoshikawa.dev
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Date: Mon, 24 Dec 2018 18:19:38 GMT
Content-Length: 16247
```

`Content-Length: 16247`が実際のボディの長さです。

### ステータスコード

[Treasure Advent Calendar 2018](https://qiita.com/advent-calendar/2018/treasure) 24 日目の記事でりょーたろーが書いてくれましたので、端折ります。

[Status Code を下ネタで返すサーバーを書きました。](https://qiita.com/Dragon-taro/items/c99ee5814cc4a994e928)

### さいごに

僕より何年も人生の先輩である HTTP についてまとめました。

ここに書いたのはあくまでも一部であって、とても奥深いです。

参考文献はとてもタメになるので、僕みたいなエンジニア志望の学生にはおすすめです！

それでは、良いクリスマスを！！

そして、VOYAGE GROUP のサマーインターン、Treasure2018 の修了生でアドベントカレンダー記事を書いたみんな、お疲れ様でした！

[Treasure Advent Calendar 2018](https://qiita.com/advent-calendar/2018/treasure)はマジで面白い記事ばかりなので、必見！

本当に最高のインターンだった(余韻)

### 参考文献

[渋川よしき著『Real World HTTP』(オライリー・ジャパン発行)](https://www.oreilly.co.jp/books/9784873118048/)

[山本陽平著『Web を支える技術―― HTTP，URI，HTML，そして REST』(技術評論社発行)](https://gihyo.jp/dp/ebook/2014/978-4-7741-7074-9)
