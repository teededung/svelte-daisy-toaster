<script>
	import { getToastState } from './toast-state.svelte.js';
	import Toast from './Toast.svelte';

	let { zIndex = 50 } = $props();

	const toastState = getToastState();

	const groupedToasts = $derived(
		toastState.toasts.reduce((groups, toast) => {
			const pos = toast.position || 'toast-top toast-end';
			if (!groups[pos]) groups[pos] = [];
			groups[pos].push(toast);
			return groups;
		}, {})
	);
</script>

{#each Object.entries(groupedToasts) as [position, group] (position)}
	<div class="toast {position}" style={`z-index: ${zIndex};`}>
		{#each group as toast (toast.id)}
			<Toast {toast} />
		{/each}
	</div>
{/each}
