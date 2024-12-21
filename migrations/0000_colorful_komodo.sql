CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text,
	`title` text,
	`content` text,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `slug_idx` ON `posts` (`slug`);--> statement-breakpoint
CREATE INDEX `title_idx` ON `posts` (`title`);