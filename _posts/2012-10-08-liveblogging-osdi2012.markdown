---
layout: post
title: "Liveblogging OSDI2012 - Monday"
date: 2012-10-08 09:55
comments: true
categories: ["blog", "tech"]
---

I am attending [OSDI 2012](https://www.usenix.org/conference/osdi12) here at Hollywood, CA. Lots of interesting papers here and I will try to blog about this event. In particular I am excited about attending Google's spanner talk scheduled for tomorrow afternoon (Tuesday). 

The day didn't begin too well, because I happened to witness a roadside accident. I was on the bus going to the Loews hotel (where the conference is going on), and the bus was waiting on red. It turned green and even before the bus moved ahead, a white Toyota Prius sped to turn left. Another car came dashing on the right of the bus lane because clearly it was green for it and before anybody noticed, there was a boom and a woman shouting - the Prius was hit on its right passenger side door. From what I figured out there was no injury of anybody. Other people were busy and my bus moved on. While this was a stupid accident that could have been avoided, I wish Vehicular Networks were mainstream now. If the Prius had alerted the driver about a car coming towards it, hopefully it wouldn't have turned left prematurely. While clearly, vehicular judgements is not a replacement for poor judgement, stuff happens sometimes and I strongly believe vehicular networks can help in some cases (for example if today the other car was jumping red while say the Toyota was turning left on a green arrow).

Today the talks have been on Big Data, Privacy and Mobility. I am posting as much as I can..

<!--more-->


## Keynote 
The keynote is on cancer genomics. The speaker is David Haussler from UCSC. Here is the abstract:

> Cancer is a complex condition—patients present with thousands of subtypes involving different combinations of DNA mutations. Understanding cancer will require aggregating DNA data from many thousands of cancer genomes, facilitating the statistical power to distinguish patterns in the mutations. The rapidly plummeting cost of DNA sequencing will soon make cancer genome sequencing a widespread clinical practice. To anticipate this, UCSC has built a 5-petabyte database for tumor genomes that will be sequenced through National Cancer Institute projects—the Cancer Genomics Hub—and is tackling the significant computational challenges posed by storing, serving, and interpreting cancer genomics data.

Some of the questions/points raised:

- There is an enormous opportunity to bring big data techniques to cancer genomics. 
- How do we find out mutations from these gene data?
- How to map these mutations to the pathways that lead to cancer, which could possibly help us prevent these cancers.

So looks like UCSC has built a 5 PB data center just for this purpose.

## Flat Datacenter Storage

FDS is a general purpose blob store. 
Here are some of the prominent points to note:

* FDS is simple, scalable blob storage
* distributed metadata management
* Built on a CLOS network with distributed scheduling.
* High read/write performance
* fast failure recovery
* High application performance.

Data is organized as blobs, and each blob has multiple tracts. 

Consists of Tractserver (sits between raw disk and network), Metadataserver
and a client. GFS/Hadoop have the following problems:

- Centralized metadata server
- critical path of reads/writes
- large (coarsely striped) writes

But DHTs require multiple hops to find data and have slow recovery. FDS tries to position itself in between. 
There is a tract location table, that maps for each locator the disks it has to read. 

### CLOS:
Generally we have this tree structure for the DC architecture. FDS provisions as much bandwidth as each disk requires. 
Full bisection bandwidth is only stochastic. Long flows are bad for load balancing. FDS generates a large number of short flows are going to diverse destinations But TCP likes long flows. FDS creates "circuits" using RTS/CTS.

More disks means faster recovery. This is somewhat in contrast with RAID that might take longer to recover when there are more disks. In a cluster with 1000 disks, when one server was failed that had 7 disks with 655GB, the failure took only about 34 seconds (thanks to full bisection bandwidth), which is quite impressive.

### Sorting

Minute Sort was won in 2012 by FDS. Jim Gray's benchmark:
> How much data can you sort in 60 seconds?

In 2009 Yahoo won the benchmark, and last year a team from UCSD. FDS seems to have won hands down compared to the Yahoo results (I think 1400+ TB vs 500 TB). I think UCSD could sort something like 1300+TB, but their main contribution is in disk IO.

One of the things I am concerned is that to provide for such fast read/writes and repair, they have just increased the network bandwidth significantly. Not sure what would be the effect of such improvement in other systems. 


## PowerGraph

Graphs are ubiquitous and are essential for data-mining. Many social network graphs are natural graphs which are derived from natural phenomenon. Existing systems perform poorly on natural graphs mainly because of high-degree vertices and low-quality edge-cuts.
 
The defining characteristic is the power-law degree distribution, which leads to  a "star-like" motif. For example Obama is in the center of Twitter. Things like graph partitioning are difficult when there are high-degree vertices.

The main idea of PowerGraph is
> Split high-degree vertices.

These vertices are now replicated to many vertices with one master and multiple mirrors. Algorithms can run parallel on these vertices. 

There are two existing graph abstractions: Pregel and GraphLab. 
Both of them resort to random placement of vertices - vertices are selected randomly to place onto nodes. PowerGraph uses GAS Decomposition: Gather (reduce), Apply, Scatter.

Albert et al. proved that natural graphs may have good vertex cuts. There is a theorem in the paper that compared to edge-cut, vertex cuts can improve the communication costs. 

Code available at [GraphLab](http://graphlab.org)

## GraphChi

This paper talks on doing large-scale graph computation in a single PC!
Big Graphs are not exactly big data, for example Facebook edge data can be fit in one hard drive (140 billion connections is about 1TB). No problem at all! So the main punchline here is that most algorithms must be able to be run on a single disk. 

Looks like a very promising tool especially when you don't have access to multiple machines. I could probably revisit the Twitter graph analysis using this tool. Running algorithms used to be very difficult, even on small subgraphs of Twitter.

This talk is very similar to the previous one (well mostly in terms of the evaluations).

Code available at [GraphChi](http://graphchi.org)

Note: There doesn't seem to be a good network connection and there are only a few power outlets and my 9 month old macbook pro seems to be draining battery rapidly, so I think live blogging will be replaced by live notetaking.

## Privacy

I strongly believe that the Hails talk speaker has copied my keynote template colors!! :)
He seems to use the same template and the same set of colors - a different shade of red for title and a different shade of blue to highlight things in the text. I had converged on these colors and template after several revisions, so its somewhat spooky that a different user uses almost the same template. I don't remember posting my talk online, so not sure how I lost my privacy!
The main theme of the talk is as follows: Major web
platforms like Facebook depend on third party apps
to deliver a rich experience for mobile phone users.
But users running third party apps don't have much control over what these apps do.
Hails is a new web framework that gives a principled
approach to code confinement so that untrusted code
can be run safely.

The second talk introduced a system called Lacuna. The basic idea is that the current privacy providing features such as using incognito windows are not really privacy providing. Consider an example of somebody browsing a webpage through incognito window. The audio buffer might have some left over data, and similarly the X-Server might have some traces left. The network buffer may also have some data. Lacuna provides **forensic deniability**.

The third talk in this session is about CleanOS.
CleanOS is a new Android based OS design that minimizes amount of sensitive data exposed on device at any time. 
Clean OS brings a new view on data security: minimize and audit exposure of sensitive data to attack. May be applicable to other domains such as Data Centers and web data security.


## Mobility
Two papers here. 

### [COMET: Code offload by Migrating Execution transparently.](https://www.usenix.org/conference/osdi12/toe-transparent-offload-engine) 

What is offloading? Because mobile devices have limited resources, its sometimes a good idea to offload processing to the cloud. 
The main question is whether we can bring network resources to mobile? Few other past works: MAUI, CloneCloud. 
These works follow the 'capture and migrate' paradigm. There are a few areas of improvement:

- thread and sync support
- offloading parts of methods is difficult.

#### Goals:

1. improve mobile computation speed
- no programmaer effort
- generalize well with existing applications
- resist network failures: in mobile networks, connectivity is intermittent. 

#### Distributed Shared Memory:
COMET is offloading + DSM. DSM is generally applied to cluster environments with low latency and high throughput. 
In Munin paper, which was one of the first to do DSM, even writing to a variable might take longer than RTT due to checking with other servers. We want to understand Java memory model. To facilitate migrating, heaps, stacks and locking states are kept consistent across the device and the VM. 

COMET is implemented by extending the Dalvik virtual machine targeted for Android. The system exhibited a speed up of about 2.88X on average on 9 applications. 

### [AppInsight: Mobile App Performance Monitoring in the Wild](https://www.usenix.org/conference/osdi12/appinsight-mobile-app-performance-monitoring-wild)

In today's mobile market, there are at least 1 million apps,
more than than 300k developers and an 
average user uses about 100 apps. 

In fact, there is an app for everything!
But most of the apps are slow. People complain a lot. The speaker showed an example of a restroom finding app with negative reviews like "its too slow when you need it fast". The point here is that there are too many things that could go wrong in all these mobile devices and it is very difficult for the programmers to know. For example, there can be a diverse set of network connectivity, different mobile handsets etc. 

A few questions arise in the mind of the developer. What is the user-perceived delay? Where is the bootleneck? Unforunately, there is only little platform support for monitoring. 

This paper presents AppInsight, automatic app instrumentation. What is great is that it requires zero developer effort. There is no need to check source code, and binary is good. 

Challenges with app instrumentation:

- instrumentation impacts app performance
- limited app resources
- highly asynchronous programming pattern (tracing async code is hard)

System details:

- User Transaction.
- Critical path. If you optimize it, it reduces the overall user perceived delay. 

Analysis: Find the critical paths in user transactions. Also can find the exception path. 

Deployment:

- 30 windows phone apps
- 30 users
- over 4 months of data collected. 

Real world results

- 15% of the user transactions take more than 5 seconds. 
- apps are highly asynchronous.

I think this was one of the best talks today, in terms of the presentation. 