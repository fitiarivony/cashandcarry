<?php

use App\Models\Departement;

$departement = new Departement;
 
$departement->iddept = '1';
$departement->nomdepartement = 'test';
 
$departement->save();

?>
