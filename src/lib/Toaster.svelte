<script lang="ts">
	import { getToastState } from './toast-state.svelte.js';
	import type { Toast as ToastType, ToastState } from './toast-state.svelte.js';
	import Toast from './Toast.svelte';

	let {
		zIndex = 50,
		stack = false,
		gap = 14,
		minWidth = 250,
		maxWidth = 420
	} = $props<{
		zIndex?: number;
		stack?: boolean;
		gap?: number;
		minWidth?: number;
		maxWidth?: number;
	}>();

	const toastState = getToastState() as ToastState;
	let hoveredPositions = $state<Record<string, boolean>>({});

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

	function getToastStackStyle(
		index: number,
		group: ToastType[],
		position: string,
		isVisible: boolean
	) {
		if (!stack) return '';

		const isExpanded = hoveredPositions[position];
		const isBottom = position.includes('toast-bottom');
		const sign = isBottom ? -1 : 1;
		const transformOrigin = isBottom ? 'bottom' : 'top';

		if (!isExpanded) {
			const shellReveal = Math.max(gap, 16);
			const gapPx = index === 0 ? 0 : shellReveal;
			const y = index * gapPx * sign;
			const scale = 1 - index * 0.035;
			const opacity = index > 2 ? 0 : 1;
			return `
				transform: translateY(${y}px) scale(${scale});
				transform-origin: ${transformOrigin};
				opacity: ${isVisible ? opacity : 1};
				z-index: ${group.length - index};
				transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
				pointer-events: ${index === 0 && isVisible ? 'auto' : 'none'};
			`;
		}

		// Expanded state: calculate cumulative height with DaisyUI standard gap (8px)
		const expandedGap = 8;
		let previousHeight = 0;
		for (let i = 0; i < index; i++) {
			previousHeight += (toastState.heights[group[i].id] || 0) + expandedGap;
		}

		const y = previousHeight * sign;
		return `
			transform: translateY(${y}px) scale(1);
			transform-origin: ${transformOrigin};
			opacity: ${isVisible ? 1 : 1};
			z-index: ${group.length - index};
			transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
			pointer-events: ${isVisible ? 'auto' : 'none'};
		`;
	}

	let hoverTimeouts: Record<string, ReturnType<typeof setTimeout>> = {};

	function handleMouseEnter(position: string) {
		if (hoverTimeouts[position]) {
			clearTimeout(hoverTimeouts[position]);
			delete hoverTimeouts[position];
		}
		hoveredPositions[position] = true;
	}

	function handleMouseLeave(position: string) {
		hoverTimeouts[position] = setTimeout(() => {
			hoveredPositions[position] = false;
			delete hoverTimeouts[position];
		}, 500);
	}
</script>

{#each Object.entries(groupedToasts) as [position, group] (position)}
	<div
		class="toast {position}"
		class:toast-stacked={stack}
		style={`z-index: ${zIndex}; --toast-min-width: ${minWidth}px; --toast-max-width: ${maxWidth}px;`}
		role="region"
		aria-label="Notifications"
	>
		{#if stack}
			{@const reversedGroup = group.toReversed()}
			{@const visibleGroup = reversedGroup.filter((t) => t.visible)}
			{@const isExpanded = hoveredPositions[position]}
			{@const topVisibleToast = visibleGroup[0]}
			{@const stackWidth = topVisibleToast
				? (toastState.widths[topVisibleToast.id] ?? topVisibleToast.minWidth ?? minWidth)
				: Math.max(...reversedGroup.map((t) => toastState.widths[t.id] || t.minWidth || minWidth), minWidth)}
			{@const stackHeight = topVisibleToast
				? (toastState.heights[topVisibleToast.id] ?? 0)
				: Math.max(...reversedGroup.map((t) => toastState.heights[t.id] || 0), 0)}
			{#each reversedGroup as toast (toast.id)}
				{@const index = toast.visible ? visibleGroup.indexOf(toast) : reversedGroup.indexOf(toast)}
				{@const shellOnly = !isExpanded && index > 0}
				<div
					style={`--stack-item-width: ${stackWidth}px; ${getToastStackStyle(index, reversedGroup, position, toast.visible)}`}
					onmouseenter={() => handleMouseEnter(position)}
					onmouseleave={() => handleMouseLeave(position)}
					role="presentation"
				>
					<Toast
						{toast}
						position={toast.position}
						isAnimate={!stack}
						isBlur={stack && group.length >= 2}
						defaultMinWidth={minWidth}
						defaultMaxWidth={maxWidth}
						forcedWidth={shellOnly ? stackWidth : undefined}
						forcedHeight={shellOnly ? stackHeight : undefined}
						{shellOnly}
					/>
				</div>
			{/each}
		{:else}
			{#each group as toast (toast.id)}
				<Toast {toast} position={toast.position} defaultMinWidth={minWidth} defaultMaxWidth={maxWidth} />
			{/each}
		{/if}
	</div>
{/each}

<style>
	.toast-stacked {
		display: grid !important;
		align-items: end;
		overflow: visible !important;
	}

	.toast-stacked.toast-top,
	.toast-stacked.toast-middle {
		align-items: start;
	}

	.toast-stacked > div {
		grid-area: 1 / 1;
		display: flex;
		flex-direction: column;
		width: max-content;
		max-width: min(var(--toast-max-width, 420px), calc(100vw - 1rem));
	}

	.toast-stacked > div > :global(.alert) {
		width: 100%;
	}
</style>
