<header>
  <div class="header-section">
    <img src="/images/logo.svg" alt="Daily logo" />
    <span class="title">Prebuilt UI demo (Svelte)</span>
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
    padding: 0.5rem 1rem;
    background-color: var(--white);
  }
  span {
    font-size: 12px;
    font-weight: 600;
  }
  span.title {
    padding: 0 16px;
  }
  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 8px 16px;
  }
  a.new-tab-link {
    border: 1px solid var(--dark-grey);
    border-radius: 8px;
  }
  a:visited {
    color: var(--dark-blue);
  }
  a:focus {
    color: var(--dark-blue);
  }
  a:active {
    color: var(--turquoise);
  }
  a:hover {
    color: var(--turquoise);
  }
  .header-section {
    display: flex;
    align-items: center;
  }
</style>
