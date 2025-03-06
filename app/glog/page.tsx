

// import { signIn } from "next-auth/react"

// export default async function GlogPage()
// {
//     return (
//         <form
//           action={async () => {
//             "use server"
//             await signIn("google")
//           }}
//         >
//           <button type="submit">Signin with Google</button>
//         </form>
//       )
// }
"use client"

import { signIn } from "next-auth/react"
 
export default function SignIn() {
  return <button onClick={() => signIn("google")}>Click Me!</button>
}