<?php

namespace App\Http\Controllers;

use App\Models\BonCommande as ModelsBonCommande;
use Illuminate\Http\Request;

class BonCommande extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
    public function store(Request $request)
    {
        //
        $content=$request->getContent();
        $data=json_decode($content,true);
        (new ModelsBonCommande())->insert($data);
        // return json_encode(array("etat"=>true));
    }
    public function getBonCommande_idfournisseur(Request $request){

        $etat=$request->get('data');
        $status=json_decode($etat,true);
        if($status['client']) return (new ModelsBonCommande())->getBonCommande_idfournisseur();
        return (new ModelsBonCommande())->getBonCommande_idclient();
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
}
