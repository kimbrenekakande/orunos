import TemplateGallery from '@/components/ui/templates'
import { DataTable } from "@/components/dashboard/data-table"
import data from "@/lib/data.json"
import { userSession } from '@/lib/session'
import { unauthorized } from 'next/navigation'



async function Home() {
  const session = await userSession()
  const user = session?.user;
  if (!user) unauthorized()
  console.log(user)

  return (
    <div className='px-4'>
      <h2>Welcome {user.name}</h2>
      <TemplateGallery/>
      <DataTable data={data} />
    </div>
  )
}

export default Home