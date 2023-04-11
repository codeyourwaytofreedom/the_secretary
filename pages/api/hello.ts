// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from './mongodb';
import jwt from 'jsonwebtoken';

interface Clinic {
  name: string;
  password: string;
}

interface ip_catch {
  req: NextApiRequest;
}


export async function getServerSideProps(req:any) {
  const address = req.socket.address();
  const ip = address.address;
  console.log(ip)
  // Do something with the IP address

  return {
    props: {
      // ...
    },
  };
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //DATABASE CONNECTION buraya try catch ekle
  await getServerSideProps(req);

  const user_input:Clinic = JSON.parse(req.body);
  console.log(user_input)
  try{
    const client = await connectToDatabase();
    const members = client.db("members").collection("clinics");
    const foundDocument = await members.findOne({ name: user_input.name, password: user_input.password });
    const is_in = foundDocument !== null;

    await members.insertOne({ip:req.socket.address()});

    if(is_in){
      console.log("this is a member");
      const token = jwt.sign({ userId: "7fgh" }, (process.env.JWT_SECRET as string));
      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Max-Age=${60 * 60}; Path=/; Secure`);
      res.status(200).json({ message: 'Cookie set successfully' });
    }
    else{
      console.log("Access denied! Invalid Credentials");
      res.status(401).json({ message: "Access denied! Invalid Credentials"});
    }
    client.close();
  }
  catch(err){
    res.status(503).json({ message: "Unable to connect! Please check your internet connection and try again later.", error:err });
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