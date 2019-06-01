<?php

require_once 'dbconnection.php';
header("Content-Type:application/json");
$method = $_SERVER['REQUEST_METHOD'];
$item = file_get_contents('php://input');

if ($method === 'POST'){
    session_start();
    $output = json_decode($item, true);
    if ($output['isGuide'] === false){
        $output['isGuide'] = 0;
    }
    if ($output['isGuide'] === true){
        $output['isGuide'] = 1;
    }
    $query = "INSERT INTO `profile`(`name`, `email`, `location`, `bio`, `image`, `isGuide`) 
    VALUES ('{$output['name']}', '{$output['email']}', '{$output['location']}', '{$output['bio']}', '{$output['image']}', '{$output['isGuide']}')";
    $result = mysqli_query($conn, $query);
    $_SESSION['userEmail'] = $output['email'];
    print_r($result);
}
elseif ($method === 'GET'){
    $email = $_GET['email'];
    $query = "SELECT
    `profile`.`name`, `profile`.`location`
    FROM `profile`
    WHERE `profile`.`email` = '{$email}'";

    $result = mysqli_query($conn, $query);
    $output = [];
    while ($row = mysqli_fetch_assoc($result)){
        $output['name'] = $row['name'];
        $output['location'] = $row['location'];
    }
    $_SESSION['userEmail'] = $email;
    $json_output = json_encode($output);
    print_r($json_output);
}
?>
