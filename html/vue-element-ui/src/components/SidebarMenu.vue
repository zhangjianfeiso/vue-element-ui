<style scoped>
</style>

<template>
    <div v-if="menuList && menuList.length > 0">
        <template v-for="item in menuList">
            <template v-if="item.children && item.children.length > 0">
                <el-submenu :index="item.id" :key="item.id">
                    <template slot="title">
                        <i v-if="item.icon != null && item.icon != ''" :class="item.icon"></i>
                        {{ item.title }}
                    </template>
                    <sidebar-menu-item  @addTab = "addTab" :menuList = "item.children"></sidebar-menu-item>
                </el-submenu>
            </template>
            <el-menu-item v-else @click="addTab(item.id,item.title,item.component)">
                <i v-if="item.icon != null && item.icon != ''" :class="item.icon"></i>
                {{ item.title }}
            </el-menu-item>
        </template>
    </div>
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
