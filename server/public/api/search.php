<?php

require_once 'db_connection.php';
session_start();
header("Content-Type:application/json");
$method = $_SERVER['REQUEST_METHOD'];

if ( $method === 'GET'){
  $query = "SELECT `name`, `email`, `location`, `image`, `bio`
  FROM `profile` 
  WHERE `isGuide` = 1";
  
  $result = mysqli_query( $conn , $query );
  $output = [];
  while ( $row = mysqli_fetch_assoc( $result )){
    $output[] = $row;
  }
  print_r( json_encode( $output)  );
}
?>