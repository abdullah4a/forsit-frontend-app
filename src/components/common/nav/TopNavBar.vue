<template>
    <v-app-bar app elevation="1">
        <template v-slot:prepend>
            <v-btn variant="plain" :ripple="false" class="px-8" :to="{ name: 'Home' }">
                <v-avatar class="mx-3" size="48">
                    <v-img :src="getBrandAvatar()" alt="image"></v-img>
                </v-avatar>
            </v-btn>
            <!-- <v-btn v-for="(menu, index) in getMenus" :key="index" :to="{ name: menu.path.name }" :prepend-icon="menu.icon">
                {{ menu.name }}
            </v-btn> -->
        </template>
        <template v-slot:append>
            <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
        </template>
    </v-app-bar>
</template>

<script lang="ts">
export default {
    inject: ['menuTitles'],
    emits: ['toggleSideNavBar'],
    data() {
        return {
            subMenu: [],
            showNav: false,
            userData: {}
        }
    },
    computed: {
        getMenus() {
            return this.menuTitles
        }
    },
    methods: {
        getBrandAvatar() {
            return require("../../../assets/logo.png");
        },
        toggleSideNav() {
            this.showNav = !this.showNav
            this.$emit("toggleSideNavBar", { show: this.showNav })
        }
    }
}
</script>