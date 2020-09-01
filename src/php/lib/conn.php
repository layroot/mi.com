<?php

header('content-type:text/html;charset=utf-8');
//第一步//////////////////////////////////
//建一个存放数据库连接数据的数组
$mysql_conf = array(
    'host'=>'localhost:3306', // 地址  mysql默认端口3306
    'db_user'=>'root',  // 用户名
    'db_pass'=>'root', // 密码
    'db'=>'mi' // 数据库名
);
//第二布////////////////////////////////
// 链接数据库 
// mysqli  登录数据库；括号里放入数组中的值
$mysqli = @new mysqli($mysql_conf['host'],$mysql_conf['db_user'],$mysql_conf['db_pass']);
//第三步///////////////////////////////
// 判断是否链接成功 
// 没有链接成功则终止代码执行
if($mysqli->connect_errno){//如果有错误的话connect_errno不为空，则为trun；于是执行代码；
    // die() 函数 终止代码执行
    die('链接错误'.$mysqli->connect_errno);
}
//第四步//////////////////////////////
// 设置查询字符集
$mysqli->query('set names utf8');
//第五部/////////////////////////////
// 选择数据库
$select_db = $mysqli->select_db($mysql_conf['db']);
//这里返回的是布尔值
if(!$select_db){
    die('数据库选择错误'.$mysqli->error);
}

?>