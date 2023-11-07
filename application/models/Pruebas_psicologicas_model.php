<?php

class Pruebas_psicologicas_model extends CI_Model 
{
    // Obtener registros basados en la búsqueda
    public function buscar_pruebas_psicologicas($tipo, $rango_aplicacion, $virtualizado) 
	{
        $this->db->like('tipo', $tipo);
        $this->db->or_like('rango_aplicacion', $rango_aplicacion);
        $this->db->or_like('virtualizado', $virtualizado);
        $query = $this->db->get('pruebas_psicologicas');
        return $query->result();
    }
}
