import { sqliteTable } from 'drizzle-orm/sqlite-core';
import * as t from 'drizzle-orm/sqlite-core';
import { generateUniqueString } from './utils';
import { updated } from '$app/stores';

const posts = sqliteTable(
	'posts',
	{
		id: t.int().primaryKey({ autoIncrement: true }),
		slug: t.text().$default(() => generateUniqueString(16)),
		title: t.text(),
		content: t.text(),
		created_at: t.int('created_at', { mode: 'timestamp' }).$default(() => new Date()),
		updated_at: t
			.int('updated_at', { mode: 'timestamp' })
			.$default(() => new Date())
			.$onUpdate(() => new Date())
	},
	(table) => [t.uniqueIndex('slug_idx').on(table.slug), t.index('title_idx').on(table.title)]
);

export { posts };
