<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Dashboard extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('usuario_model');
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
            $this->load->view('dashboard/index');
            $this->load->view('template/footer');
        }
        else
        {
            redirect("login/index");
        }
    }
}
