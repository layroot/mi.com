<?php
include('./conn.php');
$username=$_REQUEST['username'];
$phone=$_REQUEST['phone'];
$password=$_REQUEST['password'];
$insert = "insert into user(username,phone,password) values('$username','$phone','$password')";
$res = $mysqli->query($insert);
$mysqli->close();
echo '<script>location.href="../html/login.html"</script>';
?>