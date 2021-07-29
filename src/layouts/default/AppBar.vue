<template>
  <v-app-bar id="default-app-bar" color="primary" extension-height="24" app>
    <v-app-bar-nav-icon @click.stop="toggleDrawer" />
    <v-toolbar-title>
      Наукометричні показники науковців Університету
    </v-toolbar-title>
    <template v-slot:extension>
      <!-- color: '#00AB6B' -->
      <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
    </template>
  </v-app-bar>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'DefaultBar',
  computed: {
    ...mapState('app', ['breadcrumbs'])
  },
  methods: {
    ...mapMutations({ toggleDrawer: 'app/toggleDrawer' })
  }
}
</script>

<style>
.v-toolbar__extension {
  background: #00ab6b;
}

.v-breadcrumbs__item--active {
  color: #e1fcde !important;
}
</style>
