<template>
  <div class="container">
    <ag-list></ag-list>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  created() {
    this.loadAgenda()
  },
  methods: {
    ...mapActions(['loadAgenda']),
  },
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
}
</style>
