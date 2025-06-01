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


-- Valores usuario
insert into usuario (name, password) values ('admin', 'admin');


-- Valores recurso_turistico
insert into recurso_turistico (nombre, n_plazas, d_inicio, d_final, precio, descripcion) values ('Hotel 1', 10, '2023-10-01', '2023-10-10', 100.00, 'Hotel de lujo');
insert into recurso_turistico (nombre, n_plazas, d_inicio, d_final, precio, descripcion) values ('Hotel 2', 20, '2023-10-05', '2023-10-15', 150.00, 'Hotel económico');


-- Valores reserva
insert into reserva (id_usuario, id_recurso, fecha_inicio, fecha_fin, presupuesto, estado) values (1, 1, '2023-10-01', '2023-10-10', 1000.00, 'confirmada');

-- Valores tipos_recurso
insert into tipos_recurso (nombre) values ('Museo');
insert into tipos_recurso (nombre) values ('Ruta');
insert into tipos_recurso (nombre) values ('Restaurante');
insert into tipos_recurso (nombre) values ('Hotel');
insert into tipos_recurso (nombre) values ('Camping');


-- Valores relacion_tipo_recurso
insert into relacion_tipo_recurso (id_recurso, id_tipo_recurso) values (1, 4);
insert into relacion_tipo_recurso (id_recurso, id_tipo_recurso) values (2, 4);