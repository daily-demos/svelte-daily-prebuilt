<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let url;
  export let meetingState;
  export let stats;
  let copyStatus = "Copy URL";

  const handleCopyClick = () => {
    navigator?.clipboard?.writeText(url);
    copyStatus = "Copied!";
    // reset button label
    setTimeout(() => {
      copyStatus = "Copy";
    }, 3000);
  };

  /**
   * Button click events.
   * Each button triggers a unique event that
   * the Call component listens for.
   */
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
  /**
   * End of button click events
   */

  const formatStats = (value) => {
    return `${value ? value.toFixed(1) : "0"} b/s`;
  };
</script>

<div
  class={meetingState !== "joined-meeting"
    ? "controls-container prejoin"
    : "controls-container"}
>
  {#if meetingState === "joined-meeting"}
    <div class="overview">
      <h2>Call Overview</h2>
      <hr />
    </div>
  {/if}
  <h2>Invite Participants</h2>
  <p>Share URL below to invite others</p>
  <div class="copy-container">
    <label for="url" />
    <input type="text" id="url" disabled value={url} />
    <button class="copy-button" on:click={handleCopyClick}>{copyStatus}</button>
  </div>
  {#if meetingState === "joined-meeting"}
    <hr />
    <div>
      <h2>Network stats</h2>
      <div class="stats">
        <p>
          <span class="bold">Video sending</span><span
            >{formatStats(stats?.videoSending)}</span
          >
        </p>
        <p>
          <span class="bold">Packet loss send</span><span
            >{formatStats(stats?.packetLossSend)}</span
          >
        </p>
        <p>
          <span class="bold">Video receiving</span><span
            >{formatStats(stats?.videoReceiving)}</span
          >
        </p>
        <p>
          <span class="bold">Packet loss receiving</span><span
            >{formatStats(stats?.packetLossReceive)}</span
          >
        </p>
      </div>
    </div>
    <hr />
    <div class="customer-controls">
      <h2>Example custom controls</h2>
      <p>
        Using daily-js, you can customize your own controls to update your calls
        programmatically
      </p>
      <div class="button-container">
        <button on:click={handleToggleCameraClick}
          ><span
            >Toggle camera
            <img src="/images/cam.svg" alt="Camera" /></span
          ></button
        >
        <button on:click={handleToggleMicClick}>
          <span>
            Toggle mic
            <img src="/images/mic.svg" alt="Microphone" />
          </span>
        </button>
        <button on:click={handleToggleScreenShareClick}
          ><span
            >Toggle screen share <img
              src="/images/screen.svg"
              alt="Screen share"
            /></span
          ></button
        >
        <button on:click={handleFullscreenClick}>Expand fullscreen</button>
        <button on:click={handleToggleLocalVideoClick}>Hide local video</button>
        <button on:click={handleToggleRemoteVideoClick}
          >Hide remote participants (speaker view only)</button
        >
      </div>
      <hr />
    </div>
  {/if}
</div>

<style>
  .controls-container {
    flex: 1;
    padding: 1rem 2rem 1rem 1rem;
    max-width: calc(1004px - 4rem);
    display: flex;
    flex-direction: column;
  }
  .controls-container.prejoin {
    align-self: center;
  }
  h2 {
    margin: 8px 0;
  }
  p {
    font-size: 12px;
    color: var(--dark-blue);
  }
  .stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 28px;
    grid-row-gap: 20px;
    padding-right: 1rem;
  }
  .stats p {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .bold {
    font-weight: 600;
    margin-right: 5px;
  }
  input {
    border: none;
    background-color: var(--white);
    border: none;
    border-radius: 8px;
    padding: 8px;
    width: calc(280px - 16px); /* subtract extra input padding from width */
    border: 1px solid var(--grey);
    margin-right: 8px;
  }
  .copy-container {
    display: flex;
    flex-wrap: wrap;
  }
  button.copy-button {
    background-color: var(--turquoise);
    border: none;
    border-radius: 8px;
    width: 90px;
    padding: 8px 0;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }
  button:not(.copy-button) {
    background-color: var(--white);
    border: 1px solid var(--grey);
    border-radius: 8px;
    white-space: nowrap;
    padding: 4px 8px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    margin: 4px;
    height: 26px;
  }
  button:not(.copy-button) span {
    display: flex;
    align-items: center;
    margin-left: 4px;
  }
  hr {
    border: 1px solid var(--grey);
    margin: 24px 0;
  }

  @media only screen and (max-width: 1004px) {
    .customer-controls {
      order: -1;
    }
    hr:last-child {
      display: block;
    }
    .overview {
      display: none;
    }
  }
</style>
