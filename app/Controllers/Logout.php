<?php

namespace App\Controllers;

use CodeIgniter\HTTP\RedirectResponse;

class Logout extends BaseController
{
    public function index(): RedirectResponse
    {
        session()->destroy();

        return redirect()->to('login');
    }
}
