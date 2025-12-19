<script lang="ts">
	import { toast } from '$lib/index.js';
	import { toasterConfig } from './config.svelte.js';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';

	function showDefault() {
		toast('This is a default toast notification');
	}

	function showSuccess() {
		toast.success('Your changes have been saved successfully!', {
			title: 'Success!'
		});
	}

	function showError() {
		toast.error('An error occurred while processing your request.', {
			title: 'Error'
		});
	}

	function showWarning() {
		toast.warning('Please review your information before proceeding.', {
			title: 'Warning'
		});
	}

	function showInfo() {
		toast.info('New updates are available for your application.', {
			title: 'Information'
		});
	}

	function showLoadingFlow() {
		const t = toast.loading('Uploading files...');

		setTimeout(() => {
			t?.success('Files uploaded successfully!');
		}, 2000);
	}

	function showCustomStyled() {
		toast('Custom translucent background', {
			customClass: 'bg-primary/20 backdrop-blur-md text-primary border-primary/30 shadow-none'
		});
	}

	function showWithButton() {
		toast('Message deleted', {
			durationMs: 60000,
			button: {
				text: 'Undo',
				class: 'btn-ghost btn-xs text-primary',
				callback: (t) => t?.success('Deletion undone', { button: undefined })
			}
		});
	}

	function showWithClose() {
		toast('Check out the close button in the top right', {
			showCloseButton: true,
			durationMs: 10000
		});
	}

	function showTopCenter() {
		toast('Toast at Top Center', { position: 'top-center' });
	}

	function showBottomCenter() {
		toast('Toast at Bottom Center', { position: 'bottom-center' });
	}

	function showBottomRight() {
		toast('Toast at Bottom Right', { position: 'bottom-right' });
	}

	function showBottomLeft() {
		toast('Toast at Bottom Left', { position: 'bottom-left' });
	}

	function showTopLeft() {
		toast('Toast at Top Left', { position: 'top-left' });
	}

	function showOutline() {
		toast.success('Success with outline style', { style: 'outline' });
	}

	function showDash() {
		toast.warning('Warning with dash style', { style: 'dash' });
	}

	function showSoft() {
		toast.info('Info with soft style', { style: 'soft' });
	}
</script>

<svelte:head>
	<title>Svelte Daisy Toaster - Demo</title>
	<meta name="description" content="Beautiful toast notifications for Svelte with DaisyUI styling" />
	
	<!-- SEO Meta Tags -->
	<meta property="og:title" content="Svelte Daisy Toaster" />
	<meta property="og:description" content="Beautiful toast notifications for Svelte with DaisyUI styling" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Svelte Daisy Toaster" />
	<meta
		name="twitter:description"
		content="Beautiful toast notifications for Svelte with DaisyUI styling"
	/>
</svelte:head>

<div class="container mx-auto p-8">
	<div class="mb-8 flex items-center justify-between">
		<h1 class="text-2xl font-bold">Svelte Daisy Toaster</h1>
		<div class="flex gap-4 items-center">
			<ThemeSwitcher />
			<div class="tooltip tooltip-bottom" data-tip="Click to support me with a star! ⭐">
				<a
					href="https://github.com/teededung/svelte-daisy-toaster"
					target="_blank"
					rel="noopener noreferrer"
					class="btn gap-2 btn-outline btn-primary shadow-sm hover:shadow-md transition-all h-10 min-h-[auto]"
					title="Star this project on GitHub"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="h-5 w-5"
					>
						<path
							d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
						/>
					</svg>
					<span class="hidden md:inline">Give me a Star ⭐</span>
				</a>
			</div>
		</div>
	</div>

	<!-- Quick Start -->
	<section class="mb-12">
		<div class="collapse collapse-arrow bg-base-200 border-base-300 border shadow-sm">
			<input type="checkbox" />
			<div class="collapse-title text-2xl font-semibold flex items-center">
				🚀 Quick Start Guide
			</div>
			<div class="collapse-content">
				<div class="flex flex-col gap-6 pt-4">
					<div>
						<h3 class="mb-2 font-bold text-lg">1. Installation</h3>
						<CodeBlock code={`pnpm add svelte-daisy-toaster`} />
					</div>

					<div>
						<h3 class="mb-2 font-bold text-lg">2. Configuration (src/app.css)</h3>
						<CodeBlock
							code={`@import 'tailwindcss';
@plugin "daisyui"; /* Load DaisyUI plugin */

/* Tell Tailwind to scan toaster components for classes */
@source "../node_modules/svelte-daisy-toaster/dist";`}
						/>
					</div>

					<div>
						<h3 class="mb-2 font-bold text-lg">3. Setup root layout (+layout.svelte)</h3>
						<CodeBlock
							code={`import { Toaster } from 'svelte-daisy-toaster';

<Toaster />`}
						/>
					</div>

					<div>
						<h3 class="mb-2 font-bold text-lg">4. Use anywhere</h3>
						<CodeBlock
							code={`import { toast } from 'svelte-daisy-toaster';

toast.success('Hello World!');`}
						/>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Stack Mode -->
	<section class="mb-12">
		<h2 class="mb-4 text-2xl font-semibold">Stack Mode</h2>
		<CodeBlock
			code={`<!-- Add 'stack' prop to your Toaster component -->
<Toaster stack={true} />`}
		/>
		<div class="form-control w-fit">
			<label class="label cursor-pointer gap-2">
				<span class="label-text font-bold text-lg text-primary">Enable Stack Mode</span>
				<input
					type="checkbox"
					class="checkbox checkbox-primary checkbox-md"
					bind:checked={toasterConfig.stack}
				/>
			</label>
		</div>
	</section>

	<!-- Basic Toast Types -->
	<section class="mb-8">
		<h2 class="mb-4 text-2xl font-semibold">Basic Toast Types</h2>
		<CodeBlock
			code={`// Simple usage
toast('Default message');
toast.success('Success message');
toast.error('Error message');
toast.warning('Warning message');
toast.info('Info message');

// With title
toast.success('Your changes have been saved!', {
  title: 'Success'
});

// Loading flow
const t = toast.loading('Loading...');
// ... do work ...
t.success('Done!');`}
		/>
		<div class="flex flex-wrap gap-2">
			<button class="btn" onclick={showDefault}> Default Toast </button>
			<button class="btn btn-success" onclick={showSuccess}> Success Toast </button>
			<button class="btn btn-error" onclick={showError}> Error Toast </button>
			<button class="btn btn-warning" onclick={showWarning}> Warning Toast </button>
			<button class="btn btn-info" onclick={showInfo}> Info Toast </button>
			<button class="btn btn-neutral" onclick={showLoadingFlow}> Loading Flow </button>
		</div>
	</section>

	<!-- Toast Positions -->
	<section class="mb-8">
		<h2 class="mb-4 text-2xl font-semibold">Toast Positions</h2>
		<CodeBlock
			code={`toast('Top Center', { position: 'top-center' });
toast('Bottom Center', { position: 'bottom-center' });`}
		/>
		<div class="flex flex-wrap gap-2">
			<button class="btn btn-outline" onclick={showTopLeft}> Top Left </button>
			<button class="btn btn-outline" onclick={showTopCenter}> Top Center </button>
			<button class="btn btn-outline" onclick={() => toast('Top Right')}> Top Right </button>
			<button class="btn btn-outline" onclick={showBottomLeft}> Bottom Left </button>
			<button class="btn btn-outline" onclick={showBottomCenter}> Bottom Center </button>
			<button class="btn btn-outline" onclick={showBottomRight}> Bottom Right </button>
		</div>
	</section>

	<!-- Toast Styles -->
	<section class="mb-8">
		<h2 class="mb-4 text-2xl font-semibold">Toast Styles</h2>
		<CodeBlock
			code={`toast.success('Outline style', { style: 'outline' });
toast.warning('Dash style', { style: 'dash' });
toast.info('Soft style', { style: 'soft' });`}
		/>
		<div class="flex flex-wrap gap-2">
			<button class="btn btn-success btn-outline" onclick={showOutline}> Outline Style </button>
			<button class="btn btn-warning btn-dash" onclick={showDash}> Dash Style </button>
			<button class="btn btn-info btn-soft" onclick={showSoft}> Soft Style </button>
		</div>
	</section>

	<!-- Advanced Features -->
	<section class="mb-12">
		<h2 class="mb-4 text-2xl font-semibold">Advanced Features</h2>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			<div>
				<h3 class="mb-2 font-medium">Action Button</h3>
				<CodeBlock
					code={`const t = toast('Message deleted', {
  button: {
    text: 'Undo',
    callback: () => t.info('Deletion undone', { button: undefined })
  }
});`}
				/>
				<button class="btn btn-primary mt-2" onclick={showWithButton}> Toast with Button </button>
			</div>

			<div>
				<h3 class="mb-2 font-medium">Close Button</h3>
				<CodeBlock
					code={`toast('Click the X to close', {
  showCloseButton: true
});`}
				/>
				<button class="btn btn-secondary mt-2" onclick={showWithClose}> Toast with Close Button </button>
			</div>

			<div class="md:col-span-2">
				<h3 class="mb-2 font-medium">Custom Classes</h3>
				<CodeBlock
					code={`toast('Translucent style', {
  customClass: 'bg-primary/20 backdrop-blur-md text-primary'
});`}
				/>
				<button class="btn btn-accent mt-2" onclick={showCustomStyled}> Toast with Custom Classes </button>
			</div>
		</div>
	</section>

	<!-- Options / API Reference -->
	<section class="mb-12">
		<h2 class="mb-4 text-2xl font-semibold">Options / API Reference</h2>

		<!-- Toast Options -->
		<div class="mb-8">
			<h3 class="mb-3 text-xl font-medium">Toast Options</h3>
			<div class="overflow-x-auto">
				<table class="table table-zebra w-full">
					<thead>
						<tr>
							<th>Option</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code class="text-primary">message</code></td>
							<td><code>string</code></td>
							<td><code>undefined</code></td>
							<td>Toast message content</td>
						</tr>
						<tr>
							<td><code class="text-primary">title</code></td>
							<td><code>string</code></td>
							<td><code>undefined</code></td>
							<td>Title displayed above the message</td>
						</tr>
						<tr>
							<td><code class="text-primary">position</code></td>
							<td><code>ToastPosition</code></td>
							<td><code>'top-right'</code></td>
							<td>Position of the toast on screen</td>
						</tr>
						<tr>
							<td><code class="text-primary">durationMs</code></td>
							<td><code>number</code></td>
							<td><code>4000</code></td>
							<td>Duration in milliseconds before auto-dismiss</td>
						</tr>
						<tr>
							<td><code class="text-primary">style</code></td>
							<td><code>'outline' | 'dash' | 'soft'</code></td>
							<td><code>undefined</code></td>
							<td>Visual style variant of the toast</td>
						</tr>
						<tr>
							<td><code class="text-primary">showCloseButton</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Show close button on the toast</td>
						</tr>
						<tr>
							<td><code class="text-primary">customClass</code></td>
							<td><code>string</code></td>
							<td><code>undefined</code></td>
							<td>Custom CSS classes to apply</td>
						</tr>
						<tr>
							<td><code class="text-primary">button</code></td>
							<td><code>ButtonConfig</code></td>
							<td><code>undefined</code></td>
							<td>Action button configuration</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- Toaster Props -->
		<div class="mb-8">
			<h3 class="mb-3 text-xl font-medium">Toaster Component Props</h3>
			<div class="overflow-x-auto">
				<table class="table table-zebra w-full">
					<thead>
						<tr>
							<th>Prop</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code class="text-primary">stack</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Enable stacked toast display mode</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- Toast Methods -->
		<div class="mb-8">
			<h3 class="mb-3 text-xl font-medium">Toast Methods</h3>
			<div class="overflow-x-auto">
				<table class="table table-zebra w-full">
					<thead>
						<tr>
							<th>Method</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code class="text-primary">toast(message, options?)</code></td>
							<td>Show a default toast with message</td>
						</tr>
						<tr>
							<td><code class="text-primary">toast(options)</code></td>
							<td>Show a toast with options object (message inside options)</td>
						</tr>
						<tr>
							<td><code class="text-primary">toast.success(message, options?)</code></td>
							<td>Show a success toast</td>
						</tr>
						<tr>
							<td><code class="text-primary">toast.error(message, options?)</code></td>
							<td>Show an error toast</td>
						</tr>
						<tr>
							<td><code class="text-primary">toast.warning(message, options?)</code></td>
							<td>Show a warning toast</td>
						</tr>
						<tr>
							<td><code class="text-primary">toast.info(message, options?)</code></td>
							<td>Show an info toast</td>
						</tr>
						<tr>
							<td><code class="text-primary">toast.loading(message, options?)</code></td>
							<td>Show a loading toast (returns controller)</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- Toast Controller Methods -->
		<div class="mb-8">
			<h3 class="mb-3 text-xl font-medium">Toast Controller Methods</h3>
			<p class="text-base-content/70 mb-3">Methods available on the returned toast controller (e.g., from <code class="text-primary">toast.loading()</code>)</p>
			<div class="overflow-x-auto">
				<table class="table table-zebra w-full">
					<thead>
						<tr>
							<th>Method</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code class="text-primary">t.update(options)</code></td>
							<td>Update the toast with new options</td>
						</tr>
						<tr>
							<td><code class="text-primary">t.dismiss()</code></td>
							<td>Dismiss the toast manually</td>
						</tr>
						<tr>
							<td><code class="text-primary">t.success(message, options?)</code></td>
							<td>Update toast to success state</td>
						</tr>
						<tr>
							<td><code class="text-primary">t.error(message, options?)</code></td>
							<td>Update toast to error state</td>
						</tr>
						<tr>
							<td><code class="text-primary">t.warning(message, options?)</code></td>
							<td>Update toast to warning state</td>
						</tr>
						<tr>
							<td><code class="text-primary">t.info(message, options?)</code></td>
							<td>Update toast to info state</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="mt-4">
				<CodeBlock
					code={`const t = toast.loading('Processing...', { position: 'bottom-center' });

// later
t.update({ message: 'Almost done...' });

// or
t.dismiss();`}
				/>
			</div>
		</div>

		<!-- Position Values -->
		<div class="mb-8">
			<h3 class="mb-3 text-xl font-medium">Position Values</h3>
			<div class="flex flex-wrap gap-2">
				<span class="badge badge-outline badge-lg">top-left</span>
				<span class="badge badge-outline badge-lg">top-center</span>
				<span class="badge badge-outline badge-lg badge-primary">top-right</span>
				<span class="badge badge-outline badge-lg">bottom-left</span>
				<span class="badge badge-outline badge-lg">bottom-center</span>
				<span class="badge badge-outline badge-lg">bottom-right</span>
			</div>
			<p class="text-sm text-base-content/70 mt-2">Default: <code class="text-primary">top-right</code></p>
		</div>

		<!-- Button Config -->
		<div>
			<h3 class="mb-3 text-xl font-medium">Button Configuration</h3>
			<CodeBlock
				code={`interface ButtonConfig {
  text: string;           // Button label
  class?: string;         // Custom CSS classes
  callback: (toast) => void; // Click handler
}`}
			/>
		</div>
	</section>
</div>
