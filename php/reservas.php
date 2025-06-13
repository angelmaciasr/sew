<?php
    class Reserva {

        private $db;


        private function conectarBD() {
            $this->db = new mysqli("localhost", "DBUSER2025", "DBPWD2025", "reservas");
            if ($this->db->connect_errno) {
                echo "Error de conexión: " . $this->db->connect_error;
                exit;
            }
        }

        public function registrarUsuario($usuario, $password) {
            // Consultar si existe ese usuario
            $this->conectarBD();
            $consultaPre = $this->db->prepare("SELECT * FROM usuario WHERE name = ?");
            $consultaPre->bind_param("s", $usuario);
            $consultaPre->execute();
            $resultado = $consultaPre->get_result();

            if ($resultado->num_rows > 0) {
                echo "<p>El usuario " . htmlspecialchars($usuario) . " ya existe.</p>";
                $consultaPre->close();
                $this->db->close();
                return;
            }

            $consultaPre->close();

            // Registrar usuario
            $consultaPre = $this->db->prepare("INSERT INTO usuario(name, password) VALUES (?, ?)");
            $consultaPre->bind_param("ss", $usuario, $password);

            if ($consultaPre->execute()) {
                $_SESSION["usuario"] = $usuario;
                echo $this->paintOptionsInit();
            } else {
                echo "<p>Error al registrar el usuario " . htmlspecialchars($usuario) . ": " . $consultaPre->error . "</p>";
            }

            $consultaPre->close();
            $this->db->close();
        }

        public function iniciarSesion($usuario, $password) {
            $this->conectarBD();
            // Consultar si existe ese usuario
            $consultaPre = $this->db->prepare("SELECT * FROM usuario WHERE name = ?");
            $consultaPre->bind_param("s", $usuario);
            $consultaPre->execute();
            $resultado = $consultaPre->get_result();

            if ($resultado->num_rows > 0) {
                $fila = $resultado->fetch_assoc();
		$contrasena = trim($fila["password"]);
                if ($password === $contrasena) {
                    $_SESSION["usuario"] = $usuario;
                    echo $this->paintOptionsInit();
                } else {
                    echo "<p>Contraseña incorrecta.</p>";
                }
            } else {
                echo "<p>El usuario " . htmlspecialchars($usuario) . " no existe.</p>";
            }

            $consultaPre->close();
            $this->db->close();
        }

        public function obtenerRecursos() {
            $this->conectarBD();
            $consultaPre = $this->db->prepare("SELECT * FROM recurso_turistico"); 
            $consultaPre->execute();
            $resultado = $consultaPre->get_result();
            $recursos = $resultado->fetch_all(MYSQLI_ASSOC);
            
            $consultaPre->close();
            $this->db->close();
            
            return $recursos;
        }

        public function mostrarRecursos() {
            
            $recursos = $this->obtenerRecursos();

            $html = '<h2>Recursos Turísticos</h2>';

            foreach ($recursos as $recurso) {
                $html .= "<section>";
                $html .= "<h3>" . htmlspecialchars($recurso["nombre"]) . "</h3>";
                $html .= "<p>Descripción: " . htmlspecialchars($recurso["descripcion"]) . "</p>";
                $html .= "<p>Número de plazas: " . htmlspecialchars($recurso["n_plazas"]) . "</p>";
                $html .= "<p>Precio: " . htmlspecialchars($recurso["precio"]) . "€</p>";
                $html .= "<p>Inicio: " . htmlspecialchars($recurso["d_inicio"]) . "</p>";
                $html .= "<p>Final: " . htmlspecialchars($recurso["d_final"]) . "</p>";
                $html .= "<form method='post'>";
                $html .= "<input type='hidden' name='reservar_recurso' value='" . htmlspecialchars($recurso["id"]) . "'>";
                $html .= "<button type='submit'>Reservar</button>";
                $html .= "</form>";
                $html .= "</section>";
            }

            return $html;
        }

        public function mostrarPlanificacion(){
            echo "<h2>Planificación y Presupuesto</h2>";

            $this->conectarBD();

            $consultaPre = $this->db->prepare("SELECT r.id, rt.nombre, rt.descripcion, r.fecha_inicio, r.fecha_fin, r.presupuesto FROM recurso_turistico rt, usuario u, reserva r WHERE u.id = r.id_usuario AND r.id_recurso = rt.id AND u.name = ? AND r.estado = 'confirmada'");
            $consultaPre->bind_param("s", $_SESSION["usuario"]);
            $consultaPre->execute();
            $resultado = $consultaPre->get_result();
            $recursos = $resultado->fetch_all(MYSQLI_ASSOC);

            if(count($recursos) == 0){
                echo "<p>No tienes recursos turísticos añadidos a la planificación.</p>";
            }else{
                $totalPresupuesto = array_sum(array_column($recursos, 'presupuesto'));
                echo "<section><h3>PRESUPUESTO TOTAL</h3>";
                echo "<p>El presupuesto total de los recursos turísticos reservados es de " . $totalPresupuesto . "€.</p>";
                echo "</section>";



                echo "<section><h3>DESGLOSE RECURSOS TURÍSTICOS AÑADIDOS</h3>";
                echo "<p>A continuación se muestran los recursos turísticos que se han añadido a la planificación:</p>";
                for($index = 0; $index < count($recursos); $index++){
                    echo "<section>";
                    echo "<h4> Detalles del Recurso Turístico</h4>";
                    echo "<p> Nombre: " . $recursos[$index]["nombre"] . "</p>";
                    echo "<p> Descripción: " . $recursos[$index]["descripcion"] . "</p>";
                    echo "<h4> Detalles de la Reserva</h4>";
                    echo "<p> Fecha de Inicio: " . $recursos[$index]["fecha_inicio"] . "</p>";
                    echo "<p> Fecha de Fin: " . $recursos[$index]["fecha_fin"] . "</p>";
                    echo "<p> Coste: " . $recursos[$index]["presupuesto"] . "€</p>";
                    echo "<form method='post'>";
                    echo "<input type='hidden' name='anular_recurso' value='" . $recursos[$index]["id"] . "'>";
                    echo "<button type='submit'>Anular</button>";
                    echo "</form>";
                    echo "</section>";
                }
            }

            $consultaPre->close();
            $this->db->close();
        }


        public function anularRecurso($reserva_id){
            $this->conectarBD();

                $consultaPre = $this->db->prepare("UPDATE reserva SET estado = 'anulada' WHERE id = ?");
                $consultaPre->bind_param("i", $reserva_id);

                if($consultaPre->execute() === TRUE){
                    echo "<p>Reserva anulada con éxito.</p>";
                    header("Location: " . $_SERVER['PHP_SELF']);
                } else {
                    echo "<p>Error al anular la reserva: " . $consultaPre->error . "</p>";
                }

                $consultaPre->close();
                $this->db->close();
        }


        public function calcularPresupuestoRecurso($fecha_inicio, $fecha_fin, $fecha_inicio_recurso, $fecha_fin_recurso, $fecha_actual){
            // Validar fechas
            if ($fecha_inicio > $fecha_fin) {
                echo "<p>La fecha de inicio debe ser anterior a la fecha de fin.</p>";
            }
            else if($fecha_inicio < $fecha_inicio_recurso || $fecha_fin > $fecha_fin_recurso){
                echo "<p>Las fechas seleccionadas no están dentro del rango de disponibilidad del recurso turístico.</p>";
            }else if($fecha_inicio < $fecha_actual || $fecha_fin < $fecha_actual){
                echo "<p>Ninguna de las fechas seleccionadas no pueden ser anteriores a la fecha actual.</p>";
            }
            else {
                // Calcular el número de días entre las fechas
                $dias = $fecha_fin->diff($fecha_inicio)->days;
                if($dias <= 0){
                    $dias = 1; // Por si empieza y termina el mismo día
                }
                $precio_total = $_SESSION["recurso"]["precio"] * $dias;
                echo "<section>";
                echo "<h3>Detalles Finales Reserva</h3>";
                echo "<p>Fecha de inicio: " . $fecha_inicio->format("Y-m-d") . "</p>";
                echo "<p>Fecha de fin: " . $fecha_fin->format("Y-m-d") . "</p>";
                echo "<h3>Coste</h3>";
                echo "<p>El coste total para la reserva es: " . $precio_total . "€</p>";

                echo "<form method='post'>";
                echo "<button type='submit'>Añadir al Presupuesto</button>";
                echo "</form>";
                echo "</section>";

                $_SESSION["precio_reserva"] = $precio_total;
                $_SESSION["fecha_inicio_reserva"] = $fecha_inicio->format("Y-m-d");
                $_SESSION["fecha_fin_reserva"] = $fecha_fin->format("Y-m-d");
            }
        }

        public function confirmarReservaRecurso(){
            $this->conectarBD();

            
            //obtener el id del usuario
            $consultaPre = $this->db->prepare("SELECT id FROM usuario WHERE name = ?");
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
            $consultaPre = $this->db->prepare("INSERT INTO reserva (id_usuario, id_recurso, fecha_inicio, fecha_fin, presupuesto, estado) VALUES (?, ?, ?, ?, ?, ?)");
            $fecha_inicio = new DateTime($_SESSION["fecha_inicio_reserva"]);
            $fecha_inicio = $fecha_inicio->format("Y-m-d");
            $fecha_fin = new DateTime($_SESSION["fecha_fin_reserva"]);
            $fecha_fin = $fecha_fin->format("Y-m-d");
            $estado = "confirmada";
            $consultaPre->bind_param("iissis", $usuario_id, $id_recurso, $fecha_inicio, $fecha_fin, $_SESSION["precio_reserva"], $estado);
            if($consultaPre->execute() === TRUE){
                echo "<p>Reserva confirmada con éxito.</p>";
                header("Location:  recursos.php");
            } else {
                echo "<p>Error al confirmar la reserva: " . $consultaPre->error . "</p>";
            }

            $consultaPre->close();
            $this->db->close();
        }

        public function mostrarRecurso(){
            echo "<h2>Reserva de Recurso Turístico</h2>";
            $id_recurso = $_SESSION["reserva_recurso"];
            if($id_recurso == null){
                echo "<p>No se ha seleccionado ningún recurso turístico para reservar.</p>";
                exit;
            }else{

                $this->conectarBD();

                // Consultar si existe ese recurso
                $consultaPre = $this->db->prepare("SELECT * FROM recurso_turistico WHERE id = ?");
                $consultaPre->bind_param("i", $id_recurso);

                $consultaPre->execute();
                $resultado = $consultaPre->get_result();
                if($resultado->num_rows == 0){
                    echo "<p>El recurso turístico seleccionado no existe.</p>";
                }else{
                    //mostrar los detalles del recurso
                    $recurso = $resultado->fetch_assoc();
                    $_SESSION['recurso'] = $recurso;
                    
                    echo "<section>";
                    echo "<h3>" . $recurso["nombre"] . "</h3>";
                    echo "<p> Descripción: " . $recurso["descripcion"] . "</p>";
                    echo "<p> Número de plazas: " . $recurso["n_plazas"] . "</p>";
                    echo "<p> Precio: " . $recurso["precio"] . "€</p>";
                    echo "<h4> Fechas de Disponibilidad</h4>";
                    echo "<p> Inicio Disponibilidad: " . $recurso["d_inicio"] . "</p>";
                    echo "<p> Final Disponibilidad: " . $recurso["d_final"] . "</p>";

                    $_SESSION['fecha_inicio_recurso'] = new DateTime($recurso["d_inicio"]);
                    $_SESSION['fecha_fin_recurso'] = new DateTime($recurso["d_final"]);

                    //mostrar el selector de fechas
                    echo "<form method='post'>";
                    echo "<label for='fecha_inicio'>Fecha de inicio de reserva:</label>";
                    echo "<input type='date' id='fecha_inicio' name='fecha_inicio' required>";
                    echo "<label for='fecha_fin'>Fecha de fin de reserva:</label>";
                    echo "<input type='date' id='fecha_fin' name='fecha_fin' required>";
                    echo "<button type='submit' name='calcular_presupuesto'>Calcular Coste</button>";
                    echo "</form>";
                    echo "</section>";
                }

                $consultaPre->close();
                $this->db->close();
            }
        }


        public function paintOptions() {
            if (!isset($_SESSION["usuario"])) return '';

            $html = '<ul>';
            $html .= '<li><a href="recursos.php">Lista de Recursos Turísticos</a></li>';
            $html .= '<li><a href="reservas_usuario.php">Planificación</a></li>';
	        $html .= '<li><a href="cerrar_sesion.php">Cerrar sesión</a></li>';
            $html .= '</ul>';

            return $html;
        }

        public function paintOptionsInit() {
            if (!isset($_SESSION["usuario"])) return '';

            $html = '<script> reservas.removeForm(); </script>';
            $html .= '<ul>';
            $html .= '<li><a href="php/recursos.php">Lista de Recursos Turísticos</a></li>';
            $html .= '<li><a href="php/reservas_usuario.php">Planificación</a></li>';
            $html .= '<li><a href="php/cerrar_sesion.php">Cerrar sesión</a></li>';
            $html .= '</ul>';

            return $html;
        }
    }
?>
