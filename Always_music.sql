Create database Always_music;

CREATE TABLE estudiantes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    rut VARCHAR(12) NOT NULL,
    curso VARCHAR(100) NOT NULL,
    nivel VARCHAR(50) NOT NULL
);

INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES
('Juan Pérez', '12345678-9', 'Guitarra Eléctrica', 'Medio'),
('María González', '98765432-1', 'Piano', 'Básico'),
('Carlos Ruiz', '23456789-0', 'Violín', 'Avanzado'),
('Ana López', '34567890-2', 'Flauta', 'Medio'),
('Pedro Gómez', '45678901-3', 'Bajo', 'Básico'),
('Lucía Méndez', '56789012-4', 'Batería', 'Avanzado'),
('Roberto Díaz', '67890123-5', 'Saxofón', 'Medio'),
('Carla Mora', '78901234-6', 'Canto', 'Básico'),
('Fernando Vidal', '89012345-7', 'Trompeta', 'Avanzado'),
('Sofía Castro', '90123456-8', 'Guitarra Acústica', 'Medio');
