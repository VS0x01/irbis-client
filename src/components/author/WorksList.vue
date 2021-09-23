<template>
  <v-data-table
    :headers="headers"
    :items="works"
    :loading="loading"
    show-expand
    single-expand
  >
    <template v-slot:[`item.title`]="{ item }">
      <td>
        {{
          (item.title ? item.title : '') +
          (item.content.length > 1 ? ' [Збірник]' : '')
        }}
      </td>
    </template>

    <template v-slot:[`item.data-table-expand`]="{ item, isExpanded, expand }">
      <td v-if="item.content.length > 1">
        <v-icon
          :class="
            'v-data-table__expand-icon' +
            (isExpanded ? ' v-data-table__expand-icon--active' : '')
          "
          @click="expand(!isExpanded)"
        >
          $expand
        </v-icon>
      </td>
    </template>

    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        {{
          item.content
            .filter((record) => record.authorId == authorId)
            .map((record) => record.title + ', ст. ' + record.pages)
            .join('; ')
        }}
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
      headers: [
        { text: 'Title', value: 'title' },
        { text: '', value: 'data-table-expand' }
      ]
    }
  }
}
</script>

<style></style>
