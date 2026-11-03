<?php

namespace App\Controllers;

use App\Models\UsuarioModel;
use CodeIgniter\HTTP\RedirectResponse;
use CodeIgniter\HTTP\ResponseInterface;

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

    /**
     * Autenticación invocada por el formulario Ext JS (Ext.form.Panel::submit).
     *
     * Responde con el formato que espera Ext JS:
     * { success: bool, msg?: string, errors?: { campo: mensaje } }
     */
    public function autenticar(): ResponseInterface
    {
        if (session()->get('user_id') !== null) {
            return $this->respuesta(true);
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
            return $this->respuesta(false, 'Revise los campos marcados.', $this->validator->getErrors());
        }

        $username = (string) $this->request->getPost('username');
        $password = (string) $this->request->getPost('password');

        $usuario = model(UsuarioModel::class)->checkLogin($username, $password);

        if ($usuario === null) {
            return $this->respuesta(false, 'Usuario y/o contraseña incorrectos o el Usuario esta Inactivo!!!!');
        }

        $session = session();
        $session->regenerate();
        $session->set([
            'user_id'           => (int) $usuario->id_user,
            'user_name'         => $usuario->username,
            'nombres_apellidos' => $usuario->nombres_apellidos,
        ]);

        return $this->respuesta(true);
    }

    /**
     * @param array<string, string> $errors
     */
    private function respuesta(bool $success, ?string $msg = null, array $errors = []): ResponseInterface
    {
        $body = ['success' => $success];

        if ($success) {
            $body['redirect'] = site_url('dashboard');
        }
        if ($msg !== null) {
            $body['msg'] = $msg;
        }
        if ($errors !== []) {
            $body['errors'] = $errors;
        }

        return $this->response->setJSON($body);
    }
}
