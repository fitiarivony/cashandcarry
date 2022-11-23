<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Termwind\Components\Dd;

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
        $table=json_decode($content, true);
        // dd($table);
       foreach ($table as $key => $value) {
            $instance->$key=$value;
       }
   //    dd($instance);
      $instance->save();
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
        $parameters=$request->query->all();
        $class="App\Models\\".$nomtable;
        $instance=new $class();
       $tableau=$instance::where("identifiant","=",$parameters['identifiant'],"and","mdp",$parameters['mdp'])->get();
        echo($tableau);
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
