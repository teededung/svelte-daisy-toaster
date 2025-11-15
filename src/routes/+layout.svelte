<script>
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import { setToastState } from "$lib/toast-state.svelte.js";
  import Toaster from "$lib/Toaster.svelte";

  setToastState();

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<Toaster />
