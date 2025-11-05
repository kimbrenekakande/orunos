import React from 'react'
import { DataTable } from "@/components/dashboard/data-table"
import data from "./data.json"

function courseworks() {
  return (
    <div className='pt-7'>
      <DataTable data={data} />
    </div>
    
  )
}

export default courseworks