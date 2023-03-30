<?php

namespace App\Models;
use Codedge\Fpdf\Fpdf\Fpdf;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BonReception extends Model
{
    use HasFactory;
    protected $table = 'bonreception';
    public $timestamps = false;
    public $incrementing = false;
    protected $fillable = ['datereception','idlivraison'];
    public $lignereceptions=array();
    public $total=0;

    public function Dejarecu()
    {
        $bonreception = (new BonReception())->where('idlivraison',$this->idlivraison)->get()->count();
        if($bonreception==0)return false;
        return true;
    }
    public function checkQuantity($data){
        $detail_livraison=(new Detail_livraison())
        ->where('idlivraison',$this->idlivraison)
        ->where('idstock',$data['idressource'])->get()->first();
        if((double)$detail_livraison->quantite_livre==(double)$data['quantite'])return true;
        return false;
    }

    public function insert($data)
    {
        $this->idlivraison=$data['idlivraison'];
        $dejarecu=$this->Dejarecu();
        if(array_key_exists('data',$data)){
            $liste=$data['data'];
            foreach ($liste as $key => $value) {
                if(!$this->checkQuantity($value))return false;
            }
        }
        $lignelivraison=(new Ligne_livraison())->where('idlivraison',$data['idlivraison'])->get();
        if(!$dejarecu) $this->save();
        $bon=(new BonReception())->get()->last();
        $this->datereception=$bon->datereception;
        $lignelivraisons=(new Ligne_livraison())->where('idlivraison',$this->idlivraison)->get();
        $i=0;
        foreach ($lignelivraisons as $key => $lignelivraison) {
            $lignereception=new LigneReception();
            $lignereception->genereLigneReception($lignelivraison,$bon->idbonreception);
            if(!$dejarecu)$lignereception->save();
           array_push($this->lignereceptions,$lignereception);
           $this->addRessource($i,$lignereception->idressource);
           $this->total=$this->total+$lignereception->quantite;
           $i++;
        }
        $this->topdf();
        //  print_r($this->lignereceptions);
    }
    public function getsociete()
    {
        $livr=(new BonLivraisonSociete())
        ->where('idlivraison', $this->idlivraison)->get()->first();

        if ($livr->idfournisseur == 'FOU6') {

            $societe=(new Fournisseurs())
            ->where('idfournisseur',$livr->idclient)->get()->first();
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
        $proformatfournisseur=$this->getFournisseur();
        $societe=$this->getsociete();
        $titre = 'Bon de recepetion:';
        $numero = "BDR".$this->getNumberId($this->idbonreception).
        $this->getNumberId($proformatfournisseur->idfournisseur).
        $this->getNumberDate($this->datereception);
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
    $pdf->Cell(30,10,$this->datereception,0,0,);
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
        $pdf->Cell(38,7,'Total',1,0);

        // bouclena
        $pdf->SetFont('Arial','',14);
            foreach ($this->lignereceptions as $key => $value) {

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

    public function addRessource($i,$idressource){
        $ressource=(new Ressource())->where('idressource',$idressource)->get()->first();
        $this->lignereceptions[$i]['refproduit'] = $ressource->code;
        $this->lignereceptions[$i]['nomproduit'] = $ressource->intitule;
    }

    public function getFournisseur()
    {
        $livraison=new BonLivraison();
        $livraison=$livraison->where('idlivraison',$this->idlivraison)->get()->first();
        $commande=new LigneCommande();
        $commande=$commande->where('idboncommande',$livraison->idboncommande)->get()->first();
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
