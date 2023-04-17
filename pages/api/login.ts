// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from './mongodb';
import jwt from 'jsonwebtoken';
import requestIp from 'request-ip';

interface Clinic {
  name: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = jwt.sign({ userId: "7fgh" }, (process.env.JWT_SECRET as string));
  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Max-Age=${60 * 60}; Path=/; Secure`);
  res.status(200).json({ message: 'Cookie set successfully', url:"/manager" });
}









//GEt user input and IP
/* const user_input:Clinic = JSON.parse(req.body);
console.log(user_input)
const ip = requestIp.getClientIp(req); */

//DATABASE CONNECTION
/* try{
  const client = await connectToDatabase();
  const members = client.db("members").collection("clinics");
  const foundDocument = await members.findOne({ name: user_input.name, password: user_input.password });
  const is_in = foundDocument !== null;

  await members.insertOne({ip:ip});

  if(is_in){
    console.log("this is a member");
    const token = jwt.sign({ userId: "7fgh" }, (process.env.JWT_SECRET as string));
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Max-Age=${60 * 60}; Path=/; Secure`);
    res.status(200).json({ message: 'Cookie set successfully', url:"/test" });
  }
  else{
    console.log("Access denied! Invalid Credentials");
    res.status(401).json({ message: "Access denied! Invalid Credentials"});
  }
  client.close();
}
catch(err){
  res.status(503).json({ message: "Unable to connect! Please check your internet connection and try again later.", error:err });
} */