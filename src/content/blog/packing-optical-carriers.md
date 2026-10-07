---
title: "Packing optical carriers: ILP vs. metaheuristics for ODU assignment"
description: "Lessons from assigning ODUs to multi-carrier transponder framers with six different optimization methods, from exact ILP to swarm algorithms."
pubDate: 2026-09-25
tags: ["Telecom", "Optimization"]
draft: false
---

Optical transport networks carry client traffic in containers called ODUs (Optical Data Units). In the Communication Network Design course at Politecnico di Milano, working with Nokia, our task was to assign ODUs to **multi-carrier transponder framers** under real hardware constraints, and to do it well enough to improve optical data transmission.

## Six ways to solve one problem

I implemented and compared six methods:

1. **ILP** (integer linear programming): an exact formulation of the problem
2. **Greedy**: a fast, simple baseline
3. **GA** (genetic algorithm)
4. **SA** (simulated annealing)
5. **PSO** (particle swarm optimization)
6. **ACO** (ant colony optimization)

Each method makes a different trade-off. An exact ILP gives optimal answers for its model but can become expensive as the problem grows. Greedy methods are very fast but can get stuck with early decisions. Metaheuristics sit in between: they explore the search space more broadly and can be tuned for time versus quality.

## What made the comparison fair

- **Smart traffic generation.** The quality of a comparison depends on the test cases, so I built a traffic generator that produces realistic and varied demand.
- **Visualization.** Plotting the assignments and performance made it easy to see *why* a method did well or badly, not just *that* it did.

## Takeaway

For network optimization, no single algorithm wins everywhere. The engineering skill is in modeling the constraints correctly, building good test traffic, and picking the right tool for the size of the problem.
