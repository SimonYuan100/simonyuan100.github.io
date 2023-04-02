---
title: 'process'
date: '2023-03-07'
author: 'simon'
---

### definition

进程是程序执行时的一个实例

- 每个进程只有一个父亲
- 从内核看，进程的目的是担当分配系统资源（CPU 时间、内存等）的实体
- 一个进程由几个用户线程（或者简单地说，线程）组成，每个线程都代表进程的一个执行流

### process state

- TASK_RUNNING 可运行状态
- TASK_INTERRUPTIBLE 可中断的等待状态
- TASK_UNINTERRUPTIBLE 不可中断的等待状态
- TASK_STOPPED 暂停状态
- TASK_TRACED 跟踪状态
- TASK_ZOMBIE 僵死状态
- EXIT_DEAD 僵死撤销状态

### 标示一个进程

- 进程标示符 process ID（PID）
- 有最大上限，系统管理员可以通过 /proc/sys/kernel/pid_max 减小最大上限
- 32x 32767， 64x 4194303

### POSIX

可移植操作系统接口（英语：Portable Operating System Interface，缩写为 POSIX）是 IEEE 为要在各种 UNIX 操作系统上运行软件，而定义 API 的一系列互相关联的标准的总称，其正式称呼为 IEEE Std 1003，而国际标准名称为 ISO/IEC 9945。
