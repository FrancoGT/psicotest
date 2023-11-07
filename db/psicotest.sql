CREATE DATABASE `psicotest`;
USE `psicotest`;

CREATE TABLE `users`
(
  `id_user` INT(150) NOT NULL AUTO_INCREMENT,
  `nombres_apellidos` VARCHAR(150) NOT NULL,
  `username` VARCHAR(150) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  `tipo` TINYINT(1) NOT NULL,
  `estado_usuario` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id_user`)
);
CREATE TABLE IF NOT EXISTS `pruebas_psicologicas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `link_test` varchar(1000) NOT NULL,
  `anio_publicacion` int(11) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `rango_aplicacion` varchar(100) NOT NULL,
  `virtualizado` char(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

INSERT INTO `users` (`id_user`, `nombres_apellidos`, `username`, `password`, `tipo`, `estado_usuario`) VALUES
(1, 'Ramiro Lara', 'ramiro_lara', '21232f297a57a5a743894a0e4a801fc3', 1, 1);
INSERT INTO `pruebas_psicologicas` (`id`, `link_test`, `anio_publicacion`, `tipo`, `rango_aplicacion`, `virtualizado`) VALUES
	(1, 'https://satsuite.collegeboard.org/sat/practice-preparation/practice-tests', 1926, 'Prueba de Rendimiento', '18 - 25', 'Y'),
	(2, 'https://mentalsalud.com/test-depresion-beck/', 1961, 'Prueba de Personalidad y Ajuste', '18 - 25', 'Y'),
	(3, 'https://diposit.ub.edu/dspace/bitstream/2445/127676/1/WISC-V.pdf', 1949, 'Prueba de Aptitud', '18 - 25', 'N'),
	(4, 'https://www.act.org/content/act/en/products-and-services/the-act/registration.html', 1959, 'Prueba de Rendimiento', '10 - 18', 'Y'),
	(5, 'https://efisiopediatric.com/wp-content/uploads/2017/01/Cuestionarios-del-Inventario-de-desarrollo-Batelle.pdf', 2005, 'Prueba de Desarrollo Infantil y Preescolar', '5 - 9', 'N');
