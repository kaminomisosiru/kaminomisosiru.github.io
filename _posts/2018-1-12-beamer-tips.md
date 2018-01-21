---
title: "beamerで使える小技まとめ"
description: "今まで調べた使えるbeamerの小技を貯めておく。随時更新予定"
tags: [tex, beamer, メモ]
---

beamerでやりたいことを検索した中で、使えそうだと思った小技のメモ。

## ナビゲーションシンボルを消す

```tex
% プリアンブル
\setbeamertemplate{navigation symbols}{}
```

## フッターを変更

```tex
% プリアンブル
\setbeamertemplate{footline}[frame number] % フッターはスライド番号のみ
\setbeamerfont{footline}{size=\small,series=\bfseries} % スライド番号を大きく
```

## slide全体の大きさを変える

```tex
% プリアンブル
\geometry{paperwidth=140mm, paperheight=105mm}
```

## frameを分割する

frameに`allowframebreaks`オプションをつけると自動で分割。`\framebreak`を用いると好きな場所で分割。

```tex
\begin{frame}[allowframebreaks]{frame title}
    abcdefg
    \framebreak
    hijklmn
\end{frame}
```

## 分割したframeに連番を付ける

frameを`allowframebreaks`オプションで分割したとき、frame titleの後ろに`[現在の枚数/全枚数]`を付ける。

{% raw %}
```tex
% プリアンブル
\newcounter{cont}
\setbeamertemplate{frametitle continuation}{%
    \setcounter{cont}{\beamer@endpageofframe}%
    \addtocounter{cont}{1}%
    \addtocounter{cont}{-\beamer@startpageofframe}%
    \ifnum \value{cont}>1%
    [\insertcontinuationcount/\arabic{cont}]%
    \fi%
}
```
{% endraw %}

<!--上記の`[\insertcontinuationcount/\arabic{cont}]`を修正すれば表示を変更可能。例えば、`#\insertcontinuationcount`とすれば、`#現在の枚数`が表示される。-->

## frameの左右に余白をつける

```tex
% プリアンブル
\setbeamersize{text margin left=1em,text margin right=1em}
```

## 参考文献リストのアイコンを引用番号に変える

```tex
% プリアンブル
\beamertemplatetextbibitems
```

## 新しいblock環境を作る

{% raw %}
```tex
% プリアンブル
\newenvironment<>{newblock}[1]{%
  \setbeamercolor{block title}{fg=black,bg=white}% titleの文字色と背景色を指定
  \begin{block}#2{#1}}{\end{block}}
```
{% endraw %}

## blockをframeの中央に配置する

minipage環境を使う。

```tex
\begin{frame}{frame title}
    \begin{center}
        \begin{minipage}{8cm}% ここを調節する
            \begin{block}{block title}
                \begin{itemize}
                    \item item1
                    \item item2
                    \item item3
                \end{itemize}
            \end{block}
        \end{minipage}
    \end{center}

\end{frame}
```

## 要素を横並びにする

```tex
\begin{columns}
   \begin{column}{0.45\textwidth}
		...
    \end{column}
    \begin{column}{0.45\textwidth}
		...
    \end{column}
\end{columns}
```

## biblatexで参考文献リストのフォントサイズを変える

```tex
% プリアンブル
\renewcommand*{\bibfont}{\footnotesize}
```