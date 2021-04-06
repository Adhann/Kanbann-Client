<template>
  <nav class="bg-green-600 flex px-10 py-3 justify-between items-center">
      <div class="flex items-center text-white">
        <span class="text-2xl">KANBAN</span>
      </div>
      <ul class="flex items-center">
        <li class="mx-5">
          <a class="text-white hover:text-gray-900" href="#">Home</a>
        </li>
        <li class="mx-5">
          <a class="text-white hover:text-gray-900" href="#">{{userLogin}}</a>
        </li>
        <li class="mx-5">
          <a class="text-white hover:text-gray-900" href="#" @click.prevent="logout">Logout</a>
        </li>
      </ul>
    </nav>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      userLogin: localStorage.name
    }
  },
  methods: {
    logout() {
      // let auth2 = gapi.auth2.getAuthInstance();
      // auth2.signOut().then(() => {
        //   console.log('User signed out');
      // })
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't logout ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout it!'
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            icon: "success",
            title: `GoodBye ${localStorage.name}!!`,
            timer: 2000,
            timerProgressBar: true,
          });
          localStorage.clear()
          this.$emit('changePage', 'login');
        }
      })
    }
  }
}
</script>

<style>

</style>