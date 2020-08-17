<template>
  <div class="new">
    <div v-if="!isOpen" class="new__closed" @click="$emit('open')">
      <plus-circle-icon></plus-circle-icon>
    </div>
    <div v-else class="new__open" :class="{ 'new__open--loading': isLoading }">
      <input
        v-model="newTask.name"
        placeholder="Name"
        type="text"
        :disabled="isLoading"
        class="new__open__name"
      />
      <input
        v-model="newTask.place"
        placeholder="Place"
        type="text"
        :disabled="isLoading"
        class="new__open__place"
      />
      <input
        v-model="newTask.date"
        placeholder="Date"
        type="date"
        :disabled="isLoading"
        class="new__open__date"
      />
      <input
        v-model="newTask.time"
        placeholder="Time"
        type="time"
        :disabled="isLoading"
        class="new__open__time"
      />
      <div class="new__open__button-group">
        <button
          class="new__open__done"
          :disabled="isLoading"
          @click="handleDone"
        >
          Done
        </button>
        <button
          class="new__open__cancel"
          :disabled="isLoading"
          @click="$emit('done', null)"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { PlusCircleIcon } from 'vue-feather-icons'
export default {
  components: {
    PlusCircleIcon,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    editTask: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      newTask: {
        name: '',
        place: '',
        date: '',
        time: '',
      },
    }
  },

  watch: {
    isOpen() {
      this.newTask = {
        name: '',
        place: '',
        date: '',
        time: '',
      }
    },
  },

  mounted() {
    if (this.editTask) {
      this.newTask = {
        name: this.editTask.name,
        place: this.editTask.place,
        date: this.editTask.datetime.split(' ')[0],
        time: this.editTask.datetime.split(' ')[1],
      }
    }
  },

  methods: {
    handleDone() {
      this.$emit('done', {
        ...this.newTask,
        datetime: `${this.newTask.date} ${this.newTask.time}`,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.new {
  box-sizing: border-box;

  &__closed {
    display: flex;
    justify-content: center;
    align-items: center;
    color: $primary-color;
    cursor: pointer;
  }

  &__open {
    padding: 1rem;
    box-shadow: 3px 3px 11px -2px #0001;
    border-radius: 10px;
    background-color: #fff;

    &--loading {
      opacity: 0.6;
      cursor: wait;

      input {
        background: none;
      }
    }

    input {
      display: block;
      width: 100%;
      height: 21px;
      border: none;
      margin-bottom: 10px;
      outline: none;
      opacity: 0.8;
    }

    &__button-group {
      text-align: right;
      margin-top: 15px;
    }

    button {
      text-align: right;
      border-radius: 10px;
      padding: 0.5rem 1rem;
      border: none;
      cursor: pointer;
    }

    &__done {
      background: $primary-color;
      color: #fff;
      font-weight: bold;
    }
  }
}
</style>
