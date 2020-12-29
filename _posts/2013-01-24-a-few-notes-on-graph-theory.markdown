---
layout: post
title: "A few notes on graph theory"
date: 2013-01-24 22:06
comments: true
categories: ["tech"]
---

I would like to summarize very briefly a few of the most basic problems in graph theory. It is my hope to write more about these and about graphs later, so I can refer to this page when required. 

I am assuming here that you know what are graphs and you know the basics of graph theory and about linear programs and integer programs.

Assume that a graph G=(V,E) is given and has n vertices and m edges. 

### Minimum Vertex Cover 
Find the minimum number of vertices required to cover all the edges, *i.e.* each edge should have at least one of its vertices part of the vertex cover. 

This can be written as an integer program. Consider variables $x_u \in \{0, 1\
}$ to indicate whether vertex u has been selected into the vertex cover or not ($x_u = 1$ means the vertex is in the cover, else not). The goal is to minimize the sum of all $x_u$. But we want to make sure that if $e = (u, v) \in E$, then at least one of u or v must be in the cover, so $x_u + x_v \ge 1$. Therefore, the program can be written as:

$$
\begin{align}
\min & \sum_{u=1}^n x_u \\
s.t. & x_u + x_v \ge 1 \qquad \forall e = (u, v) \in E \\
& x_u \in \{0,1\}
\end{align}
$$

<!-- more -->

It is known that the vertex cover problem is [NP-Hard](http://en.wikipedia.org/wiki/NP-hard) and so solving this integer program is also NP-Hard. But if we relax the integrality constraint to allow for fractional solutions (i.e. $0 \le x_u \le 1$), it becomes a general linear program which can be solved in polynomial time. 

$$
\begin{align}
\min & \sum_{u=1}^n x_u \\
s.t. & x_u + x_v \ge 1 \qquad \forall e = (u, v) \in E \\
& x_u \ge 0
\end{align}
$$

The solution to this problem is called Fractional vertex cover. Note here that we don't have to consider $x_u \le 1$ because it is implied.

The solution that we get due to such a relaxation on the integer constraint is often useful. In many problems the difference between the value obtained using this relaxation may not be too bad from the optimal value. And sometimes it may be used to round off values to integers so that one can get a good integer solution. Now let us consider a few more problems.

### Minimum Edge Cover
The minimum number of edges required to cover all the vertices. That is, each vertex should have at least one edge from the cover incident on it. 
The corresponding integer problem is:

$$
\begin{align}
\min & \sum_{e=1}^m y_e \\
s.t. & \sum_{\forall e \ni u} y_e \ge 1 \qquad \forall u \in V \\
& y_e \in \{0,1\}
\end{align}
$$

where $e \ni u$ means that the edge e is incident on u or in other words, u is one of the end vertices of e. 


### Maximum Independent Set
Find the maximum number of vertices that are disjoint in a graph. Consider $x_u$ to be indicator variables as before.

$$
\begin{align}
\max & \sum_{u=1}^n x_u \\
s.t. & x_u + x_v \le 1 \qquad \forall e = (u, v) \in E \\
& x_u \in \{0,1\}
\end{align}
$$


### Maximum Matching
Find the maximum number of edges in a graph such that no two edges share any vertex. 

$$
\begin{align}
\max & \sum_{e=1}^m y_e \\
s.t. & \sum_{\forall e \ni u} y_e \le 1 \qquad \forall u \in V \\
& y_e \in \{0,1\}
\end{align}
$$


The linear programs of minimum vertex cover and max independent set, and those of the minimum edge cover and maximum matching seem similar, but they don’t have much bearing with each other. In fact, minimum vertex cover and maximum matching, and minimum edge cover and maximum independent set are duals. 

On a similar note, it turns out that graph coloring problem and clique problems are duals of each other, though I haven't talked about these in this post. 
