<template>
  <!-- Loading skeleton UI -->
  <div v-if="loading" class="entries-loading p-4">
    <!-- Skeleton Tag Filter Bar -->
    <div class="flex flex-wrap gap-2 mb-4">
      <div class="skeleton-filter-label"></div>
      <div v-for="i in 5" :key="i" class="skeleton-tag-filter" :style="{ animationDelay: `${i * 0.1}s` }"></div>
      <div class="skeleton-clear-button"></div>
    </div>

    <!-- Skeleton Entries -->
    <div class="grid grid-cols-1 gap-4">
      <div
          v-for="i in 3"
          :key="i"
          class="skeleton-entry"
          :style="{ animationDelay: `${i * 0.15}s` }"
      >
        <div class="skeleton-cover"></div>
        <div class="skeleton-content p-4">
          <div class="flex items-center justify-between">
            <div class="skeleton-title"></div>
            <div class="skeleton-share-button"></div>
          </div>
          <div class="skeleton-description mt-2"></div>
          <div class="skeleton-description-line"></div>
          <div class="flex gap-2 mt-4">
            <div class="skeleton-date"></div>
            <div class="skeleton-tags">
              <div class="skeleton-tag" v-for="j in 3" :key="j"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- No entries message -->
  <div v-else-if="processedEntries.length === 0" class="flex items-center justify-center h-full w-full">
    <p class="text-center text-gray-400 text-lg">
      No entries detected, Try Again
      <span class="blinking-cursor">_</span>
    </p>
  </div>

  <!-- Actual content -->
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

    <!-- 2) Filtered Grid with transition -->
    <transition-group
        name="entry-fade"
        tag="div"
        class="grid grid-cols-1 gap-4 entries-container"
    >
      <article
          v-for="(entry, index) in displayedEntries"
          :key="entry.id"
          class="entry-item rounded-lg overflow-hidden shadow-md bg-gray-900 border border-gray-900 hover:border-teal-600"
          :data-tags="JSON.stringify(entry.data.tags || [])"
          :data-id="entry.id"
          :data-lang="entry.lang"
          :style="{ animationDelay: `${index * 0.1}s` }"
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

          <span class="copy-message md:ml-2 text-sm text-amber-400"
                :style="{ display: lastCopiedId === entry.id ? 'inline' : 'none' }">
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
    </transition-group>
  </div>
</template>

<script>
import {computed, onMounted, ref} from 'vue';

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
    const loading = ref(true);

    // Computed property for displayed entries based on selected tags
    const displayedEntries = computed(() => {
      if (selectedTags.value.size === 0) {
        return processedEntries.value;
      }

      return processedEntries.value
          .filter(entry => {

            const entryTags = entry.data.tags || [];

            return [...selectedTags.value]
                .every(tag => entryTags.includes(tag));
          });
    });


    onMounted(() => {

      setTimeout(() => {
        loading.value = false;
      }, 800);
    });


    const toggleTag = (tag) => {
      if (selectedTags.value.has(tag)) {
        selectedTags.value.delete(tag);
      } else {
        selectedTags.value.add(tag);
      }
    };

    const clearTags = () => {
      selectedTags.value.clear();
    };

    const copyShareLink = async (id) => {
      if (!id) {
        console.error('No id provided for sharing');
        return;
      }

      const baseUri = window.location.origin;

      try {

        const entry = processedEntries.value.find(e => e.id === id);
        if (!entry) {
          console.error(`Entry with id "${id}" not found`);
          return;
        }
        const shareUrl = `${baseUri}/entry/${encodeURIComponent(id)}`;

        try {
          await navigator.clipboard.writeText(shareUrl);

          lastCopiedId.value = id;

          setTimeout(() => {
            lastCopiedId.value = null;
          }, 2000);
        } catch (clipboardErr) {
          console.error('Failed to copy to clipboard: ', clipboardErr);

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
      loading,
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
/* Skeleton loading styles */
.entries-loading {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skeleton-filter-label {
  width: 80px;
  height: 30px;
  background-color: rgba(75, 85, 99, 0.3);
  border-radius: 0.25rem;
}

.skeleton-tag-filter {
  width: 100px;
  height: 30px;
  background-color: rgba(75, 85, 99, 0.3);
  border-radius: 0.25rem;
  opacity: 0;
  animation: fadeIn 0.5s forwards;
}

.skeleton-clear-button {
  width: 70px;
  height: 30px;
  background-color: rgba(255, 75, 75, 0.2);
  border-radius: 0.25rem;
}

.skeleton-entry {
  background-color: rgba(17, 24, 39, 0.7);
  border-radius: 0.25rem;
  overflow: hidden;
  border: 1px solid rgba(31, 41, 55, 0.7);
  animation: pulse 1.5s infinite;
  opacity: 0;
  animation: fadeIn 0.5s forwards;
}

.skeleton-cover {
  width: 100%;
  height: 12rem;
  background-color: rgba(75, 85, 99, 0.3);
}

.skeleton-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skeleton-title {
  height: 1.5rem;
  width: 70%;
  background-color: rgba(75, 85, 99, 0.3);
  border-radius: 0.25rem;
}

.skeleton-share-button {
  height: 2rem;
  width: 5rem;
  background-color: rgba(75, 85, 99, 0.3);
  border-radius: 0.25rem;
}

.skeleton-description {
  height: 1rem;
  width: 90%;
  background-color: rgba(75, 85, 99, 0.3);
  border-radius: 0.25rem;
}

.skeleton-description-line {
  height: 1rem;
  width: 80%;
  background-color: rgba(75, 85, 99, 0.3);
  border-radius: 0.25rem;
  margin-top: 0.5rem;
}

.skeleton-date {
  height: 1rem;
  width: 6rem;
  background-color: rgba(75, 85, 99, 0.3);
  border-radius: 0.25rem;
}

.skeleton-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.skeleton-tag {
  height: 1.5rem;
  width: 4rem;
  background-color: rgba(75, 85, 99, 0.3);
  border-radius: 0.25rem;
}

/* Animation keyframes */
@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.8;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Entry item transitions */
.entries-container {
  position: relative;
}

.entry-item {
  animation: fadeIn 0.5s forwards;
  opacity: 0;
}

.entry-fade-enter-active,
.entry-fade-leave-active {
  transition: all 0.5s ease;
}

.entry-fade-enter-from,
.entry-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.blinking-cursor {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
