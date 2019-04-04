<style scoped>

</style>

<template>
    <div>
        <el-row :gutter="20" justify="center" align="middle" v-for="item,index in items" :key="index + ''">
            <el-col :span="4">
                <transition name="el-zoom-in-center">
                    <div v-show="show" class="transition-box">.el-zoom-in-center</div>
                </transition>
            </el-col>
            <el-col :span="4">
                <transition name="el-zoom-in-center">
                    <div v-show="show" class="transition-box">.el-zoom-in-center</div>
                </transition>
            </el-col>
            <el-col :span="4">
                <transition name="el-zoom-in-center">
                    <div v-show="show" class="transition-box">.el-zoom-in-center</div>
                </transition>
            </el-col>
            <el-col :span="4">
                <transition name="el-zoom-in-center">
                    <div v-show="show" class="transition-box">.el-zoom-in-center</div>
                </transition>
            </el-col>
            <el-col :span="4">
                <transition name="el-zoom-in-center">
                    <div v-show="show" class="transition-box">.el-zoom-in-center</div>
                </transition>
            </el-col>
            <el-col :span="4">
                <transition name="el-zoom-in-center">
                    <div v-show="show" class="transition-box">.el-zoom-in-center</div>
                </transition>
            </el-col>
        </el-row>

    </div>

</template>

<script>
export default {
    data() {
        var item = {};
        return {
            show:false,
            loading:{},
            items:Array(1).fill(item),
        }
    },
    created:function () {
        this.loading = this.$loading({
            lock: true,
            text: '玩命加载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
    },
    mounted:function () {
        setTimeout(() => {
            this.loading.close();
            this.show = true;
        }, 1500);
    },
    methods: {

    }
}
</script>

