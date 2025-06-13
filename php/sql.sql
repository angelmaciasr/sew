drop table if exists reserva;
drop table if exists relacion_tipo_recurso;
drop table if exists tipos_recurso;
drop table if exists recurso_turistico;
drop table if exists usuario;


CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(30) NOT NULL
);

CREATE TABLE recurso_turistico(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    n_plazas INT NOT NULL,
    d_inicio DATE NOT NULL,
    d_final DATE NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    descripcion VARCHAR(100) NOT NULL
);

CREATE TABLE reserva(
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_recurso INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    presupuesto DECIMAL(10,2) NOT NULL,
    estado ENUM('confirmada', 'anulada') NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    FOREIGN KEY (id_recurso) REFERENCES recurso_turistico(id)
);

CREATE TABLE tipos_recurso(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL
);

CREATE TABLE relacion_tipo_recurso(
    id_recurso INT NOT NULL,
    id_tipo_recurso INT NOT NULL,
    FOREIGN KEY (id_recurso) REFERENCES recurso_turistico(id),
    FOREIGN KEY (id_tipo_recurso) REFERENCES tipos_recurso(id)
);