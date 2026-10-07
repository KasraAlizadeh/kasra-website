---
title: "When noise stops being Gaussian: LDPC codes under heavy tails"
description: "What happens to an LDPC-coded 64-QAM link when the noise has heavy tails instead of following the textbook AWGN model."
pubDate: 2026-09-25
tags: ["Telecom", "Channel Coding"]
draft: false
---

Most textbook analysis of digital links assumes additive white Gaussian noise (AWGN). It is a convenient model, but real channels are not always that polite. Impulsive interference produces noise with heavy tails: most samples are small, and a few are very large.

In a project with Politecnico di Milano and Nokia, I studied what this does to a modern coded link.

## The setup

- **Modulation:** 64-QAM
- **Coding:** LDPC
- **Noise models:** AWGN and Student's t-distributed noise
- **Metric:** bit error rate (BER) as a function of SNR, from MATLAB simulations

## What we saw

Under Gaussian noise, the LDPC-coded link behaved as expected and stayed robust. Under t-distributed noise, reaching the same error performance **required a higher SNR**.

One intuition: with heavy tails, occasional large noise samples push symbols far across the decision boundaries of a dense constellation like 64-QAM. On top of that, the soft information given to the decoder is usually computed under a Gaussian assumption, so it no longer matches the real channel.

## Takeaway

The noise model is part of the receiver design, not a detail of the simulation. If the channel is not Gaussian, a receiver built only for Gaussian noise leaves performance on the table.
