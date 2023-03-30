<?php

namespace App\Models;
use Codedge\Fpdf\Fpdf\Fpdf;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BonLivraison extends Model
{
    use HasFactory;
    protected $table = 'bonlivraison';
    public $timestamps = false;
    public $incrementing = false;
    public $lignelivraisons=array();
    public $total=0;
    public $fournisseur="";


    public function getsociete()
    {

        if ($this->fournisseur == 'FOU6') {
            $lignecommande=(new LigneCommande())
            ->where('idboncommande', $this->idboncommande)->get()->first();
            $proformatfournisseur=((new Proformat_fournisseur_detail())
            ->where('idproformat_fournisseur',$lignecommande['idproformat_fournisseur']))->get()->first();
            $societe=(new Fournisseurs())
            ->where('idfournisseur',$proformatfournisseur->idclient)->get()->first();
           $soc=new Societe();
           $soc->nomsociete= $societe->nomfournisseur;
           $soc->adresse= $societe->adresse;
           $soc->contact= $societe->contact;
            return $soc;
        }
        return (new Societe())->get()->last();
    }
    public function topdf()
    {
        //prend la derniere bon de livraison
        $bon=$this->get()->last();

        //initialisation du bon de livraison
        $this->idlivraison=$bon->idlivraison;
        $this->daty= $bon->daty;
        $this->idboncommande=$bon->idboncommande;
        $this->initListe();

        $proformatfournisseur=$this->getFournisseur();
        $this->fournisseur=$proformatfournisseur->idfournisseur;
        $societe=$this->getsociete();
        $titre = 'Bon de livraison:';
        $numero = "BDL".$this->getNumberId($this->idbonreception).
        $this->getNumberId($proformatfournisseur->idfournisseur).
        $this->getNumberDate(date('Y-m-d', strtotime($this->getFournisseur()->delailivraison)));
        $entete = $societe->nomsociete;
        $fournisseur = $proformatfournisseur->nomfournisseur;

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



        // Décalage à droite
    $pdf->Cell(162);
    $pdf->Cell(30,10,date('Y-m-d', strtotime($this->getFournisseur()->delailivraison)),0,0,);
    $pdf->ln();

    $pdf->Cell(100);
    $pdf->Cell(40,10,$titre.' '.$numero,0,0);
        $pdf->ln();
        $pdf->ln();
        $pdf->ln();
        $pdf->ln();

        $pdf->Write(10,$entete);

        $pdf->Cell(100);
        $pdf->Cell(40,10,$fournisseur,0,0,'C');
        $pdf->ln();

        $pdf->Write(10,$proformatfournisseur->adresse);
        $pdf->Cell(80);
        $pdf->Cell(40,10,$societe->adresse,0,0,'C');
        $pdf->ln();

        $pdf->Write(10,$proformatfournisseur->contact);
        $pdf->Cell(80);
        $pdf->Cell(40,10,$societe->contact,0,0,'C');



        $pdf->ln();
        $pdf->ln();
        $pdf->ln();


        $pdf->Cell(38,7,'Reference',1,0);
        $pdf->Cell(38,7,'Designation',1,0);
        $pdf->Cell(38,7,'Total',1,0);

        // bouclena
        $pdf->SetFont('Arial','',14);
            foreach ($this->lignelivraisons as $key => $value) {

            $pdf->ln();
            $pdf->Cell(38,7,$value['refproduit'],1,0);
            $pdf->Cell(38,7,$value['nomproduit'],1,0);
            $pdf->Cell(38,7,$value['quantite'],1,0);

            }

            $pdf->ln();

            $pdf->Cell(38,7,'',1,0);
            $pdf->Cell(38,7,'Quantite total',1,0);
            $pdf->Cell(38,7,$this->total,1,0);


            $pdf->ln();
            $pdf->ln();
            $pdf->Write(7,'Delai livraison :'.$this->getFournisseur()->delailivraison);
            $pdf->ln();
            $pdf->Write(7,'Lieu livraison :'.$this->getFournisseur()->lieulivraison);

            $pdf->SetY(-100);
            // Police Arial italique 8
            $pdf->SetFont('Arial','I',8);
            $pdf->Cell(0,10,'Cachet et signature',0,0,'C');
            $pdf->Rect(80,210,80,50);
            $pdf->Output();
            //  exit;
    }
    public function getFournisseur()
    {
        $commande=new LigneCommande();
        // echo $this->idboncommande;
        $commande=$commande->where('idboncommande',$this->idboncommande)->get()->first();
        $proformatfournisseur=((new Proformat_fournisseur_detail())
        ->where('idproformat_fournisseur',$commande->idproformat_fournisseur))->get()->first();
        return $proformatfournisseur;
    }
    public function getNumberId($element){
        return substr($element,3,strlen($element)-3);
    }
    public function getNumberDate($element){

        $str=explode("-",$element);
        $number="";

        foreach ($str as $value) {
            $number.=$value;
        }

        return $number;
    }
    public function initListe(){
        $lignelivraisons=(new Ligne_livraison())->where('idlivraison',$this->idlivraison)->get();
        $i=0;
        foreach ($lignelivraisons as $key => $lignelivraison) {
           array_push($this->lignelivraisons,$lignelivraison);
           $this->addRessource($i,$lignelivraison->idstock);
           $this->total=$this->total+$lignelivraison->quantite;
           $i++;
        }
    }
    public function addRessource($i,$idressource){
        $ressource=(new Ressource())->where('idressource',$idressource)->get()->first();
        $this->lignelivraisons[$i]['refproduit'] = $ressource->code;
        $this->lignelivraisons[$i]['nomproduit'] = $ressource->intitule;
    }

}
