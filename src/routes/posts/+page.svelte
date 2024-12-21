<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<div class="table-container">
	<table>
		<thead>
			<tr>
				<th>id</th>
				<th>slug</th>
				<th>title</th>
				<th>content</th>
				<th>created_at</th>
				<th>updated_at</th>
			</tr>
		</thead>
		<tbody>
			{#each data.posts as post}
				<tr style="cursor: pointer" onclick={() => window.open(`/posts/${post.slug}`, '_self')}>
					<td>{post.id}</td>
					<td>
						<a class="text-blue-600 hover:underline" href={`/posts/${post.slug}`}>
							{post.slug}
						</a>
					</td>
					<td>{post.title}</td>
					<td>{post.content}</td>
					<td>{post.created_at}</td>
					<td>{post.updated_at}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.table-container {
		padding: 1rem;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		border: 1px solid #e5e7eb;
		border-radius: 0.25rem;
	}

	th,
	td {
		padding: 1rem;
		text-align: left;
	}

	thead {
		background-color: #f9fafb;
	}

	thead tr {
		border-bottom: 1px solid #e5e7eb;
	}

	tbody tr {
		border-bottom: 1px solid #e5e7eb;
	}

	tbody tr:hover {
		background-color: #f9fafb;
	}

	/* Remove border from last row */
	tbody tr:last-child {
		border-bottom: none;
	}
</style>
