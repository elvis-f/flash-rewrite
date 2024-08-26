import type { Actions, PageServerLoad } from './$types';
import { findUsername } from "$lib/server/utils/findUsername";
import { db_client } from '$lib/server/db_client';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	return {
		rand_username: await findUsername()
	};
};

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');

		// TODO: Sanitize and check the username for illegal values

		let user_id = event.locals.user?.id

		if (!user_id){
			console.log("error with login state")
			return
		}

		if (typeof username !== "string"){
			console.log("error with username")
			return
		}

		let result = await db_client.user.update({
			where: { id: user_id },
			data: { username: username, first_time_setup: false }
		})

		if(result) {
			// db_client.user.update({
			// 	where: { id: user_id },
			// 	data: { first_time_setup: false }
			// })
			return (redirect(302, "/profile"))
		}else{
			return ({ success: false })
		}
	},
} satisfies Actions;