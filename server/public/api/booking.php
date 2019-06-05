<?php
require_once 'db_connection.php';
session_start();
header("Content-Type:application/json");
$method = $_SERVER['REQUEST_METHOD'];
$item = file_get_contents('php://input');
if ( $method === "POST"){
  $stringQuery = json_decode( $item , true );
  // DUMMY QUERY
  $query = "INSERT INTO `booking` (`id`, `tuuristId`, `packageId`, `bookedAt`, `dates`, `tuuristEmail`) 
            VALUES (NULL, '3', '52 ', CURRENT_TIMESTAMP, '[\"2019-06-11T07:00:00.000Z\"]', 'creed@dundermifflin.com')";
  $result = mysqli_query( $conn, $query );
  print_r( json_encode( ['auth' => $result]));
}
if ( $method === "GET"){
  $query = "SELECT `book`.id, `pack`.title, `pack`.description, `pack`.tags, 
  `pack`.location, `pack`.timeRange, `pack`.mainImage, `pack`.images, `pack`.profileEmail AS guideEmail,
  `book`.tuuristEmail, `book`.dates, `pro`.image AS guideImage
  FROM `package` AS pack
  JOIN `profile` AS pro ON `pro`.email = `pack`.profileEmail
  JOIN `booking` AS book ON `book`.packageId = `pack`.id
  WHERE `book`.tuuristId = 3";

  $result = mysqli_query( $conn , $query );
  $output = [];

  while ( $row = mysqli_fetch_assoc( $result) ){
    $output[] = $row;
  }

  print_r( json_encode( $output ));
}

?>