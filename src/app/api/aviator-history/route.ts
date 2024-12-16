'use server'
import { z } from 'zod'

// Define o esquema para um único objeto de histórico
const aviatorHistorySchema = z.object({
  id: z.string(),
  valor: z.string(),
  created_at: z.string().datetime(), // Validação para formato de data
})

// Define o esquema para um array de objetos de histórico
const aviatorHistoryArraySchema = z.array(aviatorHistorySchema)

export async function GET() {
  try {
    // Fazendo o fetch para obter os dados do endpoint
    const response = await fetch(
      'https://n8n.sortenabetferramentas.online/webhook/2f249b4a-31a2-4163-b802-dadde415733f',
    )

    if (!response.ok) {
      throw new Error('Erro ao buscar dados do webhook')
    }

    const data = await response.json()

    // Valida o array de históricos
    const aviatorHistory = aviatorHistoryArraySchema.parse(data)

    const lastFive = aviatorHistory.slice(0, 5) // Obtém os 5 primeiros elementos

    // Inicializa um contador para a sequência
    let consecutiveCount = 0
    let allInRangePurple = false
    let entranceValue = 0
    // Percorre os 6 elementos
    for (const event of lastFive) {
      const valor = parseFloat(event.valor)

      if (valor > 10) {
        allInRangePurple = false
      }

      if (consecutiveCount === 0) {
        entranceValue = valor // Armazena o primeiro valor da sequência
      }
      // Verifica se o valor está no intervalo desejado
      if (valor >= 2.0 && valor <= 9.99) {
        consecutiveCount++ // Aumenta o contador se o valor estiver no intervalo

        // Se já temos 3 em sequência, podemos definir allInRangePurple como true
        if (consecutiveCount >= 3) {
          allInRangePurple = true
          break // Sai do loop, pois já encontramos a sequência
        }
      } else {
        // Reseta o contador se o valor não estiver no intervalo
        consecutiveCount = 0
      }
    }

    const lastSix = aviatorHistory.slice(0, 6) // Obtém os 6 primeiros elementos

    let entranceValueBlue = 0 // Para armazenar o valor do primeiro elemento da sequência azul
    let isPatternBlueBroken = false // Para indicar se o padrão azul foi quebrado

    for (let i = 0; i < lastSix.length; i++) {
      const valor = parseFloat(lastSix[i].valor)

      if (valor > 10) {
        isPatternBlueBroken = false
      }

      if (valor >= 2.0 && valor < 10.0) {
        entranceValueBlue = valor // Armazena o valor do primeiro elemento da sequência

        if (i + 3 < lastSix.length) {
          const nextThreeValues = lastSix.slice(i + 1, i + 4) // Pega os próximos 3 valores
          const allBelowTwo = nextThreeValues.every(
            (event) => parseFloat(event.valor) < 2.0,
          ) // Verifica se todos estão abaixo de 2.0

          if (allBelowTwo) {
            isPatternBlueBroken = true // O padrão azul foi quebrado
            break // Sai do loop, pois já encontramos a sequência
          }
        }
      }
    }
    // Inicializa a resposta padrão
    let responsePayload = {
      entrance: 0,
      loading: true,
      standart: '',
    }

    // Verifica padrões
    if (allInRangePurple) {
      responsePayload = {
        entrance: entranceValue,
        loading: false,
        standart: 'Padrão Sequencial de Roxo',
      }
    } else if (isPatternBlueBroken) {
      responsePayload = {
        entrance: entranceValueBlue,
        loading: false,
        standart: 'Padrão Quebra de Sequencial',
      }
    }

    // Retorna a resposta
    return new Response(
      JSON.stringify({ status: 'success', ...responsePayload }),
      { status: 200 },
    )
  } catch (error) {
    console.error('Erro ao processar o webhook:', error)

    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          status: 'error',
          message: 'Erro de validação',
          issues: error.errors,
        }),
        { status: 400 },
      )
    }

    return new Response(
      JSON.stringify({
        status: 'error',
        message: 'Erro inesperado ao processar a solicitação',
      }),
      { status: 500 },
    )
  }
}
