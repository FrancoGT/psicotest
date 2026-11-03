<?php
/**
 * Cabecera común para las páginas construidas con Ext JS 7 (tema classic).
 *
 * @var string $titulo
 * @var array  $config Datos que se exponen al cliente en window.PSICOTEST
 */
$config = array_merge([
    'baseUrl' => base_url(),
    'siteUrl' => rtrim(site_url(), '/') . '/',
], $config ?? []);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex,nofollow">
    <title><?= esc($titulo ?? 'PsicoTest') ?></title>
    <link rel="icon" type="image/png" sizes="16x16" href="<?= base_url('assets/images/favicon.png') ?>">

    <!-- Ext JS 7 - tema classic -->
    <link rel="stylesheet" href="<?= base_url('assets/extjs7/classic/theme-classic/resources/theme-classic-all.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/psicotest/css/psicotest.css') ?>">

    <script>
        window.PSICOTEST = <?= json_encode($config, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) ?>;
    </script>
    <script src="<?= base_url('assets/extjs7/ext-all.js') ?>"></script>
    <script src="<?= base_url('assets/extjs7/classic/locale/locale-es.js') ?>"></script>
</head>
