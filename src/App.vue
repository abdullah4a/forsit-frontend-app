<script lang="ts">
import DefaultLayout from './layouts/DefaultLayout.vue';
import NotFoundLayout from './layouts/NotFoundLayout.vue';
import { generalStorage } from './storages/generalStorage';
import { localStorageKeys } from './utils/enum/localStorageKeys.enum';

export default {
  components:{
    DefaultLayout,
    NotFoundLayout
  },
  computed: {
    layout() {
      return this.$route.meta.layout || DefaultLayout;
    },  getTheme(){
            const theme=localStorageKeys.CURRENT_THEME
            return generalStorage.getLocalItem(theme);
        }
  },
  created() {
    // that will set initial theme for app in Local storage
    generalStorage.setLocalItem(localStorageKeys.CURRENT_THEME, "light")
  },
};
</script>

<template>
    <v-theme-provider :theme="getTheme">
      <component :is="layout" />
    </v-theme-provider>
</template>