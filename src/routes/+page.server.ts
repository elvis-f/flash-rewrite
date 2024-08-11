import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { db_client } from "$lib/server/db_client";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) redirect(302, "/login");
    console.log(event.locals.user)

	return {
		username: event.locals.user.username,
        picture: event.locals.user.googlePicture
	};
};