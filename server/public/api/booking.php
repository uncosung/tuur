<?php
require_once 'db_connection.php';
session_start();
header("Content-Type:application/json");
$method = $_SERVER['REQUEST_METHOD'];
$item = file_get_contents('php://input');
$email = $_SESSION['userEmail'];
$tuuristId = $_SESSION['id'];
if ( $method === "POST"){
  $output = json_decode( $item , true );
  $dates = json_encode( $output['dates']);

  $query = "INSERT INTO `booking` (`id`, `tuuristId`, `packageId`, `bookedAt`, `dates`, `tuuristEmail`) 
            VALUES (NULL, '{$tuuristId}', '{$output['packageId']}', CURRENT_TIMESTAMP, '{$dates}', '{$email}')";
  $result = mysqli_query( $conn, $query );
  print_r( json_encode( ['auth' => $result]));
}
if ( $method === "GET"){
  $query = "SELECT `book`.id, `pack`.title, `pack`.description, `pack`.tags, 
  `pack`.location, `pack`.timeRange, `pack`.mainImage, `pack`.images, `pack`.profileEmail AS guideEmail,
  `book`.tuuristEmail, `book`.dates, 
  `pro`.image AS guideImage
  FROM `package` AS pack
  JOIN booking AS book on `book`.packageId = `pack`.id 
  JOIN profile AS pro on `pack`.profileEmail = `pro`.email 
  WHERE `book`.tuuristEmail = '{$email}'";
  $result = mysqli_query( $conn , $query );
  $output = [];

  while ( $row = mysqli_fetch_assoc( $result) ){
    $output[] = $row;
  }
  
  print_r( json_encode( $output ));
}

?>
