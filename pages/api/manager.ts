// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from './mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    console.log(req.body)
  res.status(200).json({ app: 'Appointment Manager' });
}
