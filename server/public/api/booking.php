<?php
require_once 'db_connection.php';
session_start();
header("Content-Type:application/json");
$method = $_SERVER['REQUEST_METHOD'];
$item = file_get_contents('php://input');
if ( $method === "POST"){
  // DUMMY QUERY
  // $query = INSERT INTO `booking` (`id`, `tuuristId`, `packageId`, `bookedAt`, `dates`, `tuuristEmail`) 
  //          VALUES (NULL, '3', '153', CURRENT_TIMESTAMP, '[\"2019-06-11T07:00:00.000Z\"]', 'creed@dundermifflin.com');

}
if ( $method === "GET"){
  $query = "SELECT "

  // package ( title, description, tags , location, timeRange, dates, mainImage , images, guideEmail )
  // booking ( touristEmail from tuuristId, guideImage from packageId -> package -> profile table )
  SELECT * 
  FROM `package` AS pack
  JOIN `profile` AS pro ON pro.email = pack.profileEmail
  JOIN `booking` AS book ON book.tuuristId = pro.id
  WHERE pack.profileEmail = 'dPaschal@gmail.com'
}

?>