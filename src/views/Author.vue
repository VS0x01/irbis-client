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
      get: async () => {
        let works = this.$http.get(
          `/works/search?authorId=${this.id}&format=ALL`
        )
        let workDescriptions = this.$http.get(
          `/works/search?authorId=${this.id}&format=BRIEF`
        )
        let result = []
        await Promise.all([works, workDescriptions]).then((values) => {
          console.log(values)
          for (let i = 0; i < values[0].data.length; ++i) {
            result[i] = {}
            Object.assign(result[i], values[0].data[i], {
              description: values[1].data[i].description
            })
          }
        })
        console.log(result)
        return result
      },
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
