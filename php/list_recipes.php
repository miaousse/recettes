<?php
$dir = '../recettes/';
$files = array();

if (is_dir($dir)) {
    if ($dh = opendir($dir)) {
        while (($file = readdir($dh)) !== false) {
            if (pathinfo($file, PATHINFO_EXTENSION) === 'md') {
                $files[] = $file;
            }
        }
        closedir($dh);
    }
}

echo json_encode($files);
?>
