import { OAuth2RequestError, generateCodeVerifier } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { google, lucia } from "$lib/server/auth";
import { db_client } from "$lib/server/db_client";

import type { RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get("code");
	const state = event.url.searchParams.get("state");
    const storedCodeVerifier = event.cookies.get("code_verifier") ?? null;
	const storedState = event.cookies.get("google_oauth_state") ?? null;

    if (!code || !state || !storedState || state !== storedState || !storedCodeVerifier) {
		return new Response(null, {
			status: 400
		});
	}

    // I am dead inside, I hate doing auth stuff

	try {
		const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);

        console.log(tokens.accessToken)

		const googleUserResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        });
        const googleUserResponseJson = await googleUserResponse.json();
        
        const googleUser: GoogleUser = {
            id: googleUserResponseJson.sub,
            login: googleUserResponseJson.given_name,
            picture: googleUserResponseJson.picture,
        }

		const existingUser = await db_client.user.findUnique({
            where: {
              google_id: googleUser.id,
            },
          });

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: ".",
				...sessionCookie.attributes
			});
		} else {
			const userId = generateIdFromEntropySize(10); // 16 characters long

            await db_client.user.create({
                data: {
                  id: userId,
                  google_id: googleUser.id,
                  username: googleUser.login,
                  google_picture: googleUser.picture,
				  first_time_setup: true
                },
              });

			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: ".",
				...sessionCookie.attributes
			});
		}
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/"
			}
		});
	} catch (e) {
		// the specific error message depends on the provider
        console.log(e)

		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
}

interface GoogleUser {
	id: string;
	login: string;
    picture: string;
}
