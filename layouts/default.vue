<template>
  <div>
    <div class="relative bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          class="flex justify-center items-center border-b-2 border-gray-100 py-6"
        >
          <nav class="hidden md:flex space-x-10">
            <NuxtLink
              to="/"
              class="text-gray-500 inline-flex items-center text-base font-medium hover:text-gray-900"
              >Home</NuxtLink
            >
            <NuxtLink
              to="/about"
              class="text-base font-medium text-gray-500 hover:text-gray-900"
              >About</NuxtLink
            >
          </nav>
        </div>
      </div>
    </div>
    <Nuxt />
  </div>
</template>
