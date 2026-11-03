<?php
/**
 * Contenedor principal de la aplicación (Ext JS 7).
 *
 * @var string $nombres_apellidos
 * @var string $seccion  Sección inicial: 'dashboard' | 'pruebas'
 */
?>
<?= view('extjs/head', [
    'titulo' => 'PsicoTest',
    'config' => [
        'usuario' => $nombres_apellidos ?? '',
        'seccion' => $seccion ?? 'dashboard',
    ],
]) ?>
<body class="psico-body">
    <script src="<?= base_url('assets/psicotest/js/app.js') ?>"></script>
</body>
</html>
