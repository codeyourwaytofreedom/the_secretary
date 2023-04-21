// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from './mongodb';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    console.log("remove fired")
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
        $pull: { 
            appointments: {
                date: JSON.parse(req.body).date,
                slot: JSON.parse(req.body).slot
            }
        }
        }
      );
      if (result.modifiedCount > 0) {
        console.log("Delete successful");
        res.status(200).json({ message: 'Appointment deleted successfully.', 
                                date:JSON.parse(req.body).date,slot:JSON.parse(req.body).slot});
      } else {
        console.log("Delete failed");
        res.json({ message: 'Could not delete appointment....' });
      }

    } catch (db_error) {
      console.log(db_error);
      res.status(503).json({ message: "Unable to connect! Please check your internet connection and try again later.", error:db_error });
    }
  } catch (jwt_verf_error) {
    console.log(jwt_verf_error)
  }

}
