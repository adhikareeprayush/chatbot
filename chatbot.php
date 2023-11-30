<?php

// Include the database configuration file
include('db_config.php');

// Check if the 'message' parameter is set in the GET request
if (isset($_GET['message'])) {
    // Retrieve the user's message from the GET request
    $message = $_GET['message'];

    // Prepare a SQL statement to retrieve the response from the database
    $stmt = $conn->prepare("SELECT response FROM messages_chatbot WHERE user_msg=? LIMIT 1");

    // Bind the user's message as a parameter to the SQL statement
    $stmt->bind_param('s', $message);

    // Execute the SQL query
    if ($stmt->execute()) {
        // Bind the result of the query to a variable
        $stmt->bind_result($response_message);

        // Store the result locally
        $stmt->store_result();

        // Check if exactly one row is returned
        if ($stmt->num_rows() == 1) {
            // Fetch the result and create an associative array
            $stmt->fetch();
            $result = ['response_message' => $response_message];
            // Encode the result as JSON and send it to the client
            echo json_encode($result);
        } else {
            // Provide a default response if the number of rows is not equal to 1
            echo json_encode(['response_message' => 'Sorry, I don\'t have a response for that.']);
        }
    } else {
        // Handle database query execution error
        echo json_encode(['response_message' => 'Sorry, I encountered an error while processing your request.']);
    }
} else {
    // Respond with a default message if the 'message' parameter is not set
    echo json_encode(['response_message' => 'Sorry, I don\'t understand you.']);
}

?>
