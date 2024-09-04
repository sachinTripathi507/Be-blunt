import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions)
    const user: User = session?.user;

    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "You are not logged in"
            },
            { status: 401 }
        )
    }

    const userId = new mongoose.Types.ObjectId(user._id);
    try {
        const user = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: '$messages' },
            { $sort: { 'messages.createdAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$messages' } } }
        ]).exec();

        const user1 = await UserModel.findOne({ _id: userId })
        // console.log(user);

        if(!user) return Response.json({message:'user not found'},{status:404});
        if (user1 && user.length==0) {
            return Response.json(
                { message: 'No messages to show', success: false },
                { status: 200 }
            );
        }

        return Response.json({
            // success: true,
            messages: user[0].messages
        },
            { status: 200 }
        )
    } catch (error) {
        console.log(error)
        return Response.json({
            success: false,
            message: "something went wrong",

        },
            { status: 500 })
    }

}