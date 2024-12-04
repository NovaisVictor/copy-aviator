/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'

let clients: Array<ReadableStreamDefaultController<any>> = []

// Função para enviar dados para todos os clientes conectados
export const sendEvent = (data: any) => {
  clients.forEach((client) => {
    client.enqueue(`data: ${JSON.stringify(data)}\n\n`)
  })
}

export async function GET(req: Request) {
  // Criar um ReadableStream para enviar eventos
  const stream = new ReadableStream({
    start(controller) {
      // Adicionar o controlador à lista de clientes
      clients.push(controller)

      // Remover o cliente da lista quando a conexão for fechada
      req.signal.addEventListener('abort', () => {
        clients = clients.filter((c) => c !== controller)
      })
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}

// Adicione uma função POST para receber dados do webhook e enviar para os clientes SSE
export async function POST(req: Request) {
  const data = await req.json()
  sendEvent(data) // Enviar dados para os clientes conectados
  return NextResponse.json({ message: 'Dados enviados para os clientes' })
}