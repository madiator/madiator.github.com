---
layout: post
title: "Eight Queens Puzzle"
date: 2013-03-29 00:25
comments: true
categories: ["tech"]
---

I came across a very nice puzzle called the Eight Queen Puzzle a few days back. Although, I must agree at the outset that it is somewhat sad that I have not heard this one before. 
  
I came to know about this puzzle through [this random Quora post](http://www.quora.com/How-Was-X-Recruited-to-Facebook/How-was-Kent-Beck-recruited-to-Facebook) that had showed up on my Quora weekly digest. The sentence "25-year-old Prolog skillz to solve 8 Queens" from the post totally did not make any sense to me and so I had to look up what it meant, which led me to come to know about [Prolog](http://en.wikipedia.org/wiki/Prolog) and this puzzle. 

<!-- more -->

I am as time-constrained as you are (I know this is debatable), and so I read what the puzzle was about from [the wikipedia post](http://en.wikipedia.org/wiki/Eight_queens_puzzle) and closed that tab. Surprisingly, I stumbled upon the puzzle again the next day. This time it piqued my interest and here I am, writing this post about it along with the code I implemented. 

The problem goes as follows (taken from Wikipedia):

	"The eight queens puzzle is the problem of placing eight chess queens on an 8×8 chessboard so that no two queens attack each other".
	
Beautiful, isn't it? In fact, the problem can be generalized to any N, *i.e.* we want to place N queens on an NxN board, of course while not making the queens get mad at each other. 

I think there are many ways of solving this puzzle. Looks like there is a very nice succinct implementation using Python (refer to the wikipedia entry), but since I sail smooth in the backwaters of Java, I decided to handle this problem via Java. 

It is fairly straightforward to realize that a brute force solution will be hugely inefficient since there are $64 \choose 8$ possibilities (this might not take long, but this approach does not *scale*). Next it is very clear that since there are N queens and there are N rows (and columns), each queen must be on a different row (column). 

So the way to solve this problem would be to determine the correct location of on each row to place queens. You start with the first row, try to place the queen at the first location in the row, then see whether you can place the remaining queens in the remaining rows. But keep in mind that as soon as you keep a queen, that particular column is also ruled out, and so will the diagonal. Therefore the search space keeps decreasing rapidly. 

You can see that there is a structure to this problem. The template to solve the problem is as follows: for the given row, you try to place the queen on a valid segment, then try to solve the smaller problem of placing the queens in the remaining rows. This leads itself to recursion very nicely. Another advantage of recursion is that backtracking becomes easier. When we hit the last row, it might turn out that none of the positions are valid. Then without any worry, we can revert back to the row before the last, try the next possible position and again test the last row. 

{% highlight java %}

public class EightQueens {
  public static void main(String args[]) {
    int N = 8;
    int[][] board = new int[N][N];
    solve(0, board, N);
    for(int i = 0; i < N; i++) {
      for(int j = 0; j < N; j++) {
        if(board[i][j]==1) System.out.print("Q ");
        else System.out.print("* ");
      }
      System.out.println();
    }
  }

  static boolean solve(int row, int[][] board, int N) {
    if(row>=N) return true;
    for(int position = 0; position < N; position++) {
      if(isValid(board, row, position, N)) {
        board[row][position] = 1;
        if(!solve(row+1, board, N)) {
          board[row][position] = 0;
        } else
          return true;
      }
    }
    return false;
  }

  static boolean isValid(int[][] board, int x, int y, int N) {
    int i, j;
    for(i = 0; i < x; i++)
      if(board[i][y]==1)
        return false;
    i = x - 1;
    j = y - 1;
    while((i>=0)&&(j>=0))
      if(board[i--][j--]==1) return false;
    i = x - 1;
    j = y + 1;
    while((i>=0)&&(j<N))
      if(board[i--][j++]==1) return false;
    return true;
  }
}
{% endhighlight %}

Here is a sample solution for N = 8:

{% highlight shell %}
Q * * * * * * * 
* * * * Q * * * 
* * * * * * * Q 
* * * * * Q * * 
* * Q * * * * * 
* * * * * * Q * 
* Q * * * * * * 
* * * Q * * * * 
{% endhighlight %}

There are many limitations, such as the fact that I am displaying only one solution. That can be handled very easily, by tweaking how the recursion starts. One can also use BitSet or other techniques to reduce the storage space required. Using integers to store 0 or 1 on an NxN grid is indeed wasteful, but I think doing all that will obscure the way the solution is presented. Iterative solutions are possible, too.

I hope you enjoyed this puzzle. If you find any bugs or a better solution or a way to make the program smaller, please let me know. 
