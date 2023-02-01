<?php
if($_SERVER['REQUEST_METHOD'] == 'POST') {

    $input = json_decode(file_get_contents("php://input"), true);

    $to = "vent2000@ukr.net";
    $from = "upload@generator-servis.kyiv.ua <NO_REPLAY@generator-servis.kyiv.ua>";
    $subject = "Заполнена форма на сайте";
    $message = "Надсилач: ".$input['name'].",\r\n Пошта: ".$input['email'].",\r\n Телефон: ".$input['phone'].", \r\n Повідомлення: ".$input['text'];
    
    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
    $headers .= "From:".$from."\r\n";

    $result = mail($to, $subject, $message, $headers);

    if($result) {
    echo json_encode(['status' => 0]);
    } else {
    echo json_encode( array( 'status' => 1 ) );
    }

}


?>