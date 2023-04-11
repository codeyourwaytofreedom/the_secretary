// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from './mongodb';
import jwt from 'jsonwebtoken';

interface Clinic {
  name: string;
  password: string;
}

interface ResponseWithCookies extends NextApiResponse {
  cookies: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //DATABASE CONNECTION buraya try catch ekle

  const user_input:Clinic = JSON.parse(req.body);
  console.log(user_input)
  try{
    const client = await connectToDatabase();
    const members = await client.db("members").collection("clinics");
    const documents = await members.find().toArray();
    let is_in = false;
    documents.map(m=> m.name === user_input.name && m.password === user_input.password ? is_in = true : null);

    if(is_in){
      console.log("this is a member");
      const token = jwt.sign({ userId: "7fgh" }, (process.env.JWT_SECRET as string));
      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Max-Age=${60 * 60}; Path=/; Secure`);
      res.status(200).json({ message: 'Cookie set successfully' });
    }
    else{
      console.log("access denied: not a member");
      res.status(401).json({ message: 'Member not found!'});
    }
    client.close();
  }
  catch(err){
    res.status(503).json({ message: err });
  }
}




//DATABASE CONNECTION
/*   const client = await connectToDatabase();

  const col = client.db('clinic_06').collection('patients');
  const patient:Patient = {
    name:"Gennady",
    surname:"Golovkin",
    age:35,
    gender:false
  }
  await col.insertOne(patient);
  
  const documents = await col.find().toArray();
  await col.find().forEach((doc) => {
    console.log(doc);
  });
  
  res.status(200).json( documents );
  client.close(); */