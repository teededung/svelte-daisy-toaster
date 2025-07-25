import { getContext, onDestroy, setContext } from 'svelte';

export class ToastState {
	toasts = $state([]);
	widths = $state({});
	toastToTimeoutMap = new Map();

	constructor() {
		onDestroy(() => {
			for (const timeout of this.toastToTimeoutMap.values()) {
				clearTimeout(timeout);
			}
			this.toastToTimeoutMap.clear();
		});
	}

	add({ type = 'default', message = '', title, durationMs = 5000, position = 'top-right', style, button, showCloseButton = false } = {}) {
		const id = crypto.randomUUID();
		this.toasts.push({
			id,
			type,
			message,
			title,
			position,
			style,
			button,
			showCloseButton,
			visible: true,
			_toastState: this // Add reference to toast state for callbacks
		});

		this.toastToTimeoutMap.set(
			id,
			setTimeout(() => {
				this.startRemoval(id);
			}, durationMs)
		);
	}

	startRemoval(id) {
		// Set visible to false to trigger animation
		const toast = this.toasts.find(t => t.id === id);
		if (toast) {
			toast.visible = false;
			// Wait for animation to complete
			setTimeout(() => {
				this.remove(id);
			}, 350);
		}
	}

	remove(id) {
		const timeout = this.toastToTimeoutMap.get(id);
		if (timeout) {
			clearTimeout(timeout);
			this.toastToTimeoutMap.delete(id);
		}
		delete this.widths[id];
		const index = this.toasts.findIndex(toast => toast.id === id);
		if (index !== -1) {
			this.toasts.splice(index, 1);
		}
	}
}

let currentToastState;

const TOAST_KEY = Symbol('TOAST');

export function setToastState() {
	currentToastState = new ToastState();
	return setContext(TOAST_KEY, currentToastState);
}

export function getToastState() {
	return getContext(TOAST_KEY);
}

export function toast(options) {
  // Nếu options là string, chuyển thành object với style default
  if (typeof options === 'string') {
    options = { message: options, type: 'default' };
  }
  
  // ưu tiên lấy từ context – an toàn khi gọi trong component con
  let ts;
  try {
    ts = getContext(TOAST_KEY);
  } catch {
    /* ignore */
  }
  ts ??= currentToastState;

  if (ts) ts.add(options);
  else console.warn('ToastState not initialized, toast skipped:', options.message);
}

// đường tắt: toast.success('...'), v.v.
['info', 'success', 'warning', 'error'].forEach(t => {
  toast[t] = (msg, d, pos, s, title) => toast({ type: t, message: msg, durationMs: d, position: pos, style: s, title });
});