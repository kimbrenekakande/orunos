import { NextRequest, NextResponse } from "next/server";
import { flw } from "@/lib/flutterwave";

export async function POST( request: NextRequest) { 
  
  const body = await request.json();
  if (!body) return NextResponse.json({error :"payment details needed"}, {status : 400})

  const payload = {
    tx_ref: `MC-${Date.now()}`,
    amount: "10000",
    email: "kimbrenekakande@gmail.com",
    phone_number: "054709929220", // test number for MTN Uganda
    currency: "UGX",
    fullname: "kimbrene kakande",
    redirect_url: "http://localhost:3000/dashboard/billing",
    network: "MTN",
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