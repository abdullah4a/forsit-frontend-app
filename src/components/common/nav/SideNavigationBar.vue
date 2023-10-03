<template>
  <v-navigation-drawer v-model="sideMenu" >
    <v-list>
      <v-list-item :prepend-avatar="getUser.image" :title="getUser.name" :subtitle="getUser.email"></v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list density="compact" nav v-for="(menu, index) in menuTitlesComp" :key="index">
      <v-list-group :value="menu.name" v-if="menu.children.length > 0">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Actions"></v-list-item>
        </template>
        <v-list-item v-for="({ name, icon, path }, i) in menu.children" :key="i" :value="name" :title="name"
          :prepend-icon="icon" :to="{ name: path.name }"></v-list-item>
      </v-list-group>
      <v-list-item :prepend-icon="menu.icon" :title="menu.name" :class="{ 'selected': menu.path.name}" v-else
        :to="{ name: menu.path.name }"></v-list-item>
    </v-list>
    <template v-slot:append>
      <v-list>
        <v-list-item prepend-icon="mdi-theme-light-dark">
          <v-switch v-model="model" hide-details :label="`${model ? 'dark' : 'light'}`"
            @update:model-value="changeTheme"></v-switch>
        </v-list-item>
        <v-list-item prepend-icon="mdi-logout" title="Logout" :to="{ name: 'Logout' }"></v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { generalStorage } from '@/storages/generalStorage'
import { localStorageKeys } from '@/utils/enum/localStorageKeys.enum'

export default {
  inject: ['menuTitles'],
  computed: {
    getUser() {
      return { image: require("@/assets/logo.png"), name: "Admin", email: "admin@admin.com" }
    },
    menuTitlesComp() {
      return this.menuTitles
    }
  },
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      model: false,
      sideMenu: false
    }
  },
  methods: {
    changeTheme() {
      const theme = this.model ? 'dark' : "light"
      generalStorage.setLocalItem(localStorageKeys.CURRENT_THEME, theme)
      window.location.reload()
    }
  },
  created() {
    this.sideMenu = this.value
    const theme = generalStorage.getLocalItem(localStorageKeys.CURRENT_THEME)
    this.model = theme === 'dark'
  },
  watch:{
    'value': function(newVal){
      this.sideMenu=newVal
    }
  }
}
</script>

<style scoped></style>