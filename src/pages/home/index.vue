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
  </section>
</template>

<style scoped>
.generated-ui-screen {
  --generated-ui-screen-title-size: 2rem;
}

.home-surface-screen__header {
  align-items: flex-start;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

.home-surface-screen__header :deep(.v-btn) {
  min-height: 48px;
}

.home-surface-screen__title {
  font-size: var(--generated-ui-screen-title-size);
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1.1;
  margin: 0 0 0.4rem;
}

@media (max-width: 640px) {
  .generated-ui-screen {
    --generated-ui-screen-title-size: 1.5rem;
  }

  .home-surface-screen__header {
    flex-direction: column;
  }

  .home-surface-screen__header :deep(.v-btn) {
    width: 100%;
  }
}
</style>
