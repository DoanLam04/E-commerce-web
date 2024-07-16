<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Newsletter\Facades\Newsletter;

class NewsLetterController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'value' => 'required|email',
        ]);

        if (!Newsletter::isSubscribed($request->value)) {
            Newsletter::subscribePending($request->value);
            return response()->json(['message' => 'Thanks for subscribing! Check your email for the next steps!'], 200);
        }
        return response()->json(['message' => 'Sorry, you have already subscribed!'], 400);
    }
}
