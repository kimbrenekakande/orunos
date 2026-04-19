import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getPostHogClient } from "@/lib/posthog-server";

export async function POST(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const paperID = searchParams.get("id");
  const { update } = await request.json()
	
	await prisma.document.update({
		where: { id: paperID || "" },
		data: { answer: update },
	});

	const distinctId = request.headers.get("x-posthog-distinct-id") ?? "anonymous";
	const posthog = getPostHogClient();
	posthog.capture({
		distinctId,
		event: "document_saved",
		properties: { document_id: paperID },
	});

	return NextResponse.json({ status: true });
}
