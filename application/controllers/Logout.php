<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Logout extends CI_Controller
{
    public function __CONSTRUCT()
    {
        parent::__construct();
        //Cargamos la librería de validación (todos las librerias, helpers, etc pueden ser cargados en los //controladores o auto cargarlos indicándolo en los ficheros de configuración)
        $this->load->library('form_validation');
        $this->load->helper("url");
        //Cargamos el helper de url imprescindible para usar la función base_url
    }
    public function index()
    {
        $this->load->library('session');
        $this->session->sess_destroy();
        redirect('login');
    }
}