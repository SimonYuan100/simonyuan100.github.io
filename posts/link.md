---
title: 'hard link vs soft link'
date: '2023-03-06'
author: 'simon'
---

### hard link

the file name in the dir is a hard link, also called link.

```
# create p2 based on p1
ln P1 P2
```

- could not create a link on the dir, which could bring the trouble of circular dir.
- could only create a link on the same file system. so this is a limit, as the multi-file system in the modern Unix.

### soft link

also called symbolic link, which has a path pointing to the link.

```
# create p2 based on p1
ln -s P1 P2
```
