<style scoped>
</style>

<template>
    <el-menu v-if="menuList && menuList.length > 0">
        <el-menu-item index="0" @click="addTab('0','首页','HomeIndex')"><i class="el-icon-menu"></i>首页</el-menu-item>
        <el-submenu v-for="item in menuList" :index="item.id" :key="item.id">
            <template slot="title">
                <i v-if="item.icon != null && item.icon != ''" :class="item.icon"></i>
                {{ item.title }}
            </template>
            <sidebar-menu-item @addTab = "addTab" :menuList = "item.children"></sidebar-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
import SidebarMenuItem from './SidebarMenuItem.vue'

export default {
    name:'SidebarMenu',
    data() {
        return {
        }
    },
    props:['menuList'],
    methods: {
        addTab(id,title,component){
            this.$emit('addTab',id,title,component);
        }
    },
    components:{SidebarMenuItem}
}
</script>
