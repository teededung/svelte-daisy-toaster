<script>
  import { getToastState } from "./toast-state.svelte.js";
  import { fly } from "svelte/transition";
  let { toast, isAnimate = true, position = "top-right" } = $props();
  const toastState = getToastState();
  let alertRef = $state(null);
  let isAnimated = $state(false);
  let visible = $state(toast.visible ?? true);

  $effect(() => {
    if (isAnimate) {
      isAnimated = true;
    }
  });

  // Watch for changes in toast.visible from the toast state
  $effect(() => {
    visible = toast.visible ?? true;
  });

  // Watch for changes in toast.visible from the toast state
  $effect(() => {
    if (alertRef) {
      toastState.widths[toast.id] = alertRef.clientWidth;
    }
  });

  // Close toast when clicked
  function onclick() {
    toastState.startRemoval(toast.id);
  }

  // Calculate exit animation based on position
  function getExitAnimation() {
    const [vertical, horizontal] = position.split("-");

    // Default values
    let x = 0,
      y = 0;

    // Determine horizontal direction
    if (horizontal === "right" || horizontal === "end") {
      x = 100; // Exit to right
    } else if (horizontal === "left" || horizontal === "start") {
      x = -100; // Exit to left
    }

    // Determine vertical direction for center positions
    if (horizontal === "center") {
      if (vertical === "top") {
        y = -100; // Exit upward
      } else if (vertical === "bottom") {
        y = 100; // Exit downward
      } else {
        // Middle center - default to right
        x = 100;
      }
    }

    return { x, y, duration: 300 };
  }

  const exitAnimation = getExitAnimation();
</script>

{#if visible}
  <div
    bind:this={alertRef}
    in:fly={{ x: -exitAnimation.x, y: -exitAnimation.y, duration: 300 }}
    out:fly={exitAnimation}
    class="{toast.customClass ?? ''} alert flex items-center gap-2 relative"
    class:sm:alert-horizontal={toast.title}
    class:alert-info={toast.type === "info"}
    class:alert-success={toast.type === "success"}
    class:alert-warning={toast.type === "warning"}
    class:alert-error={toast.type === "error"}
    class:alert-outline={toast.style === "outline"}
    class:alert-dash={toast.style === "dash"}
    class:alert-soft={toast.style === "soft"}
    role="alert"
  >
    {#if toast.showCloseButton}
      <button
        class="absolute cursor-pointer btn-outline w-5 h-5 rounded-full flex items-center justify-center bg-black text-white border-1 border-white hover:bg-white hover:text-black transition-all duration-300"
        class:-top-2={true}
        class:-right-2={!toast.position?.includes("right")}
        class:-left-2={toast.position?.includes("right")}
        onclick={() => toastState.startRemoval(toast.id)}
        aria-label="Close notification"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    {/if}
    {#if toast.type === "default"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-info"
        class:animate-icon={isAnimated}
      >
        <circle cx="12" cy="12" r="10" />
        <g class:animate-path={isAnimated}>
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        </g>
      </svg>
    {:else if toast.type === "info"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class:animate-icon={isAnimated}
      >
        <circle cx="12" cy="12" r="10" />
        <g class:animate-path={isAnimated}>
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        </g>
      </svg>
    {:else if toast.type === "loading"}
      <span
        class="loading loading-spinner loading-xs"
        aria-live="polite"
        aria-busy="true"
      ></span>
    {:else if toast.type === "success"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="check-icon"
        class:animate={isAnimated}
      >
        <path d="M4 12l5 5L20 6" class="check-path" />
      </svg>
    {:else if toast.type === "warning"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class:animate-icon={isAnimated}
      >
        <path
          d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"
        />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    {:else if toast.type === "error"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="x-icon"
        class:animate={isAnimated}
      >
        <path d="M18 6 6 18" class="diagonal-1" />
        <path d="m6 6 12 12" class="diagonal-2" />
      </svg>
    {/if}
    {#if toast.title}
      <div>
        <h3 class="font-bold">{toast.title}</h3>
        <div class="text-xs">{toast.message}</div>
      </div>
    {:else}
      <span>{toast.message}</span>
    {/if}
    {#if toast.button}
      <div class="ml-auto">
        <button
          class="btn btn-xs whitespace-nowrap {toast.button.class ||
            'btn-outline'}"
          onclick={() => {
            if (toast.button.callback) {
              toast.button.callback(toast);
            }
            if (toast.button.closeOnClick !== false) {
              toastState.startRemoval(toast.id);
            }
          }}
        >
          {toast.button.text || "OK"}
        </button>
      </div>
    {/if}
  </div>
{/if}

<style>
  .animate-icon {
    animation: primaryAnimation 0.5s ease-in-out;
  }

  .animate-path {
    animation: pathAnimation 0.3s ease-in-out;
  }

  @keyframes primaryAnimation {
    0% {
      transform: scale(1) rotate(0deg);
    }
    20% {
      transform: scale(1.1) rotate(-3deg);
    }
    40% {
      transform: scale(1.1) rotate(3deg);
    }
    60% {
      transform: scale(1.1) rotate(-2deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes pathAnimation {
    0% {
      opacity: 0.7;
      transform: scale(0.8);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  .check-icon {
    overflow: visible;
  }

  .check-path {
    stroke-dasharray: 24;
    stroke-dashoffset: 0;
    transition:
      stroke-dashoffset 0.125s ease-out,
      opacity 0.125s ease-out;
  }

  .check-icon.animate .check-path {
    animation: checkAnimation 0.5s ease-out backwards;
  }

  @keyframes checkAnimation {
    0% {
      stroke-dashoffset: 24;
      opacity: 0;
    }
    33% {
      stroke-dashoffset: 24;
      opacity: 0;
    }
    100% {
      stroke-dashoffset: 0;
      opacity: 1;
    }
  }

  .x-icon {
    overflow: visible;
  }

  .diagonal-1,
  .diagonal-2 {
    stroke-dasharray: 17;
    stroke-dashoffset: 0;
    transition: stroke-dashoffset 0.15s ease-out;
  }

  .x-icon.animate .diagonal-1 {
    opacity: 0;
    animation: lineAnimation 0.3s ease-out forwards;
  }

  .x-icon.animate .diagonal-2 {
    opacity: 0;
    animation: lineAnimation 0.3s ease-out 0.25s forwards;
  }

  @keyframes lineAnimation {
    0% {
      opacity: 0;
      stroke-dashoffset: 17;
    }
    15% {
      opacity: 1;
      stroke-dashoffset: 17;
    }
    100% {
      opacity: 1;
      stroke-dashoffset: 0;
    }
  }
</style>
