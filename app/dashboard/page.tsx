import TemplateGallery from '@/components/ui/templates'
import { DataTable } from "@/components/dashboard/data-table"
import data from "@/lib/data.json"



function Home() {
  return (
    <div className='px-4'>
      <TemplateGallery/>
      <DataTable data={data} />
    </div>
  )
}

export default Home