<?php
include('./conn.php');
$username=$_REQUEST['username'];
$sql="select * from user where username='$username'";
$res=$mysqli->query($sql);
if($res->num_rows>0){
    echo'{"yz":false,"msg":"用户名已存在"}';
}else{
    echo'{"yz":true,"msg":"用户名可用"}';
};

?>