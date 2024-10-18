ALTER TABLE `attendde` RENAME COLUMN "name" TO "full_name";--> statement-breakpoint
ALTER TABLE `attendde` DROP COLUMN `last_name`;--> statement-breakpoint
ALTER TABLE `booking` DROP COLUMN `phone`;