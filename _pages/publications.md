---
layout: page
permalink: /publications/
title: Publications
description: publications in reversed chronological order.
years: [2021, 2020, 2019, 2018]
pubtype: [international, domestic]
nav: true
---

<div class="publications">

{% for t in page.pubtype %}
  {% if t=="international" %}
  <h2 class="pubtype">Journals, Conferences, and Preprints</h2>
  {% else %}
  <h2 class="pubtype">Domestic Symsioum/Conference/Workshop</h2>
  {% endif %}
  {% bibliography -f papers -q @*[pubtype={{t}}]* %}
{% endfor %}

</div>
