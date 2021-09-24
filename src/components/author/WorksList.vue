<template>
  <v-data-table
    :headers="headers"
    :items="works"
    :loading="loading"
  >
    <template v-slot:[`item.title`]="{ item }">
      <td>{{ item.description }}</td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'WorksList',
  props: ['authorId', 'works', 'loading'],
  data() {
    return {
      headers: [
        { text: 'Title', value: 'title' }
      ]
    }
  }
}
</script>

<style></style>
