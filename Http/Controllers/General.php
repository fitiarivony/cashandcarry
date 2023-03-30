<?php

namespace App\Http\Controllers;

use App\Models\Stock_fournisseur;
use App\Stock\Stock;
use App\Stock\Stockfournisseur;
use Illuminate\Http\Request;
use Termwind\Components\Dd;
use Codedge\Fpdf\Fpdf\Fpdf;
class General extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($nomtable)
    {
        //
        $class="App\Models\\".$nomtable;
        $instance=new $class();
        return  $instance->all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request,$nomtable)
    {
        //

        $class="App\Models\\".$nomtable;
        $instance=new $class();
        $content=$request->getContent();
        $table=json_decode($content);
        if (is_array($table)) {
            $liste=json_decode($content, true);
            $this->insertArray($liste,$instance);
        }else{

            $object=json_decode($content, true);
            $this->insertObject($object,$instance);
        }
        return json_encode([
            "etat"=>true,
            "last"=> $instance::get()->last()
        ]);
    }
    public function insertArray($table,$instance){
        for ($i=0; $i < count($table); $i++) {

            $this->insertObject($table[$i],$instance);
        }
    }
    public function insertObject($object,$instance){

        foreach ($object as $key => $value) {

            $instance->$key=$value;
       }
        // $instance;
         $instance::create($object);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //

    }
    public function login(Request $request,$nomtable){
        $parameters=$request->query->all()["data"];
        $parameters=json_decode($parameters);
        $class="App\Models\\".$nomtable;
        $instance=new $class();
        $admins=null;
        foreach ($parameters as $key => $value) {
            if($admins==null)$admins=$instance::where($key,$value);
            else $admins=$admins->where($key,$value);
        }
         $cnt=$admins->count();

        if($cnt==0)
            return json_encode(array("etat"=>false));
        else
        	return json_encode(array("etat"=>true, "data"=>$admins->get()));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }





    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    public function stock(Request $request)
    {
        $content=$request->getContent();
        $liste=json_decode($content,true);
        $pu=0;
        foreach ($liste as $key => $table) {
            if(array_key_exists("pu",$table))$pu=$table['pu'];
           $stock=new Stock($table['idressource'],$table['quantite'],$pu);
           $stock->updateStock();
        }

    }
    public function stock_fournisseur(Request $request)
    {
        $content=$request->getContent();
        $liste=json_decode($content,true);
        $pu=0;
        foreach ($liste as $key => $table) {
            if(array_key_exists("pu",$table))$pu=$table['pu'];
           $stock=new Stockfournisseur($table['idressource'],$table['quantite'],$pu,$table['idfournisseur']);
           $stock->updateStock();
        }

    }


}
