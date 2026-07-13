---
layout: default
title: Notebook
permalink: /notebook/
---

# Independent Research Notebook

This is my personal space for documenting research thoughts, reading notes, and ideas beyond formal coursework. I maintain structured notes connecting theoretical research with practical AI systems.

---

<!-- ## Research Themes

- **Mathematical Foundations**: Real/Complex Analysis, Functional Analysis, Probability Theory, Statistical Inference, Optimization Theory, Convex Analysis
- **Machine Learning & AI**: Statistical Learning Theory, Deep Learning Architectures, Representation Learning, LLMs, Explainable AI, AI Reliability
- **Quantitative Finance**: Mathematical Finance, Stochastic Processes, Financial Modeling, Algorithmic Trading

--- -->

## All Posts

<ul class="post-list">
{% for post in site.posts %}
    <li>
        <span class="post-title">
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </span>
        <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
    </li>
{% endfor %}
</ul>

{% if site.posts.size == 0 %}
<p style="color: #7a7a7a;">No posts yet. Stay tuned for research notes and mathematical derivations.</p>
{% endif %}

<!-- --- -->

<!-- ## Sample Topics Covered

- Optimization dynamics in representation learning
- Geometric analysis of neural network latent spaces
- Mathematical frameworks for interpretable AI
- Connections between convex optimization and deep learning
- Statistical learning theory and generalization bounds -->