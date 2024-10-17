import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { createGuest, getGuest } from "./data-service"


const authConfig ={
    providers:[
        Google({
            clientId : process.env. AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
       
    ],
    callbacks :{ 

        authorized({auth,request}){
            return !! auth?.user
        },
      async signIn({user,account,profile}){
            try{
              const existingGuest = await getGuest(user.email)
              if(!existingGuest) await createGuest(
                {
                 fullName: user.name,
                 email: user.email,
              })
              return true;
        }catch{
                 return false;
        }
    },
    async session({session,user}){
        const guest= await getGuest(session.user.email)
        session.guestId = guest.id;
        return session;
    }
},
    pages: {
        signIn: "/login",

},
}

export const 
{auth,handlers:{GET,POST},signIn,signOut}=NextAuth(authConfig)
