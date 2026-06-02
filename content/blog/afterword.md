---
title: I'm Building an App!
date: 2026-06-02
description: AfterWord - A reading companion that transforms Kindle highlights into a searchable personal knowledge platform.
tags:
  - coding-projects
  - technical
coverImage: /images/projects/afterword.png
---

I read a lot. My books are a chaotic mess of highlighted passages, digital snippets, and sudden realizations that I promise myself I’ll revisit "someday."

But let’s be honest: digital highlights usually go to die. Kindle makes it incredibly tedious to rediscover your own thoughts in any meaningful way. You can export them into a massive, flat text file or scroll endlessly through a tiny sidebar, but actually resurfacing a specific idea right when you need it? Good luck.

I looked into Readwise, which is a phenomenal product that solves this exact loop. BUT the monthly $9.99 is completely out of my budget for this product.

That was the beginning of AfterWord. I wanted to build a personal knowledge library—something that didn't just store my reading history, but actually felt like an extension of my memory.  


## The Fine Art of Project Creep

Like every side project in history, this started with a simple lie: "I'll just parse a few text files and throw them into a database."

Then I wanted basic search. Then I wanted semantic, concept-based search. Then AI-generated summaries, reading analytics, custom highlight cards, user auth, and cloud infrastructure.

Before I knew it, my weekend script had evolved into a fully fleshed-out AI knowledge platform. Because my day-to-day comfort zone is in backend and AI infrastructure, I leaned heavily into the architecture. I ended up building an asynchronous ingestion pipeline to parse and normalize reading data using Celery Workers and Docker first, then switched to using Supabase for better control and security, mapping out vector similarity queries with FastAPI and pgvector, and setting up Redis caching to keep the retrieval latency low.  


Here is a look at how the data actually moves through my system:

```
User uploads My Clippings.txt
        │
        ▼
Storage bucket (with RLS)
        │
        │ 
        ▼
Edge Function: process-highlights

        │
        │ 
        ▼
Edge Function: process-ingestion-chunk

        │
        ▼
    
Tables: books, highlights (queryable)
        │
        │ Direct invocation from frontend
        ▼
Edge Function: search

```

## Learning to Care About Typography

Lately, my focus has shifted entirely away from the backend systems I'm used to. I’ve been spending an intense amount of time on things I didn't expect to obsess over:

Onboarding flows that don't feel like homework.

Empty states that actually guide the user instead of looking broken.

Micro-interactions and typography that make reading on a screen feel cozy.

Shareable highlight cards that look clean and intentional.

As a developer, it's easy to get attached to a beautifully optimized query or an elegant data pipeline. But the reality is simple: nobody cares about your architecture if the app feels confusing to use. A great product requires as much empathy for the user's friction as it does engineering rigor.

## What’s Left to Do

Building this end-to-end has forced me out of my backend bubble. I've had to quickly get comfortable with React Native, front-end design systems, mobile authentication, and app store deployment workflows. Every time I think I’m ready to cross the finish line, I find three more things I need to learn from scratch.

The plan is to launch AfterWord on Web and Android first, and then possibly an iOS version. For the first time, it feels less like a collection of experimental features and more like a cohesive product I actually want to use every single day.  

I’ll be sharing more updates as the launch gets closer. In the meantime, I'm back to tweaking micro-interactions and making sure my reading fonts look exactly right.


Here's a little sneak peak for the dedicated blog post reader:

![AfterWord Sneak Peek](/images/blog/afterword-sneakpeek.png)

This might change significantly after lots of beta testing and surveys and overthinking tho!