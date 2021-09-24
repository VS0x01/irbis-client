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
    <v-data-table
      v-if="author"
      :headers="headers"
      :items="[
        {
          k: 'Вчене звання:',
          v: author.academicStatus,
          show: true
        },
        {
          k: 'Науковий ступінь:',
          v: author.degree,
          show: true
        },
        {
          k: 'Місце роботи:',
          v: author.workPlace,
          show: true
        },
        {
          k: 'Сторінка науковця на сайті університету:',
          v: [{ KNEU: this.author.links.KNEU }],
          show: Object.keys(author.links).includes('KNEU'),
          type: 'Link'
        },
        {
          k: 'Посилання:',
          v: this.author.links,
          show: Object.keys(author.links).length > 0,
          type: 'List<Link>'
        }
      ]"
      hide-default-header
      hide-default-footer
    >
      <template v-slot:item="{ item }">
        <tr v-if="item.show">
          <td>
            <v-card-title>{{ item.k }}</v-card-title>
          </td>
          <td>
            <v-card-text
              v-if="item.type !== 'Link' && item.type !== 'List<Link>'"
            >
              {{ item.v }}
            </v-card-text>
            <v-card-text v-else>
              <v-chip-group column>
                <v-chip link v-for="(to, k) in item.v" :href="to" :key="k">
                  {{ k }}
                </v-chip>
              </v-chip-group>
            </v-card-text>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: 'AuthorCard',
  props: ['author'],
  data() {
    return {
      headers: [
        { text: '', value: 'k' },
        { text: '', value: 'v' }
      ]
    }
  }
}
</script>

<style></style>
