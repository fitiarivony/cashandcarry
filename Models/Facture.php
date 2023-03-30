<?php

namespace App\Models;
use Codedge\Fpdf\Fpdf\Fpdf;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facture extends Model
{
    use HasFactory;
    protected $table = 'facture';
    public $timestamps = false;
    public $incrementing = false;
    protected $fillable = ['idboncommande'];
    public BonCommande $boncommande;
    public $fournisseur="";

    public function initBonCommande(){
        $this->initFacture();
        $this->boncommande=new BonCommande();
        $this->boncommande->idboncommande=$this->idboncommande;
        $bon=(new BonCommande())->where('idboncommande',$this->idboncommande)->get()->first();
        $this->boncommande->datecommande=$bon->datecommande;
        $this->boncommande->etat=$bon->etat;
        $this->boncommande->lignecommandes=(new LigneCommande())->where('idboncommande',$this->idboncommande)->get();
        // echo $this->boncommande;
    }
    public function initFacture(){
        $facture=$this->get()->last();

        $this->idfacture=$facture->idfacture;
        $this->datefacture=$facture->datefacture;
        $this->idboncommande=$facture->idboncommande;
        $this->etat=$facture->etat;
    }
    public function getsociete()
    {

        if ($this->fournisseur == 'FOU6') {
            $proformatfournisseur=((new Proformat_fournisseur_detail())
            ->where('idproformat_fournisseur',$this->boncommande->lignecommandes[0]['idproformat_fournisseur']))->get()->first();
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
        $this->initBonCommande();
        $this->boncommande->genereBonCommande();
        $proformatfournisseur=$this->getFournisseur();
        $this->fournisseur=$proformatfournisseur->idfournisseur;
        $societe=$this->getsociete();
        $titre = 'Facture:';
        $numero = "FCT".$this->getNumberId($this->idfacture).
        $this->getNumberId($proformatfournisseur->idfournisseur).
        $this->getNumberDate($this->datefacture);
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
    $pdf->Cell(30,10,$this->datefacture,0,0,);
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

        $pdf->Write(10,$societe->adresse);
        $pdf->Cell(80);
        $pdf->Cell(40,10,$this->getFournisseur()->adresse,0,0,'C');
        $pdf->ln();

        $pdf->Write(10,'Ref:'.$societe->reference);
        $pdf->Cell(80);
        $pdf->Cell(40,10,$this->getFournisseur()->contact,0,0,'C');



        $pdf->ln();
        $pdf->ln();
        $pdf->ln();


        $pdf->Cell(38,7,'Reference',1,0);
        $pdf->Cell(38,7,'Designation',1,0);
        $pdf->Cell(38,7,'Quantite',1,0);
        $pdf->Cell(38,7,'Prix unitaire',1,0);
        $pdf->Cell(38,7,'Montant',1,0);


        // bouclena
        $pdf->SetFont('Arial','',14);
            foreach ($this->boncommande->lignecommandes as $key => $value) {
                $pdf->ln();
                $pdf->Cell(38,7,$value['refproduit'],1,0);
                $pdf->Cell(38,7,$value['nomproduit'],1,0);
                $pdf->Cell(38,7,$value['quantite'],1,0);
                $pdf->Cell(38,7,$value['pu'],1,0);

                $pdf->Cell(38,7,$value['montant'],1,0);

            }

            $pdf->ln();

            $pdf->Cell(38,7,'Montant',1,0);
            $pdf->Cell(38,7,'',1,0);
            $pdf->Cell(38,7,'',1,0);
            $pdf->Cell(38,7,'',1,0);
            $pdf->Cell(38,7,'HT:'.$this->boncommande->total['HT'],1,2);
            $pdf->Cell(38,7,'TVA:'.$this->boncommande->total['TVA'],1,2);
            $pdf->Cell(38,7,'TTC:'.$this->boncommande->total['TTC'],1,2);


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

    public function addRessource($i,$idressource){
        $ressource=(new Ressource())->where('idressource',$idressource)->get()->first();
        $this->lignereceptions[$i]['refproduit'] = $ressource->code;
        $this->lignereceptions[$i]['nomproduit'] = $ressource->intitule;
    }

    public function getFournisseur()
    {
        $commande=new LigneCommande();
        $commande=$commande->where('idboncommande',$this->idboncommande)->get()->first();
        // echo $this;
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
}
