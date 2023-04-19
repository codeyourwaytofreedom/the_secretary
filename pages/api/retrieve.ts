// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from './mongodb';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import console from 'console';
import { MongoError } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;

    const {userId} = decodedToken;
    const {date} = req.query;

    const client = await connectToDatabase();
    const clinic = await client.db("members").collection("clinics").findOne({name:userId});
    const appointments = clinic!.appointments;

    interface Appoint {
      date:string
    }
    const day_s_appointments = appointments.filter((app:Appoint) => app.date === date);

    console.log(day_s_appointments);
    res.status(200).json(day_s_appointments);

  } catch (err) {
    console.log(err);
    res.status(503).send({ error: "Service Unavailable" });
  }
}