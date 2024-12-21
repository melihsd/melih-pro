<script lang="ts">
	import type { PageData } from './$types';
	import { slugify } from '$lib/helpers';
	import { invalidateAll } from '$app/navigation';
	import { SvelteSet } from 'svelte/reactivity';

	let { data }: { data: PageData } = $props();

	let dialogEl: HTMLDialogElement;
	let title = $state('');
	const selectedIds = $state(new SvelteSet<number>());

	const slug = $derived(slugify(title));
	const hasSelectedItems = $derived(selectedIds.size > 0);

	// Event handlers and methods
	async function handleDelete(dialogEl: HTMLDialogElement) {
		if (!hasSelectedItems) return;
		dialogEl.showModal();
	}

	async function confirmDelete(dialogEl: HTMLDialogElement) {
		const formData = new FormData();
		selectedIds.forEach((id) => formData.append('ids[]', id.toString()));

		try {
			await fetch('?/delete', {
				method: 'POST',
				body: formData
			});
			await invalidateAll();
			selectedIds.clear();
			dialogEl.close();
		} catch (error) {
			console.error('Delete failed:', error);
		}
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		try {
			await fetch('?/insert', {
				method: 'POST',
				body: formData
			});
			await invalidateAll();
			form.reset();
		} catch (error) {
			console.error('Submit failed:', error);
		}
	}

	function toggleSelection(id: number) {
		selectedIds.has(id) ? selectedIds.delete(id) : selectedIds.add(id);
	}

	function handleSelectAll() {
		selectedIds.clear();
		data.posts.forEach((post) => selectedIds.add(post.id));
	}

	function handleUnselectAll() {
		selectedIds.clear();
	}
</script>

<div>
	<form method="POST" onsubmit={handleSubmit} class="content-middle flex gap-4 rounded border p-4">
		<input disabled type="text" name="slug" placeholder="Slug" value={slug} />
		<input type="text" name="title" placeholder="Title" bind:value={title} />
		<textarea name="content" placeholder="Content"></textarea>
		<button
			type="submit"
			class="rounded border border-gray-200 bg-gray-100 px-4 py-2 hover:bg-gray-200">Submit</button
		>
	</form>
</div>

<dialog bind:this={dialogEl} class="rounded-lg p-6 backdrop:bg-black/50">
	<div class="flex flex-col gap-4">
		<p>
			{selectedIds.size === 1
				? 'Are you sure you want to delete this item?'
				: `Are you sure you want to delete these ${selectedIds.size} items?`}
		</p>

		<div class="flex justify-end gap-2">
			<button class="rounded px-4 py-2 hover:bg-gray-100" onclick={() => dialogEl.close()}>
				Cancel
			</button>
			<button
				class="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
				onclick={() => confirmDelete(dialogEl)}
			>
				Delete
			</button>
		</div>
	</div>
</dialog>
<div class="m-4 flex gap-4 px-4">
	{#if data.posts.length === selectedIds.size}
		<button
			class="rounded border border-gray-200 bg-gray-100 px-4 py-2 hover:bg-gray-200"
			onclick={handleUnselectAll}
		>
			Unselect All
		</button>
	{:else}
		<button
			class="rounded border border-gray-200 bg-gray-100 px-4 py-2 hover:bg-gray-200"
			onclick={handleSelectAll}
		>
			Select All
		</button>
	{/if}

	{#if selectedIds.size > 0}
		<button
			class="rounded border border-red-200 bg-red-100 px-4 py-2 text-red-600 hover:bg-red-200"
			onclick={() => handleDelete(dialogEl)}
		>
			{selectedIds.size === 1
				? 'Delete Selected Item'
				: `Delete Selected (${selectedIds.size} items)`}
		</button>
	{/if}
</div>
<div class="table-container">
	<table>
		<thead>
			<tr>
				<th></th>
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
				<tr style="cursor: pointer" onclick={() => toggleSelection(post.id)}>
					<td>
						<input type="checkbox" checked={selectedIds.has(post.id)} />
					</td>
					<td>{post.id}</td>
					<td>
						<button
							class="text-blue-600 hover:underline"
							onclick={(e) => {
								e.stopPropagation();
								window.open(`/posts/${post.slug}`);
							}}
						>
							{post.slug}
						</button>
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
