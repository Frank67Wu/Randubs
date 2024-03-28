-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "codeName" TEXT NOT NULL,
    "gamesWon" INTEGER NOT NULL DEFAULT 0,
    "gamesLost" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Duo" (
    "id" TEXT NOT NULL,
    "characterOneCodeName" TEXT NOT NULL,
    "characterTwoCodeName" TEXT NOT NULL,
    "gamesWon" INTEGER NOT NULL DEFAULT 0,
    "gamesLost" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Duo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_codeName_key" ON "Character"("codeName");

-- AddForeignKey
ALTER TABLE "Duo" ADD CONSTRAINT "Duo_characterOneCodeName_fkey" FOREIGN KEY ("characterOneCodeName") REFERENCES "Character"("codeName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Duo" ADD CONSTRAINT "Duo_characterTwoCodeName_fkey" FOREIGN KEY ("characterTwoCodeName") REFERENCES "Character"("codeName") ON DELETE RESTRICT ON UPDATE CASCADE;
