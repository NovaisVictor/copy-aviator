'use client'

import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

type AviatorSignal = {
  standart: string
  entrance: number
  loading: boolean
}
export function SignalComponent() {
  const [data, setData] = useState<AviatorSignal>({
    standart: 'Analisando',
    entrance: 0,
    loading: true,
  })

  useEffect(() => {
    const fetchSignalData = async () => {
      try {
        const response = await fetch('/api/aviator-history') // Substitua pelo seu endpoint
        if (!response.ok) {
          throw new Error('Erro ao buscar dados do sinal')
        }
        const result = await response.json()
        setData({
          standart: result.standart,
          entrance: result.entrance,
          loading: result.loading,
        })
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error)
        // Você pode definir um estado de erro aqui se desejar
      }
    }

    fetchSignalData()

    // Opcional: configurar um intervalo para buscar dados a cada X segundos
    const interval = setInterval(fetchSignalData, 1000) // 10 segundos

    // Limpeza do intervalo ao desmontar o componente
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gray-900 text-white py-6 px-4 rounded-lg shadow-lg max-w-md mx-auto">
      <div className="mb-4">
        <h2 className="text-lg font-bold">Entrar após:</h2>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <span className="text-2xl">
            {data.entrance <= 0 ? (
              <div className="flex items-center justify-center gap-2">
                <p>Analisando padrão..</p>
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              `${data.entrance}x`
            )}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold">Estratégia:</h2>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <span>
            {data.loading ? (
              <div className="flex items-center justify-center gap-2">
                <p>Analisando padrão..</p>
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              data.standart
            )}
          </span>
        </div>
      </div>

      <div className="flex justify-between gap-2 mb-8">
        <div className="w-full">
          <h2 className="text-lg font-bold">Proteções:</h2>
          <div className="bg-gray-800 flex items-center justify-center rounded-lg text-center h-full">
            <span className="text-white">Até 3 proteções</span>
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-lg font-bold">Sair após:</h2>
          <div className="bg-gray-800 flex items-center justify-center rounded-lg text-center h-full">
            <div className="flex justify-center w-full">
              <div className="text-xs px-1 text-start">
                <span className="block">
                  Protetora: <span className="text-green-500">2x</span>
                </span>
                <span className="block">
                  Potencializadora: <span className="text-pink-500">10x</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
