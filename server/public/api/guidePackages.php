<?php 

require_once 'db_connection.php';
require_once 'functions.php';
session_start();
header("Content-Type:application/json");
$method = $_SERVER['REQUEST_METHOD'];
$item = file_get_contents('php://input');

if ( $method === 'GET'){
  $email = $_GET['email'];
  $query = "SELECT * FROM `package` WHERE profileEmail = '{$email}'";
  $result = mysqli_query( $conn, $query );
  $output = [];
  while ( $row = mysqli_fetch_assoc( $result )){
    $output[] = $row;
  }
  print_r( json_encode( $output ));
}

?>