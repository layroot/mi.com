<?php
  include('./conn.php');    
  $sql="select * from goods";
  $result=$mysqli->query($sql);
  $arr=array();
  while($row = $result->fetch_assoc()){
    array_push($arr,$row);
    };
    $json=json_encode($arr);
    echo $json;

?>


