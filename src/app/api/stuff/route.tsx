const map: Record<string, string> = {}

export async function GET() {
  return Response.json({ okay: true })
}

export async function POST(req: Request) {
  const data = await req.json()

  console.log({ url: data.url })
  map[data.url] = data.url
  console.log({ map })

  return Response.json({ okay: 'post' })
}
