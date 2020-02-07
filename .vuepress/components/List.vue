<template>
  <div class="list" v-if="pages">
    <div class="list-item" v-for="page in pages">
      {{page.title}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'List',
  props: {
    pages: {
      type: Array
    }
  }
}
</script>