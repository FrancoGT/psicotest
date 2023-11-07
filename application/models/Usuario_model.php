<?php 
class Usuario_model extends CI_Model
{
	public function sigue_logeado()
	{
		//Verificar si aun tiene la sesion abierta
		$permiso = $this->session->userdata;
		if ($permiso['user_id'] == NULL)
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	public function get_perfil()
	{
		$id_user = $this->get_id_user();
		$query = $this->db->query("SELECT id_user, username, nombres_apellidos FROM users WHERE id_user='$id_user'");
		$responce = array();
		foreach ($query->result() as $row)
        {
			$fila = array(  
                'id_user'=> $row->id_user,  
                'username'=> $row->username, 
                'id_persona'=> $row->id_persona, 
                'nombres'=> $row->nombres,
                'apellidos'=> $row->apellidos,
                'contra'=> ''
            );
            array_push($responce, $fila);
        }
        echo json_encode($responce);
	}
	public function actualizar($data_user, $data_persona)
    {
		$this->db
			->where('id_user', $data_user['id_user'])
			->update('tbl_users', $data_user);
		$this->actualizar_persona($data_persona);
	}
	public function actualizar_persona($data_persona)
	{
		$this->db
		->where('id_persona', $data_persona['id_persona'])
		->update('tbl_persona', array(
			'id_persona' => $data_persona['id_persona'],
			'nombres' => $data_persona['nombres'],
			'apellidos'  => $data_persona['apellidos'],
		));
	}
    public function get_id_user()
    {
       $info_usuario = $this->session->userdata;
       return $info_usuario['user_id'];
    }
    public function get_full_name($id_user)
    {
    	$nombres_apellidos = '';
    	$query = $this->db->query("SELECT nombres_apellidos FROM users WHERE id_user='$id_user'");
    	foreach ($query->result() as $row)
    	{
    		$nombres_apellidos = $row->nombres_apellidos;
    	}
    	return $nombres_apellidos;
    }
}
?>