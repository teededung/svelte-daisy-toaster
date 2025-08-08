import { getContext, onDestroy, setContext } from "svelte";

/**
 * @typedef {"default" | "info" | "success" | "warning" | "error" | "loading"} ToastType
 */

/**
 * @typedef {"outline" | "dash" | "soft"} ToastStyle
 */

/**
 * @typedef {{
 *  text?: string,
 *  class?: string,
 *  callback?: (toast: Toast) => void,
 *  closeOnClick?: boolean
 * }} ToastButton
 */

/**
 * @typedef {{
 *  id: string,
 *  type: ToastType,
 *  message: string,
 *  title?: string,
 *  position?: string,
 *  style?: ToastStyle,
 *  button?: ToastButton,
 *  showCloseButton?: boolean,
 *  visible: boolean,
 *  _toastState: ToastState
 * }} Toast
 */

/**
 * @typedef {{
 *  type?: ToastType,
 *  message?: string,
 *  title?: string,
 *  durationMs?: number,
 *  position?: string,
 *  style?: ToastStyle,
 *  button?: ToastButton,
 *  showCloseButton?: boolean
 * }} ToastOptions
 */

export class ToastState {
  /** @type {Toast[]} */
  toasts = $state([]);
  /** @type {Record<string, number>} */
  widths = $state({});
  /** @type {Map<string, any>} */
  toastToTimeoutMap = new Map();

  constructor() {
    onDestroy(() => {
      for (const timeout of this.toastToTimeoutMap.values()) {
        clearTimeout(timeout);
      }
      this.toastToTimeoutMap.clear();
    });
  }

  /**
   * Create and add a new toast
   * @param {ToastOptions} [options]
   * @returns {Toast}
   */
  add({
    type = "default",
    message = "",
    title,
    durationMs = 5000,
    position = "top-right",
    style,
    button,
    showCloseButton = false,
  } = {}) {
    const id = crypto.randomUUID();
    /** @type {Toast} */
    const toast = {
      id,
      type,
      message,
      title,
      position,
      style,
      button,
      showCloseButton,
      visible: true,
      /** @type {ToastState} */ _toastState: this, // reference to toast state for callbacks
    };
    this.toasts.push(toast);

    // Only auto-dismiss when duration is a positive number
    if (
      typeof durationMs === "number" &&
      durationMs > 0 &&
      Number.isFinite(durationMs)
    ) {
      this.toastToTimeoutMap.set(
        id,
        setTimeout(() => {
          this.startRemoval(id);
        }, durationMs)
      );
    }

    return toast;
  }

  /**
   * Update an existing toast by id.
   * If durationMs is provided and > 0, (re)schedule auto-dismiss from now.
   */
  /**
   * Update an existing toast by id
   * @param {string} id
   * @param {Partial<Omit<Toast, 'id'|'_toastState'>> & { durationMs?: number }} [partial]
   * @returns {void}
   */
  update(id, partial = {}) {
    const toast = this.toasts.find((t) => t.id === id);
    if (!toast) return;

    // Merge fields
    Object.assign(toast, partial);

    // Reset any existing timeout
    const prev = this.toastToTimeoutMap.get(id);
    if (prev) {
      clearTimeout(prev);
      this.toastToTimeoutMap.delete(id);
    }

    const { durationMs } = partial;
    if (
      typeof durationMs === "number" &&
      durationMs > 0 &&
      Number.isFinite(durationMs)
    ) {
      this.toastToTimeoutMap.set(
        id,
        setTimeout(() => {
          this.startRemoval(id);
        }, durationMs)
      );
    }
  }

  /**
   * Start removal animation then remove
   * @param {string} id
   */
  startRemoval(id) {
    // set visible to false to trigger animation
    const toast = this.toasts.find((t) => t.id === id);
    if (toast) {
      toast.visible = false;
      // wait for animation to complete
      setTimeout(() => {
        this.remove(id);
      }, 350);
    }
  }

  /**
   * Remove a toast immediately
   * @param {string} id
   */
  remove(id) {
    const timeout = this.toastToTimeoutMap.get(id);
    if (timeout) {
      clearTimeout(timeout);
      this.toastToTimeoutMap.delete(id);
    }
    delete this.widths[id];
    const index = this.toasts.findIndex((toast) => toast.id === id);
    if (index !== -1) {
      this.toasts.splice(index, 1);
    }
  }
}

let currentToastState;

const TOAST_KEY = Symbol("TOAST");

export function setToastState() {
  currentToastState = new ToastState();
  return setContext(TOAST_KEY, currentToastState);
}

export function getToastState() {
  return getContext(TOAST_KEY);
}

export function toast(options) {
  // if options is string, convert to object with default style
  if (typeof options === "string") {
    options = { message: options, type: "default" };
  }

  // priority get from context - safe when calling in child component
  let ts;
  try {
    ts = getContext(TOAST_KEY);
  } catch {
    /* ignore */
  }
  ts ??= currentToastState;

  if (ts) return ts.add(options);
  else
    console.warn("ToastState not initialized, toast skipped:", options.message);
}

// shortcut: toast.success('...'), v.v. with flexible options
["info", "success", "warning", "error"].forEach((t) => {
  /**
   * Shortcut helper that supports both legacy params and an options object.
   *
   * Legacy:
   *   toast.success(message, durationMs?, position?, style?, title?)
   * Options object (second arg):
   *   toast.success(message, { durationMs, position, style, title, ... })
   * Or full options object as first param:
   *   toast.success({ message, durationMs, ... })
   */
  toast[t] = (messageOrOptions, d, pos, s, title) => {
    // Case 1: first arg is an options object
    if (
      messageOrOptions &&
      typeof messageOrOptions === "object" &&
      !Array.isArray(messageOrOptions)
    ) {
      return toast({ type: t, ...messageOrOptions });
    }

    // Case 2: second arg is an options object
    if (d && typeof d === "object" && !Array.isArray(d)) {
      return toast({ type: t, message: String(messageOrOptions ?? ""), ...d });
    }

    // Case 3: legacy positional params
    return toast({
      type: t,
      message: String(messageOrOptions ?? ""),
      durationMs: d,
      position: pos,
      style: s,
      title,
    });
  };
});

// loading helper that returns an object with controls
toast.loading = (message = "Loading...", options = {}) => {
  // durationMs: 0 to keep persistent until manually dismissed or updated
  const base = { type: "loading", message, durationMs: 0, ...options };
  const t = toast(base);
  if (!t) return;

  const state = t._toastState;
  const id = t.id;

  return {
    id,
    // Turn into success/error/info/warning; accepts message/title/durationMs/style/position
    success: (msg, extra = {}) =>
      state.update(id, {
        type: "success",
        message: msg ?? t.message,
        durationMs: 2000,
        ...extra,
      }),
    error: (msg, extra = {}) =>
      state.update(id, {
        type: "error",
        message: msg ?? t.message,
        durationMs: 3000,
        ...extra,
      }),
    info: (msg, extra = {}) =>
      state.update(id, {
        type: "info",
        message: msg ?? t.message,
        durationMs: 2500,
        ...extra,
      }),
    warning: (msg, extra = {}) =>
      state.update(id, {
        type: "warning",
        message: msg ?? t.message,
        durationMs: 2500,
        ...extra,
      }),
    update: (partial) => state.update(id, partial),
    dismiss: () => state.startRemoval(id),
  };
};
