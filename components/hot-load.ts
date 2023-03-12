import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface Instance {
  ws: WebSocket,
  timer: any
}

let instance: Instance = {
  ws: null as any,
  timer: null,
}
function getInstance() {
  if (instance.ws === null) {
    instance.ws = new WebSocket('ws://localhost')
  }
  return instance
}

function _HotLoad({ setPost, params }: any) {
  const { asPath } = useRouter()
  useEffect(() => {
    const instance = getInstance()
    instance.ws.onmessage = async (res) => {
      const data = JSON.parse(res.data)
      if (data.event === 'markdown-changed') {
        if (data.path === asPath) {
          const post = await getPreviewData(params.id)
          setPost(post)
        }
      }
    }
    return () => {
      instance.ws.CONNECTING && instance.ws.close(4001, asPath)
    }
  }, [])
  return null
}

export function getPreviewData(id: string) {
  if (instance.timer) {
    clearTimeout(instance.timer)
  }
  return new Promise((resolve) => {
    instance.timer = setTimeout(async () => {
      const res = await fetch('http://localhost:3000/api/preview/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
      })
      resolve(res.json())
    }, 200)
  })
}

let core = ({ setPost, params }: any) => null

if (process.env.NODE_ENV === 'development') {
  console.log('development hot load')
  core = _HotLoad
}

export default core
