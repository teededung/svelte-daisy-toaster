<script>
  import Toast from "$lib/Toast.svelte";
  import { toast } from "$lib/toast-state.svelte.js";

  function showDefault() {
    toast("Default! This is a default message.");
  }

  function showSuccess() {
    toast.success("Success! Operation completed successfully.");
  }

  function showError() {
    toast.error("Error! Something went wrong.");
  }

  function showWarning() {
    toast.warning("Warning! Please check your input.");
  }

  function showInfo() {
    toast.info("Info: This is an information message.");
  }

  // Test position functions
  function showToastAtPosition(position) {
    const positionLabels = {
      "top-left": "Top Left",
      "top-center": "Top Center",
      "top-right": "Top Right",
      "middle-left": "Middle Left",
      "center-middle": "Middle Center",
      "middle-right": "Middle Right",
      "bottom-left": "Bottom Left",
      "bottom-center": "Bottom Center",
      "bottom-right": "Bottom Right",
    };

    const types = ["info", "success", "warning", "error"];
    const randomType = types[Math.floor(Math.random() * types.length)];

    toast({
      message: `${positionLabels[position]} position`,
      type: randomType,
      position,
    });
  }

  // Test title + message functions
  function showSuccessWithTitle() {
    toast({
      type: "success",
      title: "Operation Complete",
      message: "Your file has been uploaded successfully.",
    });
  }

  function showErrorWithTitle() {
    toast({
      type: "error",
      title: "Connection Failed",
      message: "Unable to connect to the server. Please try again.",
    });
  }

  function showWarningWithTitle() {
    toast({
      type: "warning",
      title: "Low Storage Space",
      message: "Your device is running low on storage space.",
    });
  }

  function showInfoWithTitle() {
    toast({
      type: "info",
      title: "New Update Available",
      message: "Version 2.1.0 is now available for download.",
    });
  }

  // Test style functions
  function showOutlineStyle() {
    toast({
      type: "success",
      message: "Success with outline style",
      style: "outline",
    });
  }

  function showDashStyle() {
    toast({
      type: "warning",
      message: "Warning with dash style",
      style: "dash",
    });
  }

  function showSoftStyle() {
    toast({
      type: "error",
      message: "Error with soft style",
      style: "soft",
    });
  }

  function showOutlineWithTitle() {
    toast({
      type: "info",
      title: "Outline Style",
      message: "This toast uses the outline style variant",
      style: "outline",
    });
  }

  function showDashWithTitle() {
    toast({
      type: "success",
      title: "Dash Style",
      message: "This toast uses the dash style variant",
      style: "dash",
    });
  }

  function showSoftWithTitle() {
    toast({
      type: "warning",
      title: "Soft Style",
      message: "This toast uses the soft style variant",
      style: "soft",
    });
  }
</script>

<div class="container mx-auto p-8">
  <h1 class="text-3xl font-bold mb-8">Toast Demo</h1>

  <!-- Basic Toast Types -->
  <section class="mb-8">
    <h2 class="text-2xl font-semibold mb-4">Basic Toast Types</h2>
    <div class="flex flex-wrap gap-2">
      <button class="btn" onclick={showDefault}> Default Toast </button>
      <button class="btn btn-success" onclick={showSuccess}>
        Success Toast
      </button>
      <button class="btn btn-error" onclick={showError}> Error Toast </button>
      <button class="btn btn-warning" onclick={showWarning}>
        Warning Toast
      </button>
      <button class="btn btn-info" onclick={showInfo}> Info Toast </button>
    </div>
  </section>

  <!-- Toast Positions -->
  <section class="mb-8">
    <h2 class="text-2xl font-semibold mb-4">Toast Positions</h2>
    <div class="grid grid-cols-3 gap-2 max-w-md">
      <!-- Top Row -->
      <button
        class="btn btn-outline btn-sm"
        onclick={() => showToastAtPosition("top-left")}>Top Left</button
      >
      <button
        class="btn btn-outline btn-sm"
        onclick={() => showToastAtPosition("top-center")}>Top Center</button
      >
      <button
        class="btn btn-outline btn-sm"
        onclick={() => showToastAtPosition("top-right")}>Top Right</button
      >

      <!-- Middle Row -->
      <button
        class="btn btn-outline btn-sm"
        onclick={() => showToastAtPosition("middle-left")}>Middle Left</button
      >
      <button
        class="btn btn-outline btn-sm"
        onclick={() => showToastAtPosition("center-middle")}
        >Middle Center</button
      >
      <button
        class="btn btn-outline btn-sm"
        onclick={() => showToastAtPosition("middle-right")}>Middle Right</button
      >

      <!-- Bottom Row -->
      <button
        class="btn btn-outline btn-sm"
        onclick={() => showToastAtPosition("bottom-left")}>Bottom Left</button
      >
      <button
        class="btn btn-outline btn-sm"
        onclick={() => showToastAtPosition("bottom-center")}
        >Bottom Center</button
      >
      <button
        class="btn btn-outline btn-sm"
        onclick={() => showToastAtPosition("bottom-right")}>Bottom Right</button
      >
    </div>
  </section>

  <!-- Toast with Title + Message -->
  <section class="mb-8">
    <h2 class="text-2xl font-semibold mb-4">Toast with Title + Message</h2>
    <div class="flex flex-wrap gap-2">
      <button class="btn btn-success" onclick={showSuccessWithTitle}
        >Success with Title</button
      >
      <button class="btn btn-error" onclick={showErrorWithTitle}
        >Error with Title</button
      >
      <button class="btn btn-warning" onclick={showWarningWithTitle}
        >Warning with Title</button
      >
      <button class="btn btn-info" onclick={showInfoWithTitle}
        >Info with Title</button
      >
    </div>
  </section>

  <!-- Toast Styles -->
  <section class="mb-8">
    <h2 class="text-2xl font-semibold mb-4">Toast Styles</h2>
    <div class="space-y-4">
      <div>
        <h3 class="text-lg font-medium mb-2">Basic Styles</h3>
        <div class="flex flex-wrap gap-2">
          <button class="btn btn-success btn-outline" onclick={showOutlineStyle}
            >Outline Style</button
          >
          <button class="btn btn-warning btn-dash" onclick={showDashStyle}
            >Dash Style</button
          >
          <button class="btn btn-error btn-soft" onclick={showSoftStyle}
            >Soft Style</button
          >
        </div>
      </div>
      <div>
        <h3 class="text-lg font-medium mb-2">Styles with Title</h3>
        <div class="flex flex-wrap gap-2">
          <button
            class="btn btn-info btn-outline"
            onclick={showOutlineWithTitle}>Outline + Title</button
          >
          <button class="btn btn-success btn-dash" onclick={showDashWithTitle}
            >Dash + Title</button
          >
          <button class="btn btn-warning btn-soft" onclick={showSoftWithTitle}
            >Soft + Title</button
          >
        </div>
      </div>
    </div>
  </section>
</div>
