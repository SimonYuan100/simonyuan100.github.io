import { getPostData } from '../../lib/posts'

import { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NODE_ENV === 'development') {
    const params = req.body
    const post = await getPostData(params.id)
    return res.status(200).json(post)
  } else {
    return res.status(200)
  }
}
