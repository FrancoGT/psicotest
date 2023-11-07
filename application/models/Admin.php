<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Model
{
	//función de verificación de sesión
    function logged_id()
    {
        return $this->session->userdata('user_id');
    }

	// comprobar la función de inicio de sesión
    function check_login($table, $field1, $field2, $field3)
    {
        $this->db->select('*');
        $this->db->from($table);
        $this->db->where($field1);
        $this->db->where($field2);
        $this->db->where($field3);
        $this->db->limit(1);
        $query = $this->db->get();
        if ($query->num_rows() == 0)
        {
            return FALSE;
        }
        else
        {
            return $query->result();
        }
    }
}
