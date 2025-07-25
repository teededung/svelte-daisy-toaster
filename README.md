# svelte-daisy-toaster

A simple toast notification library for Svelte 5 applications using DaisyUI styles.

## Features

- Easy to use toast notifications
- Supports info, success, warning, and error types
- Optional title for structured alerts
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
@plugin "daisyui"; /* Load DaisyUI plugin */

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
    "./node_modules/svelte-daisy-toaster/dist/**/*.{js,svelte}",
  ],
  plugins: [require("daisyui")],
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

  function showSuccessToast() {
    toast.success('Operation successful!', 3000);
  }

  function showDefaultToast() {
    toast('Simple notification');
  }
</script>

<button onclick={showSuccessToast}>Show Success Toast</button>
<button onclick={showDefaultToast}>Show Default Toast</button>
```

## API

### toast(options) or toast(message)

**Object format:**

- `options`: object with:
  - `type`: 'info' | 'success' | 'warning' | 'error' | 'default' (default: 'default')
  - `message`: string (default: '')
  - `title`: string (optional) - when provided, creates a structured alert with title and message
  - `durationMs`: number in ms (default: 5000)
  - `style`: 'outline' | 'dash' | 'soft' (optional)
  - `position`: shorthand like `bottom-center`, `top-right`, `middle-left` **or** full DaisyUI classes (`toast-bottom toast-center`). Default is `top-right`. Supports flexible order like `center-bottom` or `bottom-center`.
  - `showCloseButton`: boolean (default: false) - If true, shows a close button in the corner of the toast
  - `button`: object (optional) - Custom action button with:
    - `text`: string (default: 'OK') - Button text
    - `class`: string (optional) - Additional CSS classes for the button (e.g., 'btn-primary')
    - `callback`: function (optional) - Function called when button is clicked, receives toast object
    - `closeOnClick`: boolean (default: true) - Whether to automatically close the toast after button click

**String format (default style):**

- `toast(message)`: Creates a simple toast with default styling (only `alert` class, no color)

Shortcuts (signature):

- `toast.info(message, durationMs?, position?, style?, title?)`
- `toast.success(message, durationMs?, position?, style?, title?)`
- `toast.warning(message, durationMs?, position?, style?, title?)`
- `toast.error(message, durationMs?, position?, style?, title?)`

### Components

- `<Toaster />`: Renders all toasts (place once in app)
- `<Toast toast={{id, type, message, title?}} isAnimate={true} />`: Individual toast (usually not needed directly). The `isAnimate` prop (default: true) controls whether the icon animation is enabled.

### State Management

- `setToastState()`: Initialize toast state context
- `getToastState()`: Get current toast state
- `ToastState` class: For custom implementations

## Examples

### Basic Usage

Default style toast (default color, just `alert` class):

```svelte
toast('Simple notification message');
```

Toast with title (structured layout):

```svelte
toast({
  title: 'New message!',
  message: 'You have 1 unread message',
  type: 'info'
});
```

Success toast with title using shortcut:

```svelte
toast.success('Operation completed successfully', 3000, 'top-right', 'soft', 'Success!');
```

Toast with close button:

```svelte
toast({
  message: 'This toast has a close button',
  showCloseButton: true
});
```

Toast with custom button:

```svelte
toast({
  message: 'Would you like to proceed?',
  button: {
    text: 'Yes',
    class: 'btn-primary',
    callback: (toast) => {
      console.log('Button clicked for toast:', toast.id);
      // Custom logic here
    },
    closeOnClick: false  // Keep toast open after click
  }
});
```

### Styling Options

Default style with options object:

```svelte
toast({
  type: 'default',
  message: 'Clean notification',
  durationMs: 4000,
  position: 'top-center'
});
```

Error toast with dashed border style:

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

### Toast Positions

The library supports 9 different positions in a 3x3 grid layout. You can use shorthand notation or DaisyUI classes directly.

**Available positions:**

- **Top Row:** `top-left`, `top-center`, `top-right`
- **Middle Row:** `middle-left`, `middle-center`, `middle-right`
- **Bottom Row:** `bottom-left`, `bottom-center`, `bottom-right`

**Position examples:**

```svelte
// Top positions
toast.info('Top left notification', 3000, 'top-left');
toast.success('Top center notification', 3000, 'top-center');
toast.warning('Top right notification', 3000, 'top-right');

// Middle positions
toast.info('Left side notification', 3000, 'middle-left');
toast.success('Center notification', 3000, 'center-middle');
toast.warning('Right side notification', 3000, 'right-middle');

// Bottom positions
toast.error('Bottom left', 3000, 'bottom-left');
toast.success('Bottom center', 3000, 'bottom-center');
toast.info('Bottom right', 3000, 'bottom-right');

// Flexible order - both work the same
toast.error('Bottom center', 3000, 'center-bottom'); // Same as 'bottom-center'

// You can also use DaisyUI classes directly
toast.info('Direct DaisyUI', 3000, 'toast-middle toast-start');
```

## Customization

The toasts use DaisyUI's `alert` classes. Customize via Tailwind config or override styles.

Position: Default top-end. Modify in Toaster.svelte if needed.

## License

MIT
