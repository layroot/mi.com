<?php
include('./conn.php');
$username=$_REQUEST['username'];
$password=$_REQUEST['password'];
$sql="select * from user where username = '$username' and password ='$password'";
$res=$mysqli->query($sql);
$mysqli->close();
if($res->num_rows>0){
    echo'{"cg":true,"msg":"登录成功"}';
}else{
    echo'{"cg":false,"msg":"登录失败"}';
}
?>