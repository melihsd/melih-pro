import { error } from '@sveltejs/kit';
import { posts } from '$lib/server/db/schema';
import type { PageServerLoad } from '../../$types';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm/expressions';

export const load: PageServerLoad = async ({ params: { slug } }) => {
	if (!slug) {
		throw new Error('Slug is required');
	}
	const post = await db.select().from(posts).where(eq(posts.slug, slug)).get();
	if (!post) {
		error(404, {
			message: 'Not found'
		});
	}
	return { post };
};
