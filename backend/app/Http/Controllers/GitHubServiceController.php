<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use GuzzleHttp\Client;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;

class GitHubServiceController extends Controller
{
    private $client;
    private $clientId = 'Ov23li44nmUCXojUFywL';
    private $clientSecret = '19b133a4aade36bb5af8e71cf6a84c4b9ca43021';
    private $redirectUri = 'http://localhost:3000/
';

    public function __construct()
    {
        $this->client = new Client();
    }

    public function redirectToProvider()
    {
        $loginUrl = 'https://github.com/login/oauth/authorize?client_id=' . $this->clientId . '&redirect_uri=' . urlencode($this->redirectUri) . '&scope=user';
        return response()->json(['url' => $loginUrl]);
    }

    public function authenticate($code)
    {
        $response = $this->client->post('https://github.com/login/oauth/access_token', [
            'form_params' => [
                'client_id' => $this->clientId,
                'client_secret' => $this->clientSecret,
                'code' => $code,
                'redirect_uri' => $this->redirectUri
            ],
            'headers' => [
                'Accept' => 'application/json'
            ]
        ]);

        $accessToken = json_decode($response->getBody()->getContents())->access_token;

        $response = $this->client->get('https://api.github.com/user', [
            'headers' => [
                'Authorization' => 'Bearer ' . $accessToken,
                'Accept' => 'application/json'
            ]
        ]);

        return json_decode($response->getBody()->getContents());
    }
}
