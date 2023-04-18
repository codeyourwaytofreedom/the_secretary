// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from './mongodb';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;

    try {
      const client = await connectToDatabase();
      const clinics_collection = client.db("members").collection("clinics");
      const member_clinic = await clinics_collection.findOne({name:decodedToken.userId});
      if(!member_clinic){
        console.log("no user found");
        return;
      }
      console.log(JSON.parse(req.body))

      //updating the relevant clinic's appointment property.
      const result = await clinics_collection.updateOne(
        { name: decodedToken.userId },
        { $push: { appointments: JSON.parse(req.body) } }
      );
      
      if (result.modifiedCount === 1) {
        console.log('Successfully updated appointments array');
      } else {
        console.log('Unable to update appointments array');
      }

    } catch (db_error) {
      console.log(db_error)
    }
  } catch (jwt_verf_error) {
    console.log(jwt_verf_error)
  }
  
  res.status(200).json({ app: 'Appointment Manager' });
}
