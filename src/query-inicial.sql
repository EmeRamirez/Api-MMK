-- Active: 1680180900307@@127.0.0.1@5432@pruebasmmknew@public
INSERT INTO roles (descripcion) VALUES
('master'),
('admin'),
('user');

INSERT INTO estados (descripcion) VALUES
('En Uso'),
('Limpio'),
('Sucio'),
('Fuera de Servicio');

INSERT INTO procesos (descripcion) VALUES
('Entregado'),
('Reservado'),
('Listo'),
('En Proceso'),
('Devuelto');

INSERT INTO cervecerias (nombre_cerveceria,razonsocial,rut_empresa,direccion,comuna,imglogo) VALUES ('Meet My Brewery', 'MMK', '11111-1', 'Testing', 'Testing',null);

INSERT INTO usuarios (nombre_usuario,apellido_usuario,password,email,id_cerveceria, id_rol) VALUES
('Webmaster','MMK','1234','master@mmk.com',1,1),
('Admin','MMK','1234','admin@mmk.com',1,2),
('User','MMK','1234','user@mmk.com',1,3);



