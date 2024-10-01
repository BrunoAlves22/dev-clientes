import { ArrowLeftIcon, TrashIcon } from '@radix-ui/react-icons'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/button'
import { toast, Zoom } from 'react-toastify'

export function Details() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { data, isFetching } = useQuery({
    queryKey: ['customer'],
    queryFn: async () => {
      const response = await window.api.fetchCustomerById(id as string)

      return response
    }
  })

  const { isPending, mutateAsync: handleDeleteCustomer } = useMutation({
    mutationFn: async (id: string) => {
      try {
        await window.api.deleteCustomer(id)
        toast.success('Cliente deletado com sucesso', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Zoom
        })
      } catch (error) {
        toast.error('Erro ao deletar cliente', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Zoom
        })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      navigate('/')
    }
  })

  return (
    <main className="flex flex-1 flex-col py-5 px-7 text-white gap-2">
      <Link
        to="/"
        className="rounded-full p-1 w-fit hover:bg-gray-600 transition-colors duration-300 flex flex-row gap-5 items-center"
      >
        <ArrowLeftIcon className="w-6 h-6" />
        {/* <span className="text-lg font-medium">Voltar</span> */}
      </Link>

      <h1 className="text-white font-semibold text-2xl mb-4 text-center">Detalhes do Cliente</h1>

      <section className="flex flex-col gap-6 w-full items-center justify-center lg:mt-20">
        {!isFetching && data && (
          <article className="flex flex-col gap-1 w-full lg:w-[40%]">
            <section className="bg-gray-800 rounded px-4 py-3">
              <div className="flex flex-row items-center justify-between">
                <p className="text-lg font-semibold mb-2">{data.name}</p>

                <Button
                  onClick={() => handleDeleteCustomer(data._id)}
                  disabled={isPending}
                  className="rounded-full p-1 w-fit hover:bg-red-600 transition-colors duration-300 bg-gray-800"
                >
                  <TrashIcon className=" w-6 h-6 cursor-pointer" />
                </Button>
              </div>

              <p>
                <span>
                  <span className="font-semibold">Email: </span>
                  {data.email}
                </span>
              </p>

              {data.phone && (
                <p>
                  <span>
                    <span className="font-semibold">Telefone: </span>
                    {data.phone}
                  </span>
                </p>
              )}

              {data.address && (
                <p>
                  <span>
                    <span className="font-semibold">Endereço: </span>
                    {data.address}
                  </span>
                </p>
              )}
            </section>

            <section className="bg-gray-800 rounded px-4 py-3">
              <p>
                <span>
                  <span className="font-semibold">Cargo: </span>
                  {data.role}
                </span>
              </p>

              <p>
                <span>
                  <span className="font-semibold">Status: </span>
                  {data.status ? 'Ativo' : 'Inativo'}
                </span>
              </p>
            </section>
          </article>
        )}
      </section>
    </main>
  )
}
