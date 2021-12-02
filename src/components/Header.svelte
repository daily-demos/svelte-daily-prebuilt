<header>
  <div class="header-section">
    <img src="/images/logo.svg" alt="Daily logo" />
    <span>Prebuilt UI demo (Svelte)</span>
  </div>
  <div class="header-section">
    <a
      class="new-tab-link"
      href="https://docs.daily.co/reference/daily-js"
      target="_blank"
      rel="noreferrer noopenner"
    >
      <span>API docs</span>
      <img src="/images/newtab.svg" alt="New tab" />
    </a>
    <a
      class="github-link"
      href="https://github.com/daily-demos/svelte-prebuilt"
      target="_blank"
      rel="noreferrer noopenner"
    >
      <img src="/images/github.svg" alt="Github" />
    </a>
  </div>
</header>

<style>
  header {
    width: calc(100% - 2rem);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #c8d1dc;
    padding: 1rem;
  }
  .header-section {
    display: flex;
    align-items: center;
  }
</style>
