---
layout: post
title: "Liveblogging OSDI2012 - Tuesday"
date: 2012-10-09 09:30
comments: true
categories: ["blog", "tech"]

---
There are four main sessions today. Looking forward to the Google talk on Spanner. Day 1 was great (including the food, of course). Looking forward to a great second day. I will blog on the talks as much as I can.

<!--more-->

## Distributed Systems and Networking
### [DJoin: Differentially Private Join Queries over Distributed Databases](https://www.usenix.org/conference/osdi12/djoin-differentially-private-join-queries-over-distributed-databases)

Lots of data accumulated everywhere - social networks, hospitals, airlines etc. So how do we make sense out of this distributed set of data. For example, if you are a medical researcher trying to determine outbreak of a disease based on the hospital data and the airline data (by performing a join), then not only is it dangerous to privacy, but may be it will be illegal. 

* Idea 1: give all data to a trusted party - but this may not exist.
* Idea 2: use secure multiparty computation but may talk long
* Idea 3: Use Differential Privacy.


The paper DJoin is about how to enable answering of queries about private data that is spread across multiple different databases. DJoin supports many SQL like queries - which is great for the users. Evidently, the paper uses idea 3. 


## Security

### [Improving Integer Security for Systems with KINT](https://www.usenix.org/conference/osdi12/improving-integer-security-systems)

Because the integers in C don't have unlimited precision, it is possible for them overflow. For example `2^30 * 2^2 = 0`.
This can be exploited by attackers. One of the famous examples is that of the iPhone jailbreak.
Another is the example of logical bugs in linux kernel. There is an OOM killer which assigns scores to processes based on memory usage and then kills the processes with the highest score. 
This can be exploited by malicious code that can take a lot of memory but still not be detected (because by overflow their scores can get evaluated to 0).

It is in fact hard to prevent integer overflows, even if you have unlimited precision (there could be other bugs or it is difficult).

Contributions of KINT:
(1) a case study of 114 bugs in the linux kernel.
(2) KINT: a static analysis tool for C programs used to find the 114 bugs. 

Case study: Linux kernel. The 114 bugs have been confirmed and fixed by developers. Most are memory and logical bugs. 

Writing correct checks is non-trivial. 
KINT has the following modules:
(1) Bound check insertion.
(2) Taint analysis.
(3) Range analysis.
KINT Advocates the use of NaN (instead of 0 when overflow occurs).

Details at http://pdos.csail.mit.edu/kint/

### [Dissent in Numbers: Making Strong Anonymity Scale](https://www.usenix.org/conference/osdi12/strong-scalable-anonymity-safetynet)

Talk about how to scale anonymous communication to large number of users. 

- Tor: The onion router. Tor is not timing analysis resistant. 
- DC-net

Abstract: 
> Current anonymous communication systems make a trade-off between weak anonymity among many nodes, via onion routing, and strong anonymity among few nodes, via DC-nets. We develop novel techniques in Dissent, a practical group anonymity system, to increase by over two orders of magnitude the scalability of strong, traffic analysis resistant approaches. Dissent derives its scalability from a client/server architecture, in which many unreliable clients depend on a smaller and more robust, but administratively decentralized, set of servers. Clients trust only that at least one server in the set is honest, but need not know or choose which server to trust. Unlike the quadratic costs of prior peer-to-peer DC-nets schemes, Dissent’s client/server design makes communication and processing costs linear in the number of clients, and hence in anonymity set size. Further, Dissent’s servers can unilaterally ensure progress, even if clients respond slowly or disconnect at arbitrary times, ensuring robustness against client churn, tail latencies, and DoS attacks. On DeterLab, Dissent scales to 5,000 online participants with latencies as low as 600 milliseconds for 600-client groups. An anonymous Web browsing application also shows that Dissent’s performance suffices for interactive communication within smaller local-area groups.

### [Efficient Patch-based Auditing for Web Application Vulnerabilities](https://www.usenix.org/conference/osdi12/efficient-patch-based-auditing-web-application-vulnerabilities)

Example:GitHub vulnerability publicly announced in March 2012. Once this is known, it is of interest to find out who exploited this vulnerability (detecting past attacks). 
Github didn't audit themselves because detecting past attacks is hard. And there are too many vulnerabilities to check manually.
Approach here is to automate auditing using patches. 
Auditing many request is tough. Auditing one month request may take two months. In their system, auditing can be 12-51x faster than original execution.


## Potpourri

### [Experiences from a Decade of TinyOS Development](https://www.usenix.org/conference/osdi12/experiences-decade-tinyos-development)
**Philip Levis, Stanford University**

1999: Wireless Sensor networks coming up. TinyOS was born. Thirteen years later: 25k downloads
and a worldwide community of developers.

Outline:

- Two design principles for embedded software
- a technical result: static virtualization
- a lesson: avoid the island syndrome

Minimize resource use: RAM, code space, energy. Sleep current necessitates micro-controllers. Advanced apps run into ROM/RAM limits. You really need to structure your code to avoid bugs because debugging is brutally difficult. Once the device is deployed in the wild, its impossible to debug. 

Static virtualization:

- Allocates exact RAM
- no pointers
- cross-call optimization
- dead code elimination
- compile-time certainty.

Everything is allocated statically. Callback functions are specified at compile time rather than run time. 
Two nines of reliability obtained after doing static virtualization.
Apps became highly robust.

Island Syndrome:
TinyOS technically focused on enabling users to build larger, more complex applications. Doing so increased the learning curve to building simple ones!

Code evolved to use nesC features in more complex and intricate ways. Increased barrier to entry: island syndrome. 

Phil Lewis expressed dissatisfaction as to how this has become an island, and that people are instead using other products like Arduino which are very user-friendly. Arduino doesn't even have networking (not sure). Contiki (for the internet of things) seems to be another thing that people are embracing. TinyOS has been academically successful, but people are not using it as much as it has the potential. 

Overall, it was a very good talk.

### [Automated Concurrency-Bug Fixing](https://www.usenix.org/conference/osdi12/automated-concurrency-bug-fixing)

**Guoliang Jin, Wei Zhang, Dongdong Deng, Ben Liblit, and Shan Lu, University of Wisconsin—Madison**

Buggy software is an unfortunate fact. It will be great to automate bug fixing, but thats difficult. 
In multi-core era, we may see more and more concurrency bugs. 

Abstract:
>Concurrency bugs are widespread in multithreaded programs. Fixing them is time-consuming and error-prone. We present CFix, a system that automates the repair of concurrency bugs. CFix works with a wide variety of concurrency-bug detectors. For each failure-inducing interleaving reported by a bug detector, CFix first determines a combination of mutual-exclusion and order relationships that, once enforced, can prevent the buggy interleaving. CFix then uses static analysis and testing to determine where to insert what synchronization operations to force the desired mutual-exclusion and order relationships, with a best effort to avoid deadlocks and excessive performance losses. CFix also simplifies its own patches by merging fixes for related bugs.
Evaluation using four different types of bug detectors and thirteen real-world concurrency-bug cases shows that CFix can successfully patch these cases without causing deadlocks or excessive performance degradation. Patches automatically generated by CFix are of similar quality to those manually written by developers.

### [Spanner: Google’s Globally-Distributed Database](https://www.usenix.org/conference/osdi12/elmo-building-globally-distributed-highly-available-database)


Good start with the host replicating his welcome message twice!

Google is sharding the data to 1000s of machines, across multiple countries in different continents. 
Here is an overview of the talk:

- lock-free distributed read transactions.
- theoretical property: external consistency of distributed transactions (first system at global scale).
- implementation: integration of concurrency control, replication and 2PC
- enabling technology: TrueTime. Exposes uncertainty in the clock by exposing as intervals. 


Why does latency matter? Bing engineers artificially injected delay and saw revenue going down. 

Geo-replication is used by major providers of internet services e.g. Google, Amazon, Facebook. 

Some solutions adopt strong consistency, whereas others eventual consistency. Paxos vs Dynamo, Bayou. 
High latency vs low latency but undesirable behaviors. 
The author is saying that the can guarantee both strong and eventual consistency. They have built a system called gemini. 

I definitely need to take a look at the paper in depth because I couldn't get all the details I wanted to learn from the talk. 

Overall, OSDI conference has been great and got to hear some excellent talks. More importantly, met lots of people from all over the world!