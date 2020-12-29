---
layout: post
title: "Understanding TensorFlow Graph Execution with a Simple Example"
date: 2017-07-10 23:00
comments: true
categories: ["tech"]
---
This post is for absolute beginners. I hope to be able to explain complicated concepts in simple terms to benefit a wider audience (see [dummies guide to erasure coding](/blog/2012/07/01/dummies-guide-to-erasure-coding/) post for a different example). Unfortunately though, you will need to know Python and numpy for understanding the code example below.

### TensorFlow
TensorFlow is a graph based processing framework that is really well suited for building Machine Learning models. I want to show a very simple example that involves TensorFlow’s Variables and Placeholders and illustrate how the graph execution works. 

Note that Tensorflow follows a deferred execution methodology: we initially set up a graph of how the computations should take place and later start the execution. Execution here refers to pumping in data continuously (in batches, more about that later) to the computation graph while tweaking the weights (and of course we generally have a goal in mind while tweaking the weights).

### Simple example
Let's take a small example to make this idea concrete.

Let's say we have a bunch of (x, y) values that satisfy the formula y = ax + b. We know this list of numbers, know the formula, but do not know the values of a and b. The goal is to find out a and b.

The first step is to define a graph. a and b are the weights that we want to compute. When an input x value is given, we want to compute ax + b, and so this requires a multiplication operator and an addition operator. Therefore we define our graph with these two operators.

We can randomly assign some values to a and b, and this will give us a concrete value ax + b when a value of x is given to the graph during execution. We want this value to be equal to the corresponding y. So we can compare this value against the y value and use this to tweak the values of a and b. Gradient Descent is generally used to figure out how to modify these values, but for now, we can assume that TensorFlow knows how to do this. We just have to tell it what our 'loss' is (some function to compare how worse our estimate ax+b is from y), and we can pick an 'optimizer' that does gradient descent. One example of loss would be do take the difference between y and ax+b, and square it.
Strictly speaking, the loss function and the optimizer are picked beforehand when we define the graph.

Coming back to Variables and Placeholders: In TensorFlow parlance, tf.Variable is used to represent trainable variable, such as weights in a Neural Network. tf.Placeholder is used to represent variables that will be used to feed data to the graph.

Let's see the above idea in action.

{% highlight python %}
import tensorflow as tf

# Set up the data.
x_values = np.random.rand(100, 1)
y_values = 2*x_values + 4.0

tf.reset_default_graph()

a_weight = tf.get_variable(name="a", shape=[1])
b_weight = tf.get_variable(name="b", shape=[1])

x_placeholder = tf.placeholder(shape=[1, None], dtype=tf.float32)
y_placeholder = tf.placeholder(shape=[1, None], dtype=tf.float32)

loss = tf.square(x_placeholder * a_weight + b_weight - y_placeholder)
optimizer = tf.train.GradientDescentOptimizer(learning_rate=0.01)
update_op = optimizer.minimize(loss)

init = tf.initialize_all_variables()

# Launch the tensorflow graph
with tf.Session() as sess:
  sess.run(init)
  
  for i in range(1000):
    rand_indices = np.random.randint(len(x_values), size=10)
    rand_x = x_values[rand_index].ravel()
    rand_y = y_values[rand_index].ravel()
    _, a_weight_run, b_weight_run = sess.run(
        [update_op, a_weight, b_weight],
        feed_dict={x_placeholder:[rand_x],
                   y_placeholder: [rand_y]})
    
print a_weight_run, b_weight_run
{% endhighlight %}

In the above example, I have set up a dataset corresponding to the points in a straight line y = ax + b. While you can see from the code that the values of a and b are 2 and 4, assume you didn’t have access to the data generation part and you were just given the data.

Since we want to determine a and b, we define two variables a_weight and b_weight, by using get_variable() of TensorFlow. We then set up placeholders x_placeholder and y_placeholder that will be used to pump data to TensorFlow.
The code pumps 10 randomly selected items of (x, y) each time and TensorFlow tries to determine the weights a_weight and b_weight that minimize the “loss”. Each time, it keeps iterating over its estimate of these weights.


If everything goes well, the above code should print values that are approximately 2 and 4.
