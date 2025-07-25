<script>
  import "../app.css";
  import { setToastState } from "$lib/toast-state.svelte.js";
  import Toaster from "$lib/Toaster.svelte";

  setToastState();

  let { children } = $props();
</script>

{@render children()}

<Toaster />
