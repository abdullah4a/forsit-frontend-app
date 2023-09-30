<template>
    <v-app-bar app elevation="1">
        <template v-slot:prepend>
            <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
            <v-btn
            variant="plain"
            :ripple="false"
            class="px-8"
            :to="{name:'Home'}"
        >
          <v-avatar class="mx-3" size="48">
            <v-img :src="getBrandAvatar()" alt="image"></v-img>
          </v-avatar>
        </v-btn>
        <v-btn
          v-for="(menu, index) in getMenus"
          :key="index"
          :to="{name:menu.path.name}"
          :prepend-icon="menu.icon"
      >
        {{ menu.name }}
      </v-btn>
        </template>
        <template v-slot:append>
            <v-btn v-for="(subMenuItem, index) in subMenu" :key="index" :prepend-icon="subMenuItem.icon" variant="plain"
                :to="subMenuItem.path.to" :ripple="false">
                {{ subMenuItem.name }}
            </v-btn>
            <v-menu open-on-hover transition="slide-y-transition" color="light">
                <template v-slot:activator="{ props }">
                    <v-btn icon v-bind="props">
                        <v-avatar class="mx-3">
                            <v-img :src="getUserAvatar()" alt="image"></v-img>
                        </v-avatar>
                    </v-btn>
                </template>
                <v-card>
                    <v-list class="my-3">
                        <v-layout>
                            <v-col>
                                <v-avatar class="mx-3">
                                    <v-img :src="getUserAvatar()" alt="image"></v-img>
                                </v-avatar>
                            </v-col>
                            <v-col>
                                <h4>{{ userData['fullName'] }}</h4>
                                <span>{{ userData['email'] }}</span>
                            </v-col>
                        </v-layout>
                    </v-list>
                    <v-divider></v-divider>
                    <v-card-item>
                        <span>
                            <v-btn variant="plain" dark prepend-icon="mdi-logout" :to="{ name: 'Logout' }">
                                Logout
                            </v-btn>
                        </span>
                    </v-card-item>
                </v-card>
            </v-menu>
        </template>
    </v-app-bar>
</template>

<script lang="ts">
import store from '@/store';
export default{
    inject:['menuTitles'],
    data() {
        return {
            subMenu: [],
            userData: {}
        }
    },
    computed:{
        getMenus(){
            return this.menuTitles
        }
    },
    methods:{
        getUserAvatar() {
            return require("../../../assets/logo.png");
        },
        getBrandAvatar() {
            return require("../../../assets/logo.png");
        },
        getUserData () {
            store.dispatch("auth/getUser").then((user: any) => {
                if (user)
                    this.userData = user;
            });
        }
}
}
</script>