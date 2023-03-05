import { useRouter } from 'next/router'
import { useEffect } from 'react'

let instance = {
  ws: null,
  timer: null,
}
function getInstance() {
  if (instance.ws === null) {
    instance.ws = new WebSocket('ws://localhost')
  }
  return instance
}

function _HotLoad({ setPost, params }) {
  const { asPath } = useRouter()
  useEffect(() => {
    const instance = getInstance()
    instance.ws.onmessage = async (res) => {
      const data = JSON.parse(res.data)
      if (data.event === 'markdown-changed') {
        if (data.path === asPath) {
          const post = await getPreviewData(params)
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

export function getPreviewData(params) {
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
        body: JSON.stringify(params),
      })
      resolve(res.json())
    }, 200)
  })
}

let core = ({ setPost, params }) => null

if (process.env.NODE_ENV === 'development') {
  console.log('development hot load')
  core = _HotLoad
}

export default core
