import xml.etree.ElementTree as ET


def prologoSVG(archivo, nombre):
    archivo.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    archivo.write('<svg xmlns="http://www.w3.org/2000/svg" version="2.0">\n')
    archivo.write('<polyline points = "')

def printPuntos(archivo, puntos):
    for punto in puntos:
        archivo.write(f'{punto[0]},{punto[1]}\n')
    archivo.write('" ')
    archivo.write('style="fill:white;stroke:red;stroke-width=4" />')

def printTexts(archivo, puntos):
    for punto in puntos:
        archivo.write(f'<text x="{punto[0]}" y="{punto[1]}" font-family="Verdana" font-size="20" fill="black">{punto[2]}</text>\n')

def main():
    nombreArchivo = input("Introduzca el nombre del archivo xml    = ")

    try:
        archivo = open(nombreArchivo,'r')
    except IOError:
        print ('No se encuentra el archivo ', nombreArchivo)
        exit()

    root = ET.parse(nombreArchivo).getroot()
    
    namespaces = {"ns": "https_//www.uniovi.es"}
    puntosCircuito = root.findall(".//ns:punto", namespaces)
    
    nombreSalida  = input("Introduzca el nombre del archivo generado (*.svg) = ")
    try:
        salida = open(nombreSalida + ".svg",'w')
    except IOError:
        print ('No se puede crear el archivo ', nombreSalida + ".kml")
        exit()

    prologoSVG(salida, nombreArchivo)

    puntos = []
    for punto in puntosCircuito:
        p = []
        coordenadas = punto.find("ns:coordenadas", namespaces).attrib
        p.append(coordenadas.get('latitud'))
        p.append(coordenadas.get('longitud'))
        tramo = punto.find("ns:tramo", namespaces).text
        p.append(tramo)
        puntos.append(p)
        
    printPuntos(salida, puntos)

    printTexts(salida, puntos)

    salida.write('</svg>')
    
    salida.close()
    archivo.close()
    print("Proceso terminado. Archivo generado: ", nombreSalida + ".kml")


if __name__ == "__main__":
    main()