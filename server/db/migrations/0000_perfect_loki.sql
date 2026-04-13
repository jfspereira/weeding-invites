CREATE TABLE `rsvp_submissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`submission_group_id` text NOT NULL,
	`guest_name` text NOT NULL,
	`is_attending` integer DEFAULT true NOT NULL,
	`phone_number` text,
	`dietary_restrictions` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
