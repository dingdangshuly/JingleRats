project文件目录说明

1、安装nodejs http://nodejs.org/
设置环境变量 ：将D:\Program Files\nodejs\目录加入系统变量的Path，如：;D:\Program Files\nodejs\
测试:打开cmd，输入node-v,显示版本则配置成功。

2、mongodb数据库：

安装：http://www.mongodb.org/
数据库文件导入命令mongorestore：参考:http://blog.csdn.net/shmnh/article/details/41888579
数据文件：etc/JingleRats,配置文件:

数据库运行：
启动数据库Server：cd D:\Program Files\MongoDB 2.6 Standard\bin, mongod.exe -f JingleRats.conf
启动数据库Client：
mongo 127.0.0.1:9009

数据命令，详情参考 http://blog.csdn.net/shmnh/article/details/41886901
show dbs 查看数据库；
use renovation 切换数据库；
show collections 查看数据库全部的表；
db.orders.find() 查看orders表数据

数据库表说明：
users：用户表
materials：材料表
orders：订单表
orderseq：订单流水号


3、安装JingleRats依赖包

打开cmd,cd JingleRats 运行npm install

项目文件结构说明：
doc 文档
etc 配置文件
models 数据模型
controller 控制层
proxy 持久层
public 静态文件 js、css、pic
utils 通用文件
views 视图 静态页面
node_modules 第三方模块

启动项目 node app.js

http://127.0.0.1:3000/index
