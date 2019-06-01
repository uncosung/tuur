<?php
session_start();
require_once 'db_connection.php';
header("Content-Type:application/json");
$method = $_SERVER['REQUEST_METHOD'];
$item = file_get_contents('php://input');
$email = $_SESSION['userEmail'];

if ($method = 'GET'){
$query = "SELECT * FROM `package` WHERE `profileEmail` = '{$email}'";
  $result = mysqli_query( $conn , $query );
  $output = [];
  while ( $row = mysqli_fetch_assoc( $result )){
    $output[] = $row;
  }
  $_output = json_encode( $output );
  print_r( $_output );
  
}
?>