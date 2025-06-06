<!DOCTYPE HTML>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>San Tirso de Abrés - RESERVAS</title>
    <meta name="author" content="Ángel Macías"/>
    <meta name ="description" content ="Documento principal de la sección de reservas de recursos turísticos de San Tirso de Abres. Aquí el usuario podrá registrarse, iniciar sesión
     y acceder a las distintas funcionalidades" />
    <meta name ="keywords" content ="reservas, San Tirso de Abres, asturias, turismo, recursos, usuario, registro, inicio de sesión" />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="estilo/reservas.css" />
    <link rel="icon" href="multimedia/reservas-favicon.ico" type="image/x-icon"/>
    <script src="js/reservas.js"></script>
</head>

<body>
    <!-- Datos con el contenidos que aparece en el navegador -->
    <header>
        <h1><a href="index.html">San Tirso de Abrés</a></h1>
        <nav>
            <a href="index.html">Index</a>
            <a href="gastronomia.html">Gastronomía</a>
            <a href="rutas.html">Rutas</a>
            <a href="meteorologia.html">Meteorología</a>
            <a href="juego.html">Juego</a>
            <a href="reservas.php" class="active">Reservas</a>
            <a href="ayuda.html">Ayuda</a>
        </nav>
    </header>

    <main>
        <h2>Reservas</h2>
        <button type="button" onclick="reservas.loginUserForm();">Iniciar Sesión</button> 
        <button type="button" onclick="reservas.registerUserForm();">Registrarse</button>

        <script>
            reservas.paintForm();
        </script>
    

        <?php
                session_start();

                if(isset($_SESSION["usuario"])){
                    paintOptions();
                }
                
                function registrarUsuario($usuario, $password){
                    
                    // conexión base de datos
                    $db = new mysqli("localhost", "DBUSER2025", "DBPWD2025",
                    "reservas");
                    if ($db->connect_errno) 
                        echo "Error de conexión: " . $db->connect_error;

                    // Consultar si existe ese usuario
                    $consultaPre = $db->prepare("SELECT * FROM usuario WHERE name = ?");
                    $consultaPre->bind_param("s", $usuario);
                    $consultaPre->execute();
                    $resultado = $consultaPre->get_result();
                    if($resultado->num_rows > 0){
                        echo "<p>El usuario " . $usuario . " ya existe.</p>";
                        $consultaPre->close();
                        $db->close();
                        exit;
                    }


                    // Registrar usuario
                    $consultaPre = $db->prepare("INSERT INTO usuario(name, password) values (?, ?)");
                    $consultaPre->bind_param("ss", $usuario, $password);
                    if($consultaPre->execute() === TRUE){
                        $_SESSION["usuario"] = $usuario;
                        echo paintOptions();
                    }
                    else
                        echo "<p>Error al registrar el usuario " . $usuario . ": " . $consultaPre->error . "</p>";
            
                    $consultaPre->close();
                    $db->close();
                
                }


                function iniciarSesion($usuario, $password){
                    // conexión base de datos
                    $db = new mysqli("localhost", "DBUSER2025", "DBPWD2025",
                    "reservas");
                    if ($db->connect_errno) 
                        echo "Error de conexión: " . $db->connect_error;
                
                    // Consultar si existe ese usuario
                    $consultaPre = $db->prepare("SELECT * FROM usuario WHERE name = ?");
                    $consultaPre->bind_param("s", $usuario); // Use the function parameter instead of $_POST
                    $consultaPre->execute();
                    $resultado = $consultaPre->get_result();
                    if($resultado->num_rows > 0){
                        if($fila = $resultado->fetch_assoc()){
                            if($password === $fila["password"]){
                                $_SESSION["usuario"] = $usuario;
                                echo paintOptions();
                            }else{
                                echo "<p>Contraseña incorrecta.</p>";
                            }
                        }
                    }else{
                        echo "<p>El usuario " . $usuario . " no existe.</p>";
                    }
                    $consultaPre->close();
                    $db->close();
                }


                function paintOptions() {
                    $html = '<script> reservas.removeForm(); </script> ';

                    $html .= '<ul>';

                    $html .= '<li><a href="php/recursos.php">Recursos Turísticos</a></li>';
                    $html .= '<li><a href="php/reservas_usuario.php">Reservas</a></li>';
                    $html .= '<li><a href="php/anulaciones.php">Anulaciones</a></li>';

                    $html .= '</ul>';

                    return $html;
                }
            
                if($_SERVER["REQUEST_METHOD"] == "POST"){
                    if(isset($_POST["registerUser"])){
                        // Registrar usuario
                        registrarUsuario($_POST["usuario"], $_POST["password"]);
                    }else{
                        iniciarSesion($_POST["usuario"], $_POST["password"]);
                    }
                }

        ?>

    </main>

</body>
</html>