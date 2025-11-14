import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function name() {
	const works = await prisma.coursework.findMany();
	return (
		<div className="h-20 bg-red-600">
			<h1>All Courses(0)</h1>
			<ul>
				{works.map((w) => (
          <Link href={`/dashboard/test/${w.question}`} key={w.id}>
            <li>
            {w.question} : {w.answer}
          </li>
          </Link>
				))}
			</ul>
		</div>
	);
}
