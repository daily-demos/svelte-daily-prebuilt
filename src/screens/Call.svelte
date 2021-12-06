<script>
  import { onMount, createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  import Controls from "../components/Controls.svelte";

  let callFrame;
  export let url = "https://jessmitch.daily.co/hey";
  export let userName;
  let meetingState = "idle";

  const IFRAME_OPTIONS = {
    height: "auto",
    width: "100%",
    aspectRatio: 16 / 9,
    minWidth: "400px",
    maxWidth: "920px",
    border: "1px solid var(--grey)",
    borderRadius: "4px",
  };

  const updateMeetingState = (e) => {
    console.log(e);
    meetingState = e.action;
  };

  const handleLeftMeeting = (e) => {
    updateMeetingState(e);
    dispatch("left");
  };

  const initializeDaily = async () => {
    // select container element to embed Daily iframe in
    const container = document.getElementById("container");
    // create Daily iframe
    callFrame = window.DailyIframe.createFrame(container, {
      iframeStyle: IFRAME_OPTIONS,
      showLeaveButton: true,
      url,
      userName,
    });

    callFrame.on("joining-meeting", updateMeetingState);
    callFrame.on("joined-meeting", updateMeetingState);
    callFrame.on("left-meeting", handleLeftMeeting);
    callFrame.on("error", updateMeetingState);
    // callFrame.on("active-speaker-change", updateMeetingState);
    // callFrame.on("participant-joined", updateMeetingState);
    // let the local user join the call, which will cause the call to be displayed in our app UI
    callFrame.join().then((e) => {
      console.log(e);
    });
  };

  onMount(() => {
    // assume if the Call component is showing, we want to join immediately
    initializeDaily();
  });
</script>

<div class="call-screen">
  <div id="container" />
  {#if meetingState === "joined-meeting"}
    <Controls {url} />
  {/if}
</div>

<style>
  .call-screen {
    padding: 1rem;
    display: flex;
    max-width: 1200px;
    margin: auto;
  }
  #container {
    flex: 1.5;
    padding: 1rem;
    display: flex;
    justify-content: center;
  }
</style>
