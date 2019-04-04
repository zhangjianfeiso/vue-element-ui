<style scoped>
</style>

<template>
    <div>

        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

        <el-collapse v-model="activeNames" accordion>
            <el-collapse-item title="一致性 Consistency" name="1">
                <el-row>
                    <el-col :span="24">
                        <el-upload
                            multiple
                            :file-list="fileList"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :on-success="handleSuccess">
                            <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
                                <i class="el-icon-plus"></i>
                            </el-tooltip>
                            <div slot="tip"><span style="color:red;">* 注：</span>只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-col>
                </el-row>
            </el-collapse-item>
            <el-collapse-item title="反馈 Feedback" name="2">
                <el-row>
                    <el-col :span="24">
                        <el-upload
                            multiple
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                            <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
                                <i class="el-icon-plus"></i>
                            </el-tooltip>
                            <div slot="tip"><span style="color:red;">* 注：</span>只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-col>
                </el-row>
            </el-collapse-item>
            <el-collapse-item title="效率 Efficiency" name="3">
                <el-row>
                    <el-col :span="24">
                        <el-upload
                            multiple
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                            <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
                                <i class="el-icon-plus"></i>
                            </el-tooltip>
                            <div slot="tip"><span style="color:red;">* 注：</span>只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-col>
                </el-row>
            </el-collapse-item>
            <el-collapse-item title="可控 Controllability" name="4">
                <el-row>
                    <el-col :span="24">
                        <el-upload
                            multiple
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                            <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
                                <i class="el-icon-plus"></i>
                            </el-tooltip>
                            <div slot="tip"><span style="color:red;">* 注：</span>只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-col>
                </el-row>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            activeNames: ['1'],
            fileList:[{name:'张...',url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554377334852&di=be5c5bca074187e38cdf7ceddb052745&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F68%2F59%2F71X58PICNjx_1024.jpg'}]
        }
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            console.info('==========');
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleSuccess(response, file, fileList){
            console.info('success');
            this.fileList.push({name:'张...',url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554377334852&di=be5c5bca074187e38cdf7ceddb052745&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F68%2F59%2F71X58PICNjx_1024.jpg'});
        }
    }
}
</script>
