import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function name() {
	const works = await prisma.coursework.findMany();
	return (
		<div className="h-20 bg-red-600">
			<h1>All Courses</h1>
			<ul>
				{works.map((w) => (
					<li key={w.id}>{w.question} : {w.answer}</li>
				))}
			</ul>
		</div>
	);
}
