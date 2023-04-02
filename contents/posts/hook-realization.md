---
title: 'hook realization'
date: '2023-03-09'
author: 'simon'
description: 'React Hooks是一组用于自动化构建和渲染React应用程序的JavaScript函数。它们是在16版本中引入的，并且已经成为了开发React项目的标准方法之一'
tags: ['react', 'hook']
---

### here we realize the react hook

```
const effectStack = []

function useState(value) {
  const subs = new Set()
  const getter = () => {
    const effect = effectStack[effectStack.length - 1]
    if (effect) subscribe(effect, subs)
    return value
  }
  const setter = (newValue) => {
    value = newValue

    for (const effect of [...subs]) {
      effect.execute()
    }
  }
  return [getter, setter]
}

const [num, setNum] = useState(9)

function useEffect(callback) {
  const execute = () => {
    // clean effect
    cleanUp(effect)
    // push to the effectStack
    effectStack.push(effect)
    console.log(effectStack)

    try {
      callback()
    } catch (err) {
      console.log(err)
    } finally {
      effectStack.pop()
    }
  }

  const effect = {
    execute,
    deps: new Set(),
  }

  execute()
}

function cleanUp(effect) {
  for (const subs of effect.deps) {
    subs.delete(effect)
  }
  effect.deps.clear()
}

function subscribe(effect, subs) {
  subs.add(effect)
  effect.deps.add(subs)
}

function useMemo(callback) {
  const [s, set] = useState()
  useEffect(() => set(callback()))
  return s
}
const [title, setTitle] = useState('demo of react')

useEffect(() => console.log(num()))
useEffect(() => console.log(title()))
setNum(40)
setTitle('react hook')
```
