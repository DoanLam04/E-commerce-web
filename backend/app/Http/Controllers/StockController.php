<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stocks = Stock::all();
        return response()->json($stocks);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|exists:products,id',
            'size' => 'required|string',
            'color' => 'required|string',
            'quantity' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $stock = Stock::create([
            'product_id' => $request->product_id,
            'size' => $request->size,
            'color' => $request->color,
            'quantity' => $request->quantity,
        ]);

        return response()->json($stock, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Stock $stock)
    {
        return response()->json($stock);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Stock $stock)
    {
        $validator = Validator::make($request->all(), [
            'product_id' => 'exists:products,id',
            'size' => 'string',
            'color' => 'string',
            'quantity' => 'integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $stock->update($request->all());

        return response()->json($stock, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Stock $stock)
    {
        $stock->delete();

        return response()->json(null, 204);
    }
}
