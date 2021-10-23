<template>
  <v-data-table
    :headers="headers"
    :items="works"
    :loading="loading"
    group-by="year"
  >
    <template v-slot:[`group.header`]="props">
      <td :colspan="props.headers.length">
        <v-btn class="ma-0" icon small @click="props.toggle">
          <v-icon>{{ props.isOpen ? '$minus' : '$plus' }}</v-icon>
        </v-btn>
        {{ props.group !== -1 ? props.group : '' }}
      </td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'WorksList',
  props: ['authorId', 'works', 'loading'],
  data() {
    return {
      headers: [{ text: 'Title', value: 'description' }]
    }
  }
}
</script>

<style></style>
