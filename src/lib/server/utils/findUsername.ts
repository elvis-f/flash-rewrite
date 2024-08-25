import { db_client } from "../db_client";
import { generateRandomCombination } from "./generateRandomUsername";

export const findUsername = async () => {
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

    console.log(username);
    return username;
};
