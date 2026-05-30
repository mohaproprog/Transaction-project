import {email, z} from "zod";

const userScheme = z.object({
    name: z.string().min(1,"name must be atlest 1 character"),
    email: z.string().email("email must be valid"),
    password: z.string()
    .min(6,"password must be atlest 6 characters")
    .max(100,"password can't be more than 100 chracters")

})

export default userScheme;