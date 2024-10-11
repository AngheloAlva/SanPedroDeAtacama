CREATE TABLE `attendde` (
	`id` text PRIMARY KEY NOT NULL,
	`booking_item_id` text NOT NULL,
	`name` text NOT NULL,
	`last_name` text NOT NULL,
	`country` text NOT NULL,
	`age` text NOT NULL,
	`document_number` text NOT NULL,
	`food_preference` text,
	FOREIGN KEY (`booking_item_id`) REFERENCES `booking_item`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `booking_item` (
	`id` text PRIMARY KEY NOT NULL,
	`booking_id` text NOT NULL,
	`excursion_id` text,
	`program_id` text,
	`price` integer NOT NULL,
	`date` text NOT NULL,
	`people_count` integer NOT NULL,
	`accommodation` text NOT NULL,
	`comment` text,
	FOREIGN KEY (`booking_id`) REFERENCES `booking`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`excursion_id`) REFERENCES `excursion`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`program_id`) REFERENCES `program`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `booking` (
	`id` text PRIMARY KEY NOT NULL,
	`total_price` integer,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `excursion_translation` (
	`id` text PRIMARY KEY NOT NULL,
	`locale` text NOT NULL,
	`title` text,
	`description` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`cancelation` text,
	`guide` text,
	`includes` text,
	`duration` text,
	`what_will_you_do` text,
	`in_detail` text,
	`what_includes` text,
	`what_you_should_bring` text,
	`meeting_point` text,
	`faq` text,
	`excursion_id` text NOT NULL,
	FOREIGN KEY (`excursion_id`) REFERENCES `excursion`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `excursion` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`price` integer NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`images` text,
	`days_not_available` text,
	`blocked_dates` text,
	`zone_id` text NOT NULL,
	FOREIGN KEY (`zone_id`) REFERENCES `zone`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `excursion_slug_unique` ON `excursion` (`slug`);--> statement-breakpoint
CREATE TABLE `payment` (
	`id` text PRIMARY KEY NOT NULL,
	`booking_id` text NOT NULL,
	`payment_provider` text,
	`payment_status` text DEFAULT 'pending' NOT NULL,
	`transaction_id` text,
	`ammount` integer,
	`user_tax` integer,
	`currency` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`booking_id`) REFERENCES `booking`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `program_translation` (
	`id` text PRIMARY KEY NOT NULL,
	`locale` text NOT NULL,
	`title` text,
	`description` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`itinerary` text,
	`cancelation` text,
	`guide` text,
	`includes` text,
	`duration` text,
	`what_includes` text,
	`what_not_includes` text,
	`what_you_should_bring` text,
	`meeting_point` text,
	`program_id` text NOT NULL,
	FOREIGN KEY (`program_id`) REFERENCES `program`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `program` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`price` integer NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`images` text,
	`days_not_available` text,
	`blocked_dates` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `program_slug_unique` ON `program` (`slug`);--> statement-breakpoint
CREATE TABLE `zone_translation` (
	`id` text PRIMARY KEY NOT NULL,
	`locale` text NOT NULL,
	`name` text,
	`description` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	`zone_id` text NOT NULL,
	FOREIGN KEY (`zone_id`) REFERENCES `zone`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `zone` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `zone_slug_unique` ON `zone` (`slug`);