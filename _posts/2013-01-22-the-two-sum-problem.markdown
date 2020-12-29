---
layout: post
title: "The Two-Subset Sum problem"
date: 2013-01-22 17:21
comments: true
categories: ["tech"]
---

One of the classic questions is the two sum problem or the two-subset problem:

	"Given an unsorted integer array A and an integer s, find all the two-tuples that sum up to s"

Lets note a few things here. The question states explicitly that the array is unsorted. And it tells us to find ALL the pairs, not just one. It doesn't say whether the elements are distinct or not. 

There are two ways to tackle the problem. One is to use a longer runtime to save on the space, and the other is to use a slightly bit more storage to run faster. The first method involves sorting the array before searching for the tuples, and the second method involves using a hash table. 

<!-- more -->

## Sorting the array

First assume that there are no duplicate elements. 

Here we will solve the problem by saving on the space and 
running a bit longer. In particular, if the array is of length n, we will use $O(n)$ space, and the runtime will be $O(n\log n)$. Note that the runtime complexity is mainly due to sorting. 

If we don't sort the array initially, a naive algorithm is to check for all pairs, and this will take $O(n^2)$. Can we do better? Yes, by sorting the array first. This will take $O(n\log n)$, but will most importantly will give us the crucial structure that is required for searching the pairs. 

So sort the array first. 

We will consider two locations and check whether the sum of the values at those locations add up to s. Define two integers i and j. We will sweep i from the left to the right, and sweep j from right to the left. So we can see the following three properties:

* i either stays the same or increases. 
* j either stays the same or decreases. 
* i < j. 

Now let us see what to do when sweeping the array. Consider a particular value of i and j. 
If A[i]+A[j]>s, then one can be confident that increasing j will only make things worse, since A[j] will increase. But if A[i]+A[j] < s, we should increment i with the hope that A[i] + A[j] will increase. If the sum matches s we should become happy and print the tuple. We can increment i and also decrement j. Keep doing this to print all the tuples. Since i and j have scanned the entire array together while maintaining i < j, it turns out that this scanning should have taken O(n). Thus, the effective runtime complexity is $O(n\log n)$ (thanks to sorting for helping us while also limiting us).

Now if there are duplicate elements, what do you do? If we actually want to print all duplicate sums, then incrementing i or decrementing j as before at each step might hurt us. For example is s = 8, and if the array is `[2, 2, 4, 5, 6, 6]`, then the above algorithm will not print all the four tuples. 

Let A[i] + A[j] = s. Earlier we jumped to i+1 and j-1 and continued checking. Now note down j0 = j; For all j before j0 (while maintaining j > i), if A[j] is same as A[j0], print A[i] and A[j]. Once you are done, increment i and come back to j. This way, in the above example, with the first 2, both 6 will be printed, and then we can go back to the rightmost 6 and jump to the second 2 and sweep through both the 6s again. Unfortunately, the worst case complexity will be $O(n^2)$.

## Hash based implementation

Hash based implementations can be neat, but they cannot handle duplicates. All you have to do is to put the values in a hash and if s minus that value is also there, then print that tuple. 

The code is given below.  


{% highlight java %}

import java.util.Arrays;
import java.util.*;

class TwoSumProblem {

    public static void main(String args[]) {
        int[] A = {4,0,1,3,2,6,9,21,10,11,5,7};
        int s = 8;
        twoSumProblemSort(A, s);
        System.out.println("--");
        twoSumProblemHash(A, s);
    }

    static void twoSumProblemSort(int[] A, int s) {
    	Arrays.sort(A);
    	int i = 0;
    	int j = A.length - 1;
    	while(i<j) {
    		if(A[i]+A[j]==s) {
    			System.out.println(A[i]+"("+i+"),"+A[j]+"("+j+")");
    			int j0 = j--;
    			while((A[j0]==A[j])&&(j>i)) {
    				System.out.println(A[i]+"("+i+"),"+A[j]+"("+j+")");
    				j--;
    			}
    			j = j0;
    			i++;
    		}
    		else if(A[i] + A[j]>s) {
    			j--;
    		}
    		else {
    			i++;
    		}
    	}
    }

    static void twoSumProblemHash(int[] A, int s) {
    	HashSet<Integer> h = new HashSet<Integer>();
    	int i = 0;
    	while(i < A.length) {
    		if(h.contains(s-A[i])) {
    			System.out.println(A[i]+","+(s-A[i]));
    		}
    		h.add(A[i++]);
    	}
    }
}

{% endhighlight %}

Let me know your thoughts, alternative ways of solving this problem or if you find any bugs!