<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Codedge\Fpdf\Fpdf\Fpdf;

class BonCommande extends Model
{
    use HasFactory;
    protected $table = 'boncommande';
    public $timestamps = false;
    protected $fillable = ['datecommande','etat'];
    public $incrementing = false;
    public $lignecommandes=array();
    public $total=array();
    public $fournisseur="";

    public function checkProformat($liste)
    {
        $idfournisseur=$liste['boncommande']['idfournisseur'];

       foreach ($liste['lignecommande'] as $key => $value) {
            $proformat=(new Proformat_fournisseur())
            ->where('idproformat_fournisseur',$value['idproformat_fournisseur'])->get()->first();
            if($proformat->idfournisseur != $idfournisseur)return false;
            if(!$this->checkQuantity($proformat,$value))return false;
       }
       return true;
    }

    public function checkQuantity($proformat,$ligne){
    if((int)$proformat->quantite-(int)$ligne['quantite']>=0)return true;
    return false;
    }
    public function insert($data)
    {
        $boncommande=$data['boncommande'];
       if($this->checkProformat($data)){
        if ($boncommande['datecommande']!=null) {
            $this->datecommande=$boncommande['datecommande'];
        }
        $this->save();
        $bon=$this::get()->last();
        foreach ($data['lignecommande'] as $key => $ligne) {
                $ligne['idboncommande']=$bon->idboncommande;
                array_push($this->lignecommandes,$ligne);
            ((new LigneCommande())::create($ligne));
        }
       $this->idboncommande=$bon->idboncommande;
       $this->datecommande=$bon->datecommande;
       $this->etat=$bon->etat;

       }
       $this->initBonCommande();
       $this->genereBonCommande();

       $this->fournisseur=$data['boncommande']['idfournisseur'];

       $this->topdf();

    }

    public function genereBonCommande()
    {
        $i=0;
        $HT=0;
        $TVA=0.2;
        $TTC=0;
        foreach ($this->lignecommandes as $key => $value) {
           $envoye_fournisseur=(new Envoye_fournisseur())
           ->where('idproformat_fournisseur',$value['idproformat_fournisseur'])->get()->first();
           $ressource=(new Ressource())->where('idressource',$envoye_fournisseur->idressource)->get()->first();
            $this->addRessource($i,$ressource);
            $montant=$this->addCalcul($i,$envoye_fournisseur);
            $HT+=$montant;
            $i++;
        }
        $TTC = (1+$TVA)*$HT;
        $this->total['HT']=$HT;
        $this->total['TVA']=$TVA;
        $this->total['TTC']=$TTC;

    }
    public function addRessource($i,$ressource){
        $this->lignecommandes[$i]['refproduit'] = $ressource->code;
        $this->lignecommandes[$i]['nomproduit'] = $ressource->intitule;
    }
    public function addCalcul($i,$envoye_fournisseur){
        $this->lignecommandes[$i]['pu'] = $envoye_fournisseur->pu;
        $this->lignecommandes[$i]['montant'] = $this->lignecommandes[$i]['pu']*$this->lignecommandes[$i]['quantite'];
        return $this->lignecommandes[$i]['montant'];
    }
    public function getsociete()
    {

        if ($this->fournisseur == 'FOU6') {
            $proformatfournisseur=((new Proformat_fournisseur_detail())
            ->where('idproformat_fournisseur',$this->lignecommandes[0]['idproformat_fournisseur']))->get()->first();
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

        $proformatfournisseur=((new Proformat_fournisseur_detail())
        ->where('idproformat_fournisseur',$this->lignecommandes[0]['idproformat_fournisseur']))->get()->first();
        $societe=$this->getsociete();
        $titre = 'Bon de commande';
        $numero = "BDC".$this->getNumberId($this->idboncommande).
        $this->getNumberId($proformatfournisseur->idfournisseur).
        $this->getNumberDate($this->datecommande);
        $entete = $societe->nomsociete;
        $fournisseur = $proformatfournisseur->nomfournisseur;
        $this->getsociete();
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


         $pdf->Cell(162);
    $pdf->Cell(30,10,$this->datecommande,0,0,);
    $pdf->ln();

    $pdf->Cell(100);
    $pdf->Cell(40,10,$titre.' '.$numero,0,0);
        $pdf->ln();
        $pdf->ln();
        $pdf->ln();
        $pdf->ln();

        $pdf->Write(10,$fournisseur);

        $pdf->Cell(100);
        $pdf->Cell(40,10,$entete,0,0,'C');
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
        $pdf->Cell(38,7,'Quantite',1,0);
        $pdf->Cell(38,7,'Prix unitaire',1,0);
        $pdf->Cell(38,7,'Montant',1,0);

        // bouclena
        $pdf->SetFont('Arial','',14);


            foreach ($this->lignecommandes as $key => $value) {
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
            $pdf->Cell(38,7,'HT:'.$this->total['HT'],1,2);
            $pdf->Cell(38,7,'TVA:'.$this->total['TVA'],1,2);
            $pdf->Cell(38,7,'TTC:'.$this->total['TTC'],1,2);


            $pdf->SetY(-100);
            // Police Arial italique 8
            $pdf->SetFont('Arial','I',8);
            $pdf->Cell(0,10,'Cachet et signature',0,0,'C');
            $pdf->Rect(80,210,80,50);

            $pdf->Output();


            //  exit;
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
    public function initBonCommande(){
        $bon=(new BonCommande())->get()->last();
        $this->idboncommande=$bon->idboncommande;
        $this->datecommande=$bon->datecommande;
        $this->etat=$bon->etat;
        $this->lignecommandes=(new LigneCommande())->where('idboncommande',$this->idboncommande)->get();
    }
    public function getBonCommande_idfournisseur(){

        $proformat=(new Envoye_fournisseur())->select('idboncommande')
        ->distinct()
        ->where('idclient','FOU6')
        ->join("lignecommande","lignecommande.idproformat_fournisseur","envoye_fournisseur.idproformat_fournisseur")
        ->get();
        $array=array();
        foreach ($proformat as $key => $value) {
            array_push($array,((new BonCommande())
            ->where('idboncommande',$value->idboncommande)
            ->get()->first()));
        }
        return $array;
    }

    public function getBonCommande_idclient(){

        $proformat=(new Envoye_fournisseur())->select('idboncommande')
        ->distinct()
        ->where('idfournisseur','FOU6')
        ->join("lignecommande","lignecommande.idproformat_fournisseur","envoye_fournisseur.idproformat_fournisseur")
        ->get();
        $array=array();
        foreach ($proformat as $key => $value) {
            array_push($array,((new BonCommande())
            ->where('idboncommande',$value->idboncommande)
            ->get()->first()));
        }
        return $array;
    }

}
