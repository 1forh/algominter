import 'server-only';

import { NextResponse } from 'next/server';
import { Schema } from 'zod';

export const NoAccessResponse = new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

export const ResponseError = (error: any) => {
  let message = 'An unknown error occurred';
  if (typeof error === 'string') {
    message = error;
  } else if (error.message) {
    message = error.message;
  }
  console.log(error);
  return new Response(JSON.stringify({ message }), { status: 500 });
};

export const ResponseJSON = (data: any) => NextResponse.json(data);

export const getParams = (request: Request) => {
  const params = new URL(request.url).searchParams;
  if (!params) return {};
  return Object.fromEntries(params.entries()) || {};
};

export const safeData = async <ResultType>(zodSchema: Schema, request: Request) => {
  const json = await request.json();
  const safeInput = zodSchema.safeParse(json);
  if (!safeInput.success) throw safeInput.error.message;
  return safeInput.data as ResultType;
};
