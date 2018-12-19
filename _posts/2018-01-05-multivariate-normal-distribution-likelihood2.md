---
title: "多次元正規分布の最尤推定(計算編)"
description: "授業で学んだパターン認識に関するメモ(以前使っていたブログに投稿していた記事の再アップ)。準備編の続き"
tags: [数学, パターン認識, 大学の授業]
---

## はじめに
前回の記事[多次元正規分布の最尤推定(準備編)]({{ site.baseurl }}{% post_url 2018-01-05-multivariate-normal-distribution-likelihood1 %}
)では多次元正規分布の最尤推定に必要な微分の知識をまとめた。今回は実際に多次元正規分布に従うパターンの最尤推定を計算してみる。

## 多次元正規分布モデルの尤度関数
多次元正規分布 $\mathcal{N}(\mathbf{x} ; \mathbf{\mu}, \mathbf{Σ})$ に対する$d$次元のパターン$\mathbf{x}$の一般形は次式で表される。

$$
q(\mathbf{x} ; \mathbf{\mu}, \mathbf{Σ}) = \frac{1}{(2\pi)^{\frac{d}{2}}\det(Σ)^\frac{1}{2}}\exp\left( -\frac{1}{2}(\mathbf{x}-\mathbf{\mu})^\mathrm{T}\mathbf{Σ}^{-1}(\mathbf{x}-\mathbf{\mu}) \right)
$$

ここで、平均ベクトル$\mathbf{\mu}$は$d$次元の列ベクトル、分散共分散行列$\mathbf{Σ}$は$d\times d$の正定値行列である。そのため$\mathbf{Σ}^\mathrm{T} = \mathbf{Σ}$が成り立つ。
また、$\det(\cdot)$は行列式を表す。

まず、対数尤度関数$\log L(\mathbf{\mu}, \mathbf{Σ})$を計算する。訓練標本を$\{\mathbf{x_i}\}_{i=1}^n$とすると、

$$
\begin{align}
\log L(\mathbf{\mu}, \mathbf{Σ}) &= \sum_{i=1}^n \log q(\mathbf{x}_i ; \mathbf{\mu}, \mathbf{Σ}) \\
&= \sum_{i=1}^n \log \frac{1}{(2\pi)^{\frac{d}{2}}\det(Σ)^\frac{1}{2}}\exp\left( -\frac{1}{2}(\mathbf{x}_i-\mathbf{\mu})^\mathrm{T}\mathbf{Σ}^{-1}(\mathbf{x}_i-\mathbf{\mu}) \right) \\
&= \sum_{i=1}^n \left\{ -\frac{d}{2}\log(2\pi) - \frac{1}{2}\log(\det(\mathbf{Σ})) - \frac{1}{2}(\mathbf{x}_i-\mathbf{\mu})^\mathrm{T}\mathbf{Σ}^{-1}(\mathbf{x}_i-\mathbf{\mu}) \right\} \\
&= -\frac{nd}{2}\log(2\pi) - \frac{n}{2}\log(\det(\mathbf{Σ})) - \frac{1}{2}\sum_{i=1}^n(\mathbf{x}_i-\mathbf{\mu})^\mathrm{T}\mathbf{Σ}^{-1}(\mathbf{x}_i-\mathbf{\mu}) \tag{1}
\end{align}
$$

正規分布モデルでのパラメータの最尤推定値は対数尤度関数を各パラメータで偏微分して極値を求めることで得ることができる。(実際には2次導関数を調べて、尤度関数の極値でのパラメータが大域的最適解になるかを確かめる必要がある。)

## パラメータ$\mathbf{\mu}$の最尤推定値
式(1)を$\mathbf{\mu}$で偏微分した式が$\mathbf{0}$となるような$\hat{\mu}$がパラメータ$\mu$の最尤推定値である。

式(1)を$\mu$で偏微分すると

$$
\begin{align}
\frac{\partial}{\partial \mu} \log L(\mathbf{\mu}, \mathbf{Σ})    &= -\frac{1}{2} \sum_{i=1}^n \frac{\partial}{\partial \mu} (\mathbf{x}_i-\mathbf{\mu})^\mathrm{T}\mathbf{Σ}^{-1}(\mathbf{x}_i-\mathbf{\mu}) \\
&= -\frac{1}{2} \sum_{i=1}^n (-2\mathbf{Σ}(\mathbf{x}_i - \mu)) \\
&= \sum_{i=1}^n\mathbf{Σ}(\mathbf{x}_i - \mu) \tag{2}
\end{align}
$$

ここでは前回計算した次の関係

$$
\begin{align}
\frac{\partial}{\partial \mathbf{a}} \mathbf{a}^\mathrm{T}\mathbf{B}\mathbf{a} &= (\mathbf{B} + \mathbf{B}^\mathrm{T})\mathbf{a} \\
&= 2\mathbf{B}\mathbf{a}\quad(\mathbf{B}^\mathrm{T}=\mathbf{B})
\end{align}
$$

を用いた。

式(2)は$\mu = \hat{\mu}$で$\mathbf{0}$に等しくなるから

$$
\sum_{i=1}^n\mathbf{Σ}(\mathbf{x}_i - \hat{\mu}) = \mathbf{0}
$$

よってパラメータ$\mu$の最尤推定値は

$$
\hat{\mu} = \frac{1}{n}\sum_{i=1}^n \mathbf{x}_i
$$


## パラメータ$\mathbf{Σ}$の最尤推定値
式(1)を$\mathbf{Σ}$で偏微分した式が$\mathbf{O}$(零行列)となるような$Σ$がパラメータ$Σ$の最尤推定値である。これを$\hat{Σ}$とする。

式(1)を$\mathbf{Σ}$で偏微分すると

$$
\begin{align}
\frac{\partial}{\partial \mathbf{Σ}} \log L(\mathbf{\mu}, \mathbf{Σ}) &=  -\frac{n}{2}\frac{\partial}{\partial \mathbf{Σ}}\log(\det(\mathbf{Σ})) -\frac{1}{2} \sum_{i=1}^n \frac{\partial}{\partial \mathbf{Σ}} (\mathbf{x}_i-\mathbf{\mu})^\mathrm{T}\mathbf{Σ}^{-1}(\mathbf{x}_i-\mathbf{\mu}) \\
&= -\frac{n}{2}\mathbf{Σ}^{-1} -\frac{1}{2}\sum_{i=1}^n -\mathbf{Σ}^{-1}(\mathbf{x}_i-\mathbf{\mu})(\mathbf{x}_i-\mathbf{\mu})^\mathrm{T}\mathbf{Σ}^{-1} \tag{3}
\end{align}
$$

ここでは前回計算した次の関係

$$
\begin{align}
\frac{\partial}{\partial \mathbf{A}} \log(\det(\mathbf{A})) &= (\mathbf{A}^{-1})^\mathrm{T} \\
\frac{\partial}{\partial \mathbf{B}} \mathbf{a}^\mathrm{T}\mathbf{B}^{-1}\mathbf{a} &= (-\mathbf{B}^{-1}\mathbf{a}\mathbf{a}^\mathrm{T}\mathbf{B}^{-1})^{\mathrm{T}} \\
\end{align}
$$

を用いた。

式(3)は$\mathbf{Σ} = \hat{\mathbf{Σ}}$で$\mathbf{O}$となるから

$$
\begin{align}
-\frac{n}{2}\hat{\mathbf{Σ}}^{-1} +\frac{1}{2}\sum_{i=1}^n \hat{\mathbf{Σ}}^{-1}(\mathbf{x}_i-\mathbf{\mu})(\mathbf{x}_i-\mathbf{\mu})^\mathrm{T}\hat{\mathbf{Σ}}^{-1} = \mathbf{O} \\
n\hat{\mathbf{Σ}}^{-1} = \sum_{i=1}^n \hat{\mathbf{Σ}}^{-1}(\mathbf{x}_i-\mathbf{\mu})(\mathbf{x}_i-\mathbf{\mu})^\mathrm{T}\hat{\mathbf{Σ}}^{-1} \\
\hat{\mathbf{Σ}} = \frac{1}{n}\sum_{i=1}^n (\mathbf{x}_i-\mathbf{\mu})(\mathbf{x}_i-\mathbf{\mu})^\mathrm{T} \\
\end{align}
$$

よってパラメータ$\mathbf{Σ}$の最尤推定値は

$$
\hat{\mathbf{Σ}} = \frac{1}{n}\sum_{i=1}^n (\mathbf{x}_i-\mathbf{\hat{\mu}})(\mathbf{x}_i-\mathbf{\hat{\mu}})^\mathrm{T}
$$

このとき$\mu$も最尤推定値$\hat{\mu}$となる。


## 参考資料
杉山将（2009）『統計的機械学習 生成モデルに基づくパターン認識』 オーム社