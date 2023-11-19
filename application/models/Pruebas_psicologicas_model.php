<?php

class Pruebas_psicologicas_model extends CI_Model 
{
    // Obtener registros basados en la búsqueda
    public function buscar_pruebas_psicologicas($tipo, $rango_aplicacion, $virtualizado, $nombre) 
    {
        $this->db->where('tipo', $tipo);
        $this->db->or_where('rango_aplicacion', $rango_aplicacion);
        $this->db->or_where('virtualizado', $virtualizado);
        
        $this->db->group_start(); // Iniciar un grupo de condiciones
        $this->db->where('tipo', $nombre);
        $this->db->or_where('rango_aplicacion', $nombre);
        $this->db->or_where('virtualizado', $nombre);
        $this->db->group_end(); // Finalizar el grupo de condiciones

        $query = $this->db->get('pruebas_psicologicas');
        return $query->result();
    }
}
