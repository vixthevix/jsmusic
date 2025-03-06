import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);



export async function loadAllEvents()
{
    const result = sql("select * from events");
    return result;
}

export async function createEvent(name: string, desc: string, t0: string)
{
    await sql `
        insert into events(event_name, event_description, start_time) values${name},${desc},${t0}
    `
}
