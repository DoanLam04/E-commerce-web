<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckUserPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Kiểm tra quyền của người dùng ở đây, ví dụ:
        if ($request->user() && $request->user()->isAdmin()) {
            return $next($request); // Cho phép đi tiếp nếu là admin
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
