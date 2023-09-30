<template>
    <v-app>
        <SideNavigationBar/>
        <!-- <TopNavBar/> -->
        <slot name="main">
            <router-view></router-view>
        </slot>
    </v-app>
</template>

<script lang="ts">
// import TopNavBar from '@/components/common/nav/TopNavBar.vue';
import menuTitles from '@/utils/enum/MenuTitle.enum';
export default {
    provide: {
        menuTitles
    }
    // components: { TopNavBar }
}
</script>