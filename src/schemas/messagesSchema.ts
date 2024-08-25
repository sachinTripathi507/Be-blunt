import {z} from 'zod'

export const messagesSchema= z
.object({
   content: z.string()
   .min(2,{message:'messgae must be 2 two characters'})
   .max(350,{message:'messgae must be not more than 350 characters'})
    })