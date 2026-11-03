<?php

namespace App\Controllers;

use App\Models\UsuarioModel;

class Dashboard extends BaseController
{
    public function index(): string
    {
        $data = [
            'nombres_apellidos' => model(UsuarioModel::class)->getFullName((int) session()->get('user_id')),
        ];

        return view('template/header')
            . view('template/sidebar', $data)
            . view('dashboard/index')
            . view('template/footer');
    }
}
