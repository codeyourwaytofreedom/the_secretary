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

      const result = await clinics_collection.updateOne(
        { 
          name: decodedToken.userId,
          appointments: {
            $elemMatch: { 
              date: JSON.parse(req.body).date,
              slot: JSON.parse(req.body).slot
            }
          }
        },
        { 
            $set: { 
                "appointments.$.patient": JSON.parse(req.body).patient,
                "appointments.$.for": JSON.parse(req.body).for,
                "appointments.$.additional": JSON.parse(req.body).additional,
            }
        }
      );
      if (result.matchedCount > 0 && result.modifiedCount > 0) {
        console.log("Appointment updated successfully.");
        res.status(200).json({ message: 'Appointment updated successfully.' });
      } else {
        console.log("Failed to update appointment.");
        res.json({ message: 'No change detected....' });
      }

    } catch (db_error) {
      console.log(db_error);
      res.status(503).json({ message: "Unable to connect! Please check your internet connection and try again later.", error:db_error });
    }
  } catch (jwt_verf_error) {
    console.log(jwt_verf_error)
  }

}
