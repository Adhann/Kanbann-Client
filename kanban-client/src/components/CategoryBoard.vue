<template>
  <div class="flex flex-col box-border mx-5 mb-5 w-full lg:w-72 md:w-72 sm:w-full rounded-lg overflow-hidden items-center ">
    <!-- card-header -->
    <div class="bg-green-600 justify-between w-full px-4 flex py-1 h-10 items-center">
      <p class="text-white">Backlog</p>
      <i class="text-white fa fa-list"></i>
    </div>
    <!-- end card-header -->
    
    <!-- card board content -->
    <div class="bg-gray-200 flex flex-col justify-between w-full px-3 pb-3 overflow-y-auto" style="max-height: 32rem;">
      <!-- content board -->
      <div class="bg-white px-3 py-3 mt-3 rounded">
        <button class="p-1 text-red-600 transform hover:scale-125 motion-reduce:transform-none rounded focus:outline-none focus:ring-2 ring-red-300 ring-offset-2 float-right fas fa-pencil-alt"></button>
        <p class="mb-3">quidem soluta?</p>
        <p class="text-gray-400">By: dhanz</p>
        <p class="text-gray-400">14 july 2020</p>
      </div>
      <div id="task">
        
      </div>
      
    </div>
    <!-- end card board content -->
    
    <!-- card footer -->
    <div class="bg-gray-200 w-full flex sm:px-1 sm:h-20 items-center md:px-1 md:h-12 items-center border-t-4 border-gray-900">
      <a href="#" id="test" class="text-gray-400 hover:text-gray-900">
        <div class="flex items-center m-2 ">
          <span class="p-1 rounded fas fa-plus text-sm ml-2"></span>
          Add another card
        </div>
      </a>
    </div>
    
  </div>
</template>

<script>
export default {
  props: ['category'],
  data() {
    return {

    }
  },
  

}
</script>

<style>

</style>