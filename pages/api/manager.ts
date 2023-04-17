// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from './mongodb';
import * as jose from 'jose';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = cookie.parse(req.headers.cookie || '');
  console.log(cookies)
  const token = cookies.token;
  console.log(token)
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
  console.log(decodedToken)
/*   try {
    await jose.jwtVerify((token as string), secret);
    console.log("jwt valid")
  } catch (error) {
    console.log(error)
  } */



/*     try {
      const client = await connectToDatabase();
      console.log(client)
    } catch (error) {
      console.log(error)
    } */

    //console.log(JSON.parse(req.body))
    res.status(200).json({ app: 'Appointment Manager' });
}
