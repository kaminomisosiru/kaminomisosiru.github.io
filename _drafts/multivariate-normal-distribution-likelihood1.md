---
title: "多次元正規分布の最尤推定(準備編)"
description: "授業で学んだパターン認識に関するメモ(以前使っていたブログに投稿していた記事の再アップ)"
tags: [数学, パターン認識, メモ]
---

大学で「パターン認識」という授業を受けていて、その中で多次元正規分布の最尤推定を学んだのだけど、その計算方法や関連する微分の知識がややこしかったのでここにメモしておく。

今回は前提となる微分の知識についてまとめる。

(ネットで調べても多次元正規分布の微分に関する情報は少なかったので誰かの役に立つかも...)

## 記法
+ $$\mathbf{a}$$(小文字の太字)で列ベクトルを、$$\mathbf{A}$$で行列を表す。なおベクトルや行列は積や和が定義できる適切な次元であり、行列は正則であるとする。
+ $$a$$でスカラを表し、添字($$a_i$$や$$A_{i,j}$$)でベクトルや行列の要素を表す。
+ $$\mathbf{a}^\mathrm{T}$$や$$\mathbf{A}^\mathrm{T}$$は転置、$$\mathbf{A}^{-1}$$は逆行列、$$\mathrm{tr}(\mathbf{A})$$はトレース、\|$$\mathbf{A}$$\| は行列式を表す。
+ $$\mathbf{O}$$を零行列、$$\mathbf{I}$$を単位行列とする。

## ベクトルの微分

### ベクトルに対するスカラでの微分
各要素を微分すればOK。結果は**ベクトル**になる。

$$
\left( \frac{\partial \mathbf{a}}{\partial x} \right)_i = \frac{\partial a_i}{\partial x}
$$

###  スカラに対するベクトルでの微分
スカラをベクトルの各要素で微分する。結果は**ベクトル**になる。

$$
    \left( \frac{\partial x}{\partial \mathbf{a}} \right)_i = \frac{\partial x}{\partial a_i}
$$

###  ベクトルに対するベクトルでの微分
上2つを組み合わせて考えれば良い。結果は**行列**になる。
$$
    \left( \frac{\partial \mathbf{b}}{\partial \mathbf{a}} \right)_{i,j} = \frac{\partial b_i}{\partial a_j}
$$

### 内積に対するベクトルでの微分
成分計算をして求めてみると次のようになる。

$$
\begin{align}
\left( \frac{\partial \mathbf{a}^{\mathrm{T}}\mathbf{b}}{\partial \mathbf{a}} \right)_{i} &=  \frac{\partial}{\partial a_i} \sum_{i}a_i b_i \\
&= b_i
\end{align}
$$

よって

$$
\frac{\partial \mathbf{a}^{\mathrm{T}}\mathbf{b}}{\partial \mathbf{a}} = \mathbf{b}
$$

## 行列を微分

### 行列に対するスカラでの微分
行列の各成分をスカラで微分すればよい。結果は**行列**

$$
\left( \frac{\partial \mathbf{A}}{\partial x} \right)_{i,j} = \frac{\partial \mathbf{A}_{i,j}}{\partial x}
$$

### 行列の積に対するスカラでの微分
積の微分法ぽくなる。結果は**行列**

$$
\frac{\partial \mathbf{AB}}{\partial x} = \frac{\partial \mathbf{A}}{\partial x} \mathbf{B} + \mathbf{A}\frac{\partial \mathbf{B}}{\partial x}
$$

### 逆行列に対するスカラでの微分
逆行列の性質$$\mathbf{A}\mathbf{A}^{-1} = \mathbf{I}$$と上の行列の積の微分を使う。

$$
\frac{\partial \mathbf{A}\mathbf{A}^{-1}}{\partial x} = \frac{\partial \mathbf{A}}{\partial x} \mathbf{A}^{-1} + \mathbf{A}\frac{\partial \mathbf{A}^{-1}}{\partial x}
$$

及び

$$
\frac{\partial \mathbf{I}}{\partial x} = \mathbf{O}
$$

より

$$
\begin{align}
\frac{\partial \mathbf{A}}{\partial x} \mathbf{A}^{-1} + \mathbf{A}\frac{\partial \mathbf{A}^{-1}}{\partial x} = \mathbf{O} \\
\mathbf{A}\frac{\partial \mathbf{A}^{-1}}{\partial x} = -\frac{\partial \mathbf{A}}{\partial x} \mathbf{A}^{-1} \\
\frac{\partial \mathbf{A}^{-1}}{\partial x} = -\mathbf{A}^{-1}\frac{\partial \mathbf{A}}{\partial x} \mathbf{A}^{-1} \\
\end{align}
$$

## 行列での微分
行列での微分は計算が複雑になる。成分計算や上の結果を駆使して頑張る。

### トレースに対する行列での微分
トレースを成分表示して微分する。

$$
\begin{align}
\left(\frac{\partial}{\partial \mathbf{A}}\mathrm{tr}(\mathbf{AB}) \right)_{i,j} &= \frac{\partial}{\partial A_{i,j}} \sum_i \sum_j A_{i,j}B_{j, i} \\
&= B_{j ,i}
\end{align}
$$

よって

$$
\frac{\partial}{\partial \mathbf{A}}\mathrm{tr}(\mathbf{AB})  = \mathbf{B}^\mathrm{T}
$$

ちなみに

$$
\frac{\partial}{\partial \mathbf{A}}\mathrm{tr}(\mathbf{A})  =\frac{\partial}{\partial \mathbf{A}}\sum_iA_{i,i} =  \mathbf{I}
$$

### 行列式に対する行列での微分
余因子展開を用いて成分で表して微分する。

$$
\begin{align}
\left(\frac{\partial}{\partial \mathbf{A}} |\mathbf{A}| \right)_{i,j} &= \frac{\partial}{\partial A_{i,j}} \sum_j A_{i,j}C_{i,j} \\
&= C_{i,j}
\end{align}
$$

上式で$$C_{i,j}$$は$$(i,j)-$$余因子である。ところでクラメルの法則により

$$
C_{i,j} = \{|\mathbf{A}|(\mathbf{A}^{-1})^\mathrm{T}\}_{i,j}
$$

上記の結果をまとめると

$$
\frac{\partial}{\partial \mathbf{A}} |\mathbf{A}| = |\mathbf{A}|(\mathbf{A}^{-1})^\mathrm{T}
$$

### 行列式の対数に対する行列での微分
合成関数の微分と上の結果を使う。

$$
\begin{align}
\left(\frac{\partial}{\partial \mathbf{A}} \log(|\mathbf{A}|)\right)_{i,j} &= \frac{1}{|\mathbf{A}|}\left(\frac{\partial}{\partial \mathbf{A}} |\mathbf{A}| \right)_{i,j}\\
&= \frac{1}{|\mathbf{A}|}\{|\mathbf{A}|(\mathbf{A}^{-1})^\mathrm{T}\}_{i,j} \\
&= \{(\mathbf{A}^{-1})^\mathrm{T}\}_{i,j}
\end{align}
$$

よって

$$
\frac{\partial}{\partial \mathbf{A}} \log(|\mathbf{A}|) = (\mathbf{A}^{-1})^\mathrm{T}
$$

## 多次元正規分布を微分するための準備
ここでは多次元正規分布を微分するために必要となる微分を計算する。

### 2次形式に対するベクトルによる微分
$$
\frac{\partial}{\partial \mathbf{a}} \mathbf{a}^\mathrm{T}\mathbf{B}\mathbf{a}
$$

を計算したい。$$\mathbf{A} = \mathbf{a}^\mathrm{T}, \mathbf{B} = \mathbf{Ba}$$として**行列の積に対するスカラでの微分**を用いると

$$
\begin{align}
\left( \frac{\partial}{\partial \mathbf{a}} \mathbf{a}^\mathrm{T}\mathbf{B}\mathbf{a} \right)_{i} &= \frac{\partial \mathbf{a}^\mathrm{T}}{\partial a_i} \mathbf{Ba} + \mathbf{a}^\mathrm{T}\frac{\partial \mathbf{Ba}}{\partial a_i}
\end{align}
$$

ここで

$$
\frac{\partial \mathbf{a}^\mathrm{T}}{\partial a_i} \mathbf{Ba} = \sum_j \delta_{i,j}\{\mathbf{Ba}\}_{j} = \{\mathbf{Ba}\}_i
$$

($$\delta_{i,j}$$はクロネッカーのデルタ。$$i=j$$のとき$$\delta_{i,j}=1$$、それ以外は$$\delta_{i,j}=0$$となる)

また、

$$
\begin{align}
\frac{\partial}{\partial a_i} \{\mathbf{Ba}\}_{j}
&= \frac{\partial}{\partial a_i} \sum_k B_{j,k}a_k \\
&= \sum_k B_{j,k}\frac{\partial a_k}{\partial a_i} \\
&= \sum_k \delta_{i,k}B_{j,k} = B_{j,i}
\end{align}
$$

より

$$
\begin{align}
\mathbf{a}^\mathrm{T}\frac{\partial \mathbf{Ba}}{\partial a_i} &= \sum_{i}a_iB_{j,i}\\
&= \sum_{i}B_{j,i}a_i\\
&= \{\mathbf{B}^\mathrm{T}\mathbf{a}\}_i
\end{align}
$$

以上より

$$
\left( \frac{\partial}{\partial \mathbf{a}} \mathbf{a}^\mathrm{T}\mathbf{B}\mathbf{a} \right)_{i} = \{\mathbf{Ba}\}_i + \{\mathbf{B}^\mathrm{T}\mathbf{a}\}_i
$$

つまり

$$
\frac{\partial}{\partial \mathbf{a}} \mathbf{a}^\mathrm{T}\mathbf{B}\mathbf{a} = (\mathbf{B} + \mathbf{B}^\mathrm{T})\mathbf{a}
$$

特に$$\mathbf{B}$$が正定値ならば右辺は$$2\mathbf{Ba}$$となる。

### 2次形式に対する行列による微分

$$
\frac{\partial}{\partial \mathbf{B}} \mathbf{a}^\mathrm{T}\mathbf{B}^{-1}\mathbf{a}
$$

を計算したい。

このままでは計算しづらいので、まずは被微分値をトレースに置き換える。

$$\mathbf{a}^\mathrm{T}\mathbf{B}^{-1}\mathbf{a}$$はスカラであるから次の関係が成り立つ。

$$
\begin{align}
\mathbf{a}^\mathrm{T}\mathbf{B}^{-1}\mathbf{a} &= \mathrm{tr}(\mathbf{a}^\mathrm{T}\mathbf{B}^{-1}\mathbf{a}) \\
&= \mathrm{tr}(\mathbf{B}^{-1}\mathbf{a}\mathbf{a}^\mathrm{T})
\end{align}
$$

2つめの等式はトレースについての関係$$\mathrm{tr}(\mathbf{AB})=\mathrm{tr}(\mathbf{BA})$$を使った。

よって被微分値をトレースに置き換えることができた。この値を成分で書き表して微分する。以下では簡単のために$$\mathbf{a}\mathbf{a}^\mathrm{T} = \mathbf{A},\mathbf{B}^{-1} = \mathbf{S}$$とする。

$$
\begin{align}
\frac{\partial}{\partial {B}_{i,j}} \mathrm{tr}(\mathbf{B}^{-1}\mathbf{A}) &= \frac{\partial}{\partial {B}_{i,j}} \sum_{k,l}S_{k,l}A_{l,k} \\
&= \sum_{k,l}\frac{\partial S_{k,l}}{\partial {B}_{i,j}}A_{l,k}
\end{align}
$$

ここで**逆行列の微分**を用いると

$$
\begin{align}
\frac{\partial S_{k,l}}{\partial {B}_{i,j}} &= -\sum_{q,r}S_{k,q}\frac{\partial B_{q,r}}{\partial {B}_{i,j}} S_{r,l}\\
&= -\sum_{q,r}S_{k,q} \delta_{q,i}\delta_{r,j} S_{r,l}\\
&= -S_{k,i}S_{j,l}
\end{align}
$$

よって

$$
\begin{align}
\frac{\partial}{\partial {B}_{i,j}} \mathrm{tr}(\mathbf{B}^{-1}\mathbf{A}) &= -\sum_{k,l}S_{k,i}S_{j,l}A_{l,k} \\
&= -\sum_{k,l} S_{j,l}A_{l,k}S_{k,i}\\
&= -\{\mathbf{S}\mathbf{A}\mathbf{S}\}_{j,i}\\
&= -\{\mathbf{B}^{-1}\mathbf{A}\mathbf{B}^{-1}\}_{j,i}
\end{align}
$$

つまり

$$
\frac{\partial}{\partial \mathbf{B}} \mathbf{a}^\mathrm{T}\mathbf{B}^{-1}\mathbf{a} = (-\mathbf{B}^{-1}\mathbf{a}\mathbf{a}^\mathrm{T}\mathbf{B}^{-1})^{\mathrm{T}}
$$


## おわりに
かなりの分量になってしまった。特に最後の2つは式変形が怪しい部分もありなんとも言えないが結果はあっていると思う。とりあえず多次元正規分布を微分する準備が整った。
次回はこの知識を利用して多次元正規分布(正確には多次元正規分布の対数尤度関数)を平均ベクトルと分散共分散行列で微分して最尤推定を計算してみる。

## 注意
授業で使用している資料と講義で聞いた説明を元に式を書いています。式変形等が間違っているかもしれないのでご注意ください。(個人的なメモとして読んで下さい)

誤りが見つかったら随時修正します。

## 参考サイト
[跡數與行列式的導數](https://ccjou.wordpress.com/2013/06/03/%E8%B7%A1%E6%95%B8%E8%88%87%E8%A1%8C%E5%88%97%E5%BC%8F%E7%9A%84%E5%B0%8E%E6%95%B8/)

[クラシックな機械学習の入門](http://www.r.dl.itc.u-tokyo.ac.jp/~nakagawa/SML1/math1.pdf)

[ベクトルと行列による微分 - 緑茶思考ブログ](http://yusuke-ujitoko.hatenablog.com/entry/2017/05/04/000401)