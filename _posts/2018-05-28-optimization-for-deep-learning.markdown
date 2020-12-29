---
layout: post
title: "Optimization for Deep Learning"
date: 2018-05-07 08:00
comments: true
published: false
categories: ["tech"]
---

## Optimization setup
Suppose you are interested in solving a real world problem. As usual, we will take the same old boring example that everyone uses: given an image of a digit, you want to determine what digit it is. The way to look at this problem is that there is a function that maps from the input (image of a digit) to the output (what digit is is), and you are interested in learning what that function is, as accurately as possible. Let us denote by $x$ and $y$ the input and the output. If you think the function is linear, then you will be able to write down $y = wx + b$. Note that $x$ and $w$ are both vectors in this case. But if you stare at digits for sometime, you will quickly realize that the relation between the input and the output is anything but linear.

And so you have decided to use a neural network to learn this impossibly difficult to understand non-linear function as best as you can.
Let $g(x, w)% denote the function that intend to learn, where $w$ represent all the weights in the neural network. 

The goal of optimization algorithms (specifically in the context of deep learning) is to help learn the correct set of weights to be used for neural networks.

Let $l(x, y, y')$ be the loss for a sample $(x, y')$ whose true label is $y$. Note that $y' = g(x, w)$, where $g$ is the function learnt by the neural network.

Then the optimization formulation in to determine the correct set of weights $w$ is so solve for this equation.

$$argmin_w E_{(x, y)} [l(x, y, y')]$$

Here, the expectation is taken over the distribution of the data, which we don't have access to. Also, solving for this equation can be difficult. If somehow you have access to this expected value, you may be able to plot it as a function of $w$ to see the landscape of the loss. 

## Optimization in practice
We never solve the above equation to get the true set of weights. What we do instead is use an iterative technique.

Here is a quick summary of how learning occurs in neural networks. During the learning stage, we have access to the predicted output and the correct output (also called label) and we compare these two outputs to figure out how to modify the weights (which are generally initialized randomly at the beginning). The way to compare these values is to compute a metric called `loss`. The loss is then used to compute the `gradients`, which are applied to the weights to get the new weights (these gradients represent which direction the weights should move along).

### Differentiability
Oftentimes, loss is not what we really care about. For example,
in classification problems, we might actually be interested in maximizing
the accuracy rather than minimizing the loss value.

However, it turns out that `accuracy` is not differentiable. And differentiability is important because almost all algorithms rely on it to get the gradients. 



### Batch, mini-batch, ..
You almost never work with a single example at a time. There are two reasons for this: one is that, it is slow in practice, and the second is that it gives biased gradients. Let me explain on that a little bit.



Here the expectation is over the true distribution of data.

Since we don't invariably have access to the true distribution of the data, we normally go with a mean over a whole bunch of samples, to get a reaasasonnably goood estimate of the true gradient. Herefore, using a  single dataa point to cojmpute the 

* What is the objective
* Formulation
* Gradient Descent algorithm
* A note on evolutionary algorithms
* Types of algorithms
	1. Stochastic Gradient Descent.
	2. Adam
	3. RMSprop
	4. Neumann Optimizer
	5. Adagrad


Notes:
Newton's methods are second-order, that is, you have to differentiate the loss
twice. 


