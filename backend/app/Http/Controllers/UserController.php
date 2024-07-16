<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->json()->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'password_confirmation' => 'required|string|same:password',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), Response::HTTP_BAD_REQUEST);
        }

        $user = User::create([
            'name' => $request->json()->get('name'),
            'email' => $request->json()->get('email'),
            'password' => Hash::make($request->json()->get('password')),
            'role_id' => "2", // Set the default role_id here
        ]);

        $token = JWTAuth::fromUser($user);
        return response()->json(compact('user', 'token'), Response::HTTP_CREATED);
    }

    public function login(Request $request)
    {
        $credentials = $request->json()->all();
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], Response::HTTP_BAD_REQUEST);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $user = auth()->user();
        return response()->json(compact('user', 'token'));
    }

    public function getAuthenticatedUser()
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], Response::HTTP_NOT_FOUND);
            }
        } catch (TokenExpiredException $e) {
            return response()->json(['token_expired'], Response::HTTP_UNAUTHORIZED);
        } catch (TokenInvalidException $e) {
            return response()->json(['token_invalid'], Response::HTTP_UNAUTHORIZED);
        } catch (JWTException $e) {
            return response()->json(['token_absent'], Response::HTTP_UNAUTHORIZED);
        }

        return response()->json(compact('user'));
    }

    public function githubLogin(Request $request)
    {
        $githubAuthService = new GitHubServiceController();
        $github_account_info = $githubAuthService->authenticate($request->query('code'));

        $email = $github_account_info->email ?? $github_account_info->login . '@github.com';
        $name = $github_account_info->name ?? $github_account_info->login;

        $user = User::where('email', $email)->first();

        if (!$user) {
            $user = User::create([
                'name' => $name,
                'email' => $email,
                'password' => Hash::make(Str::random(16)),
                'role_id' => "2", // Set the default role_id here
            ]);
        }

        try {
            if (!$token = JWTAuth::fromUser($user)) {
                return response()->json(['error' => 'could_not_create_token'], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
            //nhảy tới login method?
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(compact('user', 'token'));
    }
    public function googleLogin(Request $request)
    {
        $code = $request->get('code');

        $googleAuthService = new GoogleServiceController();
        $googleAccountInfo = $googleAuthService->authenticate($code);

        $email = $googleAccountInfo->email ?? $googleAccountInfo->login . '@google.com';
        $name = $googleAccountInfo->name ?? $googleAccountInfo->login;

        $user = User::where('email', $email)->first();

        if (!$user) {
            $user = User::create([
                'name' => $name,
                'email' => $email,
                'password' => Hash::make(Str::random(16)),
                'role_id' => "2", // Set the default role_id here
            ]);
        }

        try {
            $token = JWTAuth::fromUser($user);
            if (!$token) {
                return response()->json(['error' => 'could_not_create_token'], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(compact('user', 'token'));
    }
    public function getGoogleLoginUrl(Request $request)
    {
        $googleAuthService = new GoogleServiceController();
        $redirectUrl = $googleAuthService->getLoginUrl();

        return response()->json(['url' => $redirectUrl]);
    }
}
