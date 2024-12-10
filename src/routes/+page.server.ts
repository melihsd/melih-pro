import { posts } from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";
import { drizzle } from 'drizzle-orm/d1';
import {sql } from 'drizzle-orm';

export const load: PageServerLoad = async ({ platform, locals }) => {

  const db = drizzle(platform?.env?.DB);
  const postRows = await db.$count(posts);

  return {
    posts: postRows,
  };
};
