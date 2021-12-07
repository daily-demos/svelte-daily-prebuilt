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
    <input
      id="url"
      type="text"
      required
      bind:value={url}
      placeholder="https://your-domain.daily.co/room-name"
    />
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
  h2 {
    font-size: 32px;
    margin: 0;
  }
  p {
    font-size: 16px;
    margin: 16px;
  }
  label {
    display: block;
    color: var(--dark-grey);
    font-size: 12px;
    margin-bottom: 4px;
    margin-top: 8px;
  }
  input {
    border: none;
    background-color: var(--white);
    border: none;
    border-radius: 8px;
    padding: 8px;
    width: calc(280px - 16px); /* subtract extra input padding from width */
    border: 1px solid var(--grey);
  }
  input[type="submit"] {
    display: block;
    background-color: var(--white);
    border: none;
    border-radius: 8px;
    width: 280px;
    padding: 8px 0;
    font-size: 12px;
    font-weight: 600;
    margin-top: 16px;
    border: 1px solid var(--grey);
  }
  button {
    background-color: var(--turquoise);
    border: none;
    border-radius: 8px;
    width: 280px;
    padding: 8px 0;
    font-size: 12px;
    font-weight: 600;
  }
</style>
