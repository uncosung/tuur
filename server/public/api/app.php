<?php
  require_once('dbconnection.php');

  $query = 'SELECT * FROM `dummy`';
  $result = mysqli_query( $conn , $query );

  while ( $row = mysqli_fetch_assoc( $result )){
    $output[] = $row;
  }
  print_r( json_encode($output ) );
?>