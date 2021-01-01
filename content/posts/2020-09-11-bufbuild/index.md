---
title: 'BufbuildとProtocについて'
slug: bufbuild
date: 2020-09-11
published: true
unlisted: false
language: jp
cover: ./bufbuild.png
imageShare: ./bufbuild.png
tags:
  - bufbuild
  - protoc
  - protocol-buffers
---

## ここに記載されていること一覧

- bufとは何か
- Directory構成
- 秘伝のMakefile
- コンパイル用のDockerfile
- Go fileの生成
- JS, TS fileの生成
- Doc fileの生成

詰まる点は、コンパイルをするために、tools/tools.goを生成したり、bufから吐き出したimageをprotocにどう渡すかだと思います。

## bufとは

[Bufbuild/buf](https://github.com/bufbuild/buf)とは、Uberが作成していた[uber/prototool](https://github.com/uber/prototool)などのProtobufの問題を解決しようとしているツールです。また、prototoolなどのprotocサポートツールなどを、[Bufbuild/buf](https://github.com/bufbuild/buf)へ移行するためのドキュメントが作成されています。

以下、 [uber/prototool](https://github.com/uber/prototool)から転用

>Update: We recommend checking out [Buf](https://github.com/bufbuild/buf), which is under active development.
>
>There are a ton of docs for getting started, including for p[migration from Prototool](https://buf.build/docs/migration-prototool/).

自動でファイル検出したり、lintが強いです。

また、コンパイルも高速で、protocのプロトコルプラグインとして使用していきます。

bufを使うモチベーションとして、Makefileのシェル芸に記載していますが、protoc用のFileDescriptorSetsを生成して、それを元にprotocがgoに置換するところです。

つまり、protoだけではなくprotobufのFileDescriptorSetsを介することによってprotoのバージョンに依存しないschemaの管理が出来、またbufを介した上でのprotocが保証されています。

### Prototoolとの違いは？

[Migration Prototool](https://buf.build/docs/migration-prototool/)にbufとの違いが記載されています。

一番大きいところでいうと、bufは現在、フォーマッターがありません。

Prototoolでは、 `prototool format` でフォーマットされます。

しかしながら、prototoolには大きな欠点があります。

PrototoolはサードパーティのProtobuf Parserを使用する一方で、ファイルが有効であるかを確認するために、さらにシェル化します。

ユースケースとしては、特定の proto ファイルだけが変更されて配布されてしまった場合に全体的なAPIで不整合が起こったりするのをbufで多少防げるようになります。

上記に記載しましたが、FileDescriptorSetsを介することによってprotoのバージョンに依存しないschemaの管理が出来、またbufを介した上でのprotocが保証されているのが、bufのメリットの一部です。

### bufの導入

日本語の資料が少なく、公式ドキュメントも十分でないため、参考文献を交えて、話を進めていきます。

Homebrewでインストールが可能です。

```shellscript
brew tap bufbuild/buf
brew install buf
```

### Directory構成

```
/
├── Makefile     秘伝のMakefile
├── Dockerfile   コンパイル用のDockerfile
├── doc          protoについてのドキュメント
├── go           grpcやmock, validateのGoファイル群
├── js           grpc実装用のJS, TSファイル群
├── src          proto定義ファイル群
└──/ tools       コンパイルに必要なツール類
   ├── tools.go  コンパイルに必要なmodule定義
   ├── go.mod    go module
   └── go.sum    go moduleのsum
```

### 秘伝のMakefile

root直下にMakefileを作成します。

```makefile
docker-build: ## docker build
	docker build . -t protogen

protoc: ## wrapping buf-gen to use Docker
	docker run -it --rm -v $$(pwd):$$(pwd) -w $$(pwd) protogen make buf-gen

buf-doc: ## generate doc files
	buf image build -o - | \
	protoc --descriptor_set_in=/dev/stdin \
	--plugin=protoc-gen-doc=${GOPATH}/bin/protoc-gen-doc \
    --doc_out=doc \
    --doc_opt=markdown,README.md \
	$$(buf image build -o - | buf ls-files --input -)

buf-gen: ## generate go files
	buf image build -o - | \
	protoc --descriptor_set_in=/dev/stdin \
	--go_out=go --go-grpc_out=go --validate_out="lang=go:./go" --mock_out=go \
	$$(buf image build -o - | buf ls-files --input -)
	# cp -r go/github.com/abema/yoshikawa/research-buf/go ./
	# rm -r go/github.com

buf-js: ## generate js ts files
	buf image build -o - | \
	protoc --descriptor_set_in=/dev/stdin \
	--grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:js \
    --js_out="import_style=commonjs,binary:js" \
	$$(buf image build -o - | buf ls-files --input -)

buf-lint: ## buf lint proto files
	buf check lint

help: ## Display this help screen
	@grep -E '^[a-zA-Z/_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
```

### コンパイル用のDockerfile

root直下にDockerfileを作成します。

PROTOCのバージョンを固定したいときは、定数を変えてください。

あと、WORKDIRもプロジェクトに合わせて変更が必要です。

```Dockerfile
FROM golang:1.15

# バージョン固定
ENV PROTOC_TAG "3.13.0"

RUN apt-get update && \
    apt-get install -y unzip clang-format && \
    mkdir protoc && cd protoc && \
    wget https://github.com/protocolbuffers/protobuf/releases/download/v${PROTOC_TAG}/protoc-${PROTOC_TAG}-linux-x86_64.zip -O protoc.zip && \
    unzip protoc.zip && \
    mv bin/protoc /usr/bin/protoc

# ここも変更おねがいします
WORKDIR $GOPATH/src/github.com/yoshikawa/research-buf

COPY tools/go.mod .
COPY tools/go.sum .
COPY tools/tools.go .
COPY Makefile .
COPY protoc-wrapper.sh .

RUN go mod download

RUN go install google.golang.org/protobuf/cmd/protoc-gen-go && \
    go install github.com/mwitkow/go-proto-validators/protoc-gen-govalidators && \
    go install github.com/envoyproxy/protoc-gen-validate && \
    go install github.com/srikrsna/protoc-gen-mock && \
    go install github.com/pseudomuto/protoc-gen-doc/cmd/protoc-gen-doc && \
    go install google.golang.org/grpc/cmd/protoc-gen-go-grpc && \
    go install github.com/bufbuild/buf/cmd/buf && \
    go install github.com/bufbuild/buf/cmd/protoc-gen-buf-check-breaking && \
    go install github.com/bufbuild/buf/cmd/protoc-gen-buf-check-lint

ENV PATH $PATH:$GOROOT:$GOPATH:$GOBIN:$GOPATH/protoc/bin:/go/bin
```

### buf.yamlの書き方

上記のように、buildのrootsをエントリーポイント（protoが定義されている箇所）として設定します。

```yaml
# buf.yaml
build:
  roots:
  - src
lint:
  use:
  - STYLE_BASIC
  except:
  - ONEOF_LOWER_SNAKE_CASE
  - PACKAGE_LOWER_SNAKE_CASE
```

### Goファイルの生成

```
/
├── Makefile     秘伝のMakefile
├── Dockerfile   コンパイル用のDockerfile
├── doc          protoについてのドキュメント
├── go           grpcやmock, validateのGoファイル群
├── js           grpc実装用のJS, TSファイル群
├── src          proto定義ファイル群
└──/ tools       コンパイルに必要なツール類
   ├── tools.go  コンパイルに必要なmodule定義
   ├── go.mod    go module
   └── go.sum    go moduleのsum
```

MakefileとDockerfileを設置して生成していきましょう。

また、**tools/tools.goを作成して、 go.modなどを作成することで、コンパイルを可能にします。**

```go
// tools/tools.go
package tools

import (
	_ "github.com/grpc-ecosystem/grpc-gateway/protoc-gen-grpc-gateway"
	_ "github.com/grpc-ecosystem/grpc-gateway/protoc-gen-swagger"
	_ "github.com/mwitkow/go-proto-validators"
	_ "github.com/pseudomuto/protoc-gen-doc/cmd/protoc-gen-doc"
	_ "google.golang.org/grpc/cmd/protoc-gen-go-grpc"
	_ "google.golang.org/protobuf/cmd/protoc-gen-go"
)
```

`make docker-build && make protoc` または Dockerを使用しない場合は、`make buf-gen` でGoファイルが生成されます。

#### 生成されるGoファイル

```
/
└──/ go                   grpcやmock, validateのGoファイル群
   ├── ○○.pb.go
   ├── ○○.pb.mc.go
   ├── ○○.pb.validate.go
   └── ○○_grpc.pb.go
```

### JavaScript TypeScriptファイルの生成

JavaScript, TypeScriptファイルの生成をしたい場合は、root直下にpackage.jsonを作成します。

```json
// package.json
{
  "name": "proto",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {
    "@improbable-eng/grpc-web": "^0.13.0",
    "google-protobuf": "^3.13.0",
    "grpc-web": "^1.2.1"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

`make buf-js` でJavaScript, TypeScriptファイルが生成されます。

#### 生成されるJS, TSファイル

```
/
└──/ js                     grpc実装用のJS, TSファイル群
   ├── ○○_grpc_web_pb.d.ts
   ├── ○○_grpc_web_pb.js
   ├── ○○_pb.d.ts
   └── ○○_pb.js
```

### Document(Markdown)の生成

`make buf-doc` で `doc/README.md` が生成されます。

#### Lint

bufでlintにGoogle Style Guideを導入します。

すでに、buf.yamlに記載されているので、割愛させていただきます。

詳しくは、[Migration Prototool](https://buf.build/docs/migration-prototool#google)で確認できます。