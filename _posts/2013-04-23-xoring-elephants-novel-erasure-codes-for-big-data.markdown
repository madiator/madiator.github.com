---
layout: post
title: "XORing Elephants: Novel Erasure Codes for Big Data"
date: 2013-04-23 23:43
comments: true
image: assets/images/coloredpainting.jpg
categories: ["tech"]
tags: featured
---

This is a post that has been long overdue. 

Our paper, "XORing Elephants: Novel Erasure Codes for Big Data" is now accepted for publication at [VLDB 2013](http://www.vldb.org/2013/). More details about the project, and the paper can be found from the project page: [Xorbas Hadoop System](http://smahesh.com/HadoopUSC/).

![Xorbas](http://photos.smahesh.com/photos/i-kq522gx/0/M/i-kq522gx-M.png)
[Illustration by <a href="http://users.ece.utexas.edu/~dimakis/">Dr. Dimakis</a>]

<!-- more -->

Here is the abstract:

> Distributed storage systems for large clusters typically use replication to provide reliability. Recently, erasure codes have been used to reduce the large storage overhead of three-replicated systems. Reed-Solomon codes are the standard design choice and their high repair cost is often considered an unavoidable price to pay for high storage efficiency and high reliability.

> This paper shows how to overcome this limitation. We present a novel family of erasure codes that are efficiently repairable and offer higher reliability compared to Reed-Solomon codes. We show analytically that our codes are optimal on a recently identified tradeoff between locality and minimum distance.

> We implement our new codes in Hadoop HDFS and compare to a currently deployed HDFS module that uses Reed-Solomon codes. Our modified HDFS implementation shows a reduction of approximately 2x on the repair disk I/O and repair network traffic. The disadvantage of the new coding scheme is that it requires 14% more storage compared to Reed-Solomon codes, an overhead shown to be information theoretically optimal to obtain locality. Because the new codes repair failures faster, this provides higher reliability, which is orders of magnitude higher compared to replication.

Please also take a look at my post on [dummies guide to erasure codes](/dummies-guide-to-erasure-coding) if you are new to the field. 

As you can read from the abstract, the main problem when using erasure codes is that they generate a lot of repair traffic (whereas replication uses a lot of storage). So our codes try to find a middle-ground between the repair traffic and the storage tradeoff. One thing I want to emphasize here is that, in data centers where there are thousands of servers, failure is the norm rather than the exception. Hopefully I will get to talk a little bit more about failures and the amount of repair traffic generated in data centers in a different post. Stay tuned!