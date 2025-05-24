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

    <div class="mt-8">
      <h3 class="text-lg mb-2">How to Use</h3>
      <pre class="bg-gray-800 p-4 rounded overflow-x-auto">
        <code>
// Apply grain effect
&lt;div class="grain-effect"&gt;Your content here&lt;/div&gt;

// Apply chromatic aberration
&lt;div class="chromatic-aberration-effect"&gt;Your content here&lt;/div&gt;

// Apply combined CRT effect (grain + chromatic aberration + jitter)
&lt;div class="crt-effect"&gt;Your content here&lt;/div&gt;
        </code>
      </pre>
    </div>

    <div class="mt-8">
      <h3 class="text-lg mb-2">Implementation Details</h3>
      <p class="mb-4">These filters are implemented using SVG filters defined in the <code>FiltersPage.astro</code>
        component:</p>
      <ul class="list-disc pl-6 mb-4">
        <li><strong>Grain Effect</strong>: Uses <code>feTurbulence</code> and <code>feColorMatrix</code> to create a
          noise pattern
        </li>
        <li><strong>Chromatic Aberration</strong>: Separates RGB channels and applies slight offsets</li>
        <li><strong>CRT Master Filter</strong>: Combines both effects with additional animations</li>
      </ul>
      <p>The CSS classes are defined in <code>crt-tv.css</code> and apply these SVG filters to HTML elements.</p>
      <p class="mt-4">For more detailed documentation, see the <a
          href="https://github.com/GreenCsv/greencsv-web/blob/main/src/docs/filters.md"
          class="text-blue-400 hover:text-blue-300 underline">SVG Filters Documentation</a>.</p>
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
