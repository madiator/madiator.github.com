---
layout: post
title: "LaTeX Tips and Tricks"
date: 2012-08-17 17:37
comments: true
categories: ["tech"]
---
There seem to be quite a few techniques to embed the fonts while generating PDFs from LaTeX sources, and I just wanted to collate a few in one post. Further, I wanted to share my complicated workflow in creating vector graphics. Let me know if you have better solutions (in the past I have use inkscape with 'limited' success: some dots simply disappeared in Mac's preview). 

<!-- more -->

## Embedding Fonts

#### If you are using pdflatex:
If you have all your figures in PDF and you prefer using pdflatex, then you may want to follow [this link](http://www.daniel-lemire.com/blog/archives/2005/08/29/getting-pdflatex-to-embed-all-fonts/).

Update:
Most of the time I just use pdf images and so I end up using pdflatex. Pdflatex is not only convenient, I think its recommended. I recently stumbled upon this eternal problem of running into non embedded fonts. This time I could quickly point my fingers towards a few pdf plots generated using Matlab. Thanks to [Kimo](http://www.mit.edu/~kimo/blog/matlab_figures.html), I was able to fix the problem quickly. All I had to do was to run the following 

{% highlight shell %}
ps2pdf14 -dPDFSETTINGS=/prepress fig_non_embedded.pdf fig_embedded.pdf
{% endhighlight %}

I believe ps2pdf14 is equivalent to ps2pdf -dCompatibilityLevel=1.4 (just a guess), and this should also help prevent the error "Acrobat version is less than 5.0" that you might get on IEEE PDF eXpress. [Note that earlier I had ps2pdf13 used, and I had this issue].
 
I made a handy script to fix all the figures. 

{% highlight shell %}
#!/bin/sh
ps2pdf13 -dPDFSETTINGS=/prepress "$1" "$1.emb"
rm "$1"
mv "$1.emb" "$1"
pdffonts "$1"
{% endhighlight %}

If all your images now have embedded fonts, then you should be able to generate an impeccable pdf with all fonts embedded, unless the universe decides against you (which happens quite often with me).

#### If you are prefer the long way:
If you have eps figs or may be pstricks based code for image, then you may want to do latex -> dvi -> ps -> pdf. 
In that case, I do this:

{% highlight shell %}
latex filename.tex
dvips filename.dvi
ps2pdf -dEmbedAllFonts=true -dSubsetFonts=true -dEPSCrop=true -dPDFSETTINGS=/prepress filename.ps
{% endhighlight %}

You will end up with filename.pdf which should have all the fonts embedded. 

If you have an EPS image which you want to convert to PDF while making sure the fonts are embedded, you can try 

{% highlight shell %}
epstopdf --outfile='filename-temp.pdf' filename.eps
gs -dSAFER -dNOPLATFONTS -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -sPAPERSIZE=letter -dCompatibilityLevel=1.4 -dPDFSETTINGS=/printer -dCompatibilityLevel=1.4 -dMaxSubsetPct=100 -dSubsetFonts=true -dEmbedAllFonts=true -sOutputFile=filename.pdf -f filename-temp.pdf
rm filename-temp.pdf
{% endhighlight %}

Credit: [Joey](http://span.ece.utah.edu/eps-to-pdf-in-one-click)

Yet another way would be to embed the EPS figure in an article tex file and then compile the above way to generate a PDF. Now you will be stuck with a letter size PDF image, which you can crop (see below). 

## Generating Vector Graphics

I generally use this awesome program called [LatexDraw](http://latexdraw.sourceforge.net/) which is great except that it gave me a little bit of a headache for about 4 hours because the PDFs I was creating did not have all fonts embedded. Its not always like that, so I do recommend it highly. I tried xfig and it looked it got teleported from 1995. 

Install it, and start drawing the block diagram you need. Its quite straight forward. Its cool to see the code getting updated as you draw. In fact you if you can type formulae between $ and $. They will get compiled to the correct formulae, but you may have to try several times to get the position right. 

Once you are happy and smiling, copy the generated code (they even have a button to do that!), and get ready for some hard work. 

Again, you have two options. I like covering these images to PDFs and then embed it in my paper and run pdflatex. Instead, if you are going the long way of running latex->dvi->ps->pdf, then you all you may need to do is to copy paste the code. If you want it as a figure and want to add captions, just surround by `figure`:

{% highlight tex %}
\begin{figure}[h]
\begin{center}
% your generated code.
\end{center}
\caption{The case when $\beta > 1$ or whatever caption you like}
\label{beta1}
\end{figure}

{% endhighlight %}

There may be a number of reasons you may not want to do this. May be your mac is complaining that pstricks is not found, in which case I am not sure what to do. I have access to a linux machine which doesn't complain. But since my pdflatex (in both mac/linux), I use the linux machine to generate the PDF the long way (also an EPS will be nice to have right?). 

So fire up your latex editor and create a fresh file, like below. 

{% highlight tex %}
\documentclass{minimal}
\usepackage[usenames,dvipsnames]{pstricks}
\usepackage{epsfig}
\pagestyle{empty}
\begin{document}
\scalebox{0.9} % Change this value to rescale the drawing.
{
\begin{pspicture}(0,-0.53)(5.92,0.49)
\definecolor{color100b}{rgb}{0.7058823529411765,0.7058823529411765,0.7058823529411765}
\psframe[linewidth=0.036,dimen=outer,fillstyle=solid,fillcolor=color100b](0.54,0.47)(0.08,0.01)
\psframe[linewidth=0.036,dimen=outer,fillstyle=solid,fillcolor=color100b](1.2,0.47)(0.74,0.01)
\psframe[linewidth=0.036,dimen=outer,fillstyle=solid,fillcolor=color100b](3.56,0.49)(3.1,0.03)
\psframe[linewidth=0.036,dimen=outer](5.92,0.47)(5.46,0.01)
\pscircle[linewidth=0.04cm](1.62,0.25){0.08}
\pscircle[linewidth=0.04cm](2.2,0.25){0.08}
\pscircle[linewidth=0.04cm](2.7,0.25){0.08}
\pscircle[linewidth=0.04cm](3.94,0.25){0.08}
\pscircle[linewidth=0.04cm](4.34,0.25){0.08}
\pscircle[linewidth=0.04cm](4.74,0.25){0.08}
\pscircle[linewidth=0.04cm](5.12,0.25){0.08}
\psline[linewidth=0.04cm](0.0,-0.13)(3.66,-0.13)
\psline[linewidth=0.04cm](3.64,0.07)(3.64,-0.11)
\psline[linewidth=0.04cm](0.0,-0.13)(0.0,0.07)
\usefont{T1}{ptm}{m}{n}
\rput(0.258125,-0.36){$1$}
\usefont{T1}{ptm}{m}{n}
\rput(0.918125,-0.36){$2$}
\usefont{T1}{ptm}{m}{n}
\rput(3.258125,-0.38){$n$}
\usefont{T1}{ptm}{m}{n}
\rput(5.678125,-0.36){$N$}
\end{pspicture} 
}
\end{document}
{% endhighlight %}

If for any reason minimal does not work, try article class. 

Do the following again:

{% highlight shell %}
latex figname.tex
dvips figname.dvi
ps2pdf -dEmbedAllFonts=true -dSubsetFonts=true -dEPSCrop=true -dPDFSETTINGS=/prepress figname.ps
{% endhighlight %}

Keep making sure that the generated PDFs have all the fonts embedded.

NOTE: IF YOU USE DOTS IN LATEXDRAW, IT WILL CREATE CORRESPONDING PSDOTS COMMANDS. THIS SEEMS TO CREATE TYPE-3 FONTS WHICH DON'T GET EMBEDDED. MY SUGGESTION IS TO NOT USE DOTS, BUT JUST USE CIRCLES. Figuring this out took like 4 hours *only*.

The output will look like this:
![Output figure using latexdraw](http://photos.smahesh.com/photos/i-gS5c729/0/O/i-gS5c729.png)

but of course in a pdf file. Again make sure it has all fonts embedded. 

Next course of action is to crop this pdf. There is a handy tool called pdfcrop by Heiko Oberdiek, which might be [already installed in your system](http://alexsleat.co.uk/2011/01/25/using-pdfcrop-to-remove-white-margins-ubuntu/), otherwise get it from [here](http://www.ctan.org/tex-archive/support/pdfcrop/) 

I generally create a folder called helper and put the pdfcrop.pl file and also the following file

{% highlight shell %}
#!/bin/sh
# usage:
# generatePDF <filename without ext>

latex "$1.tex"
dvips "$1.dvi"
ps2pdf -dEmbedAllFonts=true -dSubsetFonts=true -dEPSCrop=true -dPDFSETTINGS=/prepress "$1.ps"
pdfcrop "$1.pdf"
{% endhighlight %}

You can just run

{% highlight shell %}
./generatePDF filename
{% endhighlight %}

Make sure not to give the extension (`.tex`).

Now you will end up with a PDF that you can just embed as usual. 

Also, if you want to get EPS file, you can do the following:

{% highlight shell %}
pdftops -eps filename.pdf 
{% endhighlight %}

If you directly want EPS files, save and use the following script


{% highlight shell %}
#!/bin/sh
# usage:
# generatePDF <filename without ext>

latex "$1.tex"
dvips "$1.dvi"
ps2pdf -dEmbedAllFonts=true -dSubsetFonts=true -dEPSCrop=true -dPDFSETTINGS=/prepress "$1.ps"
pdfcrop "$1.pdf"
pdftops -eps "$1-crop.pdf"
rm "$1-crop.pdf"
{% endhighlight %}

You should be all set to go. 

## Force letter dimensions. 
I was writing a one page document in latex and found out that it wasn't really generating 8.5in by 11in document. So I ended up using:

{% highlight tex %}
\documentclass[letterpaper, 10pt]{article}
\special{papersize=8.5in,11in}
\setlength{\pdfpageheight}{\paperheight}
\setlength{\pdfpagewidth}{\paperwidth}

% \setlength{\textwidth}{7.0in}
% \setlength{\textheight}{9.0in}
%\setlength{\oddsidemargin}{-0.3in}
% \setlength{\parskip}{0.0in}
% \topmargin -0.5in
 \setlength{\parindent}{0in}
 \setlength{\parskip}{0.06in}
TEXT
\end{document}
{% endhighlight %}

You can play with the numbers and see what uncommenting other parts does. 

Thats all folks. Happy latexing!