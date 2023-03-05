import { getPostData } from '../../lib/posts'

export default async function handler(req, res) {
  if (process.env.NODE_ENV === 'development') {
    const params = req.body
    const post = await getPostData(params.id)
    return res.status(200).json(post)
  } else {
    return res.status(200)
  }
}
