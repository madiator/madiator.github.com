---
layout: post
title: "Life as an MDP"
date: 2012-07-31 03:58
comments: true
categories: ["mind over matter"]
published: true
---


On one particular day when I was working towards a deadline, I ended up doing two things effectively - bunch of simulations on Markov Decision Processes and a debate with my friend about life. And when I was having dinner, it dawned upon me that navigating life is very much like solving a Markov Decision Process (MDP). 

First a disclaimer: I am not going to teach you MDP, nor am I going to model your life as an MDP and solve it. And I am not attempting to teach you how to live your life, like my friend did today.

## States of life
First off, what is an MDP? I have been wanting to write a 'dummies guide to Markov decision processes' (like [this one](/dummies-guide-to-erasure-coding)), but haven't been able to sit down to do so. I will do it, but meanwhile, take a look at the [wiki page](http://en.wikipedia.org/wiki/Markov_decision_process) if you are not familiar. Or better, I will explain it in layman terms (which will be imprecise). The general idea is that there are what are called states of an MDP and at each state you are presented with a set of possible actions. So you want to choose the best action that is good for you in the long run. For example, you may be in a restaurant (state) and you may have the option of going for the pizza or the salad. One option may look pretty good in the short term but not in the long term, and another option may actually be good in the long run even though not so attractive in the short term. Which one would you choose?

## Utility
In the MDP I was working on, there were a few states that were 'good' and I had to backtrack and figure out what action to take so that I will most likely reach one of those states (this statement is imprecise but you get the idea what I am trying to say). But the problem was that it was not very clear how to characterize a state as good or bad and there were a few 'meh' states. So we started assigning numbers to states that will measure how good a state was. And this assignment was done by something called an utility function. We had come up with a utility function and thought it did a fairly good job, but after a few simulations, I started seeing strange behavior. Some of the actions that I thought should be taken, were not being taken. 

So coming back to the topic of life, as I said before, I had a discussion with my good friend about it, or about the lack of it in my case (according to him). He insisted that he was living life well and that I must learn from him. I am always at a struggle with life - to grow, to learn new things and do this and that. I always tend to swim against the current. He is always at ease, and goes along the flow and swims with the current. To me, his life looked mundane and to him my life looked awful. 

## Your mileage may vary
Life is very much like an MDP problem. You have a deadline to live and you start out at zero state. Along the way going from the zero to the last state, at whatever state you are in, you want to choose actions that are best suited for you. What I noticed in the MDP was that the entire course of the path from zero to the last state depended on what utility I assign to the seemingly good states. A slight change and the entire course changed. An action that was optimal before was no more optimal. I just realized that my utility was different from his and that made all the difference. So as long as you choose an utility that will make you happy at the end of it all, your way of life is the right way for you. 