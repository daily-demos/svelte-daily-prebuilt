<script>
  import Call from "./screens/Call.svelte";
  import Header from "./components/Header.svelte";
  import Home from "./screens/Home.svelte";

  let currentScreen = "home"; //  || 'call'
  let url, userName;

  const updateScreen = ({ detail }) => {
    currentScreen = "call";
    url = detail.url;
    userName = detail.name;
  };
</script>

<svelte:head>
  <script crossorigin src="https://unpkg.com/@daily-co/daily-js"></script>
</svelte:head>

<div class="wrapper">
  <Header />
  {#if currentScreen === "home"}
    <Home on:submit={updateScreen} />
  {:else}
    <Call {userName} {url} />
  {/if}
</div>

<style>
</style>
