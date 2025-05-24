<template>
  <div class="flex flex-col gap-4 md:px-8 px-2 pt-4">
    <!-- Loading skeleton UI -->
    <div v-if="loading" class="projects-loading">
      <div v-for="i in 3" :key="i" class="skeleton-project" :style="{ animationDelay: `${i * 0.15}s` }">
        <div class="skeleton-image"></div>
        <div class="skeleton-content">
          <div class="skeleton-title"></div>
          <div class="skeleton-description"></div>
          <div class="skeleton-meta"></div>
          <div class="skeleton-tags">
            <div class="skeleton-tag" v-for="j in 3" :key="j"></div>
          </div>
          <div class="skeleton-links">
            <div class="skeleton-link" v-for="j in 2" :key="j"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actual projects with staggered transition -->
    <transition-group
      name="project-fade"
      tag="div"
      class="projects-container"
      v-else
    >
      <div
        v-for="(project, index) in projects"
        :key="project.id"
        class="group flex flex-wrap flex-1 flex-row md:flex-nowrap sm:flex-row gap-4 p-4 hover:bg-gray-900
          hover:text-shadow-terminal-teal transition-all duration-200 project-item"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <div class="flex justify-end sm:items-center sm:justify-center sm:w-48 sm:h-32 w-full h-24 rounded-sm overflow-hidden">
          <img
            :src="project.imagePath"
            alt="Preview"
            class="border w-auto h-full object-cover opacity-70 p-1
            filter grayscale brightness-75
            group-hover:filter-none group-hover:brightness-100 group-hover:opacity-100
            transition-all duration-500 ease-in-out"
          />
        </div>

        <div class="flex flex-1 flex-col relative">
          <h2 class="uppercase font-bold shadow-none">&gt;_ {{ project.id }}</h2>
          <div class="pt-1 font-semibold shadow-none">{{ project.name }}</div>
          <div>{{ project.description }}</div>

          <div class="pt-2 text-teal-300">
            Created: {{ new Date(project.createdAt).toLocaleDateString() }}
            {{ " | " }}Status: {{ project.status }}
          </div>

          <div class="pt-1 flex flex-wrap gap-2">
            <div
              v-for="tag in project.tags"
              :key="tag"
              class="px-2 py-0.5 bg-teal-800/40 text-teal-200 rounded-sm tracking-wider"
            >
              [ {{ tag }} ]
            </div>
          </div>

          <div class="pt-3 flex flex-wrap gap-4">
            <a
              v-for="link in project.links"
              :key="link.url"
              :href="link.url"
              target="_blank"
              class="flex bg-sky-100 text-teal-800 px-3 py-1 rounded-sm hover:bg-indigo-500 hover:text-sky-100 transition-colors duration-200 items-center gap-2"
            >
              <span class="flex items-center gap-1">
                <i :class="`bi bi-${link.icon.toLowerCase()}`" /> _
              </span>
              {{ link.label }}
            </a>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import projectsData from '../../data/projects.json';

export default {
  name: 'ProjectsScreen',
  setup() {
    const projects = ref([]);
    const loading = ref(true);

    onMounted(() => {
      // Simulate loading delay for better UX
      setTimeout(() => {
        // Add id field to projects if missing
        projects.value = projectsData.map((project, index) => ({
          id: project.id || `project-${index + 1}`,
          name: project.name,
          description: project.description,
          imagePath: project.imagePath,
          createdAt: project.createdAt,
          status: project.status,
          tags: project.tags,
          links: project.links
        }));

        // Set loading to false after data is processed
        loading.value = false;
      }, 800); // Short delay for better visual effect
    });

    return {
      projects,
      loading
    };
  }
};
</script>

<style scoped>
/* Skeleton loading styles */
.projects-loading {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skeleton-project {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  background-color: rgba(17, 24, 39, 0.7);
  border-radius: 0.25rem;
  animation: pulse 1.5s infinite;
  opacity: 0;
  animation: fadeIn 0.5s forwards;
}

.skeleton-image {
  width: 100%;
  height: 6rem;
  background-color: rgba(75, 85, 99, 0.3);
  border-radius: 0.25rem;
}

@media (min-width: 640px) {
  .skeleton-image {
    width: 12rem;
    height: 8rem;
  }
}

.skeleton-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skeleton-title {
  height: 1.5rem;
  width: 60%;
  background-color: rgba(75, 85, 99, 0.3);
  border-radius: 0.25rem;
}

.skeleton-description {
  height: 1rem;
  width: 90%;
  background-color: rgba(75, 85, 99, 0.3);
  border-radius: 0.25rem;
}

.skeleton-meta {
  height: 1rem;
  width: 70%;
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

.skeleton-links {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.skeleton-link {
  height: 2rem;
  width: 6rem;
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

/* Project item transitions */
.projects-container {
  position: relative;
}

.project-item {
  animation: fadeIn 0.5s forwards;
  opacity: 0;
}

.project-fade-enter-active,
.project-fade-leave-active {
  transition: all 0.5s ease;
}

.project-fade-enter-from,
.project-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
