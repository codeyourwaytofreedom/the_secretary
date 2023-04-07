// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from './mongodb';

type Data = {
  name: object[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await connectToDatabase();

  const col = client.db('clinic_06').collection('patients');
  await col.insertOne({name:"john", surname:"wayne"});
  
  const documents = await col.find().toArray();
  await col.find().forEach((doc) => {
    console.log(doc);
  });
  
  res.status(200).json( documents );
  client.close();
}
