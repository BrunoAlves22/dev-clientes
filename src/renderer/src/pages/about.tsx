import { useQuery } from '@tanstack/react-query'

export function About() {
  const { data } = useQuery({
    queryKey: ['appVersion'],
    queryFn: async () => {
      const response = await window.api.appVersion()
      return response
    }
  })

  return (
    <div className="flex flex-1 flex-col py-5 px-7 text-white gap-2 mt-20">
      <h1 className="text-white font-semibold text-2xl mb-4 text-center">Sobre</h1>

      <p className="text-center">
        Projeto criado no curso <b>@SujeitoProgramador</b>
      </p>

      <p className="text-center">Versão atual do Projeto: {data}</p>
    </div>
  )
}
