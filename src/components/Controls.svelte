<script>
  let copyStatus = "Copy";

  const handleCopyClick = () => {
    // todo: copy to clipboard
    copyStatus = "Copied!";
    // reset button label
    setTimeout(() => {
      copyStatus = "Copy";
    }, 3000);
  };

  const handleToggleCameraClick = () => {};
  const handleToggleMicClick = () => {};
  const handleToggleScreenShareClick = () => {};
  const handleFullscreenClick = () => {};
  const handleToggleLocalVideoClick = () => {};
  const handleToggleRemoteVideoClick = () => {};
</script>

<div class="controls-container">
  <h2>Call Overview</h2>
  <h3>Invite Participants</h3>
  <label for="url" />
  <input type="text" id="url" />
  <button on:click={handleCopyClick}>{copyStatus}</button>
  <h3>Network stats</h3>
  <h3>Example custom controls</h3>
  <p>
    Using daily-js, you can customize your own controls to update your calls
    programmatically
  </p>
  <div class="button-container">
    <button on:click={handleToggleCameraClick}>Toggle camera</button>
    <button on:click={handleToggleMicClick}>Toggle mic</button>
    <button on:click={handleToggleScreenShareClick}>Toggle screen share</button>
    <button on:click={handleFullscreenClick}>Expand fullscren</button>
    <button on:click={handleToggleLocalVideoClick}>Hide local video</button>
    <button on:click={handleToggleRemoteVideoClick}
      >Hide remote participants (speaker view only)</button
    >
  </div>
</div>

<style>
  .controls-container {
    flex: 1;
    padding: 1rem;
  }
</style>
