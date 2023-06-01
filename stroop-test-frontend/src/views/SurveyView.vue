<template>
  <!-- quiz container -->
  <div class='bg-white container shadow-lg rounded-lg px-12 py-6'>
    <!-- question container -->
    <div class='rounded-lg bg-gray-100 p-2 neo-morph-1 text-center font-bold text-gray-800'>
      <div class='bg-white p-5'>Please select the color that match the WORD</div>
    </div>

    <!-- options container -->
    <div class='mt-8 flex'>
      <!-- option container -->
      <div class='neo-morph-1 bg-gray-100 p-2 rounded-lg mr-4'>
        <div class='bg-red-500 rounded-lg p-3 w-14 h-8'></div>
      </div>
      <!-- option container -->
      <div class='neo-morph-1 bg-gray-100 p-2 rounded-lg mr-4'>
        <div class='bg-blue-500 rounded-lg p-3 w-14 h-8'></div>
      </div>
      <!-- option container -->
      <div class='neo-morph-1 bg-gray-100 p-2 rounded-lg mr-4'>
        <div class='bg-green-500 rounded-lg p-3 w-14 h-8'></div>
      </div>
      <!-- option container -->
      <div class='neo-morph-1 bg-gray-100 p-2 rounded-lg mr-4'>
        <div class='bg-black rounded-lg p-3 w-14 h-8'></div>
      </div>
      <!-- option container -->
      <div class='neo-morph-1 bg-gray-100 p-2 rounded-lg'>
        <div class='bg-yellow-500 rounded-lg p-3 w-14 h-8'></div>
      </div>
    </div>
    
    <!-- progress bar container -->
    <div class='mt-8 text-center'>
      <div class='h-1 w-12 bg-gray-800 rounded-full mx-auto'></div>
      <div class='font-bold text-gray-800'>2/20</div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.neo-morph-1 {
  box-shadow: 6px 6px 18px rgba(0, 0, 0, 0.09), -6px -6px 18px white;
}
</style>
