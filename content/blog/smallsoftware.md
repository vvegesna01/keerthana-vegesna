---
title: Small Software
date: 2026-05-05
description: Building small software is creating a tool that makes your own day 1% better.
tags:
  - personal-essay
  - coding-projects
---
## The Joy of Small, Personal Software: Why I Build for an Audience of One

As a software engineer that got into CS in high school only cause I loved building my own websites and little tools for myself, I find that lately in the era of massive scalable, everything-in-the-cloud platforms, there is a quiet joy in going back to my roots and building software just for me.

Lately, I've been amassing a small collection of projects I like calling *Small Software*. Tools I build with the help of AI, either to learn something or solve a small problem that I have. It's supposed to be for designed specifically for me, and hosted entirely locally on my own machines.

Here's some of the projects I've built from custom chrome extensions to task management apps to a my very own local Letterboxd.

---

### 1. Design Detective: A Chrome Extension for Developers

I found myself constantly opening DevTools just to find a hex code or a font-weight. To solve this, I built a Chrome Extension that identifies styles on hover and allows for one-click copying. It gives me the font styles and weights and everything I need to copy into whatever app I'm building and also lets me easily copy hex codes for colors by hovering over anything on my screen.

Here's some screenshots and if you want to use this yourself, I have instructions in the README.md for this project. 

![DesignDetective](/images/blog/popup_dd.png)

It takes less than 2 mins to download and unpack into your own chrome extensions, so here ya go.

[Link to Github Repo](https://github.com/vvegesna01/Design-Detective) 

![DesignDetective](/images/blog/dd_googlefont.png)

---

### 2. Obsidian Cinephile: Local-First Movie Tracking

One thing about me is I LOVE Obsidian and I also LOVE movies. I actually really do like using Letterboxd but before I discovered Letterboxd, I made a whole database on my Obsidian using the *dataview* and *templater* plugins (Later on Obsidian released a core plugin called *Bases* that made this whole process a lot easier). Then I used the IMDB API to populate movie data like poster, plot info, release date, runtime, etc. 

 Data fetching and synchronization was an interesting challenge. I wrote scripts to pull metadata from movie APIs and format them into Markdown frontmatter. The real trick was using the **Dataview plugin** to create lots of SQL-like queries that generate "Year in Review" dashboards, etc. 

I absolutely love the idea that my watch history is stored in plain text and will be readable 20 years from now. Huge reason I use Obsidian for a lot of my notes, etc. I've always tried out the latest note/task management software starting like 10-12 years ago from Evernote to Notion to Bear. Obsidian just works great for me so far.

![ObsidianMovies](/images/projects/movies.png)

---

### 3. Jot: Keyboard-first Tasks App

Todoist is great and I used it pretty consistently for 6 years I think, but it’s cluttered with features I never use. So I built a mini-clone that mimics its snappy UI but strips away everything except my specific workflow. The main feature I loved about Todoist is just being able to type in priority, due date, any other info. Basically a very keyboard centric flow.

The whole idea was just quick task capture like Bullet Journalling but also having the flexibility to move tasks around. I spend most of my time on my computer anyway so it's really easy to just `Cmd+Shift+K` and braindump any task taking up my focus time. Then once a day I just look through the inbox and plan the task for a particular day, snooze it or delete it. 

![Jot](/images/blog/jot_capture.png)

I used AI to generate the CSS Grid layouts and to debug the complex keyboard shortcut listeners that allow for a mouseless experience.

![Jot](/images/blog/jot_triage.png)

---
### Why Build Local?

I believe that there is an immense value in solving "me" problems. When you own the code, there are no feature requests. If I want a button to be purple or a shortcut to be `Cmd+K`, I just change it. Software that runs on your machine, with your data, is inherently faster and more secure. There’s no login, no subscription, and no "offline mode" because it’s always offline by default.

I have in the past been haunted by deprecated software and I truly carry that fear with me whenever I start really enjoying a product. So now, I just build my own little products and it's so fun.

Building small software isn't about reinventing the wheel, it's really just that the best thing you can create is a tool that makes your own day 1% better.

---

## Other Ideas for Apps I'm working On:
**AI Image Detector Extension**: Shows a little icon on top of images on your web page that have the AI generated metadata watermark.

**Obsidian Pocket Extension**: Basically like Pocket but since I use Obsidian for all my notes I want a web clipper that sorts links, images, and ideas from my browsing into my Obsidian properly. I want to actually be able to consume content intentionally. 

**Readwise Mini-Clone**: Love the idea of getting weekly emails of random Kindle highlights so you are reminded of what you thought was interesting in a book. It's expensive last time I checked and I don't even use the default reader cause I jail broke my Kindle and installed KOReader instead. It has a really nice highlights exporting feature so I want to use that to make a little app that sends me emails of my own highlights every once in a while. I need to figure out the best way to get the updated highlights cause I don't want to have to plug in my Kindle every time and manually upload the txt files.

**System Design Playground**: A little dashboard that lets you see what happens when you scale architecture. I want to be able to increase latency or request per minute and visually see graphs of what happens behind the scenes. Just a fun way for me to learn more about System Design while the market is incredibly bad right now. I do have a great name for this tho, I'm going to call this **Cache-22** lol.


--- 

Oh my god, look at that you read the whole thing! Or maybe you just scrolled all the way to the bottom. Either way, here's a little reward.

Here's Milo being a spoiled little brat sleeping on human beds instead of the 3 custom dog beds he has with his name on it.
![Jot](/images/blog/milo_sleepy.png)