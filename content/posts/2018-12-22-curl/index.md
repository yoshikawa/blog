---
title: 'curlについて学ぶ'
slug: curl
date: 2018-12-22
published: true
unlisted: false
language: ja
cover: ./github-lawn.jpg
imageShare: ./github-lawn.jpg
tags:
  - curl
  - go
---

**この記事は、名古屋の IT 系学生コミュニティ「OthloTech」のアドベントカレンダー**

**[OthloTech Advent Calendar 2018](https://qiita.com/advent-calendar/2018/othlotech) 22 日目の記事です。**

---

どうも、[よしかわ](https://twitter.com/yoshikawataiki)です。

今回は、タイトルどおり curl コマンドについて触れていきます。

### 対象読者

- curl コマンドを学びたい人
- Web サービスを開発している人
- Golang で curl コマンドを試してみたい人

### 目次

このブログでは以下のことを行います。

### 参考文献

[渋川よしき著『Real World HTTP』(オライリー・ジャパン発行)](https://www.oreilly.co.jp/books/9784873118048/)

[山本陽平著『Web を支える技術―― HTTP，URI，HTML，そして REST』(技術評論社発行)](https://gihyo.jp/dp/ebook/2014/978-4-7741-7074-9)

### curl とは

curl は、1997 年から開発されているツールです。開発者はスウェーデンの[Daniel Stenberg](https://twitter.com/bagder)です。

curl は、libcurl と curl の 2 つの構成要素から成り立っています。

- libcurl はクライアントサイド URL 転送ライブラリです。HTTP だけでなく、FTP や LDAP など、様々な通信方式に対応しています。
- curl は URL シンタックスを用いてファイルを送信または受信するコマンドラインツールです。

### curl のバージョン

僕の Mac のデフォルトがこちらでした。

```shell
$ curl --version
curl 7.54.0 (x86_64-apple-darwin18.0) libcurl/7.54.0 LibreSSL/2.6.4 zlib/1.2.11 nghttp2/1.24.1
Protocols: dict file ftp ftps gopher http https imap imaps ldap ldaps pop3 pop3s rtsp smb smbs smtp smtps telnet tftp
Features: AsynchDNS IPv6 Largefile GSS-API Kerberos SPNEGO NTLM NTLM_WB SSL libz HTTP2 UnixSockets HTTPS-proxy
```

Homebrew で curl をインストールします。

`brew install curl`

```shell
$ curl --version
curl 7.62.0 (x86_64-apple-darwin18.0.0) libcurl/7.62.0 SecureTransport zlib/1.2.11
Release-Date: 2018-10-31
Protocols: dict file ftp ftps gopher http https imap imaps ldap ldaps pop3 pop3s rtsp smb smbs smtp smtps telnet tftp
Features: AsynchDNS IPv6 Largefile NTLM NTLM_WB SSL libz UnixSockets
```

### jq のインストール

jq とは、JSON を整形して表示したり集計したり、値を抜き取ったり出来る JSON 用の grep みたいなコマンドです。

マニュアルはこちらから https://stedolan.github.io/jq/manual/

`brew install jq`

### Docker のインストール

今回の記事では、curl コマンドを体感していただくために、Docker を要します。

Docker をインストールしましょう。

Homebrew でイントールするには以下のコマンドを実行します。

```shell
brew cask install docker
open /Applications/Docker.app
```

### API を叩いてみる

API を叩くために、まず以下の URL からリポジトリをクローンしてください。

**Golang で書かれているため、配置ディレクトリに気をつけてください。**

[https://github.com/yoshikawataiki/simple-api](https://github.com/yoshikawataiki/simple-api)

```shell
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

```shell
curl -X POST -H "Content-Type:application/json" -d '{"name":"yoshikawa","email":"yoshikawa@hoge.com"}' localhost:8080/users | jq
```

返される値のサンプルは以下です。

```json
{
  "id": 1,
  "name": "yoshikawataiki",
  "email": "yoshi@hoge.com",
  "created_at": "2018-12-22T14:43:51Z",
  "updated_at": "2018-12-22T14:43:51Z"
}
```

それでは、curl コマンドで GET してみましょう。

```shell
curl localhost:8080/users | jq
```

返される値のサンプルは以下です。

```json
{
  "id": 1,
  "name": "yoshikawataiki",
  "email": "yoshi@hoge.com",
  "created_at": "2018-12-22T14:43:51Z",
  "updated_at": "2018-12-22T14:43:51Z"
}
```

### 終わりに

curl コマンドってすごい簡単に POST や GET が出来るんですよ、便利ですね。

こんな雑な記事を最後まで読んでいただきありがとうございました！

23 日目は[すぱいす](https://twitter.com/rabspice)さんです！

僕は現在 3 年生なので、来年卒業論文を書く際にお世話になる記事になること楽しみにしてます！
