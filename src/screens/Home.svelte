<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let name, url;
  const goToCall = (e) => {
    e.preventDefault();
    dispatch("submit", {
      name,
      url,
    });
  };
</script>

<div class="home-screen">
  <h2>Daily Prebuilt Svelte demo</h2>
  <p>Start demo with a new unique room or paste in your own room URL</p>
  <button> Create room and start </button>
  <p>or</p>
  <form on:submit={goToCall}>
    <label for="name">Name</label>
    <input id="name" type="text" required bind:value={name} />
    <label for="url">Daily URL</label>
    <input id="url" type="text" required bind:value={url} />
    <input type="submit" value="Join call" />
  </form>
</div>

<style>
  .home-screen {
    padding: 0 1rem;
    width: 100%;
    height: calc(100vh - 60px); /* subtract header height*/
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    justify-content: center;
  }
  input[type="submit"] {
    display: block;
  }
</style>
