<template>
  <v-container>
    <author-card-component :author="author(id)" />
    <works-list-component
      :authorId="id"
      :works="works(id)"
      :loading="loadingAuthorWorks"
    />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AuthorCardComponent from '@/components/author/AuthorCard'
import WorksListComponent from '@/components/author/WorksList'

export default {
  name: 'Author',
  components: {
    AuthorCardComponent,
    WorksListComponent
  },
  props: ['id'],
  async created() {
    await this.fetchAuthors(
      async () => await this.$http.get(`/authors/${this.id}`)
    )
    await this.fetchWorks({
      get: async () =>
        await this.$http.get(`/works/search?authorId=${this.id}&format=BRIEF`),
      authorId: this.id
    })
    this.loadingAuthorWorks = false
  },
  data() {
    return {
      loadingAuthorWorks: true
    }
  },
  computed: {
    ...mapGetters({
      author: 'authors/getAuthorById',
      works: 'works/getWorksByAuthor'
    })
  },
  methods: {
    ...mapActions({
      fetchAuthors: 'authors/fetchAuthors',
      fetchWorks: 'works/fetchWorksByAuthor'
    })
  }
}
</script>

<style></style>
