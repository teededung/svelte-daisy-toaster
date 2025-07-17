<script>
	import { getToastState } from './toast-state.svelte.js';
	import Toast from './Toast.svelte';

	let { zIndex = 50 } = $props();

	const toastState = getToastState();

	// Convert shorthand like "bottom-center" to DaisyUI classes
	function resolvePosition(pos = 'top-right') {
		// If already using DaisyUI toast-* classes, keep as is
		if (pos.startsWith('toast-')) return pos;

		const [vertical, horizontal] = pos.split('-');

		const vertClass = vertical === 'bottom' ? 'toast-bottom' : 'toast-top';

		let horizClass = 'toast-end';
		switch (horizontal) {
			case 'center':
				horizClass = 'toast-center';
				break;
			case 'left':
				horizClass = 'toast-start';
				break;
			case 'right':
			default:
				horizClass = 'toast-end';
				break;
		}

		return `${vertClass} ${horizClass}`;
	}

	const groupedToasts = $derived(
		toastState.toasts.reduce((groups, toast) => {
			const pos = resolvePosition(toast.position);
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
