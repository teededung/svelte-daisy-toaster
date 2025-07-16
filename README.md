# svelte-daisy-toaster

A simple toast notification library for Svelte 5 applications using DaisyUI styles.

## Features
- Easy to use toast notifications
- Supports info, success, warning, and error types
- Customizable duration
- Animated icons and transitions
- Built with Svelte 5 runes
- Styled with DaisyUI and Tailwind CSS

## Requirements
- Svelte ^5.0.0 (peer dependency)
- DaisyUI ^5.0.0 or later (for styling)
- Tailwind CSS ^4.0.0 or later

## Installation

If publishing to npm:

```bash
npm install svelte-daisy-toaster
```

Or with yarn:

```bash
yarn add svelte-daisy-toaster
```

## Usage

### Setup
In your root layout or app component:

```svelte
<script>
  import { setToastState } from 'svelte-daisy-toaster';
  import { Toaster } from 'svelte-daisy-toaster';

  setToastState();
</script>

<Toaster />
```

### Showing Toasts
Anywhere in your components:

```svelte
<script>
  import { toast } from 'svelte-daisy-toaster';

  function showToast() {
    toast.success('Operation successful!', 3000);
  }
</script>

<button onclick={showToast}>Show Toast</button>
```

## API

### toast(options)
- `options`: object with:
  - `type`: 'info' | 'success' | 'warning' | 'error' (default: 'info')
  - `message`: string (default: '')
  - `durationMs`: number in ms (default: 5000)
  - `position`: string of toast classes, e.g. 'toast-bottom toast-start' (default: 'toast-top toast-end')

Shortcuts:
- `toast.info(message, durationMs, position)`
- `toast.success(message, durationMs, position)`
- `toast.warning(message, durationMs, position)`
- `toast.error(message, durationMs, position)`

### Components
- `<Toaster />`: Renders all toasts (place once in app)
- `<Toast toast={{id, type, message}} isAnimate={true} />`: Individual toast (usually not needed directly). The `isAnimate` prop (default: true) controls whether the icon animation is enabled.

### State Management
- `setToastState()`: Initialize toast state context
- `getToastState()`: Get current toast state
- `ToastState` class: For custom implementations

## Examples

Success toast at bottom-center:
```svelte
toast.success('Saved!', 3000, 'toast-bottom toast-center');
```

Error with custom duration:
```svelte
toast.error('Something went wrong', 10000);
```

Custom toast with options object:
```svelte
toast({
  type: 'success',
  message: 'Item screenshot copied to clipboard!',
  durationMs: 3000,
  position: 'toast-bottom toast-center'
});
```

## Customization
The toasts use DaisyUI's `alert` classes. Customize via Tailwind config or override styles.

Position: Default top-end. Modify in Toaster.svelte if needed.

## License
MIT 