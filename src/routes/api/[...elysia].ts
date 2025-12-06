import { Elysia } from 'elysia'
import { chatRoute } from '~/server/api/chat';


const app = new Elysia({ prefix: '/api' })
.use(chatRoute)

const handle = ({ request }: { request: Request }) => app.handle(request);

export const GET = handle;
export const POST = handle;

export type App = typeof app;

