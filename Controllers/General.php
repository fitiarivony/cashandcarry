<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
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
}
