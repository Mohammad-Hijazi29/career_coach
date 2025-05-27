import { db } from "@/firebase/admin";
import { NextResponse } from 'next/server';
import {getCurrentUser} from "@/lib/actions/auth.action"

export async function GET() {
    return Response.json( {success: true, data: 'THANK YOU!'}, {status:200} )
}


export async function POST(req: Request) {
  const body = await req.json();

  try {
    const { role, type, amount, questions } = body;
    
    const user = await getCurrentUser();

    await db.collection('interviews').add({
      userId : user?.id,
      creator: user?.name,
      role,
      type,
      amount,
      questions,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error saving template:', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}