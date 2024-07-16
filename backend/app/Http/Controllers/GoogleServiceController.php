<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Google\Client;


class GoogleServiceController extends Controller
{
    //
    private $client;
    public function __construct()
    {
        $this->client = new Client();
        $this->client->setClientId(env('GOOGLE_CLIENT_ID'));
        $this->client->setClientSecret(env('GOOGLE_CLIENT_SECRET'));
        $this->client->setRedirectUri('http://localhost:3000/'); // Thay đổi này
        $this->client->addScope("email");
        $this->client->addScope("profile");
    }

    public function getLoginUrl()
    {
        return $this->client->createAuthUrl();
    }

    public function authenticate($code)
    {
        // Đổi mã code lấy access token
        $token = $this->client->fetchAccessTokenWithAuthCode($code);
        if (isset($token['error'])) {
            throw new \Exception('Error fetching access token: ' . $token['error']);
        }

        // Thiết lập access token cho client
        $this->client->setAccessToken($token['access_token']);

        // Lấy thông tin người dùng từ Google
        $google_oauth = new \Google\Service\Oauth2($this->client);
        return $google_oauth->userinfo->get();
    }
}
