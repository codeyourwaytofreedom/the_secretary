// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from './mongodb';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = await connectToDatabase();
  
  const databasesList = await client.db().admin().listDatabases();
  console.log("Databases:", databasesList.databases.map(db => db.name));

  res.status(200).json({ name: databasesList.databases.length.toString()+" the number of databases" });
}
