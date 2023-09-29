<template>
    <v-app>
        <SideNavigationBar/>
        <slot name="main">
            <router-view></router-view>
        </slot>
    </v-app>
</template>

<script lang="ts">
import menuTitles from '@/utils/enum/MenuTitle.enum';
export default {
    provide: {
        menuTitles
    }
}
</script>