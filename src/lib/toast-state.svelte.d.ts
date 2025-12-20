export type ToastType = 'default' | 'info' | 'success' | 'warning' | 'error' | 'loading';

export type ToastStyle = 'outline' | 'dash' | 'soft';

export type ToastButton = {
	text?: string;
	class?: string;
	callback?: (toast: Toast) => void;
};

export type ToastOptions = {
	type?: ToastType;
	message?: string;
	title?: string;
	durationMs?: number;
	position?: string;
	style?: ToastStyle;
	button?: ToastButton;
	showCloseButton?: boolean;
	customClass?: string;
};

export class ToastState {
	/** All active toasts */
	toasts: Toast[];

	/** Measured widths for each toast (used for layout) */
	widths: Record<string, number>;

	/** Measured heights for each toast (used for layout) */
	heights: Record<string, number>;

	/** Internal map of timeouts for auto‑dismiss. Implementation detail. */
	toastToTimeoutMap: Map<string, any>;

	/**
	 * Create and add a new toast.
	 *
	 * When `durationMs` is a positive finite number, the toast will be
	 * scheduled for automatic dismissal after that delay.
	 */
	add(options?: ToastOptions): Toast;

	/**
	 * Update an existing toast by id.
	 *
	 * If `durationMs` is provided and > 0, a new auto‑dismiss timeout
	 * is scheduled from "now". Passing a non‑positive or non‑finite
	 * value disables auto‑dismiss.
	 */
	update(id: string, partial?: ToastUpdate): void;

	/** Start the removal animation then remove the toast. */
	startRemoval(id: string): void;

	/** Remove a toast immediately (no animation). */
	remove(id: string): void;

	/** Pause a toast's auto-dismiss timeout. */
	pause(id: string): void;

	/** Resume a toast's auto-dismiss timeout. */
	resume(id: string): void;
}

export type Toast = {
	id: string;
	type: ToastType;
	message: string;
	title?: string;
	position?: string;
	style?: ToastStyle;
	button?: ToastButton;
	showCloseButton?: boolean;
	customClass?: string;
	visible: boolean;
	/** Back‑reference to the owning `ToastState` instance. */
	_toastState: ToastState;

	/** Turn the toast into a success toast. */
	success: (msg?: string, extra?: ToastUpdate) => void;
	/** Turn the toast into an error toast. */
	error: (msg?: string, extra?: ToastUpdate) => void;
	/** Turn the toast into an info toast. */
	info: (msg?: string, extra?: ToastUpdate) => void;
	/** Turn the toast into a warning toast. */
	warning: (msg?: string, extra?: ToastUpdate) => void;
	/** Arbitrary partial update of the toast. */
	update: (partial: ToastUpdate) => void;
	/** Start the removal animation for this toast. */
	dismiss: () => void;
};

export type ToastUpdate = Partial<
	Omit<
		Toast,
		'id' | '_toastState' | 'success' | 'error' | 'info' | 'warning' | 'update' | 'dismiss'
	>
> & {
	durationMs?: number;
};

export interface ToastShortcut {
	/**
	 * Full options object as first argument.
	 */
	(options: ToastOptions): Toast | undefined;

	/**
	 * Message + options object.
	 */
	(message: string, options: ToastOptions): Toast | undefined;

	/**
	 * Legacy positional signature:
	 * `(message, durationMs?, position?, style?, title?)`
	 */
	(
		message: string,
		durationMs?: number,
		position?: string,
		style?: ToastStyle,
		title?: string
	): Toast | undefined;
}

export interface ToastFunction {
	/**
	 * Create a toast using either a simple message string or a full
	 * options object.
	 */
	(message: string | ToastOptions, options?: ToastOptions): Toast | undefined;

	/** Info shortcut with flexible overloads. */
	info: ToastShortcut;
	/** Success shortcut with flexible overloads. */
	success: ToastShortcut;
	/** Warning shortcut with flexible overloads. */
	warning: ToastShortcut;
	/** Error shortcut with flexible overloads. */
	error: ToastShortcut;

	/**
	 * Create a persistent "loading" toast that returns a controller
	 * for resolving or updating it.
	 */
	loading(message?: string, options?: ToastOptions): Toast | undefined;
}

/** Initialise toast state and register it in Svelte context. */
export function setToastState(): ToastState;

/** Read the current toast state from Svelte context. */
export function getToastState(): ToastState | undefined;

export const toast: ToastFunction;
