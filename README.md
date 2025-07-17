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

## Peer Dependencies

`svelte-daisy-toaster` ships without any CSS bundled. The host project **must** have TailwindCSS (v4 or later) and DaisyUI installed. Add them as dev-dependencies:

```bash
yarn add -D tailwindcss@^4.1 daisyui@^5
```

---

## Tailwind + DaisyUI setup (in _your project_)

Below are two ways to configure Tailwind **v4** so that it recognises the classes used by this library. Pick whichever fits your workflow.

### 1. CSS-first (recommended)

Create (or open) the stylesheet that Tailwind will compile, e.g. `src/app.css`, and add:

```css
/* src/app.css */
@import "tailwindcss";
@plugin "daisyui";              /* Load DaisyUI plugin */

/* Tell Tailwind to scan toaster components for classes */
@source "../node_modules/svelte-daisy-toaster/dist";
```

No JavaScript config file is needed with this approach.

### 2. Keep a JavaScript config file

If you prefer the classic `tailwind.config.js` file, note that Tailwind v4 no longer detects it automatically. You **must** load it explicitly via `@config` before importing Tailwind:

```css
/* src/app.css */
@config "../tailwind.config.js"; /* path is relative to this CSS file */
@import "tailwindcss";
@plugin "daisyui";
```

`tailwind.config.js` example:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/svelte-daisy-toaster/dist/**/*.{js,svelte}"
  ],
  plugins: [require('daisyui')],
};
```

Start the dev server (`yarn dev`). After the first build, the DaisyUI `alert` utilities used by `svelte-daisy-toaster` will have full styling.

---

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
  - `style`: 'outline' | 'dash' | 'soft' (optional)
  - `position`: shorthand like `bottom-center`, `top-right` **or** full DaisyUI classes (`toast-bottom toast-center`). Default is `top-right`.

Shortcuts (signature):
- `toast.info(message, durationMs?, position?, style?)`
- `toast.success(message, durationMs?, position?, style?)`
- `toast.warning(message, durationMs?, position?, style?)`
- `toast.error(message, durationMs?, position?, style?)`

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

Error toast at bottom-center, dashed border style:
```svelte
toast.error('Something went wrong', 5000, 'bottom-center', 'dash');
```

Custom toast with options object:
```svelte
toast({
  type: 'success',
  message: 'Item screenshot copied to clipboard!',
  style: 'soft',
  durationMs: 3000,
  position: 'toast-bottom toast-center'
});
```

## Customization
The toasts use DaisyUI's `alert` classes. Customize via Tailwind config or override styles.

Position: Default top-end. Modify in Toaster.svelte if needed.

## License
MIT 