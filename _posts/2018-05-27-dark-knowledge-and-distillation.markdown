---
layout: post
title: "Dark Knowledge and distillation"
date: 2018-05-27 16:00
comments: true
image: assets/images/book.jpg
tags: sticky
categories: ["tech"]
---

Guess what this image contains?

![](https://upload.wikimedia.org/wikipedia/commons/9/9f/Alaskan_Malamute.jpg) 

Most of you will think this is a dog, but a handful may think this is a wolf, and certainly no human readers will guess the above image to contain a car.

Similarly, if I were a well trained neural network who has never seen this image before, I will assign a very high probability for this being a dog, may be a reasonaly low probability for this being a wolf and extremely low probability for this being a car.

Now, hold on to this thought. We will come back to this later but first let's talk about ensembling to improve the performance of machine learning models.

## Ensembling
One way to boost the performance (in terms of accuracy/loss) of a ML system is to ensemble multiple learners instead of a single one. If you are wondering that this is easy and there must be some catch, the catch is that this becomes very costly during serving.

By serving, I mean using the trained model to run predictions in real world. For example, you have trained an image classifier, and now you want to use it to classify images uploaded from your app. In the absence of ensembling you had to invoke one model, but now with ensembling, you have to compute the predictions across many models and then aggregate them.

This will add to your CPU cost, to your memory cost, as well as the latency, and so, for many production systems, ensembling remains a difficult choice.

This where model compression and distillation come in.

## Model compression
Model compression was introduced in KDD 2006 by paper appropriately titled as "Model compression". The goal is to compress large models into smaller models, so as to reduce the serving costs. At that time, large models generally referred to tree based models (e.g. [random forest](https://en.wikipedia.org/wiki/Random_forest) that contain several trees). What a different world it was back then!

Here is a relevant sentence from the paper that summarizes it all:

> Compression works by labeling a large unlabeled data set with the target model, and then training a neural net using the newly labeled data
- [Bucila et. al.](http://www.cs.cornell.edu/~caruana/compression.kdd06.pdf)

The authors then talk about how to generate this large unlabeled dataset using a few techniques.

As an aside, note that this paper was written in 2006 when [TPUs](https://cloud.google.com/tpu/) didn't exist. Large tree based models may not be as well tuned to run on custom hardware as neural networks. They may incur a lot of cost when executing "if else" branching control flow statements, whereas with neural networks, we can replace all of these with very fast matrix multiplications.

## Distillation
Distillation is very similar to model compression and was introduced recently (2014-2015) by [Geoff Hinton](https://en.wikipedia.org/wiki/Geoffrey_Hinton), father of Deep learning. Distillation refers to "distilling" the knowledge from one model to another, usually with the destination model being smaller than the source model. This sounds very much like model compression except that we want to exploit and learn from the "dark knowledge" that the bigger model has learnt.

## Dark Knowledge

Consider again the image classifier that you want to distill. You want to classify whether an image contains a cow, dog, cat, or a car and you have one big model that does this job fairly well (mostly better than humans), and you want to distill this into a smaller model.

We have an image with a dog, and your model correctly predicts it to be a dog. If you are training your compressed model using this prediction, it is not very different from training against the targets.

Instead you could look at the probabilities themselves. But most of these values are almost zero, and so they don't affect the learning much either (you would have used a cross entropy loss to compare the probabilities of the bigger model against the probabilities of the smaller model).

The "model compression" paper tries to overcome this problem by instead considering the logits (these are the values of the output layer that are fed to the softmax to get the probabilities). Herein lies the difference between this paper and Hinton's distillation proposal.

What Hinton does is to "soften" the probabilities to circumvent the above problem.

![slide1](https://photos.smugmug.com/Other/Mindisblown/n-ZCNsj/i-Hb3Qff8/0/4f5f46d5/L/i-Hb3Qff8-L.png)

*(taken from [http://www.ttic.edu/dl/dark14.pdf](http://www.ttic.edu/dl/dark14.pdf))*

If you look at the second row ("output of geometric ensemble" which you consider as the output of the bigger model), you can notice that the probability for dog is pretty high. But hidden in that row is a lot more knowledge. You can see that the probability for cat is low but not as low as cow/car. This makes sense since there are cases when some dogs may look very similar to cats. Also, you can see that the probability of being a car is thousand times lower than the probability of being a cow. All this knowledge that the model has encoded is what Hinton calls as dark knowledge. So instead of just trying to transfer the knowledge that the image is of dog from a bigger to a smaller model, we want to transfer all this dark knowledge as well. Again, since we are dealing with very small numbers, we can soften these values using a temperature term:

![slide2](https://photos.smugmug.com/Other/Mindisblown/n-ZCNsj/i-xb87SXC/0/87f235f2/O/i-xb87SXC.png)

*(taken from [http://www.ttic.edu/dl/dark14.pdf](http://www.ttic.edu/dl/dark14.pdf))*

Now when you are training the smaller model, you compare against the soft targets to derive your loss.