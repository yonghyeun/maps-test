import type { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  console.log(body);

  return new Response(JSON.stringify(body), {
    headers: { 'Content-Type': 'application/json' },
  });
};
