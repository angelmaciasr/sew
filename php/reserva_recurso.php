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
                exit;
            }else{
                $id_recurso = $_SESSION["reserva_recurso"];
                echo paintOptions();

                echo "<h2>Reserva de Recurso Turístico</h2>";

                if($id_recurso == null){
                    echo "<p>No se ha seleccionado ningún recurso turístico para reservar.</p>";
                    exit;
                }else{

                    $db = new mysqli("localhost", "DBUSER2025", "DBPWD2025",
                    "reservas");

                    if ($db->connect_errno) 
                        echo "Error de conexión: " . $db->connect_error;


                    // Consultar si existe ese recurso
                    $consultaPre = $db->prepare("SELECT * FROM recurso_turistico WHERE id = ?");
                    $consultaPre->bind_param("i", $id_recurso);

                    $consultaPre->execute();
                    $resultado = $consultaPre->get_result();
                    if($resultado->num_rows == 0){
                        echo "<p>El recurso turístico seleccionado no existe.</p>";
                    }else{
                        //mostrar los detalles del recurso
                        $recurso = $resultado->fetch_assoc();
                        
                        echo "<h3>" . $recurso["nombre"] . "</h3>";
                        echo "<p> Descripción:" . $recurso["descripcion"] . "</p>";
                        echo "<p> Número de plazas:" . $recurso["n_plazas"] . "</p>";
                        echo "<p>Precio: " . $recurso["precio"] . "€</p>";
                        echo "<p> Inicio: " . $recurso["d_inicio"] . "</p>";
                        echo "<p> Final: " . $recurso["d_final"] . "</p>";
                        

                        //mostrar el selector de fechas
                        echo "<form method='post'>";
                        echo "<label for='fecha'>Fecha de inicio de reserva:</label>";
                        echo "<input type='date' name='fecha_inicio' required>";
                        echo "<label for='fecha'>Fecha de fin de reserva:</label>";
                        echo "<input type='date' name='fecha_fin' required>";
                        echo "<button type='submit' name='calcular_presupuesto'>Calcular Presupuesto</button>";
                        echo "</form>";
                    }

                    $consultaPre->close();
                    $db->close();
                }
            }


            if($_SERVER['REQUEST_METHOD'] == 'POST') {
                if(isset($_POST['calcular_presupuesto'])){
                $fecha_inicio = new DateTime($_POST['fecha_inicio']);
                $fecha_fin = new DateTime($_POST['fecha_fin']);

                    // Validar fechas
                    if ($fecha_inicio >= $fecha_fin) {
                        echo "<p>La fecha de inicio debe ser anterior a la fecha de fin.</p>";
                    } else {
                        // Calcular el número de días entre las fechas
                        $dias = $fecha_fin->diff($fecha_inicio)->days;
                        $precio_total = $recurso["precio"] * $dias;
                        echo "<p>Fecha de inicio: " . $fecha_inicio->format("Y-m-d") . "</p>";
                        echo "<p>Fecha de fin: " . $fecha_fin->format("Y-m-d") . "</p>";
                        echo "<p>El presupuesto total para la reserva es: " . $precio_total . "€</p>";
                        echo "<form method='post'>";
                        echo "<input type='hidden' name='confirmar_reserva' value='" . $id_recurso . "'>";
                        echo "<input type='hidden' name='fecha_inicio' value='" . $fecha_inicio->format("Y-m-d") . "'>";
                        echo "<input type='hidden' name='fecha_fin' value='" . $fecha_fin->format("Y-m-d") . "'>";
                        echo "<button type='submit'>Confirmar Reserva</button>";
                        echo "</form>";
                        $_SESSION["precio_reserva"] = $precio_total;
                        $_SESSION["fecha_inicio_reserva"] = $fecha_inicio->format("Y-m-d");
                        $_SESSION["fecha_fin_reserva"] = $fecha_fin->format("Y-m-d");
                    }
                }else{
                    $db = new mysqli("localhost", "DBUSER2025", "DBPWD2025",
                    "reservas");
                    if ($db->connect_errno) 
                        echo "Error de conexión: " . $db->connect_error;

                    
                    //obtener el id del usuario
                    $consultaPre = $db->prepare("SELECT id FROM usuario WHERE name = ?");
                    $consultaPre->bind_param("s", $_SESSION["usuario"]);
                    $consultaPre->execute();
                    $resultado = $consultaPre->get_result();
                    if($resultado->num_rows == 0){
                        echo "<p>Error al obtener el usuario.</p>";
                        exit;
                    }
                    $fila = $resultado->fetch_assoc();
                    $usuario_id = $fila["id"];
                    $consultaPre->close();

                    // Confirmar reserva
                    $id_recurso = $_SESSION["reserva_recurso"];
                    $consultaPre = $db->prepare("INSERT INTO reserva (id_usuario, id_recurso, fecha_inicio, fecha_fin, presupuesto, estado) VALUES (?, ?, ?, ?, ?, ?)");
                    $fecha_inicio = new DateTime($_SESSION["fecha_inicio_reserva"]);
                    $fecha_inicio = $fecha_inicio->format("Y-m-d");
                    $fecha_fin = new DateTime($_SESSION["fecha_fin_reserva"]);
                    $fecha_fin = $fecha_fin->format("Y-m-d");
                    $estado = "confirmada";
                    $consultaPre->bind_param("iissis", $usuario_id, $id_recurso, $fecha_inicio, $fecha_fin, $_SESSION["precio_reserva"], $estado);
                    if($consultaPre->execute() === TRUE){
                        echo "<p>Reserva confirmada con éxito.</p>";
                        header("Location:  reservas_usuario.php");
                    } else {
                        echo "<p>Error al confirmar la reserva: " . $consultaPre->error . "</p>";
                    }

                    $consultaPre->close();
                    $db->close();
                }
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