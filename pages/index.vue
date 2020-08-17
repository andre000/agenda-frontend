<template>
  <div class="container">
    <main-aside></main-aside>
    <agenda-list></agenda-list>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 0.3fr 0.7fr;
  grid-template-rows: 1fr;
  gap: 1px 1px;
  grid-template-areas: 'aside list';
  min-height: 100vh;
  div:first-child {
    grid-area: aside;
  }

  div:last-child {
    grid-area: list;
  }
}
</style>
