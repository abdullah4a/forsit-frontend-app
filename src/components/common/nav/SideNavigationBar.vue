<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail>
        <v-list>
          <v-list-item :prepend-avatar="getUser.image" :title="getUser.name" :subtitle="getUser.email"></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav v-for="(menu, index) in menuTitles" :key="index">
          <v-list-group :value="menu.name" v-if="menu.children.length > 0">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Actions"></v-list-item>
            </template>
            <v-list-item v-for="({ name, icon, path }, i) in menu.children" :key="i" :value="name" :title="name"
              :prepend-icon="icon" :to="{ name: path.name }"></v-list-item>
          </v-list-group>
          <v-list-item :prepend-icon="menu.icon" :title="menu.name" :value="menu.name" v-else
            :to="{ name: menu.path.name }"></v-list-item>
        </v-list>
        <template v-slot:append>
          <v-list>
            <v-list-item prepend-icon="mdi-logout" title="Logout" :to="{name:'Home'}"></v-list-item>
          </v-list>
        </template>
      </v-navigation-drawer>
      <slot name="main"></slot>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
export default {
  inject: ['menuTitles'],
  computed: {
    getUser() {
      return { image: require("@/assets/logo.png"), name: "Admin", email: "admin@admin.com" }
    }
  },
  data() {
    return {
      menuTitles: this.menuTitles
    }
  }
}
</script>

<style scoped></style>