<script lang="ts">
	import Highlight from 'svelte-highlight';
	import { typescript } from 'svelte-highlight/languages/typescript';
	import 'svelte-highlight/styles/github-dark.css';

	let { code = '' } = $props<{ code?: string }>();

	let copied = $state(false);

	async function copyToClipboard() {
		await navigator.clipboard.writeText(code);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<div class="relative group my-4">
	<div class="mockup-code bg-base-300 !pb-0 !pt-4 text-sm min-w-0 overflow-hidden">
		<div class="overflow-x-auto custom-scrollbar px-6 pb-6"><Highlight language={typescript} {code} /></div>
	</div>
	<button
		class="btn btn-ghost btn-xs absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
		onclick={copyToClipboard}
	>
		{#if copied}
			<span class="text-success text-[10px]">Copied!</span>
		{:else}
			<span class="text-[10px]">Copy</span>
		{/if}
	</button>
</div>

<style>
	:global(.hljs) {
		background: transparent !important;
		padding: 0 !important;
	}

	.custom-scrollbar::-webkit-scrollbar {
		height: 4px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: transparent;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: #444;
		border-radius: 2px;
	}

	:global(.mockup-code code) {
		margin-top: -1rem;
	}
</style>