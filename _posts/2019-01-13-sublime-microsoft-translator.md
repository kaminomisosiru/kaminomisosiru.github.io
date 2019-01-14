---
title: "AzureのTranslator Text APIを使ってSublime Text 3の翻訳プラグインを作った"
description: ""
tags: [Sublime Text, Azure]
---

## 作成のきっかけ

普段英語論文を書いていて、単語や英文がわからないとGoogle 翻訳のお世話になっている。
しかし、論文はSublime Textで書いているので、翻訳するためには `ブラウザを開く > Googleで「翻訳」と検索 > 出てきたウィンドウに翻訳したい文を打つ` という手順を踏まなければならず面倒。

翻訳作業をSublime Text上で完結させるために翻訳プラグインを探してみた。

+ [SublimeBingTranslator
](https://packagecontrol.io/packages/Bing%20Translator): Sublime Text 3に対応していない。
+ [Yandex​Translate](https://packagecontrol.io/packages/YandexTranslate): ロシアのサイトに登録してAPI Keyを入手しなければならない。そのサイトがロシア語のため理解できず。
+ [Inline Google Translate](https://packagecontrol.io/packages/Inline%20Google%20Translate): インストールしてみたものの動かず。

調べた限り、使えそうなプラグインが無かった。そこで、翻訳プラグインを自作することにした。

翻訳APIを調べるとMicrosoftのTranslator Text APIは無料枠があったので、これを使ったプラグインを作ることにした。

## 制作物

**[SublimeMicrosoftTranslator](https://github.com/kaminomisosiru/SublimeMicrosoftTranslator)**

詳しい使い方はREADMEを参照。
プラグインを使うためには、各自でAzureに登録してTranslator Text APIを作成し、サブスクリプションキーを取得する必要がある。

翻訳結果を新規ファイルに出力するか、下部のパネルに出力するかを設定で選べるようにしてみた。単語レベルの短い文章は画面下部ですぐに確認できる。

以下、実行例のスクリーンショット。

![実行例1]({{site.baseurl}}/assets/img/SublimeMicrosoftTranslator/usage-1.gif)

![実行例2]({{site.baseurl}}/assets/img/SublimeMicrosoftTranslator/usage-2.gif)

以下にTranslator Text APIの叩き方をまとめておきます。

## Translator Text API

予め、[Microsoft Azure](https://azure.microsoft.com/)に登録し、Translator Text APIのサブスクリプションキーを入手しておく。私は無料のF0プランに登録した。
F0プランでは月に200万文字まで翻訳できる。

APIの詳しい使い方は[Translator Text のドキュメント](https://docs.microsoft.com/ja-jp/azure/cognitive-services/translator/)に載っている。

### サンプルコード

Python 3.7でのサンプルコード。

```python
# coding:utf-8
 
import urllib.request
import json
 
# トークン発行
def get_access_token(key):
    headers = {
        'Ocp-Apim-Subscription-Key': key,
        'Content-Length': 0
    };
 
    req = urllib.request.Request('https://api.cognitive.microsoft.com/sts/v1.0/issueToken', headers=headers, method='POST')
    with urllib.request.urlopen(req) as res:
        body = res.read()
    return body.decode('utf-8')
 
# 翻訳実行
def trenslator(text, _from, to, token):
    headers = {
        'Authorization': 'Bearer ' + token,
        'Content-type': 'application/json'
    }
    url = "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0"
    url = url + '&to=' + to + '&from=' + _from

    body = [{
        'text' : text
    }]
     
    req = urllib.request.Request(url, data=json.dumps(body).encode(), headers=headers, method='POST')
    with urllib.request.urlopen(req) as res:
        response = res.read()
    return json.loads(response.decode('utf-8'))[0]['translations'][0]['text']
 
def main():
    # APIキー
    api_key = '*********:' # APIキー
 
    # 翻訳対象
    text = '*********' # 翻訳する文章
    _from = '**' # 翻訳元の言語
    to = '**' # 翻訳先の言語
 
    token = get_access_token(api_key)
 
    print(trenslator(text, _from, to, token))
 
if __name__ == '__main__':
    main()
```

翻訳する文章と翻訳先言語は必須で、翻訳元の言語は省略可能。`_from`を省略(空に)すると、自動で言語を検出する。
ちなみに、APIにはv3とv2という2つのバージョンがあり、サンプルコードはv3系APIを叩く。
v2系APIは非推奨になっており、2019年4月30日で廃止されるので注意。
