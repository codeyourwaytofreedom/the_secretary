// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from './mongodb';

type Data = {
  name: object[]
}

type Patient = {
  name:string,
  surname:string,
  age:number,
  gender:boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
  console.log(req.body)
  res.status(200).json( {res:"hiiiii"} );
}
