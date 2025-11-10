import Link from "next/link";
import { prisma } from "@/prisma/db";

export default async function name() {
	const works = await prisma.coursework.findMany();
	return (
		<div className="h-20 bg-red-600">
			<h1>All Courses</h1>
			<ul>
				{works.map((w) => (
					<Link key={w.id} href={"#"}>
						<li>{w.question}</li>
					</Link>
				))}
			</ul>
		</div>
	);
}
