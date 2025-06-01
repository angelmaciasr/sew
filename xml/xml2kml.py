import xml.etree.ElementTree as ET


def prologoKML(archivo, nombre):
    archivo.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    archivo.write('<kml xmlns="http://www.opengis.net/kml/2.2">\n')
    archivo.write('<Document>\n')
    archivo.write('<name>' + nombre + '</name>\n')

    # Estilo de la linea roja
    archivo.write('<Style id="redLine">\n')
    archivo.write('<LineStyle>\n')
    archivo.write('<color>ff0000ff</color>\n')
    archivo.write('<width>4</width>\n')
    archivo.write('</LineStyle>\n')
    archivo.write('</Style>\n')

def pintarPuntoKML(archivo, punto, nombre):
    archivo.write('<Placemark>\n')
    archivo.write(f'<name>{nombre}</name>\n')
    archivo.write('<Point>\n')
    archivo.write(f'<coordinates>{punto[1]},{punto[2]},{punto[3]}</coordinates>\n')
    archivo.write('</Point>\n')
    archivo.write('</Placemark>\n')


def pintarLineaKML(archivo, puntos):
    archivo.write('<Placemark>\n')
    archivo.write('<styleUrl>#redLine</styleUrl>\n')
    archivo.write('<LineString>\n')
    archivo.write('<coordinates>\n')

    for punto in puntos: #long, lat
        archivo.write(f'{punto[1]},{punto[2]},{punto[3]}\n')
    
    # #unir el final con el principio
    # archivo.write(f'{puntos[0][1]},{puntos[0][2]},{puntos[0][3]}\n')
    
    archivo.write('</coordinates>\n')
    archivo.write('</LineString>\n')
    archivo.write('</Placemark>\n')

def epilogoKML(archivo):
    archivo.write("</Document>\n")
    archivo.write("</kml>\n")


def main():
    fileName = input("Introduzca el nombre del archivo xml    = ")

    try:
        entrada = open(fileName,'r')
    except IOError:
        print ('No se encuentra el archivo ', fileName)
        exit()

    root = ET.parse(fileName).getroot()

    rutas = root.findall('.//{http://www.uniovi.es}rutaTuristica')
    
    for ruta in rutas:
        outputFileName  = input("Introduzca el nombre del archivo generado (*.kml) = ")
        try:
            output = open(outputFileName + ".kml",'w')
        except IOError:
            print ('No se puede crear el archivo ', outputFileName + ".kml")
            exit()

        # Escribe la cabecera del archivo de output
        prologoKML(output, fileName)

        i = 1
        puntosParaUnir = [] 

        # Punto de inicio
        inicioRuta = ruta.find('.//{http://www.uniovi.es}coordenadasInicio')

        p = []
        p.append(i)
        p.append(inicioRuta.get('longitud'))
        p.append(inicioRuta.get('latitud'))
        p.append(inicioRuta.get('altitud'))

        nombre = 'Inicio'

        pintarPuntoKML(output, p, nombre)

        puntosParaUnir.append(p)
        i += 1

        for hito in ruta.findall('.//{http://www.uniovi.es}hitos/{http://www.uniovi.es}hito'):
            p = []
            p.append(i)

            coordenadas = hito.find('.//{http://www.uniovi.es}coordenadasHito')
            p.append(coordenadas.get('longitud'))
            p.append(coordenadas.get('latitud'))
            p.append(coordenadas.get('altitud'))

            nombre = hito.get('nombre')

            pintarPuntoKML(output, p, nombre)

            puntosParaUnir.append(p)
            i += 1


        pintarLineaKML(output, puntosParaUnir)
        epilogoKML(output)
        
        output.close()
        entrada.close()

        print("Proceso terminado. Archivo generado: ", outputFileName + ".kml")

    print("TODAS LAS RUTAS PROCESADAS") 

if __name__ == "__main__":
    main()
