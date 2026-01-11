import { serverSession } from "@/lib/server-session";
import { redirect } from "next/navigation";
import TemplateGallery from "@/components/ui/templates";
import { TableView } from "@/components/ui/table-view";

export default async function Home() {
  const session = await serverSession();
  const user = session?.user;
  if (!user) redirect("/login");
  console.log(user);

  return (
    <div className="px-4">
      <div className="mx-8 text-2xl">
        <h2 className="text-2xl text-orange-700 mt-16">Welcome Back, {user.name} </h2>
      </div>

      <TemplateGallery />
      <div className=" mx-8">
        <h2>Recent Papers</h2>
        <TableView />
      </div>
    </div>
  );
}
