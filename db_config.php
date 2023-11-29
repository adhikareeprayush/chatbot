<?php
    // Database connection parameters
    $hName = 'localhost'; // Hostname (usually 'localhost' for local development)
    $uName = 'root';      // Database username
    $pass = '';           // Database password
    $db = 'php_projects'; // Database name

    // Attempt to establish a connection to the database
    $conn = mysqli_connect($hName, $uName, $pass, $db);

    // Check if the connection was successful
    if (!$conn) {
        // If the connection fails, terminate the script and display an error message
        die("Connection Failed: " . mysqli_connect_error());
    }
?>
