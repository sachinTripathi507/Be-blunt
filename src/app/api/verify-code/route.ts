import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";

export async function POST(request: Request) {
    await dbConnect();
console.log(request.body)
    try {
        const { username, code } = await request.json()
        const decodedUser = decodeURIComponent(username)
        const user = await UserModel.findOne({ username: decodedUser})

        if (!user) {

            return Response.json(
                {
                    success: false,
                    message: "user not found"
                },
                { status: 500 }
            )
        }
        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if (isCodeNotExpired && isCodeValid) {
            user.isVerified = true
            await user.save()
            return Response.json(
                {
                    success: true,
                    message: "user verified successfully"
                },
                { status: 200 }
            )
        }
        else if (!isCodeNotExpired) {
            return Response.json({
                success: false,
                message: "verification code has expired"
            }, { status: 400 })
        } else {
            return Response.json({
                success: false,
                message: "invalid code"
            }, { status: 400 })
        }
    } catch (error) {
        console.error("error verifying user", request)
        return Response.json(
            {
                success: false,
                message: "error while checking username"
            },
            { status: 500 }
        )
    }
}