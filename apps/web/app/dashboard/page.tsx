import { serverSession } from "@/lib/server-session";
import { redirect } from "next/navigation";
import TemplateGallery from "@/components/ui/templates";
import { TableView } from "@/components/ui/table-view";
import { Button } from "@/components/tiptapui/button";
import { verifyEmail } from "./verify";

export default async function Home() {
  const session = await serverSession();
  const user = session?.user;
  if (!user) redirect("/login");
  console.log(user);
  
  return (
    <div className="px-4">
      <div className="mx-8 text-2xl">
        <h2 className="text-2xl  mt-16">Welcome Back, {user.name} </h2>
        {!user.emailVerified &&
          <section className="my-8">
            <div className="h-px w-full bg-orange-500/50"></div>
            <div className="h-full w-full flex justify-between py-2 flex place-items-center-safe">
              <p className="text-sm md:text-base">You need to verify your email</p>
              <Button onClick={verifyEmail} className="cursor-pointer">Verify</Button>
            </div>
            <div className="h-px w-full bg-orange-500/50"></div>
          </section>
        }
      </div>

      <TemplateGallery />
      <div className=" mx-8">
        <h2>Recent Papers</h2>
        <TableView user={user} />
      </div>
    </div>
  );
}
