<route lang="json">
{
  "meta": {
    "guard": {
      "policy": "authenticated"
    }
  }
}
</route>

<template>
  <section class="generated-ui-screen generated-ui-screen--app home-surface-screen d-flex flex-column ga-4">
    <header class="home-surface-screen__header">
      <div>
        <p class="text-overline text-medium-emphasis mb-1">App</p>
        <h1 class="home-surface-screen__title">Welcome to App</h1>
        <p class="text-body-2 text-medium-emphasis mb-0">
          You are signed in with your local account.
        </p>
      </div>
      <v-btn color="primary" variant="flat" to="/auth/signout?returnTo=%2Fhome">Sign out</v-btn>
    </header>

    <v-sheet rounded="lg" border class="home-surface-screen__panel">
      <div class="home-surface-screen__status">
        <span class="text-caption text-medium-emphasis">Authentication</span>
        <strong>Local sign-in active</strong>
      </div>
      <v-divider vertical class="d-none d-sm-block" />
      <div class="home-surface-screen__status">
        <span class="text-caption text-medium-emphasis">Storage</span>
        <strong>File-backed, no database</strong>
      </div>
    </v-sheet>
  </section>
</template>

<style scoped>
.generated-ui-screen {
  --generated-ui-screen-title-size: 2rem;
  --generated-ui-screen-panel-padding: 1rem;
}

.home-surface-screen__header {
  align-items: flex-start;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

.home-surface-screen__title {
  font-size: var(--generated-ui-screen-title-size);
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1.1;
  margin: 0 0 0.4rem;
}

.home-surface-screen__panel {
  align-items: stretch;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: var(--generated-ui-screen-panel-padding);
}

.home-surface-screen__status {
  display: grid;
  gap: 0.15rem;
  min-width: 9rem;
}

@media (max-width: 640px) {
  .generated-ui-screen {
    --generated-ui-screen-title-size: 1.5rem;
  }

  .home-surface-screen__header {
    flex-direction: column;
  }

  .home-surface-screen__header :deep(.v-btn) {
    min-height: 48px;
    width: 100%;
  }
}
</style>
