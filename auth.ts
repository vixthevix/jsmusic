import NextAuth from "next-auth"
import neon from '@auth/neon-adapter'
import NeonAdapter from "@auth/neon-adapter";
import { Pool } from "@neondatabase/serverless";
import Google from "next-auth/providers/google"

const dburl = process.env.DATABASE_URL!;


export const {auth, handlers} = NextAuth(() => {
    const pool = new Pool({connectionString: dburl})
    return {
        providers: [Google], 
        adapter: NeonAdapter(pool)
    }
});