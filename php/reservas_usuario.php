<!DOCTYPE HTML>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>San Tirso de Abrés - RESERVAS - RESERVAS USUARIO</title>
    <meta name="author" content="Ángel Macías"/>
    <meta name ="description" content ="Documento perteneciente a la sección de reservas donde el usuario puede consultar sus recursos turísticos reservados." />
    <meta name ="keywords" content ="reserva, recurso turístico, interés, san tirso de abres, usuario" />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="../estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/reservas.css" />
    <link rel="icon" href="../multimedia/reservas-favicon.ico" type="image/x-icon"/>
</head>

<body>
    <!-- Datos con el contenidos que aparece en el navegador -->
    <header>
        <h1><a href="index.html">San Tirso de Abrés</a></h1>
        <nav>
            <a href="../index.html">Index</a>
            <a href="../gastronomia.html">Gastronomía</a>
            <a href="../rutas.html">Rutas</a>
            <a href="../meteorologia.html">Meteorología</a>
            <a href="../juego.html">Juego</a>
            <a href="../reservas.php" class="active">Reservas</a>
            <a href="../ayuda.html">Ayuda</a>
        </nav>
    </header>

    <main>
    <?php
            session_start();

            require_once 'reservas.php';
            $reservas = new Reserva();

            // comprobar que el usuario está logueado
            if(!isset($_SESSION["usuario"])){
                echo "<p>Por favor, inicia sesión para ver los recursos turísticos.</p>";
                echo '<p><a href="../reservas.php">Iniciar sesión</a></p>';

                exit;
            }

            echo $reservas->paintOptions();

            echo $reservas->mostrarPlanificacion();


            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                // Detecta cuál botón fue pulsado
                if( isset($_POST['anular_recurso'])) {
                    $reserva_id = $_POST['anular_recurso'];

                    $reservas->anularRecurso($reserva_id);
                } else {
                    echo "<p>No se ha seleccionado ningún recurso para anular.</p>";
                }
            }

        ?>


    </main>
</body>
</html>