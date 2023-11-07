<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Login extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        //cargar la biblioteca de validación de formulario
        $this->load->library('form_validation');
        //cargar Modelo: Admin
        $this->load->model('admin');
    }
    public function index()
    {

            if($this->admin->logged_id())
            {
                //Si la sesión está registrada, redirigir a la página principal.
                redirect("dashboard/index");
            }
            else
            {
                //Si la sesión no ha sido registrada.
                //establecer validación de formulario
                $this->form_validation->set_rules('username', 'Usuario', 'required');
                $this->form_validation->set_rules('password', 'Contraseña', 'required');
                //configurar mensaje de validación de formulario
                $this->form_validation->set_message('required', '<div class="alert alert-danger" style="margin-top: 3px">
                    <div class="header"><b>{field}</b> debe ser ingresado!!!</div></div>');
                //verificación de validación
                if ($this->form_validation->run() == TRUE)
                {
                    //obtener datos del FORM
                    $username = $this->input->post("username", TRUE);
                    $password = MD5($this->input->post('password', TRUE));

                    //revisar data via model
                    $checking = $this->admin->check_login('users', array('username' => $username), array('password' => $password), array('estado_usuario' => '1'));

                    //Si lo encuentra, entonces cree una sesión
                    if ($checking != FALSE)
                    {
                        foreach ($checking as $apps)
                        {
                            $session_data = array(
                                'user_id'   => $apps->id_user,
                                'user_name' => $apps->username,
                                'user_pass' => $apps->password,
                                'nombres_apellidos' => $apps->nombres_apellidos,
                            );
                            //set session userdata
                            $this->session->set_userdata($session_data);
                            redirect('dashboard/index');
                        }
                    }
                    else
                    {
                        $data['error'] = '<div class="alert alert-danger" style="margin-top: 3px">
                            <div class="header"><b>ERROR</b> Usuario y/o contraseña incorrectos o el Usuario esta Inactivo!!!!</div></div>';
                        $this->load->view('login/vista_login', $data);
                    }
                }
            else
            {
                $this->load->view('login/vista_login');
            }
        }
    }
}
