<script>
  import { onMount, createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  import Controls from "../components/Controls.svelte";

  export let url = "https://jessmitch.daily.co/hey";
  export let userName;

  let interval;
  let callFrame;
  let meetingState = "idle";
  let stats = {
    videoSending: 0,
    videoReceiving: 0,
    packetLossSend: 0,
    packetLossReceive: 0,
  };

  const IFRAME_OPTIONS = {
    height: "auto",
    width: "100%",
    aspectRatio: 16 / 9,
    minWidth: "400px",
    maxWidth: "920px",
    border: "1px solid var(--grey)",
    borderRadius: "4px",
  };

  const logError = (e) => {
    console.error("Something is not right. ", e);
  };

  const updateMeetingState = (e) => {
    console.log(e);
    meetingState = e.action;
  };

  const handleLeftMeeting = (e) => {
    updateMeetingState(e);
    if (interval) clearInterval(interval);
    dispatch("left");
  };

  const toggleCamera = () => {
    if (!callFrame) {
      logError("Callframe does not exist.");
      return;
    }
    const localVideo = callFrame.localVideo();
    callFrame.setLocalVideo(!localVideo);
  };

  const toggleMic = () => {
    if (!callFrame) {
      logError("Callframe does not exist.");
      return;
    }
    const localVideo = callFrame.localAudio();
    callFrame.setLocalAudio(!localVideo);
  };

  const toggleScreenShare = () => {
    if (!callFrame) {
      logError("Callframe does not exist.");
      return;
    }
    const participants = callFrame.participants();
    // stop the screen share if they're currently sharing
    // otherwise, start the screen share
    participants?.local?.screen
      ? callFrame.stopScreenShare()
      : callFrame.startScreenShare();
  };

  const goFullscreen = () => {
    if (!callFrame) {
      logError("Callframe does not exist.");
      return;
    }
    callFrame.requestFullscreen();
  };

  const toggleLocalVideo = () => {
    if (!callFrame) {
      logError("Callframe does not exist.");
      return;
    }
    const shown = callFrame.showLocalVideo();
    callFrame.setShowLocalVideo(!shown);
  };

  const toggleRemoteVideo = () => {
    if (!callFrame) {
      logError("Callframe does not exist.");
      return;
    }
    const shown = callFrame.showParticipantsBar();
    callFrame.setShowParticipantsBar(!shown);
  };

  const getNetworkStats = async () => {
    console.log("getting network stats");
    if (!callFrame) return;

    const newStats = await callFrame.getNetworkStats();
    console.log("stats", newStats);

    stats.videoSending = newStats?.stats?.latest?.videoSendBitsPerSecond;
    stats.videoReceiving = newStats?.stats?.latest?.videoRecvBitsPerSecond;
    stats.packetLossSend = newStats?.stats?.latest?.videoSendPacketLoss;
    stats.packetLossReceive = newStats?.stats?.latest?.videoRecvPacketLoss;
  };

  const initializeDaily = async () => {
    if (callFrame) {
      // if it already exists somehow, destroy the old version and reinitialize
      callFrame.destroy();
      callFrame = null;
      initializeDaily();
    }
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

    // set up interval for retrieving current network stats
    interval = setInterval(() => getNetworkStats(), 5000);

    // let the local user join the call, which will cause
    // the call to be displayed in our app UI
    await callFrame.join();
  };

  onMount(() => {
    // assume if the Call component is showing, we should join
    initializeDaily();
  });
</script>

<div
  class={meetingState === "joined-meeting"
    ? "call-screen"
    : "call-screen prejoin"}
>
  <div id="container" />
  <Controls
    {url}
    {meetingState}
    {stats}
    on:toggle-camera={toggleCamera}
    on:toggle-mic={toggleMic}
    on:toggle-screen-share={toggleScreenShare}
    on:fullscreen={goFullscreen}
    on:toggle-local-video={toggleLocalVideo}
    on:toggle-remote-video={toggleRemoteVideo}
  />
</div>

<style>
  .call-screen {
    padding: 1rem;
    display: flex;
    max-width: 1200px;
    margin: auto;
    width: 100%;
  }
  .prejoin {
    flex-direction: column;
  }
  #container {
    flex: 1.5;
    padding: 1rem 2rem 1rem 1rem;
    display: flex;
    justify-content: center;
  }

  @media only screen and (max-width: 1004px) {
    .call-screen {
      flex-direction: column;
      justify-content: center;
    }
  }
</style>
