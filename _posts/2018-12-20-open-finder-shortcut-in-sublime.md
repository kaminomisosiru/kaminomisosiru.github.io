---
title: "SublimeText3に「Finderを開く」ショートカットを設定する"
tags: [SublimeText3]
---

Sublime Text3でコーディングしているときに、ショートカットキーで現在開いているファイルのある場所をFinderで開きたいときがままある。
Projectを開いているときはサイドバーから右クリックメニューを通じて開いていたがめんどくさい。

そこで、「Finderでフォルダを開く」ショートカットを設定したので手順をメモしておく。

1. Package controlから[Open Finder](https://packagecontrol.io/packages/Open%20Finder)をインストールする
2. ```Preference → KeyBindings```を開き、User側の設定ファイルの```[...]```の中に以下を追加する。```Keys```にはお好みのキーバインドを書く。

    ```json
        {
            "keys": ["super+shift+o"],
            "command": "open_finder",
            "args": {}
        }
    ```

3. 設定を保存すれば現在開いているファイルのあるフォルダをFinderで開ける。