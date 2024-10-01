import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Button } from '../components/button'
import { useNavigate } from 'react-router-dom'
import { toast, Zoom } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputMask from 'react-input-mask'

// Definindo o schema de validação usando Zod
const schema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().email('Formato de e-mail inválido'),
  role: z.string().min(1, 'O cargo é obrigatório'),
  phone: z.string().min(14, 'O telefone deve ter pelo menos 10 dígitos'),
  address: z.string().min(1, 'O endereço é obrigatório')
})

type DataMutation = z.infer<typeof schema>

export function Create() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // Configurando o react-hook-form com o zodResolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<DataMutation>({
    resolver: zodResolver(schema)
  })

  const { mutateAsync: createCustomer } = useMutation({
    mutationFn: async (data: DataMutation) => {
      await window.api
        .addCustomer({
          ...data,
          status: true
        })
        .then(() => {
          toast.success('Cliente cadastrado com sucesso', {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Zoom
          })
          navigate('/')
        })
        .catch((error) => {
          toast.error('Erro ao cadastrar cliente', {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Zoom
          })
        })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
    }
  })

  const onSubmit = async (data: DataMutation) => {
    await createCustomer(data)
  }

  const onError = (errors: any) => {
    toast.error('Preencha todos os campos corretamente.', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light'
    })
  }

  return (
    <div className="flex w-full h-full flex-col py-5 px-7 gap-8 overflow-y-auto">
      <section className="flex w-full h-full flex-col items-center lg:mt-20">
        <h1 className="text-white font-semibold text-2xl">Cadastrar Cliente</h1>

        <form
          className="w-full max-w-96 lg:max-w-lg mt-4"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className="mb-2">
            <label htmlFor="name" className="text-white">
              Nome:
            </label>
            <input
              id="name"
              type="text"
              className="w-full bg-gray-800 p-2 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Digite seu nome"
              {...register('name')}
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div className="mb-2">
            <label htmlFor="email" className="text-white">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="w-full bg-gray-800 p-2 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Digite seu email"
              {...register('email')}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          <div className="mb-2">
            <label htmlFor="role" className="text-white">
              Cargo:
            </label>
            <input
              id="role"
              type="text"
              className="w-full bg-gray-800 p-2 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Digite seu cargo"
              {...register('role')}
            />
            {errors.role && <p className="text-red-500">{errors.role.message}</p>}
          </div>

          <div className="mb-2">
            <label htmlFor="phone" className="text-white">
              Telefone:
            </label>
            <InputMask
              id="phone"
              type="tel"
              mask="(99) 99999-9999" // Máscara para número de telefone brasileiro
              className="w-full bg-gray-800 p-2 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Digite seu telefone"
              {...register('phone')}
            />
            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="text-white">
              Endereço:
            </label>
            <input
              id="address"
              type="text"
              className="w-full bg-gray-800 p-2 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Digite seu endereço"
              {...register('address')}
            />
            {errors.address && <p className="text-red-500">{errors.address.message}</p>}
          </div>

          <Button
            type="submit"
            className="w-full mt-4 bg-sky-600 hover:bg-sky-700 transition-colors duration-200 disabled:bg-gray-500"
            disabled={isSubmitting}
          >
            Cadastrar
          </Button>
        </form>
      </section>
    </div>
  )
}
