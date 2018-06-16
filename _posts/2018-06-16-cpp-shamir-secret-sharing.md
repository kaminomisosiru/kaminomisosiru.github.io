---
title: "Shamirの秘密分散法をC++で書いてみた"
tags: [cryptography, programing, C++]
---

秘密分散とはデータを複数個の分割データ（シェアとよぶ）に分割し、そのうちのいくつかを集めると元のデータを復元できるという暗号技術です。
このとき、各シェアからは元のデータがわからないという特徴があります。

# Shamirの秘密分散法

Shamirの提案した$$(k,n)$$しきい値法は元データを$$n$$個のシェアに分散し、$$k$$個のシェアを用いれば元データを復元できるという方式です。

元データを$$a$$とします。基本的なアイデアは$$a$$を切片に持つような$$k-1$$次多項式を使ってシェアを作成することです。$$r_i$$をランダムに選び、$$n$$個の点$x_i$に対して

$$
	s_i = a + r_1x_i + r_2x_i^{2} + \cdots + r_{k-1}x_i^{k-1}
$$

を計算します。そして、$$(x_i, s_i)$$をシェアとします。

データは次のようにして復元します。シェアの作成には$$k-1$$次多項式を用いているので、$$k$$個の点を集めればラグランジュ補間を用いて元の多項式を完全に復元できます。つまり、ラグランジュ補間を用いて$$x=0$$での値を計算すれば元データである$$a$$を計算できます。
逆に、$$k-1$$個以下のシェアでは多項式を一意に定めることができず、元のデータを復元することはできません。


# C++での実装

C++で書いてみた。
int型を使っているので、$$(k,n)$$の値を大きくするとオーバーフローするので小さな値で試してみる。

ラグランジュ補間のコーソは[C++ - ラグランジュ補間！](https://www.mk-mode.com/octopress/2013/03/10/cpp-interpolate-lagrange/)を参考にした。

```c++
// (k,n)-threshold scheme
#include<iostream>
#include<stdio.h>
#include <random>
#include <vector>
#include <cmath>
using namespace std;

#define prime  65537

void generateShare(vector<int> &share, int k, int n, int data);
double recoveryData(int x[], vector<int> &y, int k);
int f(int coefficient[], int k, int data, int x);

int main(){
    vector<int> share,point;
    int k, n, data;
    double rdata;
    
    k = 5;
    n = 10;
    printf("***(%d,%d)--threshold scheme***\n", k, n);
    data = 12345;
    printf("data=%d\n", data);
    
    generateShare(share, k, n, data);
    int x[] = {2,4,5,6,9};
    rdata = recoveryData(x, share, k);
    printf("recovered data=%lf\n", rdata);
    return 0;
}

void generateShare(vector<int> &share, int k, int n, int data){
    int coefficients[k];

    std::random_device rnd;
    std::mt19937 mt(rnd());
    std::uniform_int_distribution<> rand_(1, prime-1);

    for (int i = 0; i < k; i++) {
        coefficients[i] = rand_(mt);
    }
    for (int i = 0; i < n; i++) {
        share.push_back(f(coefficients, k, data, i+1));
        printf("%d-th share: (%d, %d)\n", i+1,i+1, share[i]);
    }
}

int f(int coefficient[], int k, int data, int x){
    int y = data;
    for (int i=0;i < k-1;i++){
        y += coefficient[i] * pow(x, i+1);
    }
    return y;
}

double recoveryData(int x[], vector<int> &y, int k)
{
    double s, p;
    int i, j;
    int t = 0;
    
    s = 0.0;

    for (i = 0; i < k; i++) {
        p = y[x[i]-1];
        for (j = 0; j < k; j++) {
            if (i != j){
                p *= (double)(t - x[j]) / (double)(x[i] - x[j]);
            }
        }
        s += p;
    }

    return s;
}

```

実行結果

1回目

```
***(5,10)--threshold scheme***
data=12345
1-th share: (1, 167905)
2-th share: (2, 1287645)
3-th share: (3, 5229903)
4-th share: (4, 14914033)
5-th share: (5, 34320405)
6-th share: (6, 68490405)
7-th share: (7, 123526435)
8-th share: (8, 206591913)
9-th share: (9, 325911273)
10-th share: (10, 490769965)
recovered data=12345.000000
```

2回目

```
***(5,10)--threshold scheme***
data=12345
1-th share: (1, 181591)
2-th share: (2, 950141)
3-th share: (3, 2961735)
4-th share: (4, 7028881)
5-th share: (5, 14132855)
6-th share: (6, 25423701)
7-th share: (7, 42220231)
8-th share: (8, 66010025)
9-th share: (9, 98449431)
10-th share: (10, 141363565)
recovered data=12345.000000
```

ちゃんと復元できている。
毎回係数をランダムに変えるので実行するたびに$$s_i$$の値は変化する。