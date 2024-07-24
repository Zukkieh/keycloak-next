import { apiHandlerWithContextDomain } from "@/lib/nextApi/apiHandler";
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getToken } from "next-auth/jwt";

export default apiHandlerWithContextDomain<string>(
  async (req, res) => {
    if (req.method !== "POST") throw new Error("Method not allowed");

    const session = await getServerSession(req, res, authOptions);
    const token = await getToken({ req })

    console.log(session)
    console.log("Session", JSON.stringify(session, null, 2))

    console.log(token)
    console.log("token", JSON.stringify(token, null, 2))

    // const authDomain = req.context?.domain?.auth;
    // if (authDomain === undefined)
    //   throw new Error("Invalid Auth domain initialization.");

    // const response = await authDomain.login(req.body);

    return res.status(200).send("response");
  }
);
