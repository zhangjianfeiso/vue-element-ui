<template>
    <el-color-picker size="mini"
                     class="theme-picker"
                     popper-class="theme-picker-dropdown"
                     v-model="theme"></el-color-picker>
</template>

<script>

const version = require('element-ui/package.json').version // element-ui version from node_modules
const ORIGINAL_THEME = '#409EFF' // default color

export default {
    data() {
        return {
            chalk: '', // content of theme-chalk css
            theme: ''
        }
    },
    watch: {
        theme(val, oldVal) {
            if (typeof val !== 'string') return
            localStorage.setItem('theme',val);
            $('header').css('background',val);
            $('footer').css('background',val);
            $('footer .el-dropdown').css('color','#FFFFFF');
            $('footer .txt').css('color','#FFFFFF');
            $('header .el-dropdown').css('color','#FFFFFF');
            $('header .txt').css('color','#FFFFFF');
            $('body').css('margin',0);
            $('.transition-box').css('background',val);
            const themeCluster = this.getThemeCluster(val.replace('#', ''))
            const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))
            //console.log(themeCluster, originalCluster)
            const getHandler = (variable, id) => {
                return () => {
                    const originalCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''))
                    const newStyle = this.updateStyle(this[variable], originalCluster, themeCluster)

                    let styleTag = document.getElementById(id)
                    if (!styleTag) {
                        styleTag = document.createElement('style')
                        styleTag.setAttribute('id', id)
                        document.head.appendChild(styleTag)
                    }
                    styleTag.innerText = newStyle
                }
            }

            const chalkHandler = getHandler('chalk', 'chalk-style')

            if (!this.chalk) {
                const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
                this.getCSSString(url, chalkHandler, 'chalk')
            } else {
                chalkHandler()
            }

            const styles = [].slice.call(document.querySelectorAll('style'))
                .filter(style => {
                    const text = style.innerText
                    return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
                })
            styles.forEach(style => {
                const { innerText } = style
                if (typeof innerText !== 'string') return
                style.innerText = this.updateStyle(innerText, originalCluster, themeCluster)
            })
            let init = localStorage.getItem('init');
            if(!init){
                this.$message({
                    message: '换肤成功',
                    type: 'success'
                })
            }
            localStorage.removeItem('init');
        }
    },
    created:function () {
        var theme = localStorage.getItem('theme');
        localStorage.setItem('init',0);
        this.theme = theme?theme:ORIGINAL_THEME;
    },
    mounted:function () {
        $('.theme-picker').css('margin','-3px 10px 0 10px').css('vertical-align','middle');
        $('.theme-picker .el-color-picker__trigger').css('vertical-align','middle');
        $('.el-color-picker__trigger').css('background-color','#FFFFFF');
        $('.el-color-picker__color').css('border','1px solid #f5efef');
    },
    methods: {
        updateStyle(style, oldCluster, newCluster) {
            let newStyle = style
            oldCluster.forEach((color, index) => {
                newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
            })
            return newStyle
        },
        getCSSString(url, callback, variable) {
            const xhr = new XMLHttpRequest()
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
                    callback()
                }
            }
            xhr.open('GET', url)
            xhr.send()
        },
        getThemeCluster(theme) {
            const tintColor = (color, tint) => {
                let red = parseInt(color.slice(0, 2), 16)
                let green = parseInt(color.slice(2, 4), 16)
                let blue = parseInt(color.slice(4, 6), 16)
                if (tint === 0) { // when primary color is in its rgb space
                    return [red, green, blue].join(',')
                } else {
                    red += Math.round(tint * (255 - red))
                    green += Math.round(tint * (255 - green))
                    blue += Math.round(tint * (255 - blue))
                    red = red.toString(16)
                    green = green.toString(16)
                    blue = blue.toString(16)
                    return `#${red}${green}${blue}`
                }
            }

            const shadeColor = (color, shade) => {
                let red = parseInt(color.slice(0, 2), 16)
                let green = parseInt(color.slice(2, 4), 16)
                let blue = parseInt(color.slice(4, 6), 16)

                red = Math.round((1 - shade) * red)
                green = Math.round((1 - shade) * green)
                blue = Math.round((1 - shade) * blue)

                red = red.toString(16)
                green = green.toString(16)
                blue = blue.toString(16)

                return `#${red}${green}${blue}`
            }

            const clusters = [theme]
            for (let i = 0; i <= 9; i++) {
                clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
            }
            clusters.push(shadeColor(theme, 0.1))
            return clusters
        }
    }
}
</script>

<style scoped>


</style>

