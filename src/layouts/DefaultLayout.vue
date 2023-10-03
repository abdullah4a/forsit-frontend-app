<script lang="ts" setup>
import TopNavBar from '@/components/common/nav/TopNavBar.vue';
import menuTitles from '@/utils/enum/MenuTitle.enum';
import { Ref, ref } from 'vue';
import { provide } from 'vue';
provide('menuTitles', menuTitles)
const showSidePanel: Ref<boolean> = ref(false)

const toggleSideBar = ({ show }) => {
    showSidePanel.value = show
}
</script>
<template>
    <v-app>
        <v-main>
            <TopNavBar @toggleSideNavBar="toggleSideBar" />
            <SideNavigationBar :value="showSidePanel" />
            <slot name="main">
                <router-view></router-view>
            </slot>
        </v-main>
    </v-app>
</template>
