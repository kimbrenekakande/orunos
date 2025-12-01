import TemplateGallery from "@/components/ui/templates";
import { DataTable } from "@/components/dashboard/data-table";
import data from "@/lib/data.json";
import { serverSession } from "@/lib/server-session";
import { redirect } from "next/navigation"; //or use unauthorized


async function Home() {
	const session = await serverSession();
	const user = session?.user;
	if (!user) redirect('/login')

	console.log(user);

	return (
		<div className="px-4">
			<h2>
				Ni hao, {user.name} of {user.institution}
			</h2>
			{!user.emailVerified && <h1>verify this shit bruh</h1>}
			<TemplateGallery />
			<DataTable data={data} />
		</div>
	);
}

export default Home;
