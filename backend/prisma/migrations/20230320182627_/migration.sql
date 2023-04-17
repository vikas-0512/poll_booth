-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teams` (
    `teamid` INTEGER NOT NULL AUTO_INCREMENT,
    `teamname` VARCHAR(191) NOT NULL,
    `creater` INTEGER NOT NULL,

    PRIMARY KEY (`teamid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members` (
    `userid` INTEGER NOT NULL,
    `teamid` INTEGER NOT NULL,

    UNIQUE INDEX `members_userid_teamid_key`(`userid`, `teamid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `polls` (
    `pollid` INTEGER NOT NULL AUTO_INCREMENT,
    `pollname` VARCHAR(191) NOT NULL,
    `des` VARCHAR(191) NOT NULL,
    `teamid` INTEGER NOT NULL,

    PRIMARY KEY (`pollid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `options` (
    `optionid` INTEGER NOT NULL AUTO_INCREMENT,
    `optionname` VARCHAR(191) NOT NULL,
    `pollid` INTEGER NOT NULL,
    `votes` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`optionid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `members` ADD CONSTRAINT `members_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `members` ADD CONSTRAINT `members_teamid_fkey` FOREIGN KEY (`teamid`) REFERENCES `teams`(`teamid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `polls` ADD CONSTRAINT `polls_teamid_fkey` FOREIGN KEY (`teamid`) REFERENCES `teams`(`teamid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `options` ADD CONSTRAINT `options_pollid_fkey` FOREIGN KEY (`pollid`) REFERENCES `polls`(`pollid`) ON DELETE RESTRICT ON UPDATE CASCADE;
