<!DOCTYPE html>
<html dir="ltr">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="wrappixel, admin dashboard, html css dashboard, web dashboard, bootstrap 5 admin, bootstrap 5, css3 dashboard, bootstrap 5 dashboard, Matrix lite admin bootstrap 5 dashboard, frontend, responsive bootstrap 5 admin template, Matrix admin lite design, Matrix admin lite dashboard bootstrap 5 dashboard template">
    <meta name="description" content="Matrix Admin Lite Free Version is powerful and clean admin dashboard template, inspired from Bootstrap Framework">
    <meta name="robots" content="noindex,nofollow">
    <title>PsicoTest</title>
    <!-- Favicon icon -->
    <link rel="icon" type="image/png" sizes="16x16" href="<?= base_url();?>assets/images/favicon.png">
    <!-- Custom CSS -->
    <link href="<?= base_url();?>dist/css/style.min.css" rel="stylesheet">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>
    <div class="main-wrapper">
        <!-- ============================================================== -->
        <!-- Preloader - style you can find in spinners.css -->
        <!-- ============================================================== -->
        <div class="preloader">
            <div class="lds-ripple">
                <div class="lds-pos"></div>
                <div class="lds-pos"></div>
            </div>
        </div>
        <!-- ============================================================== -->
        <!-- Preloader - style you can find in spinners.css -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- Login box.scss -->
        <!-- ============================================================== -->
		<div class="auth-wrapper d-flex no-block justify-content-center align-items-center bg-light">
						<span class="db"><img src="<?= base_url();?>assets/images/logo.png" alt="logo" /></span>
		</div>
        <div class="auth-wrapper d-flex no-block justify-content-center align-items-center bg-light">
			<div class="auth-box bg-light border-top border-secondary d-flex">
				<div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
								<img src="<?= base_url();?>assets/images/asistenciapsico.png" alt="imagen" style="max-width: 100%; height: auto;" />
							</div>
						</div>
				</div>
				<!-- Form -->
				<div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
							<h3 class="card-title" style="margin-top: 10px" align="center">Iniciar Sesión</h3>
							<form class="form-signin" method="POST" action="<?php echo base_url() ?>index.php/login">
								<div id="error" style="margin-top: 10px">
									<?php if(isset($error)) { echo $error; }; ?>
								</div>
								<div class="form-row">
									<div class="col-md-12 mb-3">
										<input autocomplete="off" type="text" class="form-control" name="username" placeholder="Usuario" autofocus>
										<div id="error" style="margin-top: 10px">
											<?php echo form_error('username'); ?>   
										</div>
									</div>
									<div class="col-md-12 mb-3">
										<input autocomplete="off" type="password" name="password" class="form-control" placeholder="Contraseña">
										<div id="error" style="margin-top: 10px">
												<?php echo form_error('password'); ?>   
										</div>
									</div>
									<div class="col-md-8">
										<div align="right">
											<button class="btn btn-primary btn-lg" type="submit">Entrar</button>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
        <!-- ============================================================== -->
        <!-- Login box.scss -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- Page wrapper scss in scafholding.scss -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- Page wrapper scss in scafholding.scss -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- Right Sidebar -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- Right Sidebar -->
        <!-- ============================================================== -->
    </div>
    <!-- ============================================================== -->
    <!-- All Required js -->
    <!-- ============================================================== -->
    <script src="<?= base_url();?>assets/libs/jquery/dist/jquery.min.js"></script>
    <!-- Bootstrap tether Core JavaScript -->
    <script src="<?= base_url();?>assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <!-- ============================================================== -->
    <!-- This page plugin js -->
    <!-- ============================================================== -->
    <script>
        $(".preloader").fadeOut();
        // ============================================================== 
        // Login and Recover Password 
        // ============================================================== 
        $('#to-recover').on("click", function() {
            $("#loginform").slideUp();
            $("#recoverform").fadeIn();
        });
        $('#to-login').click(function(){
            $("#recoverform").hide();
            $("#loginform").fadeIn();
        });
    </script>
</body>

</html>
