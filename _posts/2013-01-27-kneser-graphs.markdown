---
layout: post
title: "Kneser Graphs and the EKR Theorem"
date: 2013-01-27 16:02
comments: true
categories: ["tech"]
---
In the last post, I briefly talked about vertex cover, edge cover, maximum matching and independent sets. The fractional versions of these problems are not too far away from the integral solutions, but this is not the case with the chromatic number (and its dual clique number).  

This is in particular true for Kneser graphs, a very interesting class of graphs. The gap between fractional chromatic number and integral (perfect) chromatic number can be arbitrarily large for Kneser graphs. 

The Kneser graph is defined as follows:

For integers n and k with $$n \ge k$$, all k-subsets of {1, 2, …, n} are considered as vertices. Two vertices are connected if and only if the corresponding vertices do not have any common elements. 

![Kneser graph](http://upload.wikimedia.org/wikipedia/commons/e/e6/Kneser_graph_KG%285%2C2%29.svg)

Figure: The Kneser Graph KG(5,2) isomorphic to the [Petersen graph](http://en.wikipedia.org/wiki/Petersen_graph) (source: [Wikipedia](http://en.wikipedia.org/wiki/Kneser_graph))

<!-- more -->

Kneser, who came up with these graphs, conjectured that the chromatic number is $$n − 2k + 2$$, when $$n \ge 2k-1$$ and this was proved by László Lovász in 1978. In contrast, the fractional chromatic number is $$n/2k$$ (when $$n \ge 2k$$), which explains the gap. Note that the local chromatic number, defined by Erdős, lies in between these two values.

I found this paragraph in [the Wikipedia article on Kneser graphs](http://en.wikipedia.org/wiki/Kneser_graph) very interesting:

> As Kneser (1955) conjectured, the chromatic number of the Kneser graph KGn,k is exactly n − 2k + 2; for instance, the Petersen graph requires three colors in any proper coloring. László Lovász (1978) proved this using topological methods, giving rise to the field of topological combinatorics. Soon thereafter Imre Bárány (1978) gave a simple proof, using the Borsuk–Ulam theorem and a lemma of David Gale, and Greene (2002) won the Morgan Prize for a further simplified but still topological proof. Matoušek (2004) found a purely combinatorial proof.

The rest of the post has nothing to do with chromatic numbers, but I wanted to highlight an interesting theorem called the Erdős-Ko-Rado (EKD) theorem and how it can be used to directly upper bound the independence number of a class of Kneser graphs. 

Erdős-Ko-Rado theorem is the following: 
Consider n, k with $$n \ge 2k$$. Let A be the k-subsets of {1, 2, …, n} such that each pair of these k-subsets intersect. The maximum cardinality of A is given by $${n-1 \choose k-1}$$. 

Lets recall that independent set consists of all edge disjoint vertices. So in Kneser graphs, any independent set consists of vertices such that any two have at least one element in common. This means that maximum size of the independent set, given by the Erdős-Ko-Rado theorem is $${n-1 \choose k-1}$$. But one has to wonder how tight this will be?

For KG(5,2), the independent set has size 4; while using the above upper bound gives us $${4 \choose 1} = 4$$.

