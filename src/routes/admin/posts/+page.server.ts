import { posts } from '$lib/server/db/schema';
import type { PageServerLoad, Actions } from '../../$types';
import { db } from '$lib/server/db';
import { slugify } from '$lib/helpers';
import { eq, inArray } from 'drizzle-orm/expressions';

export const load: PageServerLoad = async () => {
	const postRows = await db.select().from(posts).all();
	return { posts: postRows };
};

export const actions = {
	insert: async ({ cookies, request }) => {
		const data = await request.formData();

		const title = data.get('title');
		const content = data.get('content');

		if (!title || !content) {
			throw new Error('Title and content are required');
		}

		const slug = slugify(title.toString());

		const post = await db
			.insert(posts)
			.values({ title: title.toString(), content: content.toString(), slug })
			.returning({ id: posts.id })
			.execute();

		return {
			post
		};
	},
	delete: async ({ cookies, request }) => {
		const data = await request.formData();
		const postIds = data.getAll('ids[]').map(Number);

		if (postIds.length === 0) {
			throw new Error('Post IDs are required');
		}

		// Validate that all IDs are valid numbers
		if (postIds.some(isNaN)) {
			throw new Error('All post IDs must be valid numbers');
		}

		// Delete the posts
		await db.delete(posts).where(inArray(posts.id, postIds)).execute();

		return {
			deletedIds: postIds
		};
	}
} satisfies Actions;
