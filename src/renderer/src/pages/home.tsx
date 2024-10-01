import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { InfoCircledIcon } from '@radix-ui/react-icons'

export function Home() {
  const { data, isPending } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const response = await window.api.fetchAllCustomers()

      return response
    }
  })

  // async function handleAdd() {
  //   const response = await window.api.fetchAllCustomers()
  //   console.log(response)
  // }

  // async function handleCustomerById() {
  //   const docId = '9317b9d9-600e-444f-aef8-309584e6c0cb'
  //   const response = await window.api.fetchCustomerById(docId)
  //   console.log(response)
  // }

  // async function handleDelete() {
  //   const docId = '9317b9d9-600e-444f-aef8-309584e6c0cb'
  //   const response = await window.api.deleteCustomer(docId)
  //   console.log(response)
  // }

  return (
    <div className="flex flex-1 flex-col py-5 text-white lg:items-center">
      <div className="px-7 py-5">
        <h1 className="text-2xl font-semibold mb-4">Todos os Clientes</h1>
      </div>

      <section className="flex flex-col gap-6 w-full h-screen overflow-y-auto px-7 pb-[200px] lg:items-center">
        {!isPending && data?.length === 0 && (
          <p className="text-center text-base lg:text-lg font-semibold text-gray-100/60 select-none">
            Nenhum cliente cadastrado...
          </p>
        )}
        {data?.map((customer) => (
          <Link
            to={`/details/${customer._id}`}
            className="w-full flex lg:items-center lg:justify-center"
          >
            <div
              key={customer._id}
              className="bg-gray-800 hover:bg-gray-700 transition-colors duration-200 cursor-pointer p-4 rounded flex flex-col w-full lg:w-[40%]"
            >
              <div className="flex flex-row items-center justify-between">
                <p className="text-lg font-semibold mb-2">{customer.name}</p>
                <InfoCircledIcon className="w-6 h-6 text-gray-100/60" />
              </div>
              <p>
                <span className="font-semibold">Email: </span>
                {customer.email}
              </p>
              {customer.phone && (
                <p>
                  <span className="font-semibold">Telefone: </span>
                  {customer.phone}
                </p>
              )}
            </div>
          </Link>
        ))}
      </section>
    </div>
  )
}
