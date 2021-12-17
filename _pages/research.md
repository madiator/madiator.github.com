---
title: "Research"
layout: default
permalink: "/research.html"
---
  <div class="container">
  	<div class="jumbotron jumbotron-fluid jumbotron-home pt-0 pb-0 mt-3 mb-2rem bg-lightblue position-relative">
    <div class="pl-4 pr-0 h-100 tofront">
        <div class="row justify-content-between">
            <div class="col-md-6 pt-6 pb-6 pr-lg-4 align-self-center">
                <h1 class="mb-3">Research</h1>
                My current research interests include recommender systems and large models. Previously, I used to do research in optimizing distributed storage using erasure coding with applicatinos to data centers and vehicular networks.
                <br>
            </div>
            <div class="col-md-6 d-none d-md-block pr-0" style="background-size:cover;background-image:url(assets/images/recsys.png);"></div>
        </div>
    </div>
	</div>
	<div class="jumbotron jumbotron-fluid jumbotron-home pt-0 pb-0 mt-3 mb-2rem position-relative" style="background-color: #f9f8f4;">
    <div class="pl-4 pr-0 h-100 tofront">
        <div class="row justify-content-between">
            <div class="col-md-12 pt-6 pb-6 pr-lg-4 align-self-center">
                <h1 class="mb-3">Publications</h1>
                <ul>
                    <li>Hussein Hazimeh, Zhe Zhao, Aakanksha Chowdhery, Maheswaran Sathiamoorthy, Yihua Chen, Rahul Mazumder, Lichan Hong, Ed H Chi. "DSelect-k: Differentiable Selection in the Mixture of Experts with Applications to Multi-Task Learning". NeurIPS 2021 [<a href="https://arxiv.org/abs/2106.03760">arxiv</a>]</li>
                    <li>Zhe Zhao, Lichan Hong, Li Wei, Jilin Chen, Aniruddh Nath, Shawn Andrews, Aditee Kumthekar, Maheswaran Sathiamoorthy, Xinyang Yi, and Ed Chi. 2019. "Recommending what video to watch next: a multitask ranking system". In Proc. of the 13th ACM Conference on Recommender Systems (RecSys '19). ACM, New York, NY, USA, 43-51. DOI: https://doi.org/10.1145/3298689.3346997 [<a href="https://research.google/pubs/pub49380/">Google</a>]</li>
                    <li>Stephen Macke, Alex Beutel, Tim Kraska, Maheswaran Sathiamoorthy, Derek Zhiyuan Cheng, Ed H. Chi. Lifting the Curse of Multidimensional Data with Learned Existence Indexes. ML for Systems workshop at NeurIPS, 2018. [<a href="https://drive.google.com/file/d/18KqfX-GUVC-v2OwFhEtE2Y9QeRNZjOi4/view">pdf</a>]</li>
                    <li>Maheswaran Sathiamoorthy, Megasthenis Asteris, Dimitris Papailiopoulos, Alex G. Dimakis, Ramkumar Vadali, Scott Chen, Dhruba Borthakur, "XORing Elephants: Novel Erasure Codes for Big Data", VLDB 2013.</li>
                    <li> Maheswaran Sathiamoorthy, Megasthenis Asteris, Dimitris Papailiopoulos, Alexandros G.  Dimakis, Ramkumar Vadali, Scott Chen, Dhruba Borthakur, <a href="http://smahesh.com/HadoopUSC/Xorbas.pdf">"XORing Elephants: Novel Erasure Codes for Big Data"</a>, in <i>Proceedings of the VLDB Endowment, 2013</i>.
	                <br/> <a href="http://smahesh.com/HadoopUSC">Visit the project page.</a></li>
	                <li>Maheswaran Sathiamoorthy, Alexandros G. Dimakis, Bhaskar Krishnamachari, Fan Bai, 
	                  "Distributed Storage Codes Reduce Latency in Vehicular Networks", Accepted for publication, <i>Transactions on Mobile Computing 2013</i>.
	                </li>
	               <li>Joon Ahn, Maheswaran Sathiamoorthy, Bhaskar Krishnamachari, Fan Bai, Lin Zhang, "Optimizing Content Dissemination in Vehicular Networks with Radio Heterogeneity", 
	                Accepted for publication, <i>Transactions on Mobile Computing 2013</i>.</li>
	               <li> Maheswaran Sathiamoorthy, Wei Gao, Bhaskar Krishnamachari, Guohong Cao, 
	               "Minimum Latency Data Diffusion in Intermittently Connected Mobile Networks", 
	               <i>2012 IEEE 75th Vehicular Technology Conference: VTC2012-Spring, 6-9 May 2012, Yokohama, Japan.</i></li>
	               <li>Maheswaran Sathiamoorthy, Alexandros G. Dimakis, Bhaskar Krishnamachari, Fan Bai, 
	               "Distributed Storage Codes Reduce Latency in Vehicular Networks", 
	               <i>Proceedings of the IEEE INFOCOM Mini-conference, 2012</i>.</li>
	               <li>Majed Alresaini, Maheswaran Sathiamoorthy, Bhaskar Krishnamachari, Michael J. Neely, "Backpressure with Adaptive Redundancy (BWAR)", 
	               <i>Proceedings of the IEEE INFOCOM, 2012.</i> </li>
	               <li>Sangwon Lee, Sundeep Pattem, Maheswaran Sathiamoorthy, Bhaskar Krishnamachari, Antonio Ortega,
	               "Spatially-Localized Compressed Sensing and Routing in Multi-Hop Sensor Networks",
	               <i>3rd International Conference on Geosensor Networks}, July 2009, Pages 11-20.</i>  </li>
                </ul>
            </div>
        </div>
    </div>
	</div>  
      <div class="row">
        <div class="span12">
          <h2 class="simpleheading simpleheadingcolored">Coded storage for the cloud (Grad school)</h2>
          <img src="assets/images/hadoop.png" align="right" width="200"/>
           <p>
            This is the age of big data - and being able to manage and utilize big data is a crucial asset for many companies/research centers. <a href="http://hadoop.apache.org/">Hadoop</a> is an open-source platform which is widely used to effectively manage big data across multiple computers in clusters. For example, Facebook has clusters of thousands of computers managing petabytes of data.
         </p>
         <p>
            Due to the sheer number of computers involved in these clusters, failures become the norm rather than the exception
            and so reliability is an important problem that needs to be addressed. The general trend is to replicate the
            data multiple times (invariably thrice) across different machines to provide reliability, but this has the
            cost of additional storage (the storage overhead is 2x if data is replicated three times). When petabyte-scale data has to be replicated
            multiple times, the cost can easily run into millions of dollars - a costly price to pay for reliability.
            An alternative approach to reduce this cost is to make use of erasure coding which has been suggested in the past.
            For example, Facebook uses a (10, 4) Reed-Solomon code in their production clusters for cold data (data which has not been
            used for a few months). Since each file is now stored 1.4x instead of 3x, the storage overhead is 0.4x instead of 2x.
            Facebook, which uses Hadoop to manage its production clusters, has made available an open-source module called HDFS-RAID
            to support erasure coding and this code is available at
            <a href="https://github.com/facebook/hadoop-20">Facebook's Github page</a>.
         </p>
         <p>
            But there is a problem with using regular erasure coding schemes for cloud storage. The issue is that of high
            network utilization during repairs - when data is lost, about 10 times more data has to be downloaded to recover
            the lost data if coding was used. In contrast, if replication was used, the network has to move data only equal
            to the data that was lost. So this attempt to reduce the storage overhead has led to an increase in network
            overhead during repairs. Note that when there are thousands of nodes, tens of nodes typically die everyday.
            When nodes store 10s of TB of data, the network needs to transfer in the orders of PBs of data when ten nodes are lost.
            This is the main reason why Facebook encodes only about 8% of its data (as of Jan 2011, details drawn from one production cluster at Facebook).
         </p>
         <p>
            I am interested in solving precisely this particular problem.  Along with Megas, Dimitris, and advised by Prof. Alex Dimakis,
            and in collaboration with Dhruba Borthakur, Ramkumar Vadali and Scott Chen from Facebook, I have been working on porting new set of codes
            into HDFS-RAID, which is available at my <a href="https://github.com/madiator/hadoop-20" rel="tooltip" title="Source code of our Hadoop">Github page</a>. These codes, which we call
            as locally repairable codes, use much lower network traffic compared to regular erasure codes, while having a small amount of extra
            storage overhead. For example, from our experiments on clusters at Amazon and one test cluster at Facebook, we found that our
            new HDFS-RAID brings in about 2x improvement in network traffic and repair disk I/O as compared to the existing HDFS-RAID.
         </p>
        </div>
        <div class="span12">
          <h2 class="simpleheading simpleheadingcolored">Vehicular Networks (Grad school) <small> No car is an island</small></h2>
          <img src="assets/images/vanet.png" title="A sample application scenario when one vehicle encountering a pothole (black ellipse) informs the other vehicle, which in turn can warn other incoming vehicles." align="right" width="500"/>
          <p>
            Vehicular Networks are no more mere figments of imagination. Not only has there been significant research in this area, but research centers such as General Motors R&D have prototypes for vehicular networking radios. In the United States, the FCC has allocated 75MHz of spectrum in the 5.9GHz band exclusively for vehicular networks and in Europe, the ETSI has allocated a 20MHz range in the same band. These bands enable vehicle-to-vehicle communication as well as vehicle-to-infrastructure (and vice versa) communication, and capabilities like these open up a number of possibilities. Most applications focus on safety, such as avoiding rear-end collisions;extended braking; and detecting and disseminating information about potholes, bumps and other anomalous road conditions. Recently, applications that concern entertainment and file sharing are also receiving attention and involve different challenges.
          </p>
          <p>
            This development, combined with the trend of equipping more and more cars with better digital entertainment systems will cause an explosive increase in the demand for media access from moving vehicles. Since cellular networks are not well-provisioned to handle such huge demand for content and since content access via cellular networks is expensive, I believe that peer-to-peer file sharing between cars will become a viable option especially since the cost of inter-vehicular communication is next to nothing. In my work, I have investigated how file sharing can be enabled by distributed storage of content across vehicles. My work focuses on theoretical analysis of average file download delays for both uncoded and coded storage followed by realistic trace based simulations. I have been able to show that using erasure codes for file sharing in vehicular networks brings in huge reduction in download delays.
         </p>
          <p>
            The analysis has helped us gain crucial insights into how and when erasure coding is useful and if it is, then what is the speedup obtained in downloading files. Specifically, we find that coding offers substantial benefits over simple replication when the file sizes are large compared to the average download bandwidth available per encounter. Based on large real traces (consisting of GPS co-ordinates of vehicles) of taxis in Beijing and buses in Chicago, we simulate the movement of nodes and transfer of files when they are in range. These simulations validate the observations from the analysis, and demonstrate that coded storage dramatically speeds up the download of large files in vehicular networks.
          </p>
        </div>
     </div>
      <hr>
      <footer>
        No great man ever complains of want of opportunities - Ralph Waldo Emerson.
      </footer>
    </div> <!-- /container -->