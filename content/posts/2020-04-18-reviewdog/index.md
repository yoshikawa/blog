---
title: 'GitHub Actionsでreviewdogを飼う'
slug: reviewdog
date: 2020-04-18
published: true
unlisted: false
language: jp
cover: ./reviewdog.jpg
imageShare: ./reviewdog.jpg
tags:
  - github
  - reviewdog
---

## GitHub Actions で reviewdog を飼う(Go 言語)

### 参考文献

[reviewdog を飼ってコードレビューや開発を改善しませんか](http://haya14busa.com/reviewdog/)

[GitHub.com - reviewdog/reviewdog](https://github.com/reviewdog/reviewdog)

[GitHub.com - reviewdog/action-golangci-lint](https://github.com/reviewdog/action-golangci-lint)

### 事の発端

lint などのコードチェックをしてくれる便利なツールは、増えてきたが、GitHub の Pull Request などで自分たちのコードを Bot が Auto Check してくれる環境が欲しくて、四苦八苦していた。

研究室や企業で問題視される **コーディングのミス** を最小限にしてくれるツールは、導入すべきである。

なぜかというと、管理者(企業ではマネージャ、研究室では Master, Ph.D.および教授陣)にレビューという無駄とも言えるプロセスが生じる。

レビューは大事だからこそ、機械にやらせようぜ。ってことで、見つけた。

その名は、「reviewdog」。可愛い名前だな。

この時点で気になったら、[参考文献](https://yoshikawa.dev/reviewdog#参考文献)を見てくれ。

### 今回作成したリポジトリ

[GitHub.com - yoshikawa/tcpip](https://github.com/yoshikawa/tcpip)

ここに、reviewdog の [action-golangci-lint](https://github.com/reviewdog/action-golangci-lint) を参考にして、作成したリポジトリを記載しておく。

### 導入

GitHub の token を作成し、リポジトリの secrets に token を登録するのみで、reviewdog を導入することが可能である。

しかも、タダで lint や vet をしてくれる。便利すぎやしないか？

スクリーンショットで導入手順を伝えようと思ったけど、疲れた。

気が向いたら、編集する。

![reviewdog-token](tcpip-reviewdog-token.png)

![add secrets](add-secrets.png)

あとは、`.github/workflows/reviewdog.yml` を作成したりするだけ。

```yml
name: reviewdog
on: [pull_request]
jobs:
  # NOTE: golangci-lint doesn't report multiple errors on the same line from
  # different linters and just report one of the errors?

  golangci-lint:
    name: runner / golangci-lint
    runs-on: ubuntu-latest
    steps:
      - name: Check out code into the Go module directory
        uses: actions/checkout@v1
      - name: golangci-lint
        uses: docker://reviewdog/action-golangci-lint:v1 # Pre-built image
        # uses: reviewdog/action-golangci-lint@v1 # Build with Dockerfile
        # uses: docker://reviewdog/action-golangci-lint:v1.0.2 # Can use specific version.
        # uses: reviewdog/action-golangci-lint@v1.0.2 # Can use specific version.
        with:
          github_token: ${{ secrets.reviewdog_token }}
          # Can pass --config flag to change golangci-lint behavior and target
          # directory.
          golangci_lint_flags: '--config=.github/.golangci.yml ./test'

  golangci-lint-github-pr-review:
    name: runner / golangci-lint (github-pr-review)
    runs-on: ubuntu-latest
    steps:
      - name: Check out code into the Go module directory
        uses: actions/checkout@v1
      - name: golangci-lint w/ github-pr-review
        uses: ./ # Build with Dockerfile
        with:
          github_token: ${{ secrets.github_token }}
          golangci_lint_flags: './test'
          tool_name: 'golangci-lint-github-pr-review'
          reporter: 'github-pr-review'

  golangci-lint-github-check:
    name: runner / golangci-lint (github-check)
    runs-on: ubuntu-latest
    steps:
      - name: Check out code into the Go module directory
        uses: actions/checkout@v1
      - name: golangci-lint w/ github-check
        uses: ./ # Build with Dockerfile
        with:
          github_token: ${{ secrets.github_token }}
          golangci_lint_flags: './test'
          tool_name: 'golangci-lint-github-check'
          level: warning
          reporter: 'github-check'

  # Use golint via golangci-lint binary with "warning" level.
  golint:
    name: runner / golint
    runs-on: ubuntu-latest
    steps:
      - name: Check out code into the Go module directory
        uses: actions/checkout@v1
      - name: golint
        uses: reviewdog/action-golangci-lint@v1
        with:
          github_token: ${{ secrets.reviewdog_token }}
          golangci_lint_flags: '--disable-all -E golint'
          tool_name: golint # Change reporter name.
          level: warning # GitHub Status Check won't become failure with this level.

  golangci-lint-all-in-one:
    name: runner / golangci-lint-all-in-one
    runs-on: ubuntu-latest
    steps:
      - name: Check out code into the Go module directory
        uses: actions/checkout@v1
      - name: golangci-lint (All-In-One config)
        uses: docker://reviewdog/action-golangci-lint:v1
        with:
          github_token: ${{ secrets.github_token }}
          golangci_lint_flags: '--enable-all --exclude-use-default=false ./test'

  govet:
    name: runner / govet
    runs-on: ubuntu-latest
    steps:
      - name: Check out code into the Go module directory
        uses: actions/checkout@v1
      - name: govet
        uses: docker://reviewdog/action-golangci-lint:v1
        with:
          github_token: ${{ secrets.github_token }}
          golangci_lint_flags: '--disable-all -E govet ./test'
          tool_name: govet

  # You can add more and more supported linters with different config.
  errcheck:
    name: runner / errcheck
    runs-on: ubuntu-latest
    steps:
      - name: Check out code into the Go module directory
        uses: actions/checkout@v1
      - name: errcheck
        uses: reviewdog/action-golangci-lint@v1
        with:
          github_token: ${{ secrets.reviewdog_token }}
          golangci_lint_flags: '--disable-all -E errcheck'
          tool_name: errcheck
          level: info

  misspell:
    name: runner / misspell
    runs-on: ubuntu-latest
    steps:
      - name: Check out code into the Go module directory
        uses: actions/checkout@v1
      - name: misspell
        uses: docker://reviewdog/action-golangci-lint:v1
        with:
          github_token: ${{ secrets.github_token }}
          golangci_lint_flags: '--disable-all -E misspell ./test'
          tool_name: misspell
          level: info
```

### Pull Request で確認する

GitHub 上で、Pull Request を作成し、確認する。

[GitHub.com - yoshikawa/tcpip PullRequest #2](https://github.com/yoshikawa/tcpip/pull/2)
