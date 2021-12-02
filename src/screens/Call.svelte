<script>
  import { onMount } from "svelte";

  let callFrame;
  export let url = "https://jessmitch.daily.co/hey";
  export let userName;

  const IFRAME_OPTIONS = {
    height: "auto",
    width: "100%",
    aspectRatio: 16 / 9,
    minWidth: "400px",
    maxWidth: "920px",
    border: "1px solid var(--grey)",
    borderRadius: "4px",
  };

  const initializeDaily = () => {
    // select container element to embed Daily iframe in
    const container = document.getElementById("container");
    // create Daily iframe
    callFrame = window.DailyIframe.createFrame(container, {
      iframeStyle: IFRAME_OPTIONS,
      showLeaveButton: true,
      url,
      userName,
    });
    // let the local user join the call, which will cause the call to be displayed in our app UI
    callFrame.join();
  };

  onMount(() => {
    // assume if the Call component is showing, we want to join immediately
    initializeDaily();
  });
</script>

<div class="call-screen">
  <div id="container" />
</div>

<style>
  .call-screen {
    padding: 1rem;
  }
</style>
