import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    let user = event.locals.user 

	if (!user) redirect(302, "/login");
	if (user.firstTimeSetup) redirect(302, "/setup")
		
    console.log(user)

	return {
		user: user
	};
};