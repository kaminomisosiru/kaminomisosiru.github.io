---
title: "JekyllでLaTeXの数式を表示する"
description: "MathJaxを使うことでJekyllで作成した記事にLaTeXの数式を用いることができる。"
tags: [jekyll, TeX, メモ]
---

MathJaxを使うことでJekyllで作成した記事にLaTeXの数式を用いることができる。

## 準備

`head`タグ内か`body`の閉じタグの直前に以下を書いてMathJaxを読み込む。

```html
<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
```

## インラインで数式を書く
文章中に`$$〜$$`で囲んだ数式を含めればよい。

例:

```
オイラーの公式は$$e^{i \theta} = \cos \theta + i \sin \theta$$である。
```

出力:

オイラーの公式は$$e^{i \theta} = \cos \theta + i \sin \theta$$である。


## ブロック環境で数式を書く
`$$`で囲んだ数式の前後に改行を入れるとブロック環境になる。

例:

```
オイラーの公式は

$$e^{i \theta} = \cos \theta + i \sin \theta$$

である。
```

出力:

オイラーの公式は

$$e^{i \theta} = \cos \theta + i \sin \theta$$

である。


`\\[〜\\]`内に数式を書いても良い。この場合、`\\[〜\\]`の前後に改行を入れなくて良い。

例:

```
オイラーの公式は
\\[
e^{i \theta} = \cos \theta + i \sin \theta$$
\\]
である。
```

出力:

オイラーの公式は
\\[
e^{i \theta} = \cos \theta + i \sin \theta
\\]
である。

数式を=で揃えたいときは`$$`内に`\begin{align}〜\end{align}`を書く。ただし、`$$〜$$`の前後に改行を入れないとインライン扱いになるので注意。

例:

```
$$
\begin{align}
e^{i \pi} &= \cos \pi + i \sin \pi \\
  &= -1
\end{align}
$$
```

出力:

$$
\begin{align}
e^{i \pi} &= \cos \pi + i \sin \pi \\
  &= -1
\end{align}
$$

## 参考サイト
[Extras | jekyll](https://jekyllrb.com/docs/extras/)

[Jekyll 上での数式の表示](https://sekika.github.io/2015/10/10/equation-on-jekyll/)