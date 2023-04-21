// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    console.log("log out request received");
    res.setHeader('Set-Cookie', 'token=; HttpOnly; Max-Age=0; Path=/; Secure');
    res.redirect('/');
}