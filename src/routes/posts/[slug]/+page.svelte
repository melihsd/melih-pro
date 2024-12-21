<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<article class="mx-auto max-w-3xl px-4 py-8">
	<header class="mb-8">
		<h1 class="mb-4 text-4xl font-bold text-gray-900">{data.post.title}</h1>
		<!-- You can add metadata here if available -->
		<div class="text-sm text-gray-500">
			<!-- Example metadata -->
			<time datetime={'1970-01-01'}>Published on {data.post.created_at}</time>
		</div>
	</header>

	<div class="prose prose-lg max-w-none">
		<p class="whitespace-pre-wrap leading-relaxed text-gray-700">
			{data.post.content}
		</p>
	</div>

	<footer class="mt-8 border-t border-gray-200 pt-8">
		<a
			href="/posts"
			class="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline"
		>
			← Back to all posts
		</a>
	</footer>
</article>
