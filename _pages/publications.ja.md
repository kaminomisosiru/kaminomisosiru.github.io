---
layout: page
permalink: /publications/
title: 研究業績
description: 業績は年代が新しいものから順に並んでいます。
lang: ja
pubtype: [international, eprint, domestic, thesis]
nav: true
nav_order: 3
---

<div class="publications">

<h2>査読付き国際論文誌</h2>
{% bibliography -q @article --group_by year --group_order descending --sort_by year,month --order descending %}

<h2>査読付き国際会議</h2>
{% bibliography -q @inproceedings[pubtype=international] --group_by year --group_order descending %}

<h2>国内会議</h2>
{% bibliography -q @*[pubtype=domestic]* --group_by year --group_order descending %}

<h2>学位論文</h2>
{% bibliography -q @*[pubtype=thesis]* --group_by year --group_order descending %}

</div>
