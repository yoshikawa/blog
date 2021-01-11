---
title: 'Rubyを学ぶ3日目'
slug: basic3-ruby
date: 2018-09-11
published: true
unlisted: false
language: ja
cover: ../2018-09-06-ruby/ruby.jpg
imageShare: ../2018-09-06-ruby/ruby.jpg
tags:
  - ruby
---

## Ruby を学ぶ 3 日目

- [Ruby を学ぶ 3 日目](#ruby%E3%82%92%E5%AD%A6%E3%81%B6-3%E6%97%A5%E7%9B%AE)
- [前回の記事](#%E5%89%8D%E5%9B%9E%E3%81%AE%E8%A8%98%E4%BA%8B)
- [論理演算子](#%E8%AB%96%E7%90%86%E6%BC%94%E7%AE%97%E5%AD%90)
- [メソッドの定義](#%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89%E3%81%AE%E5%AE%9A%E7%BE%A9)
- [Fizz Buzz 問題](#fizz-buzz-%E5%95%8F%E9%A1%8C)
- [Minitest の基本](#minitest-%E3%81%AE%E5%9F%BA%E6%9C%AC)
- [Minitest 以外のテスティングフレームワーク](#minitest-%E4%BB%A5%E5%A4%96%E3%81%AE%E3%83%86%E3%82%B9%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E3%83%95%E3%83%AC%E3%83%BC%E3%83%A0%E3%83%AF%E3%83%BC%E3%82%AF)
- [次回の記事](#%E6%AC%A1%E5%9B%9E%E3%81%AE%E8%A8%98%E4%BA%8B)

### 前回の記事

[Ruby を学ぶ 2 日目](https://yoshikawa.dev/basic2-ruby/)

### 論理演算子

`&&`や`||`のような論理演算子を使うと、複数の条件を 1 つにまとめることができます。

`条件1 && 条件2`、条件 1 かつ条件 2

`条件1 || 条件2`、条件 1 または条件 2

### メソッドの定義

Ruby は def を使ってメソッドを定義します。

```ruby
def add(a, b)
  a + b
end
add(1, 2) #=> 3
```

## Fizz Buzz 問題

ここでは、Fizz Buzz 問題を解く

以下の仕様になる。

- 3 で割り切れる数値を引数に渡すと、"Fizz"を返す。
- 5 で割り切れる数値を引数に渡すと、"Buzz"を返す。
- 15 で割り切れる数値を引数に渡すと、”Fizz Buzz”を返す。
- それ以外の数値はその数値を文字列に変えて返す。

```ruby
def fizz_buzz(n)
  if n % 15 == 0
    'Fizz Buzz'
  elsif n % 3 == 0
    'Fizz'
  elsif n % 5 == 0
    'Buzz'
  else
    n.to_s
  end
end
```

### Minitest の基本

```ruby
require 'minitest/autorun'
require './lib/fizz_buzz'

class FizzBuzzTest < Minitest::Test
  def test_fizz_buzz
    assert_equal '1', fizz_buzz(1)
    assert_equal '2', fizz_buzz(2)
    assert_equal 'Fizz', fizz_buzz(3)
  end
end
```

#### Minitest 以外のテスティングフレームワーク

RSpec は独自の DSL を使ってテストコートを書きます。

```ruby
require './lib/fizz_buzz'

RSpec.desctibe 'Fizz Buzz' do
    example 'fizz_buzz' do
        expect(fizz_buzz(1)).to eq '1'
        expect(fizz_buzz(2)).to eq '2'
        expect(fizz_buzz(3)).to eq 'Fizz'
    end
end
```

Ruby のテスティングフレームワークの中で最も歴史が古い、test-unit がある。

Ruby 本体のテストコードも test-unit で書かれています。

```ruby
require 'test/unit'
require './lib/fizz_buzz'

class FizzBuzzTest < Test::Unit::TestCase
  def test_fizz_buzz
    assert_equal '1', fizz_buzz(1)
    assert_equal '2', fizz_buzz(2)
    assert_equal 'Fizz', fizz_buzz(3)
  end
end
```