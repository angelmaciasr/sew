import xml.etree.ElementTree as ET


def prologoSVG(archivo, nombre):
    archivo.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    archivo.write('<svg xmlns="http://www.w3.org/2000/svg" version="2.0">\n')
    archivo.write('<polyline points = "')

def epilogoPolilineaSVG(archivo):
    archivo.write('"\n')
    archivo.write('style="fill:white;stroke:red;stroke-width=4" />\n')

def epilogoSVG(archivo):
    archivo.write("</svg>\n")

def textoSVG(archivo, x, y, texto):
    archivo.write('<text x="' + x + '" y="' + y + '" style="writing-mode: tb; glyph-orientation-vertical: 0;">\n')
    archivo.write(texto + "\n")
    archivo.write('</text>\n')

def main():
    nombreArchivo = input("Introduzca el nombre del archivo xml    = ")

    try:
        archivo = open(nombreArchivo,'r')
    except IOError:
        print ('No se encuentra el archivo ', nombreArchivo)
        exit()

    root = ET.parse(nombreArchivo).getroot()

    rutas = root.findall('.//{http://www.uniovi.es}rutaTuristica')
    for ruta in rutas:
        
        nombreSalida  = input("Introduzca el nombre del archivo generado (*.svg) = ")
        try:
            salida = open(nombreSalida + ".svg",'w')
        except IOError:
            print ('No se puede crear el archivo ', nombreSalida + ".kml")
            exit()

        prologoSVG(salida, nombreArchivo)

        #Polilinea
        comienzoPoligonoX = 100
        coordenadas = ruta.find('.//{http://www.uniovi.es}coordenadasInicio')
        comienzoAltitud = "590"
        salida.write(str(comienzoPoligonoX) + "," + comienzoAltitud + "\n")
        altitudRuta = coordenadas.get("altitud")
        salida.write(str(comienzoPoligonoX) + "," + str(float(comienzoAltitud) - float(altitudRuta)*5) + "\n")

        hitos = ruta.findall('.//{http://www.uniovi.es}hitos/{http://www.uniovi.es}hito')
        incrementoX = comienzoPoligonoX
        for hito in hitos:
            coordenadas = hito.find('.//{http://www.uniovi.es}coordenadasHito')
            altitud = coordenadas.get('altitud')
            distancia = hito.find('.//{http://www.uniovi.es}distancia')
            incrementoX += float(distancia.text)*250 # multiplicar por 500 para identificar la distancia en el SVG
            salida.write(str(incrementoX) + "," + str(float(comienzoAltitud) - float(altitud)*2) + "\n") # multiplicar por 5 para identificar la altitud en el SVG
        salida.write(str(incrementoX) + "," + comienzoAltitud + "\n") # poner el ultimo punto final para que la línea sea recta
        salida.write(str(comienzoPoligonoX) + "," + comienzoAltitud)
        epilogoPolilineaSVG(salida)



        comienzoTexto = "600"
        #Texto polilinea
        textoSVG(salida, str(comienzoPoligonoX), comienzoTexto, ruta.get('direccionInicio'))
        incrementoX = comienzoPoligonoX
        for hito in hitos:
            nombre = hito.get('nombre')
            distancia = hito.find('.//{http://www.uniovi.es}distancia')
            incrementoX += float(distancia.text)*250
            textoSVG(salida, str(incrementoX), comienzoTexto, nombre)
        epilogoSVG(salida)
        salida.close()
    archivo.close()


if __name__ == "__main__":
    main()