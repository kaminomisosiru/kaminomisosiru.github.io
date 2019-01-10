---
title: "TeXで条件付き確率の条件を縦に並べる"
description: ""
tags: [tex]
---

TeXで条件付き確率の条件式に複数の要素を書きたいときは以下のように`aligned`環境を使う。

```tex
\begin{align}
    \text{Pr}\left[Event \;\middle|\;%
    \begin{aligned}
        A = B\\
        C = D
    \end{aligned}
    \right]
\end{align}
```

出力結果

$$
\begin{align}
    \text{Pr}\left[Event \;\middle|\;%
    \begin{aligned}
        A = B\\
        C = D
    \end{aligned}
    \right]
\end{align}
$$