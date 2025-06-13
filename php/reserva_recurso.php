<!DOCTYPE HTML>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>San Tirso de Abrés - RESERVAS - RESERVA RECURSO</title>
    <meta name="author" content="Ángel Macías"/>
    <meta name ="description" content ="Documento perteneciente a la sección de reservas donde el usuario puede confirmar la reserva de un recurso turístico para ciertas fechas
     y ver su coste." />
    <meta name ="keywords" content ="reserva, anulación, recurso turístico, interés, san tirso de abres, usuario, fecha, presupuesto, confirmación reserva" />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="../estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/reservas.css" />
    <link rel="icon" href="../multimedia/reservas-favicon.ico" type="image/x-icon"/>
    <script src="../js/reservas.js"></script>
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


            $fecha_inicio_recurso = null;
            $fecha_fin_recurso = null;

            // comprobar que el usuario está logueado
            if(!isset($_SESSION["usuario"])){
                echo "<p>Por favor, inicia sesión para ver los recursos turísticos.</p>";
                echo '<p><a href="../reservas.php">Iniciar sesión</a></p>';

                exit;
            }else{
                echo $reservas->paintOptions();
                echo $reservas->mostrarRecurso();
            }


            if($_SERVER['REQUEST_METHOD'] == 'POST') {
                if(isset($_POST['calcular_presupuesto'])){
                    $fecha_inicio = new DateTime($_POST['fecha_inicio']);
                    $fecha_fin = new DateTime($_POST['fecha_fin']);
                    $fecha_actual = new DateTime();
                    $fecha_actual->setTime(0, 0, 0); 

                    $reservas->calcularPresupuestoRecurso($fecha_inicio, $fecha_fin, $_SESSION['fecha_inicio_recurso'], $_SESSION['fecha_fin_recurso'], $fecha_actual);
                }else{
                    $reservas->confirmarReservaRecurso();
                }
            }

    ?>

    </main>

</body>
</html>