---
title: Git Set-Up Multi-Organizations
pubDate: 2025-06-25
tags: 
  - notes
  - personal
  - git
  - ssh
description: "A self-note for configuring Git to work with multiple GitHub organizations via SSH keys"
cover: ""
language: en
published: true
---

Welcome! This is a personal reference for configuring Git on my machines to handle multiple GitHub organizations. If you find this workflow useful, feel free to fork and submit a PR.

## Pre-requisites

- git version 2.50.0
- ssh
- pc 
- water, drink water 

# Folder affected
```bash
~/.ssh
├── config
├── id_ed25519_green-csv
├── id_ed25519_green-csv.pub
├── known_hosts //When Push type "yes" to create the entry here
```

### 1. Generate SSH Keys for Each Organization 

```bash
ssh-keygen -t ed25519 -C "you@your.email" -f ~/.ssh/id_ed25519_org1   
ssh-keygen -t ed25519 -C "you@your.email" -f ~/.ssh/id_ed25519_org2   
```
> Note: The -C flag adds a comment for identification --GitHub will display this when you add the key.
### 2. Add Public Keys to GitHub

For each key you generated, copy its .pub file content and add it to the corresponding GitHub account or organization under Settings > SSH and GPG keys.

### 3. Edit config file  
```bash
# ~/.ssh/config

Host github-org1                         # alias for second org
  HostName github.com
  IdentityFile ~/.ssh/id_ed25519_org1

Host github-org2                         # alias for third org
  HostName github.com
  IdentityFile ~/.ssh/id_ed25519_org2
```

### 4. Cloning Repositories
```bash
# Org1
git clone git@github-org1:org1/one-repo.git

# Org2
git clone git@github-org2:org2/other-repo.git

```

### 5. Per-Repository Git Identity
Optionally set a custom name and email for commits in each repo:
```bash
git config user.name  "Your Name (OrgName)"
git config user.email "you+orgname@example.com"
```
This ensures your commits are attributed correctly.


If you are here and you are not me then. Pull requests and suggestions are welcome!
