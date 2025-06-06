<!DOCTYPE HTML>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>San Tirso de Abrés - RESERVAS - ANULACIONES USUARIO</title>
    <meta name="author" content="Ángel Macías"/>
    <meta name ="description" content ="Documento perteneciente a la sección de reservas donde el usuario puede consultar sus recursos turísticos cuya reserva ha anulado" />
    <meta name ="keywords" content ="reserva, anulación, recurso turístico, interés, san tirso de abres, usuario" />
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
        
            // comprobar que el usuario está logueado
            if(!isset($_SESSION["usuario"])){
                echo "<p>Por favor, inicia sesión para ver los recursos turísticos.</p>";
                echo '<p><a href="../reservas.php">Iniciar sesión</a></p>';
                exit;
            }else{

                echo paintOptions();

                echo "<h2>Anulaciones</h2>";

                $db = new mysqli("localhost", "DBUSER2025", "DBPWD2025",
                "reservas");
                if ($db->connect_errno) 
                    echo "Error de conexión: " . $db->connect_error;

                $consultaPre = $db->prepare("SELECT rt.id, rt.nombre, rt.descripcion, r.fecha_inicio, r.fecha_fin, r.presupuesto FROM recurso_turistico rt, usuario u, reserva r WHERE u.id = r.id_usuario AND r.id_recurso = rt.id AND u.name = ? AND r.estado = 'anulada'");
                $consultaPre->bind_param("s", $_SESSION["usuario"]); 
                $consultaPre->execute();
                $resultado = $consultaPre->get_result();
                $recursos = $resultado->fetch_all(MYSQLI_ASSOC);

                if(count($recursos) == 0){
                    echo "<p>No tienes recursos turísticos anulados.</p>";
                }else{
                    for($index = 0; $index < count($recursos); $index++){
                    echo "<section>";
                    echo "<h3> Detalles del Recurso Turístico</h3>";
                    echo "<p> Nombre: " . $recursos[$index]["nombre"] . "</p>";
                    echo "<p> Descripción: " . $recursos[$index]["descripcion"] . "</p>";
                    echo "<h3> Detalles de la Reserva</h3>";
                    echo "<p> Fecha de Inicio: " . $recursos[$index]["fecha_inicio"] . "</p>";
                    echo "<p> Fecha de Fin: " . $recursos[$index]["fecha_fin"] . "</p>";
                    echo "<p> Presupuesto: " . $recursos[$index]["presupuesto"] . "€</p>";
                    echo "</section>";
                    }
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
        ?>
    </main>
</body>
</html>