---
layout: page
permalink: /publications/
title: 研究業績
description: 業績は年代が新しいものから順に並んでいます。
lang: ja
pubtype: [international, eprint, domestic]
nav: true
nav_order: 3
---

<div class="publications">

{% for t in page.pubtype %}
  {% if t=="international" %}
  <h2 class="pubtype">論文誌、国際会議</h2>
  {% elsif t=="eprint" %}
  <h2 class="pubtype">プレプリント</h2>
  {% else %}
  <h2 class="pubtype">国内会議</h2>
  {% endif %}
  {% bibliography -f papers -q @*[pubtype={{t}}]* %}
{% endfor %}

</div>
