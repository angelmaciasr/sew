  <!DOCTYPE HTML>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>San Tirso de Abrés - INDEX</title>
    <meta name="author" content="Ángel Macías"/>
    <meta name ="description" content ="aquí cada documento debe tener la descripción 
    del contenido concreto del mismo" />
    <meta name ="keywords" content ="aquí cada documento debe tener la lista
de las palabras clave del mismo separadas por comas" />
<meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="../estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/layout.css" />
    <link rel="icon" href="multimedia/index-favicon.ico" type="image/x-icon"/>
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
                exit;
            }else{

                echo paintOptions();

                echo "<h2>Reservas</h2>";

                $db = new mysqli("localhost", "DBUSER2025", "DBPWD2025",
                "reservas");
                if ($db->connect_errno) 
                    echo "Error de conexión: " . $db->connect_error;

                $consultaPre = $db->prepare("SELECT r.id, rt.nombre, rt.descripcion, r.fecha_inicio, r.fecha_fin, r.presupuesto FROM recurso_turistico rt, usuario u, reserva r WHERE u.id = r.id_usuario AND r.id_recurso = rt.id AND u.name = ? AND r.estado = 'confirmada'");
                $consultaPre->bind_param("s", $_SESSION["usuario"]); 
                $consultaPre->execute();
                $resultado = $consultaPre->get_result();
                $recursos = $resultado->fetch_all(MYSQLI_ASSOC);

                for($index = 0; $index < count($recursos); $index++){
                    echo "<section>";
                    echo "<h3> Detalles del Recurso Turístico</h3>";
                    echo "<p> Nombre: " . $recursos[$index]["nombre"] . "</p>";
                    echo "<p> Descripción: " . $recursos[$index]["descripcion"] . "</p>";
                    echo "<h3> Detalles de la Reserva</h3>";
                    echo "<p> Fecha de Inicio: " . $recursos[$index]["fecha_inicio"] . "</p>";
                    echo "<p> Fecha de Fin: " . $recursos[$index]["fecha_fin"] . "</p>";
                    echo "<p> Presupuesto: " . $recursos[$index]["presupuesto"] . "€</p>";
                    echo "<form method='post'>";
                    echo "<input type='hidden' name='anular_recurso' value='" . $recursos[$index]["id"] . "'>";
                    echo "<button type='submit'>Anular</button>";
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
                // Detecta cuál botón fue pulsado
                if( isset($_POST['anular_recurso'])) {
                    $reserva_id = $_POST['anular_recurso'];
                    
                    $db = new mysqli("localhost", "DBUSER2025", "DBPWD2025",
                "reservas");
                if ($db->connect_errno) 
                    echo "Error de conexión: " . $db->connect_error;

                    $consultaPre = $db->prepare("UPDATE reserva SET estado = 'anulada' WHERE id = ?");
                    $consultaPre->bind_param("i", $reserva_id);

                    if($consultaPre->execute() === TRUE){
                        echo "<p>Reserva anulada con éxito.</p>";
                        header("Location: " . $_SERVER['PHP_SELF']);
                    } else {
                        echo "<p>Error al anular la reserva: " . $consultaPre->error . "</p>";
                    }

                    $consultaPre->close();
                    $db->close();
                } else {
                    echo "<p>No se ha seleccionado ningún recurso para anular.</p>";
                }
            }

        ?>
       
    </main>

</body>
</html>