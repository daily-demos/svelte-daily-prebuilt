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
    padding: 1rem;
  }
</style>
