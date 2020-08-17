<template>
  <div class="list">
    <h1 class="list__title">Agenda</h1>
    <span class="list__subtitle">TASK LIST</span>
    <div class="list__container">
      <div class="list__container__wrap custom-scrollbar">
        <ag-task
          v-for="task in taskList"
          :key="task.id"
          :task="task"
          @edit="isEditingTask = $event"
          @delete="deleteTask"
        ></ag-task>
        <ag-new-task
          v-if="editedTask"
          :key="editedTask.id"
          :edit-task="editedTask"
          :is-open="true"
          @done="editingTask"
        ></ag-new-task>

        <ag-new-task
          v-if="!editedTask"
          :is-open="isNewTaskOpen"
          :is-loading="isLoadingNewTask"
          @open="isNewTaskOpen = true"
          @done="saveTask"
        ></ag-new-task>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: () => ({
    isNewTaskOpen: false,
    isLoadingNewTask: false,
    isEditingTask: null,
  }),

  computed: {
    taskList() {
      return this.agenda.filter((task) => task.id !== this.isEditingTask)
    },
    editedTask() {
      return this.agenda.find((task) => task.id === this.isEditingTask)
    },
    ...mapState(['agenda']),
  },

  methods: {
    async saveTask(task) {
      if (!task) {
        this.isNewTaskOpen = false
        return false
      }

      this.isLoadingNewTask = true
      await this.createTask(task)
      this.isLoadingNewTask = false
      this.isNewTaskOpen = false
    },

    async editingTask(task) {
      if (!task || !this.isEditingTask) {
        this.isEditingTask = null
        return false
      }
      this.isLoadingNewTask = true
      await this.editTask({ id: this.isEditingTask, ...task })
      this.isLoadingNewTask = false
      this.isEditingTask = null
    },
    ...mapActions(['createTask', 'editTask', 'deleteTask']),
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
.list {
  padding: 5rem 5rem 2rem;

  &__title {
    color: $primary-color;
    margin-bottom: 5px;
  }

  &__subtitle {
    color: #aaa;
    font-size: 0.7rem;
  }

  &__container {
    padding: 2rem;
    margin-top: 1rem;
    height: calc(100vh - 2em - 15rem);
    width: calc(100vw - 2em - 15rem);
    background: #ddd2;
    border-radius: 15px;

    &__wrap {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-content: baseline;
      gap: 12px;
      height: calc(100vh - 2em - 15rem);
      width: calc(100vw - 2em - 15rem);
      overflow-x: auto;
    }
  }
}
</style>
