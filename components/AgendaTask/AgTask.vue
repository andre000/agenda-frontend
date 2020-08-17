<template>
  <div class="task">
    <div class="task__actions">
      <edit-icon size="16" @click="$emit('edit', task.id)"></edit-icon>
      <trash-icon size="16" @click="$emit('delete', task)"></trash-icon>
    </div>
    <div class="task__date">
      {{ day }}
    </div>
    <div class="task__body">
      <div class="task__title">
        {{ task.name }}
      </div>
      <div class="task__detail">
        <span> <clock-icon size="16"></clock-icon> {{ localDate }} </span>
        <span> <map-pin-icon size="16"></map-pin-icon> {{ task.place }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ClockIcon, MapPinIcon, TrashIcon, EditIcon } from 'vue-feather-icons'
export default {
  components: {
    ClockIcon,
    MapPinIcon,
    TrashIcon,
    EditIcon,
  },

  props: {
    task: {
      type: Object,
      required: true,
    },
  },

  computed: {
    day() {
      return new Date(this.task.datetime).getDay()
    },

    localDate() {
      return new Date(this.task.datetime).toLocaleString('en-us', {
        hour: 'numeric',
        minute: 'numeric',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.task {
  display: flex;
  padding: 1rem;
  box-shadow: 3px 3px 11px -2px #0001;
  width: calc(max(20vw, 300px));
  border-radius: 10px;
  background-color: #fff;
  box-sizing: border-box;
  position: relative;

  &__date {
    height: 2.5rem;
    width: 2.5rem;
    background: #{$primary-color}33;
    color: $primary-color;
    font-weight: 900;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    margin-right: 1rem;
  }

  &__title {
    font-weight: bold;
    font-size: 1.2rem;
  }

  &__detail {
    color: #aaa;
    font-size: 0.8rem;
    margin-top: 5px;
    span {
      display: flex !important;
      align-items: center;
      height: 18px;
      svg {
        margin-right: 5px;
      }
    }
  }

  &__actions {
    position: absolute;
    display: flex;
    flex-direction: column;
    color: #aaa;
    right: 1rem;
    cursor: pointer;

    svg:first-child {
      margin-bottom: 5px;
    }
  }
}
</style>
