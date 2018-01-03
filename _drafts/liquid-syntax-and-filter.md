---
title: "Liquidの文法とFilter"
description: Liquidに関するメモを残しておく
tags: [Jekyll, Liquid, メモ]
---

## Liquidのドキュメント

<a href="https://shopify.github.io/liquid/">Liquid template language</a>

タグや制御構文、filterの使い方はすべて載っている。上のドキュメントは英語なので基本的な構文と使えそうなFilterの説明を日本語で残しておく。

## 変数
`assign`を用いると変数を定義できる。

```liquid
{% raw %}
{% assign string = 'Hello' %}
{% assign age = 40 %}
{% assign array = "apple, orange, banana" | split: "," %}
{% endraw %}
{% assign string = 'Hello' %}
{% assign age = 40 %}
{% assign array = "apple, orange, banana" | split: "," %}
```

## 制御構文

### if文

```
{% raw %}
{% if %}
{% endraw %}
```
