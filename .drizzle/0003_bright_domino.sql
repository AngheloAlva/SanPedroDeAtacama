ALTER TABLE `booking` RENAME COLUMN "total_price" TO "total_price_clp";--> statement-breakpoint
ALTER TABLE `booking` ADD `total_price_usd` integer;--> statement-breakpoint
ALTER TABLE `booking` ADD `total_price_brl` integer;