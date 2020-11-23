<?php 

$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$text = $_POST['user_text'];
$email = $_POST['user_email'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'karpushina-anya@mail.ru';                 // Наш логин
$mail->Password = 'zetrov1999';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('karpushina-anya@mail.ru', 'Карпушина Анна');   // От кого письмо 
$mail->addAddress('karpushina-anya@mail.ru');     // Add a recipient ящик на который это письмо должной прийти
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Штукатурка стен';
$mail->Body    = '
	Пользователь оставил свои данные <br> 
	Имя: ' . $name . ' <br>
	Телефон: ' . $phone . '<br> 
	Email: ' . $email . ' <br> 
	Текстовое сообщение: ' . $text . '';
$mail->AltBody = 'Это альтернативный текст';

if(!$mail->send()) {
	return false;
	} 
	else {
    return true;
 }

 
//  if(!$mail->send()) {
//	echo 'Message could not be sent.';
//	echo 'Mailer Error: ' . $mail->ErrorInfo;
//} else {
//	header ('Location: ../thanks.html');
//}

?>