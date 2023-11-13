<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Prueba_psicologica extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('usuario_model');
		$this->load->model('pruebas_psicologicas_model', 'prueba_psicologica');
    }
    public function index()
    {
        if ($this->usuario_model->sigue_logeado())
        {
			$id_user = $this->usuario_model->get_id_user();
			$enlace['nombres_apellidos']=$this->usuario_model->get_full_name($id_user);
            //luego cargamos las vistas
            $this->load->view('template/header');
            $this->load->view('template/sidebar', $enlace);
            $this->load->view('prueba_psicologica/index');
            $this->load->view('template/footer');
			$this->load->view('prueba_psicologica/buscador');
        }
        else
        {
            redirect("login/index");
        }
    }
	public function buscar()
	{
		// Obtener el JSON enviado desde la solicitud POST
		$json = file_get_contents('php://input');

		// Decodificar el JSON en un array asociativo
		$data = json_decode($json, true);

		// Ajustar las variables según los datos recibidos
		$nombre = isset($data['nombre']) ? $data['nombre'] : "";
		$tipo = isset($data['tipo']) ? $data['tipo'] : "";
		$rango_aplicacion = isset($data['rango_aplicacion']) ? $data['rango_aplicacion'] : "";
		$virtualizado = isset($data['virtualizado']) ? $data['virtualizado'] : "";

		// Llamar al método del modelo para buscar registros
		$info = $this->prueba_psicologica->buscar_pruebas_psicologicas($tipo, $rango_aplicacion, $virtualizado, $nombre);

		// Devolver los resultados en formato JSON
		echo json_encode($info);
	}


}
