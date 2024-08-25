import { NextAuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";


export const authOptions: NextAuthOptions= {
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"Credentials",
            credentials: {
                Email:{label:"Email", type:"text"},
                password:{label:"Password", type:"password"},
            },
                async authorize(credentials: any ):Promise<any>{
                    await dbConnect()
                    try{
                       const user= await UserModel.findOne({
                            $or:[
                                {email:credentials.Email},
                                {password:credentials.password}
                            ]
                        })
                        if(!user){
                            throw new Error("User not found")
                        }
                        if(!user.isVerified){
                            throw new Error("User not verified")
                        }
                        const isPasswordCorrect= await bcrypt.compare(credentials.password,user.password);
                        if(isPasswordCorrect){
                            return user
                            }
                            else{
                                throw new Error("Password is incorrect")
                                }

                    } catch(error:any){
                            throw new Error(error)
                    }
                }
            
        })
    ],
    pages:{
        signIn: '/sign-in'
    },
    callbacks:{
        async jwt({token,user}){
            if(user){
                token._id=user._id?.toString()
                token.isVerified= user.isVerified
                token.isAcceptingMessages=user.isAcceptingMessage
                token.username= user.username
            }
            return token
        },
        async session({session,token}){
            if(token){
                session.user._id=token._id
                session.user.isVerified= token.isVerified
                session.user.isAcceptingMessages= token.isAcceptingMessages
                session.user.username= token.username
            }
            return session
        }
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
}