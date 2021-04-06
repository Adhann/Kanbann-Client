<template>
  <div>
    <!-- props -->
    <!-- <Login v-if="page === 'login'" :changePage="changePage" :login="login"></Login> -->
    <!-- <Home v-if="page === 'home'" :changePage="changePage" :logout="logout"></Home> -->

    <!-- emit -->
    <Login
      v-if="page === 'login'"
      @changePage="changePage"
      @login="login"
      @dataGoogleUser="googleLogin"
    ></Login>
    <Register
      v-else-if="page === 'register'"
      @changePage="changePage"
      @register="register"
    ></Register>
    <Home
      v-else-if="page === 'home'"
      @changePage="changePage"
      @login="login"
      @fetchAllTask="fetchAllTask"
      :dataTasks="dataTasks"
      @createTask="createTask"
      @deleteTask="deleteTask"
      @moveCategoryLeft="updateCategory"
      @moveCategoryRight="updateCategory"
    ></Home>

  </div>
</template>

<script>
import Login from "./views/Login";
import Home from "./views/Home";
import Register from "./views/Register";

import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      urlServer: "https://kanban-app-server-dhan.herokuapp.com/",
      page: "login",
      dataTasks: {
        backlogs: [],
        todos: [],
        doings: [],
        dones: []
      }
    };
  },
  components: {
    Login,
    Register,
    Home,
  },
  methods: {
    auth() {
      if (localStorage.access_token) {
        this.page = "home";
      } else {
        this.page = "login";
      }
    },
    changePage(namePage) {
      this.page = namePage;
    },
    swalFail(err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err,
      });
    },
    login(login_email, login_password) {
      axios({
        url: this.urlServer + "users/login",
        method: "POST",
        data: {
          email: login_email,
          password: login_password,
        },
      })
        .then(({ data }) => {
          localStorage.access_token = data.access_token;
          // console.log(data, "<<< data");
          localStorage.name = data.name;
          // console.log(localStorage.access_token, "<<< actoken");
          Swal.fire({
            icon: "success",
            title: "Wellcome!",
            text: `Hello ${data.name}!!`,
            timer: 2000,
            timerProgressBar: true,
          });
          this.page = "home";
          this.auth();
        })
        .catch((err) => {
          const errors = err.response.data.errors;
          this.swalFail(errors);
        })
        .then(() => {
          login_email = "";
          login_password = "";
        });
    },
    register(register_name, register_email, register_password){
      axios({
        url: this.urlServer + 'users/register',
        method: 'POST',
        data: {
          name: register_name,
          email: register_email,
          password: register_password
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: `Success create account!`
          })
          this.page = 'login'
        })
        .catch(err => {
          this.swalFail(err.response.data.errors);
        })
    },
    googleLogin(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token;
      axios({
        url: this.urlServer + 'users/googleLogin',
        method: 'POST',
        data: {
          googleToken: id_token
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('name', data.name);
          Swal.fire({
            icon: "success",
            title: "Wellcome!",
            text: `Hello ${data.name}!!`,
            timer: 2000,
            timerProgressBar: true,
          });
          this.page = 'home';
        })
        .catch(err => {
          console.log(err);
        })
    },
    fetchAllTask() {
      axios({
        url: this.urlServer + "tasks",
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {

          this.dataTasks.backlogs = data.filter(task => {
            return task.category === "backlog"
          });
          this.dataTasks.todos = data.filter(task => {
            return task.category === "todo"
          });
          this.dataTasks.doings = data.filter(task => {
            return task.category === "doing"
          });
          this.dataTasks.dones = data.filter(task => {
            return task.category === "done"
          });
          // console.log(JSON.stringify(this.dataTasks.todos));
        })
        .catch((err) => {
          const errors = err.response.data.errors;
          this.swalFail(errors);
        });
    },
    createTask(newTask){
      axios({
        url: this.urlServer + 'tasks',
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          title: newTask.title,
          category: newTask.category
        }
      })
      .then((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: `Success create new task!`,
          timer: 1500
        })
        this.fetchAllTask();
      })
      .catch((err) => {
        const errors = err.response.data.errors;
        this.swalFail(errors);
      })
    },
    updateCategory(id, newCategory) {
      axios({
        url: this.urlServer + `tasks/${id}`,
        method: 'PATCH',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          category: newCategory.toLowerCase()
        }
      })
      .then(({data}) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: `Success move category to ${data.category}!`,
          timer: 1500
        })
        this.fetchAllTask();
      })
      .catch((err) => {
        const errors = err.response.data.errors;
        this.swalFail(errors);
      })
    },
    deleteTask(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios({
            url: this.urlServer + `tasks/${id}`,
            method: 'DELETE',
            headers: {
              access_token: localStorage.getItem('access_token')
            }
          })
          .then((response) => {
            this.fetchAllTask();
            Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
            )
          })
          .catch((err) => {
            const errors = err.response.data.errors;
            this.swalFail(errors);
          });
        }
      })
    }
  },
  created() {
    this.auth();
  },
};
</script>

<style></style>
