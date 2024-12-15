<!-- PHP -->
<?php
    //Clase Carrusel
    class Carrusel{
        
        public function __construct($nCapital, $nPais){
            $this->nCapital = $nCapital;
            $this->nPais = $nPais;
        }


        public function getCarrusel(){
            //construir url
            
            $tag = $this->nCapital .','. $this->nPais. '';
            $perPage = 10;
            // Fotos públicas recientes
            $url = 'http://api.flickr.com/services/feeds/photos_public.gne?';
            // $url.= '&api_key='.$api_key;
            $url.= '&tags='.$tag;
            $url.= '&per_page='.$perPage;
            $url.= '&format=json';
            $url.= '&nojsoncallback=1';

            //obtener datos
            $respuesta = file_get_contents($url);
            $json = json_decode($respuesta);

            if($json==null) {
                echo "<h3>Error en el archivo JSON recibido</h3>";
            }
            else {
                echo "<h2>Carrusel de Imágenes</h2>";
                echo "<article>";
                //mostrar fotos
                for($i=0;$i<$perPage;$i++) {
                    $URLfoto = $json->items[$i]->media->m;       
                    print "<img alt='".$json->items[$i]->title. "' src='".$URLfoto."' />";
                }
                print "<button data-action=" . "next" . "> > </button> <button data-action=" . "prev" . "> < </button></article>";
                echo "</article>";
            }
        }
    }

    $carrusel = new Carrusel('Austin', 'EEUU');


    //Clase Moneda
    class Moneda{

        public function __construct($localCoin, $changeCoin){
            $this->localCoin = $localCoin;
            $this->changeCoin = $changeCoin;
        }

        public function getChange(){       
            //apiKey: ba13552d41cda49e010cb991
            $apikey = 'ba13552d41cda49e010cb991';

            // https://v6.exchangerate-api.com/v6/ba13552d41cda49e010cb991/latest/USD     
            $url = "https://v6.exchangerate-api.com/v6/$apikey/latest/$this->localCoin";

            // Realizar la solicitud con file_get_contents
            $response = file_get_contents($url);
            $json = json_decode($response, true);

            
            if($json['result'] == 'success'){
                echo '1 '. $this->localCoin. ' = ' . $json['conversion_rates'][$this->changeCoin] . ' ' .$this->changeCoin;
            }
        }
    }

    $moneda = new Moneda('USD', 'EUR');
    
    
?>

<!-- HTML -->
<!DOCTYPE HTML>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>F1 DESKTOP - VIAJES</title>
    <meta name="author" content="Ángel Macías"/>
    <meta name ="description" content ="aquí cada documento debe tener la descripción 
    del contenido concreto del mismo" />
    <meta name ="keywords" content ="aquí cada documento debe tener la lista
    de las palabras clave del mismo separadas por comas" />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="estilo/viajes.css" />
    <link rel="stylesheet" type="text/css" href="estilo/carrusel.css" />
    <link rel="icon" href="multimedia/viajes-favicon.ico" type="image/x-icon"/>
    <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU" async="" defer=""></script>
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
            <a href="viajes.php" class="active">Viajes</a>
            <a href="juegos.html">Juegos</a>
        </nav>
    </header>
    <p>
        Estás en <a href="index.html">Inicio</a> >> Viajes
    </p>
    <main>
        <h2>Mapas</h2>
        <button onclick="viajes.getStaticMap()">Cargar mapa estático</button>
        <button onclick="viajes.getDynamicMap()">Cargar mapa dinámico</button>
    </main>

    <h2>Conversor de Moneda</h2>

    <?php
        $moneda->getChange();
    ?> 

    <!-- PHP añadir al documento -->
    <?php
        $carrusel->getCarrusel();
    ?>
    <script src="js/viajes.js">

    
    </script>
</body>
</html>