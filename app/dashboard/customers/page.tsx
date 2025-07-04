import {getCustomers } from '@/actions/action'



export default async function Page() {
const data = await getCustomers();


  return (
    <div>Customer page</div>
  )
}