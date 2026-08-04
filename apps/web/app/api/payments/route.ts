import { NextRequest, NextResponse } from "next/server";
import { flw } from "@/lib/flutterwave";
import baseUrl from "@/lib/base-url";
import { serverSession } from "@/lib/server-session";

export async function POST(request: NextRequest) {

  const session = await serverSession();
  const user = session?.user;
  
  const body = await request.json();
  if (!body) return NextResponse.json({ error: "payment details needed" }, { status: 400 })


  const payload = {
    tx_ref: `MC-${Date.now()}`,
    amount: body.amount,
    email: user?.email,
    phone_number: "054709929220", // test number for MTN Uganda
    currency: "UGX",
    fullname: user?.name,
    redirect_url: `${baseUrl}/dashboard/billing`,
    network: body.network,
  };

  try {
    const response = await flw.MobileMoney.uganda(payload)
    console.log(response);
    if (response.status === "success") return NextResponse.json({ status: response.status, authUrl: response.meta.authorization.redirect})
  } catch (error) {
    console.log(error)                       
    return NextResponse.json({ error : error } ,{ status: 400 });
  }                            
}