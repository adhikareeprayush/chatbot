<?php

include('db_config.php');




if (isset($_GET['message'])) {
    $message = $_GET['message'];

    $stmt = $conn->prepare("SELECT response FROM messages_chatbot WHERE user_msg=? LIMIT 1");

    $stmt->bind_param('s', $message);

    // execute query
    if ($stmt->execute()) {
        $stmt->bind_result($response_message);

        $stmt->store_result();

        if ($stmt->num_rows() == 1) {
            $stmt->fetch();
            $result = ['response_message' => $response_message];
            echo json_encode($result);
        } else {
            // Provide a default response if num_rows is not equal to 1
            echo json_encode(['response_message' => 'Sorry, I don\'t have a response for that.']);
        }
    } else {
        // Handle database query execution error
        echo json_encode(['response_message' => 'Sorry, I encountered an error while processing your request.']);
    }
} else {
    echo json_encode(['response_message' => 'Sorry, I don\'t understand you.']);
}
?>
