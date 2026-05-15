---
title: Building AI Agents vs Traditional API Design - My Experience
date: 2026-01-15
description: 
tags:
  - technical-learnings
  - software-design
coverImage: /images/blog/aivsapi.jpeg
---

# Building AI Agents vs Traditional API Design - My Experience

_Note: The systems described here are based on real work but I've abstracted implementation details and architecture specifics to protect company IP, the patterns and learnings are real, the particulars are generalized._

---

I came into this Backend Engineer role at an AI startup thinking I'd be building APIs, designing databases, integrating frontend systems, etc. With REST APIs in particular, the model is usually: request in, work happens, response out. Fast, stateless, pretty predictable?

Then I started building an AI agent system using ADKs while adding many layers of complexity each sprint like RAG Knowledge bases and tools calls and my existing approach started disintegrating just as fast lol.

This is roughly how that happened - what I assumed, what broke, and what I learned. This is mostly a log for my own learning and documentation purposes. I really do think it's so fun how there's so much I have to learn about Software Engineering that is not just coding and this blog is an attempt at documenting my journey as I grow into a (hopefully) better SWE :D

---

## take your async and throw it out the window (but then keep a little just in case)

My first instinct was to build the agent API the way I'd built any other API. Endpoint receives a message, calls the LLM, returns the response. Standard stuff.

But under any real load, threads were blocking for 2-4 seconds per request waiting on LLM inference. In a normal service you'd optimize the slow operation. Here the slow operation _is the product_, you can't make LLM inference fast enough to treat it as a normal blocking call. 

I realized that async wasn't something I could retrofit. If the core operation takes 2-4 seconds and you want to handle concurrent users, you have to design around that latency from the start. The concurrency model, the request lifecycle, how you hold connections open, all of it flows from that constraint. 

Lesson one: **in agent systems, latency isn't a always performance metric to optimize. It's a design constraint to architect around.** 

---

## state management but make it agent history

![State_Mgmt](/images/blog/but_I_like_this.jpg)

Once async was sorted, the next thing that tripped me up was state management. I was used to stateless services. Request comes in, you read from a DB, you return a response. No server-side state per user. Clean, scalable, easy to reason about.

Conversational agents don't work that way. The conversation history _has_ to travel with every LLM call cause the model has no memory between requests, so your system has to be its memory (as of me working on this). And you want that context to travel for the entire request ideally. Every turn appends to it. By turn 10 of a conversation you're passing a non-trivial amount of tokens on every single call, which directly affects both latency and cost.

I initially reached for a simple DB backed session store. That kinda worked? but then I had to consider a bunch of other things like: _when does a session start? When does it end? What gets kept and what gets discarded?_  There are more ways to optimize this like using tool calls and writing better `Agent Instructions` that the Google ADK does allow for. This was especially a difficult problem to solve because I was working with Voice Agents that already had some overhead with performing STT (Speech to Text) and TTS (Text to Speech) every time. So for example, storing context meant waiting for the STT to be handled so I could use the transcripts for state management.

In a traditional API, there's no session boundary to define so getting that boundary wrong with LLMs would corrupt the agent's context in a way that's subtle and hard to trace. We had test sessions (ephemeral, used while iterating on the agent config) and production sessions (persistent, tied to each fire up). 

Defining session lifecycle explicitly, first, was something I hadn't done before. It's not super complicated, but it's the kind of thing traditional API design just doesn't force you to think about.

--- 

## friendship over with stack trace, now the LLM is my best friend

^ not really tho, actually just do both

Error handling with APIs is pretty straight forward, something fails, you get a status code, you log it, you retry or alert. With LLMs, errors operate at multiple levels and they don't all surface the same way.

The obvious level: provider errors. Rate limits, timeouts, network failures. These look familiar but behave differently, provider throttling sometimes manifests as partial responses or slow-draining streams rather than clean error codes. I learned to not fully trust the HTTP status code and to look at the response shape too.

Lowkey, the way I debugged this at first was making sure there was a lot of separation (very minute) between the different layers of the process like tool calls, knowledge base accesses, ADK calls, agent creation and logging all of those functions so I could kind of see how the LLM call was moving through my code. This was also helpful to figure out latency issues later (I added monitoring so I could see which of these functions were taking up the most time). It's still a black box though and I found it difficult to isolate the latency sometimes when all other variables were accounted for and I was still waiting on the agent to respond.

What I did was essentially to propagate the exception up. That worked? but it meant losing the whole turn and the context. I later found that returning structured error context _back to the agent_ could've worked better, the model could reason about the failure and try a different approach? That's something I hadn't considered before, the "error handler" being the LLM itself. 

Essentially to avoid these problems the way to go about error handling and observability with agent systems is to capture the model's context too and not just the code execution path.

---

## scaling with agents was a tad more complicated

In every previous service I'd worked on, scaling was roughly proportional to request volume. More requests usually means more compute.

Agent systems don't scale that way, because a single user interaction can hold resources for wildly different amounts of time depending on how many tool calls the agent makes, how long the conversation runs, and how big the context window gets. Request count shouldn't be the only predictor of load. Auto scaling services were a huge lifesaver here still. 

The system I was working on had an interesting problem though: we needed to ensure a certain number of concurrent operations could run at any given time, without over-committing resources across multiple running processes. The brute force approach would've just been to cap requests at the load balancer. But this doesn't account for the fact that some requests last seconds and others last minutes.

So I ended up working through a two-tier concurrency model: a system-level limit enforced globally, and a per-process limit enforced locally. Each tier checked headroom before doing work. It added complexity I wouldn't have needed in a standard API service, but it was necessary because the per-operation resource consumption was both high and variable in a way that request rate alone couldn't capture. There was a lot more complication with this, and was a hard problem for me to wrap my head around and solve but I'm not going to go into more specifics about particular technologies and architectures on this very public website.

---

## Reflections?

Looking back, most of the friction came from defaulting to patterns that worked fine in deterministic, low-latency, stateless systems only realizing once something broke. This is part of being an engineer at an early stage startup tho when your product requirements are a bit more malleable. To give myself some benefit of the doubt tho, I'm just a junior swe y'all.

I guess the main thing is that the LLM is not a fast service call you happen to be making. It's a slow, stateful, non-deterministic collaborator you're building infrastructure around. Designing agent systems around this framing, making decisions about async models, session management, error handling, and observability became a bit easier to handle. Although I gained most familiarity with Google's ADK, the patterns do generalize because the root cause is always the same: **LLM inference is slow, stateful in a weird, and non-deterministic way and traditional API design assumes none of those things.**

It's hard to keep up in this field though because there's so many innovations week to week and sometimes models and LLMs are deprecated while you're working on them. But as a learning experience, it is still really fun to break out of the generic protocols we're used to with backend engineering and try to come up with interesting solutions to new problems.