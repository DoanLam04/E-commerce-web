<?php
// api.php:
use App\Http\Controllers\AddressController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\GitHubServiceController;
use App\Http\Controllers\NewsLetterController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductDealsController;
use App\Http\Controllers\ProductShoppingCartController;
use App\Http\Controllers\StockController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CheckUserPermission;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/dashboard', 'App\Http\Controllers\DashboardController@index');
Route::get('/auth', 'App\Http\Controllers\UserController@getAuthenticatedUser');


Route::post('/register', 'App\Http\Controllers\UserController@register');
Route::post('/login', [UserController::class, 'login']);
Route::get('/user/default-address', [AddressController::class, 'show']);
Route::post('/user/create-user-address', [AddressController::class, 'createUser']);
Route::post('/user/address', [AddressController::class, 'store']);

Route::post('/product/create', [ProductController::class, 'store']);
Route::put('/product/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', 'App\Http\Controllers\ProductController@destroy');
Route::get('/products', 'App\Http\Controllers\ProductController@index');
Route::get('/products/{id}', 'App\Http\Controllers\ProductController@show');


Route::get('/product/hot-deal', [ProductDealsController::class, 'hotDeals']);

//Stock:
Route::get('stocks', [StockController::class, 'index']);
Route::post('stocks', [StockController::class, 'store']);
Route::get('stocks/{stock}', [StockController::class, 'show']);
Route::put('stocks/{stock}', [StockController::class, 'update']);
Route::delete('stocks/{stock}', [StockController::class, 'destroy']);

Route::post('/stripe', 'App\Http\Controllers\ProductOrdersController@stripePost');

Route::post('/product/orders', 'App\Http\Controllers\ProductOrdersController@store');

Route::get('/product/categories', 'App\Http\Controllers\CategoryController@index');
Route::get('/product/categories/{id}/top-selling', 'App\Http\Controllers\CategoryController@topSelling');
Route::get('/product/categories/{id}/new', 'App\Http\Controllers\CategoryController@new');
Route::get('/product/categories/{id}/newpage', 'App\Http\Controllers\CategoryController@newPage');
Route::delete('/product/categories/{id}', [CategoryController::class, 'destroy']);
Route::put('/product/categories/{id}', [CategoryController::class, 'update']);
Route::get('/product/categories/{id}', [CategoryController::class, 'show']);
Route::post('/product/categories/new', [CategoryController::class, 'store']);


Route::get('/product/cart-list/count', [ProductShoppingCartController::class, 'cartCount']);
Route::delete('/product/cart-list/{id}', [ProductShoppingCartController::class, 'destroy']);
Route::post('/product/cart-list/guest',  [ProductShoppingCartController::class, 'guestCart']);

Route::get('/product/cart-list', [ProductShoppingCartController::class, 'index']);
Route::post('/product/cart-list', 'App\Http\Controllers\ProductShoppingCartController@store');
Route::get('/product/wishlist/count', 'App\Http\Controllers\ProductWishlistController@count');
Route::get('/product/wishlist', 'App\Http\Controllers\ProductWishlistController@index');
Route::post('/product/wishlist', 'App\Http\Controllers\ProductWishlistController@store');
Route::delete('/product/wishlist/{id}', 'App\Http\Controllers\ProductWishlistController@destroy');
Route::get('/product/stocks/{id}', [StockController::class, 'show']);
Route::post('/newsletter', [NewsLetterController::class, 'store']);
Route::get('/product/categories', 'App\Http\Controllers\CategoryController@index');

Route::get('/login/github', [GitHubServiceController::class, 'redirectToProvider']);
Route::get('/login/github/callback', [UserController::class, 'githubLogin']);

Route::get('/login/google/url', [UserController::class, 'getGoogleLoginUrl']);
Route::post('/login/google/callback', [UserController::class, 'googleLogin']);
