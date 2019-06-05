<?php
require_once 'db_connection.php';
session_start();
header("Content-Type:application/json");
$method = $_SERVER['REQUEST_METHOD'];
$item = file_get_contents('php://input');
$email = $_SESSION['userEmail'];

if ( $method === "POST"){
  $output = json_decode( $item , true );
  // TEST OUTPUT ONCE BOOKING FUNCTIONALITY CREATED
  // var_dump( $output );
  
  $query = "INSERT INTO `booking` (`id`, `tuuristId`, `packageId`, `bookedAt`, `dates`, `tuuristEmail`) 
            VALUES (NULL, '{$output['tuuristId']}', '{$output['packageId']} ', CURRENT_TIMESTAMP, '{$output['dates']}', {$email})";
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
  WHERE `book`.tuuristEmail = '{$email}'";

  $result = mysqli_query( $conn , $query );
  $output = [];

  while ( $row = mysqli_fetch_assoc( $result) ){
    $output[] = $row;
    // $output[0]['dates'] = (substr(json_decode( $row['dates'] )[0], 0 , 10));
  }

  print_r( json_encode( $output ));
}

?>