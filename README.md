## 学习目标
- 通过本案例学会如何使用一些第三方模块
- 通过本案例复习fs、path、querystring、http模块的用法
- 通过本案例训练自己做项目的思考过程
- 进一步复习art-template的用法
- 复习git、github的命令

## 需求分析
- 显示音乐列表
- 添加音乐
- 编辑音乐
- 删除音乐

## 分析练习素材
- uploads是一些上传的图片、mp3文件
- views是一些静态网页模板

## 更改练习素材文件夹的权限

## 路由规划
- / --> 显示音乐
- /add --> 添加音乐
    + method如果是get
    + method是post
- /edit --> 编辑音乐
    + method是get
    + method是post
- /delete --> 删除音乐


## 创建服务器，测试是否可以正常访问


## 创建路由代码，并用postman进行测试

## 添加首页html文件
- 测试不能正常访问一直在转圈 --> uploads作为静态资源文件夹 --> 创建一个assets文件夹用来放静态js,css

## 同样的思路把添加音乐、编辑音乐做出来

## 给音乐首页添加动态数据 --> art-template

## 删除功能


## 添加功能

## 思考：我们在用原生的node.js来做网站存在的问题
- 代码都耦合在一起，不太好维护和管理
- 对路由的处理太繁琐

---> 最好是用框架来帮助我们开发代码 --> express
