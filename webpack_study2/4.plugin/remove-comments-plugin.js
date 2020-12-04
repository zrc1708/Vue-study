// ./remove-comments-plugin.js

class RemoveCommentsPlugin {

    apply(compiler) {

        compiler.hooks.emit.tap('RemoveCommentsPlugin', compilation => {
            // compilation => 可以理解为此次打包的上下文

            for (const name in compilation.assets) {

                // console.log(name) // 文件名
                // console.log(compilation.assets[name].source()) // 输出文件内容

                if (name.endsWith('.js')) {
                    const contents = compilation.assets[name].source()

                    // 通过正则替换移除代码中的注释
                    const noComments = contents.replace(/\/\*{2,}\/\s?/g, '')

                    // 覆盖对象
                    compilation.assets[name] = {
                        // 返回新的内容
                        source: () => noComments,
                        // 返回新的内容的大小
                        size: () => noComments.length
                        // 这个格式是webpack内部的要求
                    }
                }

            }

        })

    }

}


module.exports = RemoveCommentsPlugin