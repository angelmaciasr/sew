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
        
            // comprobar que el usuario está logueado
            if(!isset($_SESSION["usuario"])){
                echo "<p>Por favor, inicia sesión para ver los recursos turísticos.</p>";
                echo '<p><a href="../reservas.php">Iniciar sesión</a></p>';

                exit;
            }else{

                echo paintOptions();

                echo "<h2>Recursos Turísticos</h2>";

                $db = new mysqli("localhost", "DBUSER2025", "DBPWD2025",
                "reservas");
                if ($db->connect_errno) 
                    echo "Error de conexión: " . $db->connect_error;

                // Consultar si existe ese usuario
                $consultaPre = $db->prepare("SELECT * FROM recurso_turistico"); 
                $consultaPre->execute();
                $resultado = $consultaPre->get_result();
                $recursos = $resultado->fetch_all(MYSQLI_ASSOC);

                for($index = 0; $index < count($recursos); $index++){
                    echo "<section>";
                    echo "<h3>" . $recursos[$index]["nombre"] . "</h3>";
                    echo "<p> Descripción:" . $recursos[$index]["descripcion"] . "</p>";
                    echo "<p> Número de plazas:" . $recursos[$index]["n_plazas"] . "</p>";
                    echo "<p>Precio: " . $recursos[$index]["precio"] . "€</p>";
                    echo "<p> Inicio: " . $recursos[$index]["d_inicio"] . "</p>";
                    echo "<p> Final: " . $recursos[$index]["d_final"] . "</p>";
                    echo "<form method='post'>";
                    echo "<input type='hidden' name='reservar_recurso' value='" . $recursos[$index]["id"] . "'>";
                    echo "<button type='submit'>Reservar</button>"; //onclick='reservas.reservarRecurso( " . $recursos[$index]["id"] . ")'
                    echo "</form>";
                    echo "</section>";
                }

                $consultaPre->close();
                $db->close();

            }

            function paintOptions() {
                $html = '<ul>';

                $html .= '<li><a href="recursos.php">Recursos Turísticos</a></li>';
                $html .= '<li><a href="reservas_usuario.php">Reservas</a></li>';
                $html .= '<li><a href="anulaciones.php">Anulaciones</a></li>';

                $html .= '</ul>';

                return $html;
            }

            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                echo "<p>Has pulsado un botón de reserva.</p>";
                // Detecta cuál botón fue pulsado
                if( isset($_POST['reservar_recurso'])) {
                    $_SESSION['reserva_recurso'] = $_POST['reservar_recurso'];
                    header("Location: reserva_recurso.php");
                } else {
                    echo "<p>No se ha seleccionado ningún recurso para reservar.</p>";
                }
            }

        ?>

    </main>

</body>
</html>