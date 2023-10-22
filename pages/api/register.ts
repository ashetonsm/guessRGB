import { NextApiRequest, NextApiResponse } from "next";
import User from '@/models/user.model'
import clientPromise from "@/lib/mongodb";

interface ResponseData {
    error?: string
    msg?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {

    const client = await clientPromise;
    const users = client.db('test').collection('users');

    // Obj that will be used to send a response message or error
    var responseData;

    var userExists = await users.findOne({
        email: { $regex: `${req.body.email}`, $options: 'i' },
    })

    if (userExists) {
        responseData = { error: 'Database Error (Email in use).' }
        return res.status(400).json(responseData as ResponseData)
    } else {

    }

}