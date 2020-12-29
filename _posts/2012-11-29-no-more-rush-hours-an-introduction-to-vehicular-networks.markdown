---
layout: post
title: "No more rush hours: An introduction to vehicular networks"
date: 2012-11-29 14:53
comments: true
categories: ["tech"]
---

Imagine doing a 70 on a highway on your convertible and imagine the loud music blaring through the wind. Imagine a sunny saturday when you are making your way to the beach, when suddenly your car tells you to slow down. There has been an accident ahead of you and the traffic is going to get to a crawl. As it turns out, some other car in front of you told your car that the traffic is going to slow down and that car came to know from another car ahead it and so on. Imagine cars talking to one another.

<!--more-->

A vehicular network is an ad-hoc wireless networking technology that can be used to form a mobile network between cars and other vehicles, mobile or stationary; and between the vehicles and roadside access points. When I say ad-hoc wireless network, I mean the kind of network that is formed on the spur and the constituent nodes can route information between one another. One can call Vehicular Networks as VANET, and the vehicle-to-vehicle communication as V2V. Vehicle to infrastructure communication is called V2I. Add some brains to a vehicle, it can do a lot of stuff. Add networking and it opens up an amazing range of applications. 

The brains here refers to having a computer or a processor that can run a few set of programs. Consider the following example. Attach an accelerometer and a GPS to a car. When the vehicle lands into a pothole, the accelerometer fires and this can be recorded along with the GPS coordinates. Its now not hard to see that multiple cars will have recorded a spike in the accelerometer readings at about the same GPS coordinates. So if I have access to all these data, I can infer sitting at my desk that there is a pothole at a particular GPS coordinate.  This is precisely what [MIT Pothole Patrol project](http://cartel.csail.mit.edu/doku.php?id=p2_pothole_patrol) accomplishes ([associated paper](http://www.cs.toronto.edu/~delara/courses/csc2228/papers/eriksson.pdf)).

You may ask why do we need vehicular networks?

Let me ask that to you - do we really want to invest time and money in getting cars to talk to one another? Do we really care if a car can figure out that there is another can coming very fast towards the intersection even though it is red? Do we want to have a technology that can potentially save thousands of lives per year? If you are like me, I assume your answer to these questions is an yes. 

When do you think they may be available, you may ask. I don’t know. May be in five years, or in ten years. The automotive industry is slow to respond to innovation, partly because the lives of millions are at stake. And partly because the culture is different. 


There are many safety applications possible. 
For example, detecting fast approaching vehicles at intersections, broadcasting traffic information to other vehicles behind and so on. 
Furthermore, there can be many other non-safety based application possible - such as detecting potholes and sending back the information to a central server. 

Another rising star in the vehicular domain is the Autonomous vehicle - a self-driving car. Such cars do hold a lot of promise - not only in decreasing the accidents, but also in decreasing the congestion in the roads. For one, a family may not need multiple cars, since for example, the car can leave a person to his office and come back to help the spouse. This means less vehicles on the roads, and consequently less congestion. Cars can also communicate with each other to figure out when to accelerate and when to decelerate, and to keep close distance to minimize congestion (for example when the signal turns green the cars can start accelerating faster than if a human were driving so the congestion clears out faster). 

Such applications not just require autonomous driving capabilities - but also the vehicular network. You can think of all sorts of crazy applications now - swarms of cars going together to minimize the wind resistance, thereby getting better fuel economy and so on. 

Autonomous cars, if they become a reality will open up a slew of new applications, and if these cars can talk with one another, will change how humans move around. But for now, I must drink coffee so I don't fall asleep behind the wheel. 