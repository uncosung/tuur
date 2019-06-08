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
  $pickedDates = json_encode( $output['dates']);
  print_r( $pickedDates );
  $query = "INSERT INTO `booking` (`id`, `tuuristId`, `packageId`, `bookedAt`, `dates`, `tuuristEmail`) 
            VALUES (NULL, '{$tuuristId}', '{$output['packageId']}', CURRENT_TIMESTAMP, '{$pickedDates}', '{$email}')";
  $result = mysqli_query( $conn, $query );
  // print_r( json_encode( ['auth' => $result]));

  if ( $result ){
    $getQuery = "SELECT `dates` from `package` WHERE `id` = {$output['packageId']}";
    $getResult = mysqli_query( $conn, $getQuery );
    $date = mysqli_fetch_assoc( $getResult );

    
    $string = str_replace( "[", "", $pickedDates );
    $string = str_replace( "]", "", $string );
    $pickedDates = explode( "," , $string );
    foreach( $pickedDates as $value ){
      $pickedDateArray[] = trim( $value );
    }
    $string = str_replace( "[", "", $date['dates'] );
    $string = str_replace( "]", "", $string );
    $packageDates = explode( "," , $string );
    foreach( $packageDates as $value ){
      $packageDateArray[] = trim( $value );
    }

    for ( $pickCount = 0; $pickCount < count( $pickedDateArray ); $pickCount++ ){
      for ( $packCount = 0; $packCount < count( $packageDateArray ); $packCount++ ){
        if ( $pickedDateArray[ $pickCount ] === $packageDateArray[$packCount] ){
          unset( $packageDates[$packCount]);
        }
      }
    }
    }
    $packageDates = join( ',', $packageDates );
    $updateQuery = "UPDATE `package`
    SET `dates`= '[" . $packageDates . "]'
    WHERE `id` = {$output['packageId']}";
    $updateResult = mysqli_query( $conn , $updateQuery );
    print_r ( json_encode( ['auth' => $result ]));




    // print_r( $updateQuery );
    // $updateResult = mysqli_query( $conn, $updateQuery );
    // print_r( $updateResult );

  }
  // if ( $result ){
  //   $query = "DELETE FROM `package` WHERE id = {$output['packageId']}";
  //   $result = mysqli_query( $conn, $query );
  // }
  // print_r( json_encode( ['auth' => $result]));

// }

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
