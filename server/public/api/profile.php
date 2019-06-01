<?php

require_once 'dbconnection.php';
header("Content-Type:application/json");
$method = $_SERVER['REQUEST_METHOD'];
$item = file_get_contents('php://input');

if ($method === 'POST'){
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
    print_r($result);
}
elseif ($method === 'GET'){
    readfile('dummy-profile.json');
}
?>
