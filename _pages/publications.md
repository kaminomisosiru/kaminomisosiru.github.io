---
layout: page
permalink: /publications/
title: Publications and Presentations
description: Items in reversed chronological order. 
nav: true
lang: en
nav_order: 3
---

<!-- _pages/publications.md -->
<div class="publications">

<h2>Journal Articles</h2>
{% bibliography -q @article --group_by year --group_order descending --sort_by year,month --order descending %}

<h2>International Conferences</h2>
{% bibliography -q @*[pubtype=international]* --group_by year --group_order descending %}

<h2>Domestic Conferences</h2>
{% bibliography -q @*[pubtype=domestic]* --group_by year --group_order descending %}

<h2>Dissertations</h2>
{% bibliography -q @*[pubtype=thesis]* --group_by year --group_order descending %}

</div>
