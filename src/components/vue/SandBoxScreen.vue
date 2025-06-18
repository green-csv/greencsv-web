<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-100 mb-6">Sandbox Experiments</h1>
    <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <a
          v-for="entry in entries"
          :key="entry.id"
          :href="`/sandbox/${entry.id}/`"
          class="block p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        <h2 class="text-xl font-semibold text-white">
          {{ entry.data.title ?? entry.id }}
        </h2>
        <p class="mt-2 text-sm font-mono text-gray-400">{{ entry.id }}</p>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface SandboxEntry {
  id: string;
  data: {
    title?: string;
    [key: string]: any;
  };
}

const props = defineProps<{
  entries: SandboxEntry[];
}>();
</script>
