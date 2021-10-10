<template>
  <v-container>
    <v-data-table
      :loading="loading"
      :search="search"
      :group-by.sync="groupBy"
      @update:group-by="onGroupByUpdate"
      :headers="headers"
      :items="authors"
      :items-per-page.sync="itemsPerPage"
      ref="table"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        />
        <h2 class="text-h6 mb-2">Групування:</h2>
        <v-chip-group v-model="groupBy">
          <v-chip filter value="workPlace">Місце роботи</v-chip>
        </v-chip-group>
      </template>

      <template v-slot:[`group.header`]="props">
        <td :colspan="props.headers.length">
          <v-btn class="ma-0" icon small @click="props.toggle">
            <v-icon>{{ props.isOpen ? '$minus' : '$plus' }}</v-icon>
          </v-btn>
          {{ props.group }}
          <v-btn class="ma-0" icon small @click="props.remove">
            <v-icon>$close</v-icon>
          </v-btn>
        </td>
      </template>

      <template v-slot:[`item.id`]="{ item }">
        <v-chip :to="'/authors/' + item.id">View</v-chip>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AuthorsList',
  async created() {
    await this.fetchAuthors(async () => await this.$http.get('/authors'))
    this.loading = false
  },
  mounted() {
    const unwatch = this.$refs.table.$watch('openCache', () => {
      for (const key in this.$refs.table.openCache) {
        this.$refs.table.$set(this.$refs.table.openCache, key, false)
      }
      unwatch()
    })
  },
  data: () => {
    return {
      loading: true,
      search: '',
      groupBy: [],
      headers: [
        { text: 'Last name', value: 'lastName' },
        { text: 'First name', value: 'firstName' },
        { text: '', value: 'id' }
      ],
      itemsPerPagePrev: undefined
    }
  },
  computed: {
    ...mapState('authors', ['authors']),
    itemsPerPage: {
      get() {
        return this.$store.state.authors.itemsPerPage
      },
      set(v) {
        this.$store.commit('authors/setItemsPerPage', v)
      }
    }
  },
  methods: {
    ...mapActions({ fetchAuthors: 'authors/fetchAuthors' }),
    onGroupByUpdate(e) {
      if (e === undefined || !e.length) {
        this.itemsPerPage = this.itemsPerPagePrev
      } else {
        this.itemsPerPagePrev = this.itemsPerPage
        this.itemsPerPage = -1
      }
    }
  }
}
</script>

<style scoped></style>
