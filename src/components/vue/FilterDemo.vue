<template>
  <div class="filter-demo">
    <h2 class="text-xl mb-4">Filter Effects Demo</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="filter-card">
        <h3 class="text-lg mb-2">No Filter</h3>
        <div class="demo-box">
          <p>Sample Text</p>
          <div class="color-box"></div>
        </div>
      </div>

      <div class="filter-card">
        <h3 class="text-lg mb-2">Grain Effect</h3>
        <div class="demo-box grain-effect">
          <p>Sample Text</p>
          <div class="color-box"></div>
        </div>
      </div>

      <div class="filter-card">
        <h3 class="text-lg mb-2">Chromatic Aberration</h3>
        <div class="demo-box chromatic-aberration-effect">
          <p>Sample Text</p>
          <div class="color-box"></div>
        </div>
      </div>

      <div class="filter-card">
        <h3 class="text-lg mb-2">Combined CRT Effect</h3>
        <div class="demo-box crt-effect">
          <p>Sample Text</p>
          <div class="color-box"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'FilterDemo'
}
</script>

<style scoped>
.filter-demo {
  padding: 2rem;
  background-color: #1a202c;
  border-radius: 0.5rem;
  margin: 2rem 0;
}

.filter-card {
  background-color: #2d3748;
  border-radius: 0.5rem;
  padding: 1rem;
}

.demo-box {
  background-color: #4a5568;
  border-radius: 0.25rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
}

.color-box {
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #f56565, #ed8936, #ecc94b, #48bb78, #4299e1, #667eea);
  margin-top: 1rem;
  border-radius: 0.25rem;
}

pre {
  white-space: pre-wrap;
}
</style>
