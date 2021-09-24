<template>
  <v-card :loading="!author">
    <v-skeleton-loader type="card-heading" v-if="!author" />
    <v-simple-table v-if="!author">
      <template v-slot:default>
        <tbody>
          <tr v-for="n in 4" :key="n">
            <td><v-skeleton-loader type="card-heading" /></td>
            <td><v-skeleton-loader type="text" max-width="50%" /></td>
          </tr>
          <tr>
            <td><v-skeleton-loader type="card-heading" /></td>
            <td>
              <v-skeleton-loader
                type="chip@4"
                class="d-flex justify-space-between"
                max-width="50%"
              />
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-card-title v-if="author">
      {{ author.lastName + ' ' + author.firstName }}
    </v-card-title>
    <v-simple-table v-if="author">
      <template v-slot:default>
        <tbody>
          <tr>
            <td><v-card-title>Вчене звання:</v-card-title></td>
            <td>
              <v-card-text>{{ author.academicStatus }}</v-card-text>
            </td>
          </tr>
          <tr>
            <td><v-card-title>Науковий ступінь:</v-card-title></td>
            <td>
              <v-card-text>{{ author.degree }}</v-card-text>
            </td>
          </tr>
          <tr>
            <td><v-card-title>Місце роботи:</v-card-title></td>
            <td>
              <v-card-text>{{ author.workPlace }}</v-card-text>
            </td>
          </tr>
          <tr>
            <td>
              <v-card-title>
                Сторінка науковця на сайті університету:
              </v-card-title>
            </td>
            <td>
              <v-card-text>{{ author.academicStatus }}</v-card-text>
            </td>
          </tr>
          <tr v-if="Object.keys(author.links).length > 0">
            <td><v-card-title> Посилання: </v-card-title></td>
            <td>
              <v-card-text>
                <v-chip-group>
                  <v-chip
                    link
                    v-for="(v, k) in author.links"
                    :key="k"
                    :href="v"
                  >
                    {{ k }}
                  </v-chip>
                </v-chip-group>
              </v-card-text>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  name: 'AuthorCard',
  props: ['author']
}
</script>

<style></style>
