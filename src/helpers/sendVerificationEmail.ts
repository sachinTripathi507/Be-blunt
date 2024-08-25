// import { resend } from "@/lib/resend"
import VerificationEmail from "../../emails/verificationEmails"
import { ApiResponse } from "@/types/apiresponse"
import nodemailer from "nodemailer"

// export async  function sendVerificationEmail(
//     email: string,
//     username: string,
//     verifyCode: string,
// ): Promise<ApiResponse> {
//     try {
//       const response=  await resend.emails.send({
//             from: 'dev@hiteshchoudhary.com',
//             to: email,
//             subject: 'be-blunt Verification Code',
//             react: VerificationEmail({ username, otp: verifyCode }),
//           });
//           console.log(response) //api problem for key
//           if(response.error){
//             return {success:false,message:response.error.message}
//           }else{
//         return { success: true, message: 'verification email send successfully' }
//           }
//     } catch (emailError) {
//         console.log("error sending verification email", emailError)

//         return { success: false, message: 'failed to send verification email' }
//     }
// }

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  },
});

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string,
): Promise<ApiResponse> {
  try {
    const info = await transporter.sendMail({
      from: '"Be Blunt" <sachintri507@gmailcom>',
      to: email,
      subject: "verification code",
      text: "do not share with anyone",
      html: `<h1>your code is ${verifyCode}</h1> `,
      headers: { 'x-myheader': 'test header' }
    });
    return { success: true, message: "verification email sent successfully " }
  } catch (emailError) {
    console.log("error sending verification email", emailError)

    return { success: false, message: 'failed to send verification email' }
  }
}