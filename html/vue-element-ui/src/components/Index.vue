<template>
    <el-container style="height:100%;border: 1px solid #eee;">
        <el-header style="color: #FFFFFF;line-height: 60px;text-align: right;font-size: 12px">
            <ThemePicker></ThemePicker>
            <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px;"></i>
                <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item>修改密码</el-dropdown-item>
                    <el-dropdown-item @click.native="login">注销登陆</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span class="txt">王小虎</span>
        </el-header>
        <el-container>
            <el-aside width="200px" class="defined-scroll-el" style="background-color: rgb(238, 241, 246);overflow-y: auto;overflow-x: hidden;">
                <el-menu v-if="menuList && menuList.length > 0">
                    <el-menu-item index="0" @click="addTab('0','首页','HomeIndex')"><i class="el-icon-menu"></i>首页</el-menu-item>
                    <el-submenu v-for="item in menuList" :index="item.id" :key="item.id">
                        <template slot="title">
                            <i v-if="item.icon != null && item.icon != ''" :class="item.icon"></i>
                            {{ item.title }}
                        </template>
                        <SidebarMenu @addTab = "addTab" :menuList = "item.children"></SidebarMenu>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-main>
                <el-tabs v-model="editableTabsValue" type="card" @edit="handleTabsEdit">
                    <el-tab-pane
                        :key="item.id"
                        v-for="(item, index) in editableTabs"
                        :label="item.title"
                        :name="item.id"
                        :closable="item.closable"
                    >
                        <div class="defined-scroll-el main-scroll-el">
                            <component :is="item.component"></component>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
    </el-container>

</template>

<script>
import SidebarMenu from './SidebarMenu'
import ThemePicker from './common/ThemePicker.vue'


var menuList = [
    {id:'1',title:'系统管理',icon:'el-icon-setting',children:[
        {id:'11',title:'用户管理',icon:'el-icon-service',component:'UserIndex',children:[]},
        {id:'12',title:'部门管理',icon:'el-icon-info',component:'DeptIndex',children:[
            {id:'121',title:'部门1',component:'DeptIndex',children:[]},
            {id:'122',title:'部门分支',component:'DeptIndex',children:[
                {id:'1221',title:'部门分支1',component:'DeptIndex',children:[]},
                {id:'12212',title:'部门分支12',component:'DeptIndex',children:[
                    {id:'121222',title:'部门122',component:'DeptIndex',children:[]}
                ]}
            ]}
        ]}
    ]}
];

import Vue from 'vue'
    export default {
        name:'Sidebar',
        data() {
            return {
                editableTabsValue: '0', //el-tab-pane中name
                editableTabs: [{
                    title: '首页',
                    id: '0',
                    closable:false,
                    component: 'HomeIndex'
                }],
                menuList:menuList
            }
        },
        created:function () {
            //动态注册所有组件
            var components = this.$store.state.components;
            for(var i in components){
                var component = components[i];
                Vue.component(component.name,component.component)
            }
        },
        mounted:function () {
            var height = $(window).height();   // 浏览器的高度
            $(".defined-scroll-el").height(height - 60)  // 浏览器的高度
            $(".main-scroll-el").height(height - 135)  // 浏览器的高度
        },
        methods: {
            addTab(id,title,component){ //增加tab
                var isAdd = true;
                var editableTabs = this.editableTabs;
                for(var i in editableTabs){
                    var editableTab = editableTabs[i];
                    if(editableTab.id == id){
                        this.editableTabsValue = id+'';
                        isAdd = false;
                    }
                }
                if(isAdd){
                    this.editableTabs.push({
                        title: title,
                        id: id + '',
                        closable:true,
                        component: component
                    });
                    this.editableTabsValue = id+'';
                }
            },
            handleTabsEdit(targetName, action) {
                /*if (action === 'add') {
                    let newTabName = ++this.tabIndex + '';
                    this.editableTabs.push({
                        title: 'New Tab',
                        name: newTabName,
                        content: 'New Tab content'
                    });
                    this.editableTabsValue = newTabName;
                }*/
                if (action === 'remove') {
                    let tabs = this.editableTabs;
                    let activeName = this.editableTabsValue;
                    tabs.forEach((tab, index) => {
                        if (tab.id === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.id +'';
                            }
                        }
                    });
                    this.editableTabsValue = activeName;
                    this.editableTabs = tabs.filter(tab => tab.id !== targetName);
                }
            },
            login(){
                this.$confirm('您确定要注销登陆吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push('/login');
                }).catch(() => {
                });
            }
        },
        components:{SidebarMenu,ThemePicker}
    };
</script>

<style scoped>
</style>
