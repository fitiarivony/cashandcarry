<?php

namespace App\Http\Controllers;

use App\Models\ProformatRecu as ModelsProformatRecu;
use Illuminate\Http\Request;

class ProformatRecu extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $recu=new ModelsProformatRecu();
        return $recu->all();
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
        $recu=new ModelsProformatRecu();
        $recu->idfournisseur=$request->idfournisseur;
        $recu->idreferencedemande=$request->idreferencedemande;
        $recu->qualite=$request->qualite;
        $recu->quantite=$request->quantite;
        $recu->delailivraison=$request->delailivraison;
        $recu->lieulivraison=$request->lieulivraison;
        $recu->PU= $request->PU;
        $recu->daty= $request->daty;
        $recu->save();
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
