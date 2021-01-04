<?php 

require 'vendor/autoload.php';

use GuzzleHttp\Client;

$client = new Client();
$response = $client->request('GET', 'http://www.omdbapi.com', [
    'query' => [
        'apikey' => '629fa4c3',
        's' => 'transformers'
    ]
]);

$result = $response->getBody()->getContents();
$result = json_decode($result, true);



?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Movie</title>
</head>
<body>
    <?php foreach($result["Search"] as $movie): ?>
    <ul>
        <li>Judul : <?= $movie["Title"]; ?> </li>
        <li>Tahun : <?= $movie["Year"]; ?></li>
        <li>
            <img src="<?= $movie["Poster"]; ?>" width="200">
        </li>
    </ul>
    <?php endforeach; ?>
</body>
</html>