<template>
    <div class="flex flex-col box-border mx-3 mb-5 w-full lg:w-72 md:w-72 sm:w-full rounded-lg overflow-hidden items-center ">
      <!-- card-header -->
      <div class="bg-green-600 justify-between w-full px-4 flex py-1 h-10 items-center">
        <p class="text-white">Backlog</p>
        <i class="text-white fa fa-list"></i>
      </div>
      <!-- end card-header -->
      
      <!-- card board content -->
      <div class="bg-gray-200 flex flex-col w-full px-3 pb-3 overflow-y-auto" style="max-height: 32rem; min-height: 32rem;">
        <!-- <draggable v-model="backlog" group="tasks" :key="backlog.id"> -->
          <div v-for="backlog in backlog" :key="backlog.id">
            <!-- content board -->
            <div class="bg-white px-3 py-3 mt-3 rounded">
              <a href="#" @click.prevent="deleteTask(backlog.id)" class="p-1 mx-1 text-red-600 transform hover:scale-125 motion-reduce:transform-none rounded focus:outline-none focus:ring-2 ring-red-300 ring-offset-2 float-right fas fa-trash-alt"></a>
              <a href="#" @click.prevent="toggleModal()" class="p-1 mx-1 text-gray-600 transform hover:scale-125 motion-reduce:transform-none rounded focus:outline-none focus:ring-2 ring-gray-300 ring-offset-2 float-right fas fa-pencil-alt"></a>
              <!-- <p class="mb-3">{{backlog}}</p> -->
              <p class="mb-3">{{backlog.title}}</p>
              <p class="text-gray-400">By: {{backlog.User.name}}</p>
              <p class="text-gray-400">{{ formateDate(backlog.createdAt) }}</p>
              <div class="relative">
                <a href="#" @click.prevent="moveCategoryRight(backlog.id)" class="p-1 mx-1 text-gray-600 transform hover:scale-125 motion-reduce:transform-none rounded focus:outline-none focus:ring-2 ring-gray-300 ring-offset-2 absolute bottom-0 right-0 fas fa-arrow-right"></a>
            </div>
            </div>
            
          </div>
        <!-- </draggable> -->

        <div v-if="option === 'add'">
          <form>
            <textarea @keyup.enter="createTask" v-model="inputTitle" class="w-full h-24 py-2 bg-white px-3 py-3 mt-3 rounded border border-transparent focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent resize-none" placeholder="Enter Task"></textarea>
            <button type="submit" @click.prevent="createTask" ></button>
          </form>
        </div>
      </div>
      <!-- end card board content -->
      
      <!-- card footer -->
      <div class="bg-gray-200 w-full flex sm:px-1 sm:h-20 items-center md:px-1 md:h-12 items-center border-t-4 border-gray-900">
        <a href="#" id="test" class="text-gray-400 hover:text-gray-900" v-if="option ==='default'" @click.prevent="createTask">
          <div class="flex items-center m-2">
            <span class="p-1 rounded fas fa-plus text-sm ml-2"></span>
            Add another card
          </div>
        </a>
        <a href="#" id="test" class="mx-2 w-auto flex" v-if="option === 'add'" @click.prevent="changeOption('default')">
          <button class="block w-full mx-auto bg-green-600 text-white rounded px-2 py-1 font-semibold justify-between" @click.prevent="createTask"><i class="fa fa-check pr-2"></i>Add Task</button>
        </a>
        <a href="#" id="test" class="mx-2 w-auto flex" v-if="option === 'add'" @click.prevent="changeOption('default')">
          <button class="block w-full mx-auto bg-gray-500 text-white rounded px-2 py-1 font-semibold justify-between"><i class="fas fa-times pr-2"></i>Cancel</button>
        </a>
      </div>

      <!-- modal -->
      <div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
        <div class="relative w-auto my-6 mx-auto max-w-3xl">
          <!--content-->
          <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <!--header-->
            <div class="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 class="text-3xl font-semibold">
                Modal Test
              </h3>
              <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" v-on:click="toggleModal()">
                <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <!--body-->
            <div class="relative p-6 flex-auto">
             
            <textarea class="my-4 text-gray-600 text-lg leading-relaxed w-full h-24 py-2 flex-auto relative bg-white px-3 py-3 mt-3 rounded border border-transparent focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent resize-none" placeholder="..."></textarea>

            </div>
            <!--footer-->
            <div class="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
              <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
                Close
              </button>
              <button class="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  props: ['backlog'],
  name: "small-modal",
  components:{
    draggable
  },
  data() {
    return {
      option: 'default',
      inputTitle: '',
      showModal: false
    }
  },
  methods: {
    toggleModal: function(){
      this.showModal = !this.showModal;
    },
    changeOption(opt) {
      this.option = opt
    },
    formateDate(date) {
      var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

      if (month.length < 2) {
        month = '0' + month;
      }
      if (day.length < 2) {
        day = '0' + day;
      }
      return [year, month, day].join('-');
    },
    createTask(){
      const newTask = {
        title: this.inputTitle,
        category: this.$props.backlog[0].category
      }
      this.option = "add"
      if (newTask.title) {
        this.$emit('createTask', newTask)
        this.option = "default"
      }
      this.inputTitle = ''
    },
    deleteTask(id){
      this.$emit('deleteTask', id)
    },
    editTask(id){
      // this.isEdit = true
      this.$emit('editTask', id)
    },
    moveCategoryRight(id){
      this.$emit('moveCategoryRight', id, 'todo')
    },
  }
}
</script>

<style>

</style>