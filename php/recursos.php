<!DOCTYPE HTML>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>San Tirso de Abrés - RESERVAS - RECURSOS TURÍSTICOS</title>
    <meta name="author" content="Ángel Macías"/>
    <meta name ="description" content ="Documento perteneciente a la sección de reservas donde el usuario puede visualizar todos los recursos turísticos disponibles" />
    <meta name ="keywords" content ="recursos, turísticos, San Tirso de Abres, asturias, usuario, actividades, alojamiento, puntos de interés, reserva" />
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
    
        if (!isset($_SESSION["usuario"])) {
            echo "<p>Por favor, inicia sesión para ver los recursos turísticos.</p>";
            echo '<p><a href="../reservas.php">Iniciar sesión</a></p>';
            exit;
        }
        echo $reservas->paintOptions();

        echo $reservas->mostrarRecursos();

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            echo "<p>Has pulsado un botón de reserva.</p>";
            if (isset($_POST['reservar_recurso'])) {
                $_SESSION['reserva_recurso'] = $_POST['reservar_recurso'];
                header("Location: reserva_recurso.php");
                exit;
            } else {
                echo "<p>No se ha seleccionado ningún recurso para reservar.</p>";
            }
        }
    ?>
