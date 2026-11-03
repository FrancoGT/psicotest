<?php

namespace App\Controllers;

use App\Models\PruebasPsicologicasModel;
use App\Models\UsuarioModel;
use CodeIgniter\HTTP\ResponseInterface;

class PruebaPsicologica extends BaseController
{
    public function index(): string
    {
        $data = [
            'nombres_apellidos' => model(UsuarioModel::class)->getFullName((int) session()->get('user_id')),
        ];

        return view('template/header')
            . view('template/sidebar', $data)
            . view('prueba_psicologica/index')
            . view('template/footer')
            . view('prueba_psicologica/buscador');
    }

    public function buscar(): ResponseInterface
    {
        // Obtener el JSON enviado desde la solicitud POST
        $data = $this->request->getJSON(true) ?? [];

        $nombre          = (string) ($data['nombre'] ?? '');
        $tipo            = (string) ($data['tipo'] ?? '');
        $rangoAplicacion = (string) ($data['rango_aplicacion'] ?? '');
        $virtualizado    = (string) ($data['virtualizado'] ?? '');

        $info = model(PruebasPsicologicasModel::class)
            ->buscarPruebasPsicologicas($tipo, $rangoAplicacion, $virtualizado, $nombre);

        // Devolver los resultados en formato JSON
        return $this->response->setJSON($info);
    }
}
