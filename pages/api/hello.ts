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
  const databasesList = await client.db().admin().listDatabases();

  const databaseName = 'sample_guides';
  const collectionName = 'planets';

  const db = client.db(databaseName);
  const collection = db.collection(collectionName);
  const documents = await collection.find().toArray();

  console.log(documents)


  console.log("Databases:", databasesList.databases.map(db => db.name));
  res.status(200).json( documents );
}
