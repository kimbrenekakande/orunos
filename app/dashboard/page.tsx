import { serverSession } from "@/lib/server-session";
import { redirect } from "next/navigation";
import TemplateGallery from '@/components/ui/templates'
import{TableView} from '@/components/ui/table-view'


export default async function Home() {
	const session = await serverSession();
	const user = session?.user;
	if (!user) redirect('/login')
  console.log(user)
    

  return (
    <div className='px-4'>
      <div className="mx-8 text-2xl mb--2">
        <h2>Welcome  {user.name}</h2>
        <p>{user.wallet} UGX</p>
      </div>
      
      <TemplateGallery/>
      <div className='mt-4 mx-8'>
        <h2>Recent Papers</h2>
        <TableView/>
      </div>
    </div>
  )
}
