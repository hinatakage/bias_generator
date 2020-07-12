<?php
$jpg = "card_notext.png";
$afjpg= "to.jpg";
$serihupost = "";
$serihupost = $_POST["serihu"];
$font = "meiryo.ttc";
$image = imagecreatefromjpeg($jpg);
$color = imagecolorallocate($image, 0, 0, 0);
imagettftext($image, 20, 0, 30, 210, $color, $font, $serihupost);
imagejpeg($image, "to.jpg", 100);
echo "<img src= " . $afjpg . ">";
?>