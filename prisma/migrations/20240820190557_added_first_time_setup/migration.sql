-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "google_id" TEXT NOT NULL,
    "google_picture" TEXT NOT NULL,
    "first_time_setup" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_User" ("google_id", "google_picture", "id", "username") SELECT "google_id", "google_picture", "id", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_google_id_key" ON "User"("google_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
