<?php
require_once 'db_connection.php';
session_start();
header("Content-Type:application/json");
$method = $_SERVER['REQUEST_METHOD'];
$item = file_get_contents('php://input');

if ( isset( $_GET['logout'] ) && $_GET['logout'] ){
  session_unset();
  session_destroy();
  print_r( json_encode( ['status' => true ]));
  exit();
}
if ( isset( $_SESSION['isGuide']) || isset($_SESSION['userEmail']) ){
  print_r( json_encode( ['isGuide' => $_SESSION['isGuide'], 'userEmail' => $_SESSION['userEmail'], 'loggedIn' => true]));
} else {
  print_r( json_encode( ['isGuide' => false, 'userEmail' => false, 'loggedIn' => false]));
}

?>