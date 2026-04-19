import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getPostHogClient } from "@/lib/posthog-server";

export async function DELETE(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const id = searchParams.get("id");
  await prisma.document.delete({
		where: {
			id: id || "",
		},
	});

  const distinctId = request.headers.get("x-posthog-distinct-id") ?? "anonymous";
  const posthog = getPostHogClient();
  posthog.capture({
    distinctId,
    event: "document_deleted",
    properties: { document_id: id },
  });

  return NextResponse.json({ message : "Document Deleted"});
}
