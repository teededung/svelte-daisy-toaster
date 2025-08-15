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

  // Loading demo
  async function showLoadingFlow() {
    const t = toast.loading("Loading data...", {
      position: "top-right",
      title: "Test loading",
    });

    await new Promise((r) => setTimeout(r, 1200));
    t.update({ title: "Test loading", message: "Almost done..." });
    await new Promise((r) => setTimeout(r, 1200));

    // random success or error
    if (Math.random() > 0.5) {
      t.success("Done!", { durationMs: 2000, title: "Success" });
    } else {
      t.error("Failed", {
        durationMs: 3000,
        title: "Error",
        button: {
          text: "Retry",
          callback: () => {
            showLoadingFlow();
          },
        },
      });
    }
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

  // Test button functions
  function showBasicButton() {
    toast({
      type: "info",
      message: "This toast has a button!",
      button: {
        text: "Click me",
        callback: (toast) => {
          alert(`Button clicked! Toast ID: ${toast.id}`);
        },
      },
    });
  }

  function showButtonWithTitle() {
    toast({
      type: "success",
      title: "Download Complete",
      message: "Your file has been downloaded successfully.",
      button: {
        text: "Open Folder",
        callback: () => {
          alert("Opening downloads folder...");
        },
      },
    });
  }

  function showButtonNoAutoClose() {
    toast({
      type: "warning",
      title: "Confirm Action",
      message: "Are you sure you want to proceed?",
      durationMs: 10000, // 10 seconds
      button: {
        text: "Confirm",
        class: "btn-warning",
        closeOnClick: false, // Don't auto close
        callback: (toast) => {
          alert("Action confirmed!");
          // Use the toast state reference from the toast object
          setTimeout(() => {
            toast._toastState.startRemoval(toast.id);
          }, 1000);
        },
      },
    });
  }

  function showButtonDifferentStyles() {
    const styles = [
      { class: "btn-primary", text: "Primary" },
      { class: "btn-secondary", text: "Secondary" },
      { class: "btn-accent", text: "Accent" },
      { class: "btn-ghost", text: "Ghost" },
    ];

    styles.forEach((style, index) => {
      setTimeout(() => {
        toast({
          type: "info",
          message: `Button with ${style.text.toLowerCase()} style`,
          position: "top-right",
          button: {
            text: style.text,
            class: style.class,
            callback: () => {
              alert(`${style.text} button clicked!`);
            },
          },
        });
      }, index * 500);
    });
  }

  function showErrorWithRetry() {
    toast({
      type: "error",
      title: "Upload Failed",
      message: "Failed to upload file. Network error occurred.",
      durationMs: 8000,
      button: {
        text: "Retry",
        class: "btn-error",
        callback: () => {
          // Simulate retry
          toast.info("Retrying upload...");
          setTimeout(() => {
            toast.success("Upload successful!");
          }, 2000);
        },
      },
    });
  }

  // Test close button functions
  function showWithCloseButton() {
    toast({
      type: "info",
      message: "This toast has a close button in the corner!",
      showCloseButton: true,
      durationMs: 10000, // Longer duration to test close button
    });
  }

  function showCloseButtonWithTitle() {
    toast({
      type: "success",
      title: "Transaction Confirmed",
      message: "Swapping 0.2 SUI for 0.747872 USDC",
      showCloseButton: true,
      durationMs: 15000,
    });
  }

  function showCloseButtonWithActionButton() {
    toast({
      type: "warning",
      title: "Confirm Action",
      message: "Are you sure you want to proceed with this transaction?",
      showCloseButton: true,
      durationMs: 20000,
      button: {
        text: "Confirm",
        class: "btn-warning",
        callback: () => {
          toast.success("Transaction confirmed!", 2000);
        },
      },
    });
  }

  function showCloseButtonDifferentStyles() {
    const styles = ["outline", "dash", "soft"];
    const types = ["info", "success", "warning", "error"];

    styles.forEach((style, index) => {
      setTimeout(() => {
        toast({
          type: types[index % types.length],
          title: `${style.charAt(0).toUpperCase() + style.slice(1)} Style`,
          message: `This toast uses ${style} style with close button`,
          style: style,
          showCloseButton: true,
          durationMs: 8000,
          position: "top-right",
        });
      }, index * 800);
    });
  }

  // GitHub link example
  function showGitHubToast() {
    toast({
      type: "info",
      title: "Check out our repository!",
      message: "Visit our GitHub page for more information and updates",
      showCloseButton: true,
      durationMs: 5000,
      button: {
        text: "Open GitHub",
        class: "btn-primary",
        callback: () => {
          window.open(
            "https://github.com/teededung/svelte-daisy-toaster",
            "_blank"
          );
        },
        closeOnClick: false, // Keep toast open so user can click multiple times if needed
      },
    });
  }

  // Test close button position examples
  function showCloseButtonPositions() {
    // Left positions - close button should be at top-left (-top-2 -left-2)
    setTimeout(() => {
      toast({
        type: "info",
        title: "Left Position",
        message: "Close button at TOP-LEFT corner",
        position: "top-left",
        showCloseButton: true,
        durationMs: 15000,
      });
    }, 0);

    setTimeout(() => {
      toast({
        type: "success",
        title: "Left Position",
        message: "Close button at TOP-LEFT corner",
        position: "middle-left",
        showCloseButton: true,
        durationMs: 15000,
      });
    }, 500);

    // Right positions - close button should be at top-right (-top-2 -right-2)
    setTimeout(() => {
      toast({
        type: "warning",
        title: "Right Position",
        message: "Close button at TOP-RIGHT corner",
        position: "top-right",
        showCloseButton: true,
        durationMs: 15000,
      });
    }, 1000);

    setTimeout(() => {
      toast({
        type: "error",
        title: "Right Position",
        message: "Close button at TOP-RIGHT corner",
        position: "middle-right",
        showCloseButton: true,
        durationMs: 15000,
      });
    }, 1500);

    // Center positions - close button should be at top-left (-top-2 -left-2)
    setTimeout(() => {
      toast({
        type: "info",
        title: "Center Position",
        message: "Close button at TOP-LEFT corner",
        position: "center-middle",
        showCloseButton: true,
        durationMs: 15000,
      });
    }, 2000);
  }

  // Test custom class functions
  function showBasicCustomClass() {
    toast.success("Success with custom class!", {
      customClass: "mt-2 bg-yellow-100",
    });
  }

  function showCustomClassWithTitle() {
    toast({
      type: "info",
      title: "Custom Class Example",
      message: "This toast has extra margin and padding.",
      customClass: "m-4 p-4 border-2 border-blue-500",
    });
  }

  function showCustomClassWithButton() {
    toast({
      type: "warning",
      message: "Warning with custom styling and button.",
      customClass: "rounded-xl bg-green-500",
      button: {
        text: "Acknowledge",
        callback: () => {
          alert("Acknowledged!");
        },
      },
    });
  }

  function showCustomClassDifferentPositions() {
    toast({
      type: "success",
      message: "Top-right with custom class",
      position: "top-right",
      customClass: "mt-10 mr-6",
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
      <button class="btn btn-neutral" onclick={showLoadingFlow}>
        Loading Flow
      </button>
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

  <!-- Button Toast Examples -->
  <section class="mb-8">
    <h2 class="text-2xl font-semibold mb-4">Button Toast Examples</h2>
    <div class="space-y-4">
      <div>
        <h3 class="text-lg font-medium mb-2">Basic Button Usage</h3>
        <div class="flex flex-wrap gap-2">
          <button class="btn btn-info" onclick={showBasicButton}>
            Basic Button
          </button>
          <button class="btn btn-success" onclick={showButtonWithTitle}>
            Button with Title
          </button>
          <button class="btn btn-warning" onclick={showButtonNoAutoClose}>
            No Auto Close
          </button>
        </div>
      </div>
      <div>
        <h3 class="text-lg font-medium mb-2">Button Styles</h3>
        <div class="flex flex-wrap gap-2">
          <button class="btn btn-neutral" onclick={showButtonDifferentStyles}>
            Different Button Styles
          </button>
          <button class="btn btn-error" onclick={showErrorWithRetry}>
            Error with Retry
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Close Button Examples -->
  <section class="mb-8">
    <h2 class="text-2xl font-semibold mb-4">Close Button Examples</h2>
    <div class="space-y-4">
      <div>
        <h3 class="text-lg font-medium mb-2">Basic Close Button</h3>
        <div class="flex flex-wrap gap-2">
          <button class="btn btn-info" onclick={showWithCloseButton}>
            Simple Close Button
          </button>
          <button class="btn btn-success" onclick={showCloseButtonWithTitle}>
            Close Button with Title
          </button>
        </div>
      </div>
      <div>
        <h3 class="text-lg font-medium mb-2">Close Button + Action Button</h3>
        <div class="flex flex-wrap gap-2">
          <button
            class="btn btn-warning"
            onclick={showCloseButtonWithActionButton}
          >
            Both Close & Action Button
          </button>
          <button
            class="btn btn-neutral"
            onclick={showCloseButtonDifferentStyles}
          >
            Close Button + Different Styles
          </button>
          <button class="btn btn-primary" onclick={showGitHubToast}>
            Open GitHub Link
          </button>
        </div>
      </div>
      <div>
        <h3 class="text-lg font-medium mb-2">Close Button Positioning</h3>
        <div class="flex flex-wrap gap-2">
          <button class="btn btn-accent" onclick={showCloseButtonPositions}>
            Test Left vs Right Positioning
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Custom Class Examples -->
  <section class="mb-8">
    <h2 class="text-2xl font-semibold mb-4">Custom Class Examples</h2>
    <div class="space-y-4">
      <div>
        <h3 class="text-lg font-medium mb-2">Basic Custom Class</h3>
        <div class="flex flex-wrap gap-2">
          <button class="btn btn-success" onclick={showBasicCustomClass}>
            Basic Custom Class
          </button>
          <button class="btn btn-info" onclick={showCustomClassWithTitle}>
            Custom Class with Title
          </button>
        </div>
      </div>
      <div>
        <h3 class="text-lg font-medium mb-2">Advanced Custom Class</h3>
        <div class="flex flex-wrap gap-2">
          <button class="btn btn-warning" onclick={showCustomClassWithButton}>
            Custom Class: rounded-xl bg-green-500
          </button>
          <button
            class="btn btn-neutral"
            onclick={showCustomClassDifferentPositions}
          >
            Custom Class: mt-10 mr-6
          </button>
        </div>
      </div>
    </div>
  </section>
</div>
