import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) redirect(302, "/login");
	if (event.locals.user.firstTimeSetup) redirect(302, "/setup")
		
    console.log(event.locals.user)

	return {
		username: event.locals.user.username,
        picture: event.locals.user.googlePicture
	};
};