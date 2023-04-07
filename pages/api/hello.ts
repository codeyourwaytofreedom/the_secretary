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

  const db = client.db('sample_guides').collection('planets');
  await db.insertOne({name:"dünya"});
  
  const documents = await db.find().toArray();
  await db.find().forEach((doc) => {
    console.log(doc);
  });
  
  res.status(200).json( documents );
  client.close();
}
