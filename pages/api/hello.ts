// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
//import { connectToDatabase } from './mongodb';
import { client } from "./mongodb"; 

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
  const databasesList = await client.db().admin().listDatabases();
  console.log("Databases:", databasesList.databases.map(db => db.name));

  res.status(200).json({ name: databasesList.databases.length.toString()+" adet veri tabanı var" });
}
