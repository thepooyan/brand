import { Elysia } from 'elysia'
import { chatRequestSchema, chatHandler as chatRequestHandler } from '~/server/api/chat';

const app = new Elysia({ prefix: '/api' })
    .post('/chat', chatRequestHandler, chatRequestSchema)

const handle = ({ request }: { request: Request }) => app.handle(request);

export const GET = handle;
export const POST = handle;

export type App = typeof app;

