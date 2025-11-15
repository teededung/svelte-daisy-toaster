<script lang="ts">
	import { getToastState } from './toast-state.svelte.js';
	import type { Toast as ToastType, ToastState } from './toast-state.svelte.js';
	import Toast from './Toast.svelte';

	let { zIndex = 50 } = $props<{
		zIndex?: number;
	}>();

	const toastState = getToastState() as ToastState;

	// Convert shorthand like "bottom-center" to DaisyUI classes
	function resolvePosition(pos: string = 'top-right'): string {
		// If already using DaisyUI toast-* classes, keep as is
		if (pos.startsWith('toast-')) return pos;

		const [first, second] = pos.split('-');

		// Define position types
		const verticalPositions = ['top', 'bottom', 'middle'];
		const horizontalPositions = ['left', 'center', 'right'];

		// Determine which is vertical and which is horizontal
		let vertical, horizontal;

		if (verticalPositions.includes(first)) {
			vertical = first;
			horizontal = second;
		} else if (horizontalPositions.includes(first)) {
			horizontal = first;
			vertical = second;
		} else {
			// Fallback if neither is recognized
			vertical = first;
			horizontal = second;
		}

		// Default values if not specified
		vertical = vertical || 'top';
		horizontal = horizontal || 'right';

		let vertClass;
		switch (vertical) {
			case 'bottom':
				vertClass = 'toast-bottom';
				break;
			case 'middle':
				vertClass = 'toast-middle';
				break;
			case 'top':
			default:
				vertClass = 'toast-top';
				break;
		}

		let horizClass;
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
		toastState.toasts.reduce<Record<string, ToastType[]>>((groups, toast) => {
			const pos = resolvePosition(toast.position ?? 'top-right');
			if (!groups[pos]) groups[pos] = [];
			groups[pos].push(toast);
			return groups;
		}, {})
	);

	const maxWidths = $derived(
		Object.entries(groupedToasts).reduce<Record<string, number>>((acc, [pos, grp]) => {
			acc[pos] = Math.max(0, ...grp.map((t) => toastState.widths[t.id] || 0));
			return acc;
		}, {})
	);
</script>

{#each Object.entries(groupedToasts) as [position, group] (position)}
	<div
		class="toast {position}"
		style={`min-width: ${maxWidths[position]}px; transition: min-width 0.3s ease-in-out; z-index: ${zIndex};`}
	>
		{#each group as toast (toast.id)}
			<Toast {toast} position={toast.position} />
		{/each}
	</div>
{/each}
