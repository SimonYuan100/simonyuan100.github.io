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

### npm link

Symlink a package folder

> npm link [package-spec]
> alias: ln

- npm link in a package folder with no arguments will create a symlink in the global folder {prefix}/lib/node_modules/package that links to the package where the npm link command was executed.
- npm link package-name will create a symbolic link from globally-installed package-name to node_modules/ of the current folder.
