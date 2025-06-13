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

            include_once 'php/reservas.php';

            // Instancia de la clase
            $reservas = new Reserva();

            // Mostrar opciones si el usuario ya ha iniciado sesión
            if (isset($_SESSION["usuario"])) {
                echo $reservas->paintOptionsInit();
            }

            // Manejar peticiones POST
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                if (isset($_POST["registerUser"])) {
                    $reservas->registrarUsuario($_POST["usuario"], $_POST["password"]);
                } else {
                    $reservas->iniciarSesion($_POST["usuario"], $_POST["password"]);
                }
            }
        ?>


    </main>

</body>
</html>