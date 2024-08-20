import { PrismaAdapter } from "@lucia-auth/adapter-prisma";

import { Lucia } from "lucia";
import { dev } from "$app/environment";

import { Google } from "arctic";
import 'dotenv/config'

export const google = new Google(process.env.AUTH_GOOGLE_ID, process.env.AUTH_GOOGLE_SECRET, "http://localhost:5173/login/google/callback")

import { db_client } from "./db_client";
const adapter = new PrismaAdapter(db_client.session, db_client.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	},
    getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			googleId: attributes.google_id,
			username: attributes.username,
            googlePicture: attributes.google_picture,
			firstTimeSetup: attributes.first_time_setup
		};
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	google_id: number;
	username: string;
    google_picture: string;
	first_time_setup: boolean;
}