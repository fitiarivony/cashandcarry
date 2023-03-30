<?php

namespace App\Http\Controllers;

use App\Models\Proformat_fournisseur_detail;
use App\Models\Societe;
use App\Models\Ressource;
use Codedge\Fpdf\Fpdf\Fpdf;
use Illuminate\Http\Request;

class PdfController extends Controller
{
    protected $fpdf;

    public function index(Request $request)
    {
        $content=$request->getContent();
        $table=json_decode($content,true);
        $proformatfournisseur=((new Proformat_fournisseur_detail())
        ->where('idproformat_fournisseur',$table['idproformat_fournisseur']))->get()->first();
        $societe=(new Societe())->get()->last();
        $ressource=((new Ressource())->where('idressource',$proformatfournisseur->idressource))->get()->first();
        // echo $proformatfournisseur;
        $titre = 'Bon de commande';
        $numero = '000111';
        $entete = $societe->nomsociete;
        $fournisseur = $proformatfournisseur->nomfournisseur;
        $HT = $proformatfournisseur->quantite*$proformatfournisseur->pu;

        $TVA = 20;
        $TTC = 1.2*$HT;


        $data = array(
            [1,1,1,1,1],
            [2,2,2,2,2],
            [3,3,3,3,3],
            [4,14,14,14,14],
            [3,12,23,23,23]
        );

        $pdf = new FPDF('P','mm','A4');
        $pdf->AddPage();
        $pdf->SetFont('Arial','B',16);
        $pdf->Write(40,'Titre :'.$titre);
        $pdf->ln();
        $pdf->Write(7,'Numero :'.$numero);
        $pdf->ln();
        $pdf->Write(7,'Entete :'.$entete);
        $pdf->ln();
        $pdf->Write(7,'Fourniseur :'.$fournisseur);

        $pdf->ln();
        $pdf->ln();
        $pdf->ln();


        $pdf->Cell(38,7,'Designation',1,0);
        $pdf->Cell(38,7,'Rubrique',1,0);
        $pdf->Cell(38,7,'Quantite',1,0);
        $pdf->Cell(38,7,'Prix unitaire',1,0);
        $pdf->Cell(38,7,'Montant',1,0);

        // bouclena
        $pdf->SetFont('Arial','',14);

            $pdf->ln();
            $pdf->Cell(38,7,$ressource->intitule,1,0);
            $pdf->Cell(38,7,"",1,0);
            $pdf->Cell(38,7,$proformatfournisseur->quantite,1,0);
            $pdf->Cell(38,7,$proformatfournisseur->pu,1,0);

            $pdf->Cell(38,7,$proformatfournisseur->quantite*$proformatfournisseur->pu,1,0);


        //


        $pdf->ln();

        $pdf->Cell(38,7,'Montant',1,0);
        $pdf->Cell(38,7,'',1,0);
        $pdf->Cell(38,7,'',1,0);
        $pdf->Cell(38,7,'',1,0);
        $pdf->Cell(38,7,'HT:'.$HT,1,2);
        $pdf->Cell(38,7,'TVA:'.$TVA,1,2);
        $pdf->Cell(38,7,'TTC:'.$TTC,1,2);

        $pdf->Output();
    }




}
