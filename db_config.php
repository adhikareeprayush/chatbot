<?php
    $hName= 'localhost';
    $uName= 'root';
    $pass= '';
    $db= 'php_projects';

    $conn = mysqli_connect($hName, $uName, $pass, $db);

    if(!$conn){
        die("Connection Failed: ".mysqli_connect_error());
    }




?>