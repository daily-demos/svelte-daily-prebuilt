<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let url;
  export let meetingState;
  let copyStatus = "Copy";

  const handleCopyClick = () => {
    // todo: copy to clipboard
    copyStatus = "Copied!";
    // reset button label
    setTimeout(() => {
      copyStatus = "Copy";
    }, 3000);
  };

  const handleToggleCameraClick = () => {
    dispatch("toggle-camera");
  };
  const handleToggleMicClick = () => {
    dispatch("toggle-mic");
  };
  const handleToggleScreenShareClick = () => {
    dispatch("toggle-screen-share");
  };
  const handleFullscreenClick = () => {
    dispatch("fullscreen");
  };
  const handleToggleLocalVideoClick = () => {
    dispatch("toggle-local-video");
  };
  const handleToggleRemoteVideoClick = () => {
    dispatch("toggle-remote-video");
  };
</script>

<div class="controls-container">
  <h2>Invite Participants</h2>
  <label for="url" />
  <input type="text" id="url" disabled value={url} />
  <button on:click={handleCopyClick}>{copyStatus}</button>
  {#if meetingState === "joined-meeting"}
    <h2>Call Overview</h2>
    <h3>Network stats</h3>
    <h3>Example custom controls</h3>
    <p>
      Using daily-js, you can customize your own controls to update your calls
      programmatically
    </p>
    <div class="button-container">
      <button on:click={handleToggleCameraClick}>Toggle camera</button>
      <button on:click={handleToggleMicClick}>Toggle mic</button>
      <button on:click={handleToggleScreenShareClick}
        >Toggle screen share</button
      >
      <button on:click={handleFullscreenClick}>Expand fullscren</button>
      <button on:click={handleToggleLocalVideoClick}>Hide local video</button>
      <button on:click={handleToggleRemoteVideoClick}
        >Hide remote participants (speaker view only)</button
      >
    </div>
  {/if}
</div>

<style>
  .controls-container {
    flex: 1;
    padding: 1rem;
  }
</style>
