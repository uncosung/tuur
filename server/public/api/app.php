<?php
require_once 'db_connection.php';
require_once 'functions.php';
set_exception_handler("error_handler");
startUp();

if ( !$conn ){
  throw new Exception( 'Error: ' . mysqli_connect_error( $conn ));
}

$query = 'SELECT * FROM `dummy`';
$result = mysqli_query( $conn , $query );

while ( $row = mysqli_fetch_assoc( $result )){
  $output[] = $row;
}
print_r( json_encode($output ) );
?>