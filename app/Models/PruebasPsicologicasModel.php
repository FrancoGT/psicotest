<?php

namespace App\Models;

use CodeIgniter\Model;

class PruebasPsicologicasModel extends Model
{
    protected $table         = 'pruebas_psicologicas';
    protected $primaryKey    = 'id';
    protected $returnType    = 'object';
    protected $allowedFields = ['link_test', 'anio_publicacion', 'tipo', 'rango_aplicacion', 'virtualizado'];

    /**
     * Obtener registros basados en la búsqueda.
     *
     * @return list<object>
     */
    public function buscarPruebasPsicologicas(string $tipo, string $rangoAplicacion, string $virtualizado, string $nombre): array
    {
        return $this->where('tipo', $tipo)
            ->orWhere('rango_aplicacion', $rangoAplicacion)
            ->orWhere('virtualizado', $virtualizado)
            ->groupStart() // Iniciar un grupo de condiciones
                ->where('tipo', $nombre)
                ->orWhere('rango_aplicacion', $nombre)
                ->orWhere('virtualizado', $nombre)
            ->groupEnd() // Finalizar el grupo de condiciones
            ->findAll();
    }
}
