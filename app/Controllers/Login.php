<?php

namespace App\Controllers;

use App\Models\UsuarioModel;
use CodeIgniter\HTTP\RedirectResponse;

class Login extends BaseController
{
    public function index(): RedirectResponse|string
    {
        // Si la sesión está registrada, redirigir a la página principal.
        if (session()->get('user_id') !== null) {
            return redirect()->to('dashboard');
        }

        return view('login/vista_login');
    }

    public function autenticar(): RedirectResponse|string
    {
        if (session()->get('user_id') !== null) {
            return redirect()->to('dashboard');
        }

        $rules = [
            'username' => ['label' => 'Usuario', 'rules' => 'required'],
            'password' => ['label' => 'Contraseña', 'rules' => 'required'],
        ];
        $messages = [
            'username' => ['required' => '{field} debe ser ingresado!!!'],
            'password' => ['required' => '{field} debe ser ingresado!!!'],
        ];

        if (! $this->validate($rules, $messages)) {
            return view('login/vista_login', ['validation' => $this->validator]);
        }

        $username = (string) $this->request->getPost('username');
        $password = (string) $this->request->getPost('password');

        $usuario = model(UsuarioModel::class)->checkLogin($username, $password);

        if ($usuario === null) {
            return view('login/vista_login', [
                'error' => 'Usuario y/o contraseña incorrectos o el Usuario esta Inactivo!!!!',
            ]);
        }

        $session = session();
        $session->regenerate();
        $session->set([
            'user_id'           => (int) $usuario->id_user,
            'user_name'         => $usuario->username,
            'nombres_apellidos' => $usuario->nombres_apellidos,
        ]);

        return redirect()->to('dashboard');
    }
}
