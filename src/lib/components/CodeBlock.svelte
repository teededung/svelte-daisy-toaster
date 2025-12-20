<script lang="ts">
	import Highlight from 'svelte-highlight';
	import { typescript } from 'svelte-highlight/languages/typescript';

	let { code = '' } = $props<{ code?: string }>();

	let copied = $state(false);

	async function copyToClipboard() {
		await navigator.clipboard.writeText(code);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<div class="relative group my-4 w-full min-w-0">
	<div class="mockup-code code-block-wrapper !pb-0 !pt-4 text-sm min-w-0 overflow-hidden w-full max-w-full">
		<div class="overflow-x-auto custom-scrollbar px-6 pb-6 w-full max-w-full">
			<Highlight language={typescript} {code} />
		</div>
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
		background: oklch(var(--bc) / 0.3);
		border-radius: 2px;
	}

	/* Light theme syntax highlighting - softer colors */
	:global([data-theme="light"] .hljs),
	:global(:root:not([data-theme="dark"]) .hljs) {
		color: #4a5568;
	}
	:global([data-theme="light"] .hljs-comment),
	:global([data-theme="light"] .hljs-quote) {
		color: #a0aec0;
		font-style: italic;
	}
	:global([data-theme="light"] .hljs-keyword),
	:global([data-theme="light"] .hljs-selector-tag) {
		color: #e07a8a;
	}
	:global([data-theme="light"] .hljs-string),
	:global([data-theme="light"] .hljs-addition) {
		color: #68a87a;
	}
	:global([data-theme="light"] .hljs-number),
	:global([data-theme="light"] .hljs-literal) {
		color: #6b9bd2;
	}
	:global([data-theme="light"] .hljs-built_in),
	:global([data-theme="light"] .hljs-type) {
		color: #9a7fd1;
	}
	:global([data-theme="light"] .hljs-attr),
	:global([data-theme="light"] .hljs-variable),
	:global([data-theme="light"] .hljs-template-variable) {
		color: #d19a66;
	}
	:global([data-theme="light"] .hljs-function),
	:global([data-theme="light"] .hljs-title) {
		color: #9a7fd1;
	}
	:global([data-theme="light"] .hljs-params) {
		color: #4a5568;
	}
	:global([data-theme="light"] .hljs-regexp) {
		color: #6b9bd2;
	}
	:global([data-theme="light"] .hljs-tag) {
		color: #68a87a;
	}
	:global([data-theme="light"] .hljs-name) {
		color: #68a87a;
	}

	/* Dark theme syntax highlighting */
	:global([data-theme="dark"] .hljs) {
		color: #c9d1d9;
	}
	:global([data-theme="dark"] .hljs-comment),
	:global([data-theme="dark"] .hljs-quote) {
		color: #8b949e;
		font-style: italic;
	}
	:global([data-theme="dark"] .hljs-keyword),
	:global([data-theme="dark"] .hljs-selector-tag) {
		color: #ff7b72;
	}
	:global([data-theme="dark"] .hljs-string),
	:global([data-theme="dark"] .hljs-addition) {
		color: #a5d6ff;
	}
	:global([data-theme="dark"] .hljs-number),
	:global([data-theme="dark"] .hljs-literal) {
		color: #79c0ff;
	}
	:global([data-theme="dark"] .hljs-built_in),
	:global([data-theme="dark"] .hljs-type) {
		color: #d2a8ff;
	}
	:global([data-theme="dark"] .hljs-attr),
	:global([data-theme="dark"] .hljs-variable),
	:global([data-theme="dark"] .hljs-template-variable) {
		color: #ffa657;
	}
	:global([data-theme="dark"] .hljs-function),
	:global([data-theme="dark"] .hljs-title) {
		color: #d2a8ff;
	}
	:global([data-theme="dark"] .hljs-params) {
		color: #c9d1d9;
	}
	:global([data-theme="dark"] .hljs-regexp) {
		color: #a5d6ff;
	}
	:global([data-theme="dark"] .hljs-tag) {
		color: #7ee787;
	}
	:global([data-theme="dark"] .hljs-name) {
		color: #7ee787;
	}

	/* Hide the mockup-code prefix dots that interfere with code */
	.code-block-wrapper :global(pre::before) {
		content: none !important;
	}
</style>
