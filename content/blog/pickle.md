---
title: Pickle - Devlog Issue 3
date: 2026-11-21
description: organize your saves across insta, youtube, substack articles, etc - locally.
tags:
  - technical
  - coding-projects
coverImage: /images/projects/pickle_logo.png
---

Okay I'm back with building another app for my own selfish reasons and mostly out of spite of not wanting to pay subscriptions to other apps to steal and use my data.

### The problem

> - I got back on instagram
> - found a lot of cool stuff I wanted to try - workouts, recipes, restaurants, hikes, hardware project stuf, open source apps and websites, etc
> - hated looking at things on my phone so wanted a nice way to organize them and store the links locally for later to look at at my desk
> - therefore, pickle.

![I was actually going to build this for a hackathon but I didn't get in so 💀 had to build it anyway]


This time I built it out p quickly, I spent more time on the screens and mockup design and worked backwards from there. I don't usually do this cause I'm backend focused and start my design work from databases, etc. But with Claude, Antigravity and other tools like this it's been helpful to start from screens first. This is what my screens looked like and I spent a good amount of time reviewing the different flows and adding the functionality I wanted like creating your own collections with custom fields and deciding what info should go on each of the default collections, etc.

![Pickle](/images/blog/pickle.gif)

What I like most is that you can keep your data local if you want by exporting your saved links, etc to your device. That way the knowledge you've collected over the years can stay yours. Of course instagram videos can be taken down and articles may be deleted  but if you fill out the cards with enough info or atleast what's useful to you, you'll be able to keep what's important.

There's a lot of features already like inbox swipes and reminders and more so if you're curious here's the full page showing off all of them: [Start Pickling](https://keethapps.github.io/Pickle/)

This has already proved p useful for me but since I only had a couple hours to work on this so far it's just a vercel hosted web app. I want to complete an expo build so I can have the app show up on the sharesheet so it's a couple less clicks to get the links I want from instagram into the app. I'll be adding that and a couple more improvements/bugs I noticed while testing it this week. 

Otherwise I think a fairly successful build, lots of features I'm planning on like
- reading view for articles links
- auto fill in and suggestions for youtube videos, instagram reels, and others.
- track prices for wishlist items and notify when prices drop.

If you've made it this far, pls star my [github repo](https://github.com/KeethApps/Pickle) cause I've never had one of those graphs with lots of stars and I think that would be cool. 
