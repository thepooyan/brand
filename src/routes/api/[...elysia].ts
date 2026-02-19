import { Elysia } from 'elysia'
import { chatRoute } from '@/server/api_routers/chat';
import { openapi } from '@elysiajs/openapi'
import { getPublicSettings } from '~/server/api_routers/getPublicSetting';


const app = new Elysia({ prefix: '/api' })
.use(chatRoute)
.use(getPublicSettings)
.use(openapi())

const handle = ({ request }: { request: Request }) => app.handle(request);

export const GET = handle;
export const POST = handle;
export const OPTIONS = handle;

export type App = typeof app;

