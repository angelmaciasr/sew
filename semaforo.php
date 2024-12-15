<!-- PHP -->
<?php
    class Record{

        public $name;
        public $surname;
        public $level;
        public $time;


        public function __construct(){
            $this->server = "localhost";
            $this->user = "DBUSER2023"; // SI NO FUNCIONA PROBAR DBUSER2023
            $this->pass = "DBPSWD2023"; // SI NO FUNCIONA PROBAR DBPSWD2023
            $this->dbname = "records";
        }

        public function saveRecord() {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

            if ($db->connect_errno) {
                $this->mensaje = "Error de conexión: " . $db->connect_error;
            }

            $sql = $db->prepare("INSERT INTO registro (nombre, apellidos, nivel, tiempo) VALUES (?,?,?,?);");
            
            $sql->bind_param('sssi', $this->name, $this->surname, $this->level, $this->time);
            
            $sql->execute();
            
            
            $sql->close();

            $db->close();
        }

        public function getRecords() {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

            if ($db->connect_errno) {
                $this->mensaje = "Error de conexión: " . $db->connect_error;
            }

            $sql = $db->prepare("SELECT * FROM registro ORDER BY tiempo ASC LIMIT 10;");
                        
            $sql->execute();
            
            $result = $sql->get_result();
            

            if($result->num_rows > 0){
                // Iniciar la tabla HTML
                echo "<table border='1'>
                <tr>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Nivel</th>
                    <th>Tiempo (s)</th>
                </tr>";// Mostrar los datos en la tabla
                while ($row = $result->fetch_assoc()) {
                    echo "<tr>
                            <td>" . $row['nombre'] . "</td>
                            <td>" . $row['apellidos'] . "</td>
                            <td>" . $row['nivel'] . "</td>
                            <td>" . ($row['tiempo']/1000) . "</td>
                          </tr>";
                }
            
                // Cerrar la tabla HTML
                echo "</table>";
            } else {
                echo "No se encontraron registros.";
            }
            
            
            $sql->close();

            $db->close();
        }
    }
?>




<!-- HTML -->


<!DOCTYPE HTML>
<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>F1 DESKTOP - SEMÁFORO</title>
    <meta name="author" content="Ángel Macías"/>
    <meta name="description" content="Juego de reacción de semáforo de F1: espera a que las luces se apaguen y presiona el botón para medir 
    tu tiempo de reacción. ¿Puedes mejorar tu tiempo y reaccionar como un piloto de Fórmula 1?"/>
    <meta name="keywords" content="juego de reacción, semáforo F1, tiempo de reacción, luces de F1, botón de reacción, Fórmula 1, juego de reflejos, mejora de reflejos, semáforo, velocidad de reacción"/>
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="estilo/semaforo_grid.css" />
    <link rel="icon" href="multimedia/juegos-favicon.ico" type="image/x-icon"/>
</head>

<body>
    <!-- Datos con el contenidos que aparece en el navegador -->
    <header>
        <h1><a href="index.html">F1 Desktop</a></h1>
        <nav>
            <a href="index.html">Index</a>
            <a href="piloto.html">Piloto</a>
            <a href="noticias.html">Noticias</a>
            <a href="calendario.html">Calendario</a>
            <a href="meterologia.html">Meteorologia</a>
            <a href="circuito.html">Circuito</a>
            <a href="viajes.php">Viajes</a>
            <a href="juegos.html" class="active">Juegos</a>
        </nav>
    </header>
    <p>
        Estás en <a href="index.html">Inicio</a> >> Juegos >> Semáforo
    </p>
    <nav>
        <h2>Lista de Juegos</h2>
        <a href="memoria.html">Memoria</a>
        <a href="semaforo.php" class="active">Semáforo</a>
    </nav>
    <main>
    </main>

    <!-- PHP añadir al documento -->
     <?php
        $record = new Record();

        if (count($_POST) > 0) {
            $record->name = $_POST["name"];
            $record->surname = $_POST["surname"];
            $record->level = $_POST["level"];
            $record->time = intval($_POST["time"]);

            $record->saveRecord();
            $record->getRecords();
        }
    ?>
    
</body>
<script src="js/semaforo.js"></script>
</html>