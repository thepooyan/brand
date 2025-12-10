import { Elysia } from 'elysia'
import { chatRoute } from '~/server/api/chat';
import { openapi } from '@elysiajs/openapi'


const app = new Elysia({ prefix: '/api' })
.use(chatRoute)
.use(openapi())

const handle = ({ request }: { request: Request }) => app.handle(request);

export const GET = handle;
export const POST = handle;

export type App = typeof app;

