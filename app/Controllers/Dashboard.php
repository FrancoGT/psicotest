<?php

namespace App\Controllers;

use App\Models\UsuarioModel;

class Dashboard extends BaseController
{
    public function index(): string
    {
        return view('layout/app', [
            'nombres_apellidos' => model(UsuarioModel::class)->getFullName((int) session()->get('user_id')),
            'seccion'           => 'dashboard',
        ]);
    }
}
