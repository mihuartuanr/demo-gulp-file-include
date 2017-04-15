
## 搭建目录结构

开始项目之前，我们先构建一下目录结构：

```
|-src  // 生产环境的资源文件夹
	|-client  // 可视资源存放的文件夹
		|-index.html  // 主页html 文件
		|-include  // 可复用的html片段
		|-lib  // 第三方工具库
		|-logic  // 自定义JS逻辑代码
		|-scss  // 项目样式文件
			|-index.scss
			|-include  // 可复用的样式文件夹
			|-images  // 各页面公共图片
			|-fonts  // 字体文件：iconfont
		|-images  // 项目示例图片
	|-server // 数据资源存放的文件夹
|-config //编辑部分配置文件：站点模板/图标
```

## 搭建复用HTML的环境

win7系统下安装`node`直接下一步就可以的，这是使用`gulp`的环境，先安装`node`再安装`gulp`，`gulp`是复用HTML工具的环境;

**注意：**
1. node和npm绑定安装，使用`node -v`与`npm -v`来检验是否安装成功;
2. 使用`gulp -v`检验gulp是否安装成功，如果command not found，则需要考虑设置全局变量;（正常不会，如有问题自行[百度](https://www.baidu.com/)）

## 复用HTML相关的Gulp包

```
mkdir gulpFileInclude && cd gulpFileInclude
npm install --save-dev gulp gulp-file-include
```

**建立目录结构**：


**提取模板**：

|-index.html
```
<body>
  <div>
    @@include('./include/header.html')
    <section>这里是内容</section>
    @@include('./include/footer.html')
  </div>
</body>
```

|-header.html
```
<header>这里是头部</header>
```

|-footer.html
```
<header>这里是尾部</header>
```

**配置gulp任务**：

```
var gulp = require('gulp');
var fileInclude = require('gulp-file-include');

gulp.task('default',function(){
		//src和dest的路径都是以gulpfile.js为基寻找的
		gulp.src('../src/client/*.html')
		.pipe(fileInclude({
				prefix:'@@',
				basepath:'@file'
		}))
		.pipe(gulp.dest('../dist'))
})
```

>options.basepath：
>type: string, 值类型是字符串，该值/作为查找@@include文件的路径前缀;
>@root： @@include引用文件的相对路径是基于gulpfile.js所在的路径;
>@file：@@include引用文件的相对路径是基于引用文件所在的路径;（默认该设置的）
>your-basepath：@@include引用文件的相对路径是基于自定义的路径;

好了，上面是使用纯静态的页面来实现HTML复用的，不包含任何数据，可以简单的提高自己的效率，使得自己写的HTML代码更加具有维护性和可复用性。
