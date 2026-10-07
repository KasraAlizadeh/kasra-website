---
title: "Listening to plants: stress detection as a communication problem"
description: "How our ACM NanoCom 2026 paper treats a plant as a transmitter and stress detection as a receiver design problem, and why that framing works."
pubDate: 2026-09-22
tags: ["Research", "Signal Processing"]
draft: false
---

Plants signal all the time. When a plant is under environmental stress, its electrophysiological activity changes. Our team asked a simple question: if you treat that activity as a message, can you build a receiver that reads it reliably?

## Reframing the problem

Plant stress detection is usually framed as a plain classification task. In our ACM NanoCom 2026 paper, we reframed it as **receiver-side decoding over a biological communication channel**. The plant is the transmitter, its electrophysiological signals carry the information, and our job is to design the receiver.

This framing is useful because communication engineering already has a vocabulary for this problem: channel, interference, integration window, likelihood ratio. Once you describe the problem that way, the design decisions become much clearer.

## The receiver

The architecture has four stages:

- **Interference suppression** to clean the raw recordings
- **Finite-horizon temporal integration**, so each decision uses a window of signal rather than a single instant
- **A structured multi-domain feature embedding** that captures statistical, temporal, spectral and multiscale characteristics of the signal
- **A histogram-based gradient boosting detector** that approximates the likelihood ratio in the embedded space

## Results

We evaluated the framework on electrophysiological recordings under multiple stress conditions. It reached a macro-averaged F1 score of **0.9879**, a ROC-AUC of **0.9992** and a PR-AUC of **0.9993**, with an inference time of about **0.10 ms per segment**. That makes it accurate and also light enough for real-time use.

The paper received the **Best Paper Award** at the 13th ACM International Conference on Nanoscale Computing and Communication. I'm grateful to my teammates and advisors at Politecnico di Milano.

## What I took from it

The biggest lesson for me: good results came from a good model of the problem, not from the biggest model. Thinking like a receiver designer gave us a pipeline that is accurate, fast and easy to reason about.

Read the paper: [doi.org/10.1145/3818305.3830252](https://doi.org/10.1145/3818305.3830252)
