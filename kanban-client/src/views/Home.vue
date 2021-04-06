<template>
  <div class="flex flex-col h-screen">
    <Navbar @changePage="changePage"></Navbar>

    <div class="flex-grow mt-8 justify-center mx-auto">
      <div
        class="flex flex-wrap lg:justify-start md:justify-start sm:justify-center justify-center"
      >
        <!-- card-category -->
        <Backlog
          :backlog="dataTasks.backlogs"
          @createTask="createTask"
          @editTask="editTask"
          @deleteTask="deleteTask"
          @moveCategoryRight="moveCategoryRight"
        ></Backlog>
        <!-- end card-category  -->
        <Todo
          :todo="dataTasks.todos"
          @createTask="createTask"
          @editTask="editTask"
          @deleteTask="deleteTask"
          @moveCategoryLeft="moveCategoryLeft"
          @moveCategoryRight="moveCategoryRight"
        ></Todo>
        <Doing
          :doing="dataTasks.doings"
          @createTask="createTask"
          @editTask="editTask"
          @deleteTask="deleteTask"
          @moveCategoryLeft="moveCategoryLeft"
          @moveCategoryRight="moveCategoryRight"
        ></Doing>
        <Done
          :done="dataTasks.dones"
          @createTask="createTask"
          @editTask="editTask"
          @deleteTask="deleteTask"
          @moveCategoryLeft="moveCategoryLeft"
          @moveCategoryRight="moveCategoryRight"
        ></Done>
      </div>
    </div>

    <!-- <EditTask v-if="page === 'editTask'"></EditTask> -->

    <!-- footer -->
    <Footer></Footer>
    <!-- end footer -->
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import CategoryBoard from "../components/CategoryBoard";
import Footer from "../components/Footer";
import Backlog from "../components/Backlog";
import Todo from "../components/Todo";
import Doing from "../components/Doing";
import Done from "../components/Done";

export default {
  props: ["dataTasks"],
  components: {
    Navbar,
    CategoryBoard,
    Footer,
    Backlog,
    Todo,
    Doing,
    Done,
  },
  data() {
    return {
      page: "",
    };
  },
  methods: {
    changePage(namePage) {
      this.$emit("changePage", namePage);
    },
    createTask(newTask) {
      this.$emit("createTask", newTask);
    },
    deleteTask(id) {
      this.$emit("deleteTask", id);
    },
    moveCategoryLeft(id, newCategory) {
      this.$emit("moveCategoryLeft", id, newCategory);
    },
    moveCategoryRight(id, newCategory) {
      this.$emit("moveCategoryRight", id, newCategory);
    },
    editTask(id) {
      // console.log(id, "<<id");
      this.page = "editTask";
      this.$emit("editTask", id);
    },
  },
  mounted() {
    this.$emit("fetchAllTask");
  },
};
</script>

<style></style>
