import TemplateGallery from '@/components/ui/templates'
import{TableView} from '@/components/ui/table-view'



function Home() {
  return (
    <div className='px-4'>
      <TemplateGallery/>
      <div className='mt-4 mx-8'>
        <h2>Recent Papers</h2>
        <TableView/>
      </div>
    </div>
  )
}

export default Home