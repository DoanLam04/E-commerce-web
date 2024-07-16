<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Stock;
use Illuminate\Support\Facades\Log;

use App\Http\Requests\StoreProduct;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Product::with("category", "stocks")->paginate(4);
    }
    public function show($id)
    {
        $product = Product::with("category", "stocks")->findOrFail($id);

        // Calculate average review and number of reviews if they exist
        if ($product->reviews()->exists()) {
            $product['review'] = $product->reviews()->avg('rating');
            $product['num_reviews'] = $product->reviews()->count();
        }

        return $product;
    }
    /**
     * Store a newly created resource in storage.
     */

    public function store(StoreProduct $request)
    {

        $user = JWTAuth::parseToken()->authenticate();

        $validator = $request->validated();

        $data = null;
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $name = time() . '_' . $photo->getClientOriginalName();
                $photo->move('img', $name);
                $data[] = $name;
            }
        }

        $product = Product::create([
            'user_id' => $user->id,
            'category_id' => $request->category_id,
            'photo' => json_encode($data),
            'brand' => $request->brand,
            'name' => $request->name,
            'description' => $request->description,
            'details' => $request->details,
            'price' => $request->price,
        ]);

        Stock::create([
            'product_id' => $product->id,
            'size' => $request->size,
            'color' => $request->color,
            'quantity' => $request->quantity,
        ]);

        return response()->json(['message' => 'Product created successfully', 'product' => $product], 201);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)

    {
        if ($user = JWTAuth::parseToken()->authenticate()) {
            // Find the product
            $product = Product::findOrFail($id);

            // Validate input
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'category_id' => 'required|exists:categories,id',
                'brand' => 'required|string|max:255',
                'description' => 'required|string',
                'details' => 'required|string',
                'price' => 'required|numeric',
                'size' => 'required|string',
                'color' => 'required|string',
                'quantity' => 'required|integer|min:1',
            ]);

            // Update product attributes
            $product->update($validatedData);

            // Update associated stock
            $product->stocks()->updateOrCreate(
                ['size' => $validatedData['size'], 'color' => $validatedData['color']],
                ['quantity' => $validatedData['quantity']]
            );
        } else {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        return response()->json(['message' => 'Product updated successfully', 'product' => $product], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        if ($user = JWTAuth::parseToken()->authenticate()) {

            $product = Product::findOrFail($id);

            // Delete associated stocks
            $product->stocks()->delete();

            // Delete product photos from storage
            if ($product->photo != null) {
                foreach (json_decode($product->photo) as $photo) {
                    unlink(public_path() . '\\img\\' . $photo);
                }
            }

            // Delete the product itself
            $product->delete();
        }

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }
}
