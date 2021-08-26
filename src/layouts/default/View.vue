<template>
  <v-main>
    <v-container fluid>
      <keep-alive :include="/Author\w*/" :max="itemsPerPage + 1">
        <router-view :key="$route.path" />
      </keep-alive>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DefaultView',
  computed: {
    ...mapState('authors', ['itemsPerPage'])
  }
}
</script>
