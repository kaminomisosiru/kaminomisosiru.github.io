---
layout: page
permalink: /publications/
title: Publications
description: publications in reversed chronological order.
lang: en
pubtype: [international, eprint, domestic]
nav: true
nav_order: 3
---

<div class="publications">

{% for t in page.pubtype %}
  {% if t=="international" %}
  <h2 class="pubtype">International Journals and Conferences</h2>
  {% elsif t=="eprint" %}
  <h2 class="pubtype">Preprints</h2>
  {% else %}
  <h2 class="pubtype">Domestic Symsioum/Conference/Workshop</h2>
  {% endif %}
  {% bibliography -f papers -q @*[pubtype={{t}}]* %}
{% endfor %}

</div>
