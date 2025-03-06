import { NextRequest, NextResponse } from "next/server";
import { loadAllEvents } from "@/lib/database";

export async function GET(request: NextRequest)
{
    // const password = request.headers.get("Authorization");

    // if (password != "skibiditoilet")
    // {
    //     return NextResponse.json({error: "No No No"}, {status: 401});
    // }

    // const a = request.nextUrl.searchParams.get("a")!;
    // const b = request.nextUrl.searchParams.get("b")!;

    // return NextResponse.json({ result: Number.parseInt(a) + Number.parseInt (b)} );
    const events = await loadAllEvents();
    return NextResponse.json({events: events});
}