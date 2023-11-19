<div class="page-wrapper">
            <!-- ============================================================== -->
            <!-- Bread crumb and right sidebar toggle -->
            <!-- ============================================================== -->
            <div class="page-breadcrumb">
                <div class="row">
                    <div class="col-12 d-flex no-block align-items-center">
                        <h4 class="page-title">Buscador de Consultas Psicológicas</h4>
						</div>
                </div>
            </div>
            <!-- ============================================================== -->
            <!-- End Bread crumb and right sidebar toggle -->
            <!-- ============================================================== -->
            <!-- ============================================================== -->
            <!-- Container fluid  -->
            <!-- ============================================================== -->
            <div class="container-fluid">
                <!-- ============================================================== -->
                <!-- Start Page Content -->
                <!-- ============================================================== -->
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Ingrese los datos para realizar la búsqueda</h5>
								<form action="/" method="post" id="buscarForm">

									<div class="row">
										<div class="form-group row">
											<input type="text" class="form-control" id="nombre" name="nombre" 
                                                placeholder="Ingrese un nombre para buscar ...">
										</div>
										<div class="form-group row">
											<label for="tipo_test">Tipo de test</label>
											<select class="select2 form-select shadow-none" name="tipo" id="tipo" required>
												<option value="">Seleccione un tipo de test</option>
												<option value="Prueba de Aptitud">Prueba de Aptitud</option>
												<option value="Prueba de Desarrollo Infantil y Preescolar">Prueba de Desarrollo Infantil y Preescolar</option>
												<option value="Prueba de Personalidad y Ajuste">Prueba de Personalidad y Ajuste</option>
												<option value="Prueba de Rendimiento">Prueba de Rendimiento</option>
											</select>
										</div>
										<div class="form-group row">
											<label for="rango_edad">Rango de aplicación</label>
												<select class="select2 form-select shadow-none" name="rango_aplicacion" id="rango_aplicacion">
												<option value="">Seleccione un rango de edad</option>
												<option value="10 - 18">10 - 18 años</option>
												<option value="18 - 25">18 - 25 años</option>
												<option value="5 - 9">5 - 9 años</option>
											</select>
										</div>
										<div class="form-group row">
											<label for="rango_edad">Test Virtualizado</label>
											<div class="col-md-9">
												<div class="form-check">
													<input type="radio" class="form-check-input" name="virtualizado" value="N"> N
												</div>
											</div>
											<div class="col-md-9">
												<div class="form-check">
													<input type="radio" class="form-check-input" name="virtualizado" value="Y"> Y
												</div>
											</div>
										</div>

									</div>

									<button class="btn btn-primary btn-lg" type="submit">Buscar</button>

								</form>
								<br>
								<div id="tableContainer" style="display: none;">
									<table id="myTable" class="display">
										<thead>
											<tr>
												<th>Link Test</th>
												<th>Año de Publicación</th>
												<th>Tipo</th>
												<th>Rango de Aplicación</th>
												<th>Virtualizado</th>
											</tr>
										</thead>
										<tbody>
										</tbody>
									</table>
								</div>
                            </div>
                        </div>
                    </div>
				</div>
			</div>
