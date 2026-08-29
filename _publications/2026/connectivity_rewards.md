---
title: "From Connectivity to Rewards: Dense Reward Learning with Directed State Graphs"
date: 2026-08-29
selected: false
status: "published"
pub: "Transactions on Machine Learning Research (TMLR)"

pub_last:
pub_date: "2026"
venue_tag: "TMLR"

abstract: >-
  Graph-based Goal-Conditioned Hierarchical Reinforcement Learning (GCHRL) typically uses the graph as a stochastic sampling tool rather than as an environmental model that encodes connectivity and state-accessibility information, which is particularly limiting in quasimetric environments where asymmetric state transitions challenge stable policy learning and path planning. We introduce a state connectivity model that predicts pairwise state-connectivity strength in asymmetric environments and transforms it into scalar auxiliary dense rewards that provide continuous guidance across hierarchical levels. Our framework, Graph-Guided Quasimetric Dense Reward (G2QDR), can be integrated into any existing GCHRL architecture; the connectivity model is implemented as a neural network trained on a directed state graph generated during exploration. Across a wide range of sparse-reward environments, G2QDR significantly enhances baseline GCHRL approaches with minimal computational overhead.
authors:
- Shuyuan Zhang
- Zihan Wang
- Xiao-Wen Chang
- Doina Precup
links:
---
