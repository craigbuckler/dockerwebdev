---
layout: tag.njk
eleventyExcludeFromCollections: true
pagination:
  data: collections
  size: 1
  alias: tag
  filter:
    - all
    - post
    - taglist
    - undefined
  addAllPagesToCollections: true
eleventyComputed:
  title: "\"{{ tag }}\" pages"
permalink: /tag/{{ tag | normalise }}/
priority: 0.3
---

Pages referencing "{{ tag }}":
