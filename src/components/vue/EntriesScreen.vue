<template>
  <div v-if="processedEntries.length === 0" class="flex items-center justify-center h-full w-full">
    <p class="text-center text-gray-400 text-lg">
      No entries detected, Try Again
      <span class="blinking-cursor">_</span>
    </p>
  </div>
  <div v-else class="p-4">
    <!-- 1) Tag Filter Bar -->
    <div class="flex flex-wrap gap-2 mb-2">
      <span class="px-2 py-1 text-white">
        [Filters]
      </span>

      <button
        v-for="tag in allTags"
        :key="tag"
        class="tag-button px-2 py-0.5 rounded font-mono cursor-pointer transition-colors duration-150"
        :class="selectedTags.has(tag) ? 'bg-teal-800 text-teal-200' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'"
        @click="toggleTag(tag)"
      >
        {{ tag }}
      </button>

      <button class="clear-button px-3 py-1 text-red-400 hover:text-red-600" @click="clearTags">
        [Clear]
      </button>
    </div>

    <!-- 2) Filtered Grid -->
    <div class="grid grid-cols-1 gap-4">
      <article
        v-for="entry in displayedEntries"
        :key="entry.id"
        class="entry-item rounded-lg overflow-hidden shadow-md bg-gray-900 border border-gray-900 hover:border-teal-600"
        :data-tags="JSON.stringify(entry.data.tags || [])"
        :data-id="entry.id"
        :data-lang="entry.lang"
      >
        <a v-if="entry.data.cover" :href="`/entry/${entry.id}`">
          <img
            :src="entry.data.cover"
            :alt="`Cover for ${entry.data.title}`"
            class="w-full h-48 object-cover"
          />
        </a>

        <div class="p-4">
          <div class="flex items-center justify-between gap-2">
            <a :href="`/entry/${entry.id}`">
              <h2 class="font-mono text-xl font-semibold text-teal-400 hover:text-teal-200 transition-colors">
                {{ entry.data.title }}
              </h2>
            </a>

            <button
              type="button"
              class="share-button flex items-center px-2 py-1 rounded bg-sky-100 hover:bg-gray-300 text-teal-800 gap-1"
              :data-id="entry.id"
              :data-lang="entry.lang"
              @click="copyShareLink(entry.id)"
            >
              Share
            </button>
          </div>

          <span class="copy-message md:ml-2 text-sm text-amber-400" :style="{ display: lastCopiedId === entry.id ? 'inline' : 'none' }">
            Copied! Thanks for Sharing :)
          </span>

          <p class="text-gray-300 mt-2 line-clamp-3">
            {{ entry.data.description }}
          </p>

          <p class="text-gray-400 text-sm mt-4 flex flex-wrap gap-1">
            <time v-if="entry.data.pubDate" :datetime="formatDatetime(entry.data.pubDate)">
              {{ formatDate(entry.data.pubDate) }}
            </time>
            <span v-if="entry.data.pubDate">•</span>
            <span
              v-for="tag in entry.data.tags || []"
              :key="tag"
              class="bg-teal-800 text-teal-200 px-2 py-0.5 rounded text-xs"
            >
              {{ tag }}
            </span>
          </p>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  name: 'EntriesScreen',
  props: {
    entries: {
      type: Array,
      required: true
    },
    allTags: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const processedEntries = ref(props.entries);
    const allTagsRef = ref(props.allTags);
    const selectedTags = ref(new Set());
    const lastCopiedId = ref(null);

    // Computed property for displayed entries based on selected tags
    const displayedEntries = computed(() => {
      if (selectedTags.value.size === 0) {
        return processedEntries.value;
      }

      return processedEntries.value.filter(entry => {
        const entryTags = entry.data.tags || [];
        return Array.from(selectedTags.value).every(tag => entryTags.includes(tag));
      });
    });

    // Function to toggle a tag selection
    const toggleTag = (tag) => {
      if (selectedTags.value.has(tag)) {
        selectedTags.value.delete(tag);
      } else {
        selectedTags.value.add(tag);
      }
    };

    // Function to clear all selected tags
    const clearTags = () => {
      selectedTags.value.clear();
    };

    // Function to copy share link
    const copyShareLink = async (id) => {
      if (!id) {
        console.error('No id provided for sharing');
        return;
      }

      const baseUri = window.location.origin;

      try {
        // Find the entry with the given id
        const entry = processedEntries.value.find(e => e.id === id);
        if (!entry) {
          console.error(`Entry with id "${id}" not found`);
          return;
        }

        const lang = entry.lang || 'en';

        // Include language in the share URL
        const shareUrl = `${baseUri}/${lang}/entry/${encodeURIComponent(id)}`;

        try {
          await navigator.clipboard.writeText(shareUrl);

          // Show copied message
          lastCopiedId.value = id;

          // Hide message after 2 seconds
          setTimeout(() => {
            lastCopiedId.value = null;
          }, 2000);
        } catch (clipboardErr) {
          console.error('Failed to copy to clipboard: ', clipboardErr);

          // Fallback for browsers that don't support clipboard API
          const textArea = document.createElement('textarea');
          textArea.value = shareUrl;
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();

          try {
            const successful = document.execCommand('copy');
            if (!successful) {
              console.error('Fallback clipboard copy failed');
            } else {
              lastCopiedId.value = id;
              setTimeout(() => {
                lastCopiedId.value = null;
              }, 2000);
            }
          } catch (fallbackErr) {
            console.error('Fallback clipboard copy failed: ', fallbackErr);
          }

          document.body.removeChild(textArea);
        }
      } catch (err) {
        console.error('Error in copyShareLink: ', err);
      }
    };

    // Helper function to format date for datetime attribute
    const formatDatetime = (date) => {
      try {
        const d = date instanceof Date ? date : new Date(date);
        return d.toISOString().split('T')[0];
      } catch (err) {
        console.error('Error formatting datetime:', err);
        return '';
      }
    };

    // Helper function to format date for display
    const formatDate = (date) => {
      try {
        const d = date instanceof Date ? date : new Date(date);
        return d.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      } catch (err) {
        console.error('Error formatting date:', err);
        return '';
      }
    };

    return {
      processedEntries,
      allTags: allTagsRef,
      selectedTags,
      lastCopiedId,
      displayedEntries,
      toggleTag,
      clearTags,
      copyShareLink,
      formatDatetime,
      formatDate
    };
  }
};
</script>

<style scoped>
/* Component-specific styles can be added here */
</style>
