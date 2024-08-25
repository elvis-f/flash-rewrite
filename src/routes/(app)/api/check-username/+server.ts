import { db_client } from '$lib/server/db_client';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
    const username = url.searchParams.get('username');

    if (!username) {
        return new Response(JSON.stringify({ available: false, error: 'No username provided' }), { status: 400 });
    }

    const userExists = await checkUsernameInDatabase(username);

    if (userExists) {
        return new Response(JSON.stringify({ available: false }), { status: 200 });
    }

    return new Response(JSON.stringify({ available: true }), { status: 200 });
};

async function checkUsernameInDatabase(username: string) {
    return await db_client.user.findFirst({
        where: {
            username: username
        }
    })
}