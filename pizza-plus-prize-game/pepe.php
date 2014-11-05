<?php
ob_start();

	echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
	echo "<item>\n\t";
			echo "<play>TRUE</play>\n\t";
			echo "<id>1</id>\n\t";
		echo "<desc>Free Prize</desc>\n\t";
		echo "<gameid>1234</gameid>\n\t";
			echo "<email>Message has been sent</email>\n\t";
//				echo "<lastplay>";
//				echo date(TIME_FORMAT, $lastplay + (TIME_OFFSET * 3600));
//				echo "</lastplay>\n";
	echo "</item>\n\t";

header("Content-Length: ". ob_get_length());
// flush the output
ob_end_flush();
?>