<template>
    <SideNavigationBar>
        <template #main>
                <router-view></router-view>
        </template>
    </SideNavigationBar>
</template>

<script lang="ts">
import menuTitles from '@/utils/enum/MenuTitle.enum';
export default {
provide:{
    menuTitles
}
}
</script>

<style lang="scss" scoped></style>