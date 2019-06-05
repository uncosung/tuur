<?php

require_once 'db_connection.php';
session_start();
header("Content-Type:application/json");
$method = $_SERVER['REQUEST_METHOD'];
$item = file_get_contents('php://input');

if ($method === 'POST'){
    $output = json_decode($item, true);
    $emailQuery = "SELECT `email` FROM `profile` WHERE `email` = '{$output['email']}'";
    $emailExist = mysqli_query( $conn, $emailQuery );
    $email = mysqli_fetch_assoc( $emailExist );
    if ( $email !== NULL){
        print(json_encode(['auth' => false]));
    } 
    else {
        if ($output['isGuide'] === false){
            $output['isGuide'] = 0;
        }
        if ($output['isGuide'] === true){
            $output['isGuide'] = 1;
        }
        $query = "INSERT INTO `profile`(`name`, `email`, `location`, `bio`, `image`, `isGuide`) 
        VALUES (\"{$output['name']}\", '{$output['email']}', '{$output['location']}', '{$output['bio']}', '{$output['image']}', '{$output['isGuide']}')";
        $result = mysqli_query($conn, $query);
        $_SESSION['userEmail'] = $output['email'];
        print( json_encode( ['auth' => $result]));
    }
}
elseif ($method === 'GET'){
    $email = $_GET['email'];
    $query = "SELECT
    `profile`.`name`, `profile`.`email`, `profile`.`location`, `profile`.`image`, `profile`.`bio`, `profile`.`isGuide`
    FROM `profile`
    WHERE `profile`.`email` = '{$email}'";
    $result = mysqli_query($conn, $query);
    $output = [];
    while ($row = mysqli_fetch_assoc($result)){
        $output['name'] = $row['name'];
        $output['email'] = $row['email'];
        $output['location'] = $row['location'];
        $output['image'] = $row['image'];
        $output['bio'] = $row['bio'];
        $output['isGuide'] = $row['isGuide'] ? true : false;
    }
    $_SESSION['userEmail'] = $email;
    $json_output = json_encode($output);
    print_r($json_output);
}
elseif ($method === 'PATCH'){
	$output = json_decode($item, true);
	$query = "UPDATE `profile` 
	SET `name`= '{$output['name']}',`email`='{$output['email']}',`location`='{$output['location']}',`bio`='{$output['bio']}',`image`='{$output['image']}' 
	WHERE `profile`.`email` = '{$_SESSION['userEmail']}'";
	$result = mysqli_query($conn, $query);
	$_SESSION['userEmail'] = $output['email'];
	print_r($result);
}
?>
