<route lang="json">
{
  "meta": {
    "guard": {
      "policy": "authenticated"
    },
    "jskit": {
      "surface": "home"
    }
  }
}
</route>

<script setup>
import ShellLayout from "@/components/ShellLayout.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <ShellLayout title="" subtitle="">
    <RouterView />
  </ShellLayout>
</template>
