<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */

// Autenticación
$routes->get('/', 'Login::index');
$routes->get('login', 'Login::index');
$routes->post('login', 'Login::autenticar');
$routes->get('logout', 'Logout::index');

// Rutas protegidas (requieren sesión iniciada)
$routes->group('', ['filter' => 'auth'], static function (RouteCollection $routes): void {
    $routes->get('dashboard', 'Dashboard::index');
    $routes->get('prueba_psicologica', 'PruebaPsicologica::index');
    $routes->post('prueba_psicologica/buscar', 'PruebaPsicologica::buscar');
});
