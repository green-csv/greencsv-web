---
title: Technical Reads, Threads, and Other Curiosities
pubDate: 2025-06-12
tags:
  - dot-net
  - dependency-injection
  - postgresql
  - mysql
  - tls
  - os
  - deep-learning
  - electronics
  - threads
  - curiosities
description: Selection of articles, guides, projects and threads.
cover: ""
language: en
published: true
---

## Dependency Injection in .NET

- **Dependency Injection in ASP NET Core** (Microsoft, 2025)[^1] 
  Microsoft’s official guide: covers configuring Scoped, Transient, and Singleton lifetimes and provides practical examples for controllers and services.

- **Beyond Singleton, Scoped and Transient Lifetimes** (Lock, n.d.)[^2] 
  Andrew Lock explores extensions to the native lifetimes and demonstrates advanced patterns for microservices and hybrid scenarios.

## Databases and Connections

- **Hacking PostgreSQL (PDF)** (PostgreSQL Europe, 2018)[^3] 
  Internal PostgreSQL techniques to optimize queries and extend functionality beyond default configurations.

- **How to Manage Connections Efficiently in Postgres, or Any Database** (Brandur, n.d.)[^4] 
  Pooling strategies, timeouts, and load balancing to keep your application scalable under high concurrency.

- **Overloaded Connection Pool with Bad MySQL Driver Implementation** (Alxolr, n.d.)[^5] 
  Real-world case: diagnosing and resolving bottlenecks caused by a faulty MySQL driver.

## Systems & Architecture

- **Tutorial: Building an Operating System from Scratch** (Fenollosa, n.d.)[^6] 
  Hands-on guide to building a minimal kernel, covering bootstrapping, memory management, and scheduling.

- **Every Byte of a TLS Connection Explained and Reproduced** (Hacker News, 2017)[^7] 
  Step-by-step breakdown of a TLS handshake—ideal for demystifying the transport security layer.

- **K-map, the Weird Cousin of K-anonymity** (Desfontaines, 2017)[^8] 
  Alternative anonymization methods and re-identification risks, with clear examples.

## Machine Learning

- **Geometric Understanding of Deep Learning** (Bronstein et al., 2018)[^9] 
  Connects tensors with differential geometry; essential if you’re after the mathematical foundations of neural networks.

- **Colorizing and Restoring Old Images with Deep Learning** (Jantic, 2019)[^10] 
  Open-source project using GANs to colorize and enhance historical photos—an excellent practical case study.

## Hardware & Electronics

- **The Potentiometer Handbook** (Bourns, 1975)[^11] 
  Classic manual on potentiometer design and applications, from basic principles to advanced instrumentation.
---

I like to rely on sources that dive deep into concepts, offer varied examples, and provide an enrich understanding.

If you’d like to collaborate, check out the repository:  
> https://github.com/green-csv/greencsv-web/blob/main/src/content/entry/en/technical-reads-threads-curiosities.md

[^1]:Microsoft. (2025). *Dependency Injection in ASP NET Core*. Retrieved June 12, 2025, from https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-9.0  
[^2]:Lock, A. (n.d.). *Beyond Singleton, Scoped and Transient Lifetimes*. Retrieved June 12, 2025, from https://andrewlock.net/going-beyond-singleton-scoped-and-transient-lifetimes/  
[^3]: PostgreSQL Europe. (2018). *Hacking PostgreSQL* [PDF]. Retrieved June 12, 2025, from https://www.postgresql.eu/events/pgconfeu2018/sessions/session/2058/slides/96/hackingpg-present.pdf  
[^4]: Brandur. (n.d.). *How to Manage Connections Efficiently in Postgres, or Any Database*. Retrieved June 12, 2025, from https://brandur.org/postgres-connections  
[^5]: Alxolr. (n.d.). *Overloaded Connection Pool with Bad MySQL Driver Implementation*. Retrieved June 12, 2025, from https://www.alxolr.com/articles/overloaded-connection-pool-with-bad-mysql-driver-implementation  
[^6]: Fenollosa, C. (n.d.). *Tutorial: Building an Operating System from Scratch*. Retrieved June 12, 2025, from https://github.com/cfenollosa/os-tutorial  
[^7]: Hacker News. (2017). *Every Byte of a TLS Connection Explained and Reproduced*. Retrieved June 12, 2025, from https://news.ycombinator.com/item?id=18200749  
[^8]: Desfontaines, V. (2017). *K-map, the Weird Cousin of K-anonymity*. Retrieved June 12, 2025, from https://desfontain.es/privacy/k-map.html  
[^9]: Bronstein, M. M., Bruna, J., & LeCun, Y. (2018). *Geometric Understanding of Deep Learning*. Retrieved June 12, 2025, from https://arxiv.org/abs/1805.10451  
[^10]: Jantic. (2019). *Colorizing and Restoring Old Images with Deep Learning*. Retrieved June 12, 2025, from https://github.com/jantic/DeOldify  
[^11]: Bourns. (1975). *The Potentiometer Handbook*. Retrieved June 12, 2025, from https://www.bourns.com/docs/technical-documents/technical-library/corporate/OnlinePotentiometerHandbook.pdf  
