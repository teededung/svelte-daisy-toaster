<script>
	import { getToastState } from './toast-state.svelte.js';
	import { fly } from 'svelte/transition';
	let { toast, isAnimate = true } = $props();
	const toastState = getToastState();
	let isAnimated = $state(false);

	$effect(() => {
		if (isAnimate) {
			isAnimated = true;
		}
	});

	// Close toast when clicked
	function onclick() {
		toastState.remove(toast.id);
	}
</script>

<button
	class="alert cursor-pointer flex items-center gap-2"
	class:alert-info={toast.type === 'info'}
	class:alert-success={toast.type === 'success'}
	class:alert-warning={toast.type === 'warning'}
	class:alert-error={toast.type === 'error'}
	class:alert-outline={toast.style === 'alert-outline'}
	class:alert-dash={toast.style === 'alert-dash'}
	class:alert-soft={toast.style === 'alert-soft'}
	{onclick}
	out:fly={{ x: 100, duration: 300 }}
	type="button"
>
	{#if toast.type === 'info'}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class:animate-icon={isAnimated}
		>
			<path
				d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
			/>
			<line x1="12" x2="12" y1="8" y2="12" />
			<line x1="12" x2="12.01" y1="16" y2="16" />
		</svg>
	{:else if toast.type === 'success'}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="check-icon"
			class:animate={isAnimated}
		>
			<path d="M4 12l5 5L20 6" class="check-path" />
		</svg>
	{:else if toast.type === 'warning'}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class:animate-icon={isAnimated}
		>
			<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
			<path d="M12 9v4" />
			<path d="M12 17h.01" />
		</svg>
	{:else if toast.type === 'error'}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="x-icon"
			class:animate={isAnimated}
		>
			<path d="M18 6 6 18" class="diagonal-1" />
			<path d="m6 6 12 12" class="diagonal-2" />
		</svg>
	{/if}
	<span>{toast.message}</span>
</button>

<style>
	.icon-check::after {
		display: inline-block;
		width: 24px;
		height: 24px;
		vertical-align: -0.125em;
		content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M20 6L9 17l-5-5'/%3E%3C/svg%3E");
	}

	.icon-x::after {
		display: inline-block;
		width: 24px;
		height: 24px;
		vertical-align: -0.125em;
		content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M18 6L6 18M6 6l12 12'/%3E%3C/svg%3E");
	}

	.animate-icon {
		animation: primaryAnimation 0.5s ease-in-out;
	}

	@keyframes primaryAnimation {
		0% {
			transform: scale(1) rotate(0deg);
		}
		20% {
			transform: scale(1.1) rotate(-3deg);
		}
		40% {
			transform: scale(1.1) rotate(3deg);
		}
		60% {
			transform: scale(1.1) rotate(-2deg);
		}
		100% {
			transform: scale(1) rotate(0deg);
		}
	}

	.check-icon {
		overflow: visible;
	}

	.check-path {
		stroke-dasharray: 24;
		stroke-dashoffset: 0;
		transition:
			stroke-dashoffset 0.125s ease-out,
			opacity 0.125s ease-out;
	}

	.check-icon.animate .check-path {
		animation: checkAnimation 0.5s ease-out backwards;
	}

	@keyframes checkAnimation {
		0% {
			stroke-dashoffset: 24;
			opacity: 0;
		}
		33% {
			stroke-dashoffset: 24;
			opacity: 0;
		}
		100% {
			stroke-dashoffset: 0;
			opacity: 1;
		}
	}

	.x-icon {
		overflow: visible;
	}

	.diagonal-1,
	.diagonal-2 {
		stroke-dasharray: 17;
		stroke-dashoffset: 0;
		transition: stroke-dashoffset 0.15s ease-out;
	}

	.x-icon.animate .diagonal-1 {
		opacity: 0;
		animation: lineAnimation 0.3s ease-out forwards;
	}

	.x-icon.animate .diagonal-2 {
		opacity: 0;
		animation: lineAnimation 0.3s ease-out 0.25s forwards;
	}

	@keyframes lineAnimation {
		0% {
			opacity: 0;
			stroke-dashoffset: 17;
		}
		15% {
			opacity: 1;
			stroke-dashoffset: 17;
		}
		100% {
			opacity: 1;
			stroke-dashoffset: 0;
		}
	}
</style>
