import { db_client } from '$lib/server/db_client';
import type { RequestHandler } from '@sveltejs/kit';
import { generateRandomCombination } from "$lib/server/utils/generateRandomUsername";

const findUsername = async () => {
    let username = "";

    do {
        let temp_username = generateRandomCombination();

        let result = await db_client.user.findFirst({
            where: {
                username: temp_username
            }
        });

        if (!result) {
            username = temp_username;
        }
    }
    while (username == "");

    return username;
};

export const GET: RequestHandler = async ({ url }) => {
    const username = await findUsername();

    console.log(username);
    return new Response(JSON.stringify({ username: username }), { status: 200 });
};