<template>
  <v-main>
    <v-container fluid>
      <keep-alive>
        <router-view :key="$route.path" />
      </keep-alive>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: 'DefaultView'
}
</script>
