<script>
  import Call from "./screens/Call.svelte";
  import Header from "./components/Header.svelte";
  import Home from "./screens/Home.svelte";

  let currentScreen = "home"; //  || 'call'
  let url, userName;

  const handleJoinCall = ({ detail }) => {
    currentScreen = "call";
    url = detail.url;
    userName = detail.name;
  };
  const handleLeaveCall = () => {
    currentScreen = "home";
  };
</script>

<svelte:head>
  <script crossorigin src="https://unpkg.com/@daily-co/daily-js"></script>
</svelte:head>

<div class="wrapper">
  <Header />
  {#if currentScreen === "home"}
    <Home on:submit={handleJoinCall} />
  {:else}
    <Call {userName} {url} on:left={handleLeaveCall} />
  {/if}
</div>

<style>
  .wrapper {
    background-color: var(--grey-lightest);
    height: 100vh;
  }
</style>
