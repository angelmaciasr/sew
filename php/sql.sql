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


-- Insertar usuarios
INSERT INTO usuario (name, password) VALUES 
('admin', 'admin'),
('maria', 'maria123'),
('juan', 'juan456');

-- Insertar recursos turísticos
INSERT INTO recurso_turistico (nombre, n_plazas, d_inicio, d_final, precio, descripcion) VALUES
('Apartamentos Carola', 10, '2025-10-01', '2025-10-10', 100.00, 'Apartamentos Carola ofrece vistas al río, wifi gratis y pista de tenis.'),
('Apartamentos Rio Eo', 20, '2025-10-05', '2025-10-15', 150.00, 'Apartamentos Rio Eo tiene vistas al río, wifi gratis y parking privado gratis.'),
('Camping El Sol', 50, '2025-06-01', '2025-09-30', 40.00, 'Camping familiar cerca del río'),
('Museo de Historia', 100, '2025-01-01', '2025-12-31', 10.00, 'Museo local con exposiciones históricas'),
('Ruta del Vino', 25, '2025-04-01', '2025-10-31', 60.00, 'Ruta guiada por bodegas locales'),
('Restaurante La Cabaña', 30, '2025-01-01', '2025-12-31', 25.00, 'Comida tradicional en entorno rural');

-- Insertar reservas
INSERT INTO reserva (id_usuario, id_recurso, fecha_inicio, fecha_fin, presupuesto, estado) VALUES
(1, 1, '2025-10-01', '2025-10-10', 1000.00, 'confirmada'),
(2, 2, '2025-10-06', '2025-10-10', 600.00, 'anulada'),
(3, 3, '2025-07-10', '2025-07-20', 400.00, 'confirmada'),
(1, 5, '2025-05-05', '2025-05-07', 120.00, 'confirmada');

-- Insertar tipos de recurso
INSERT INTO tipos_recurso (nombre) VALUES 
('Museo'),
('Ruta'),
('Restaurante'),
('Hotel'),
('Camping');

-- Insertar relaciones tipo-recurso
INSERT INTO relacion_tipo_recurso (id_recurso, id_tipo_recurso) VALUES
(1, 4), -- Hotel 1 -> Hotel
(2, 4), -- Hotel 2 -> Hotel
(3, 5), -- Camping -> Camping
(4, 1), -- Museo -> Museo
(5, 2), -- Ruta -> Ruta
(6, 3); -- Restaurante -> Restaurante