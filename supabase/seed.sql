-- ============================================================
-- Redes y Marketting - Datos iniciales de BDWebRyM
-- Ejecutar despues de la migracion. Es idempotente.
-- ============================================================

-- ------------------------------------------------------------
-- Hero / Inicio
-- ------------------------------------------------------------
insert into public.seccion_inicio (
  id,
  etiqueta_superior,
  titulo_principal,
  texto_descripcion,
  texto_boton_principal,
  url_boton_principal,
  texto_boton_secundario,
  url_boton_secundario
) values (
  '11111111-1111-4111-8111-111111111111',
  'MARKETING DIGITAL · DISEÑO · ESTRATEGIA',
  $text$Potenciamos tu
**presencia**
digital con
diseño y __estrategia__$text$,
  'Creamos marcas que conectan, diseñan con intención y crecen con estrategia digital.',
  'QUIERO ESCALAR MI MARCA',
  '#contacto',
  'Ver tu nicho',
  '#nicho'
)
on conflict (id) do update set
  etiqueta_superior = excluded.etiqueta_superior,
  titulo_principal = excluded.titulo_principal,
  texto_descripcion = excluded.texto_descripcion,
  texto_boton_principal = excluded.texto_boton_principal,
  url_boton_principal = excluded.url_boton_principal,
  texto_boton_secundario = excluded.texto_boton_secundario,
  url_boton_secundario = excluded.url_boton_secundario;

-- ------------------------------------------------------------
-- Tarjetas flotantes del Hero
-- ------------------------------------------------------------
insert into public.tarjetas_flotantes_inicio
  (id, nombre_marca, url_imagen, megustas, comentarios, orden)
values
  ('a0000000-0000-4000-8000-000000000001', 'Dulzuras', '/dulzurahero.jpg', '2.4k', '128', 0),
  ('a0000000-0000-4000-8000-000000000002', 'Crunchie Bite', '/crunchiehero.jpg', '1.8k', '96', 1),
  ('a0000000-0000-4000-8000-000000000003', 'Real Estate', '/realtorhero.jpg', '3.1k', '154', 2),
  ('a0000000-0000-4000-8000-000000000004', 'Dojos & Gym', '/dojohero.jpg', '2.9k', '141', 3)
on conflict (id) do update set
  nombre_marca = excluded.nombre_marca,
  url_imagen = excluded.url_imagen,
  megustas = excluded.megustas,
  comentarios = excluded.comentarios,
  orden = excluded.orden;

-- ------------------------------------------------------------
-- Planes de gestion de redes
-- ------------------------------------------------------------
insert into public.planes_redes (
  id, nombre_plan, subtitulo, caracteristicas, nota_destacada,
  url_boton_whatsapp, icono, orden
) values
(
  'b0000000-0000-4000-8000-000000000001',
  'IDENTIDAD VISUAL',
  'La base visual de tu marca, lista para conquistar.',
  $json$["Diseño de logo", "Definición de paleta de colores"]$json$::jsonb,
  'El logo se entrega vectorizado, listo para usar. La paleta de colores se entrega con los códigos en RGB y CMYK para evitar cambios en piezas impresas o diseños digitales.',
  'https://wa.me/584125012969?text=Hola%20Redes%20y%20Marketting%2C%20quiero%20cotizar%20el%20plan%20de%20Identidad%20Visual',
  'paint',
  0
),
(
  'b0000000-0000-4000-8000-000000000002',
  'FIRST STEP',
  'De cero a un perfil optimizado y profesional.',
  $json$["Diseño de plantilla corporativa para las publicaciones", "Diseño de avatar para Instagram", "Paleta de colores y tipografía", "Redacción de biografía en Instagram", "Configuración de cuenta Instagram", "Diseño de 4 highlights o portadas para las historias"]$json$::jsonb,
  'Este plan aplica para marcas que no cuenten con perfiles creados previamente o que lo tengan pero que no esté optimizado o actualizado. Esta inversión se realiza una sola vez.',
  'https://wa.me/584125012969?text=Hola%20Redes%20y%20Marketting%2C%20quiero%20cotizar%20el%20plan%20First%20Step',
  'rocket',
  1
),
(
  'b0000000-0000-4000-8000-000000000003',
  'ASESORÍA PERSONALIZADA',
  'Acompañamiento directo para tu marca personal.',
  $json$["2 horas, el día de su preferencia con previo acuerdo", "Contexto digital para marcas personales en la actualidad", "Mejores prácticas del sector para gestión de Instagram"]$json$::jsonb,
  null,
  'https://wa.me/584125012969?text=Hola%20Redes%20y%20Marketting%2C%20quiero%20cotizar%20la%20Asesor%C3%ADa%20Personalizada',
  'chat',
  2
),
(
  'b0000000-0000-4000-8000-000000000004',
  'PLAN INICIAL',
  '20 publicaciones mensuales con estrategia y diseño.',
  $json$["Diseño de 8 post para feed (una sola imagen conectada con la audiencia: efemérides, tips sobre el ramo, citas de empresarios exitosos, entre otras)", "Diseño de 2 carruseles con fotos de los servicios que ofrecen, tips sobre el ramo, etc.", "Diseño de 2 videos o reels (showing time, contenido de valor, datos de contacto, tips) con elementos corporativos", "Diseño de 8 banners para las historias", "Totalización de 20 publicaciones al mes (3 semanales por 4 semanas en el feed y 2 historias semanales)", "Redacción de copy (texto debajo de la imagen) de las publicaciones", "Atención de comentarios (positivos y negativos) de los seguidores"]$json$::jsonb,
  null,
  'https://wa.me/584125012969?text=Hola%20Redes%20y%20Marketting%2C%20quiero%20cotizar%20el%20Plan%20Inicial',
  'chart',
  3
)
on conflict (id) do update set
  nombre_plan = excluded.nombre_plan,
  subtitulo = excluded.subtitulo,
  caracteristicas = excluded.caracteristicas,
  nota_destacada = excluded.nota_destacada,
  url_boton_whatsapp = excluded.url_boton_whatsapp,
  icono = excluded.icono,
  orden = excluded.orden;

-- ------------------------------------------------------------
-- Servicios Web
-- ------------------------------------------------------------
insert into public.servicios_web (id, icono, titulo, descripcion, orden)
values
(
  'e0000000-0000-4000-8000-000000000001',
  'landing',
  'Landing Pages de Alta Conversión',
  'Diseñadas estratégicamente para captar y atraer a los leads que de verdad se ajustan a tu nicho.',
  0
),
(
  'e0000000-0000-4000-8000-000000000002',
  'web',
  'Páginas Web a Medida',
  'Estéticas y funcionales, creadas para transmitir con precisión la identidad y el propósito de tu marca.',
  1
),
(
  'e0000000-0000-4000-8000-000000000003',
  'panel',
  'Sitios Estáticos y Dinámicos',
  'Totalmente autoadministrables, equipados con un panel de control intuitivo para que tengas el dominio absoluto de tu contenido.',
  2
)
on conflict (id) do update set
  icono = excluded.icono,
  titulo = excluded.titulo,
  descripcion = excluded.descripcion,
  orden = excluded.orden;

-- ------------------------------------------------------------
-- Proyectos Web
-- ------------------------------------------------------------
insert into public.proyectos_web (id, nombre, descripcion, url_sitio, orden)
values
(
  'f0000000-0000-4000-8000-000000000001',
  'DLR Transaction Coordinator',
  'Sitio creado para marca en Naples, Florida dedicada a la Coordinación de Transacciones Inmobiliarias en: SouthWest Florida - Orlando - Miami - Tampa',
  'https://www.dlr-transactioncoordinator.com/',
  0
)
on conflict (id) do update set
  nombre = excluded.nombre,
  descripcion = excluded.descripcion,
  url_sitio = excluded.url_sitio,
  orden = excluded.orden;

-- ------------------------------------------------------------
-- Nichos
-- ------------------------------------------------------------
insert into public.nichos (
  id, slug, titulo_tarjeta, icono, url_imagen_tarjeta,
  etiqueta_categoria, titulo_descripcion, texto_descripcion,
  etiquetas_destacadas, url_imagen_feed_1, url_imagen_feed_2,
  url_imagen_feed_3, color_primario, orden
) values
(
  'c0000000-0000-4000-8000-000000000001',
  'postres',
  'POSTRES',
  'postres',
  '/portadapostres.jpg',
  'SWEET BRANDING',
  'PASTELERÍAS QUE VENDEN CON LOS OJOS',
  'Diseño de marca colorido, fotos de producto irresistibles y feeds que endulzan tu audiencia.',
  $json$["Diseño exclusivo", "Estrategia", "Identidad gráfica"]$json$::jsonb,
  '/dulzurafeed.jpg',
  '/crunchiefeed.jpg',
  '/dulzurafeed1.jpg',
  '#e91e63',
  0
),
(
  'c0000000-0000-4000-8000-000000000002',
  'dojos-gimnasios',
  'DOJOS & GIMNASIOS',
  'dojos',
  '/portadadojos.jpg',
  'FITNESS POWER',
  'ENTRENAMIENTO QUE INSPIRA DISCIPLINA',
  'Volantes de retos, promos de clases y contenido que convierten seguidores en atletas.',
  $json$["Diseño exclusivo", "Estrategia", "Identidad gráfica"]$json$::jsonb,
  '/dojofeed.jpg',
  '/dojofeed1.jpg',
  '/dojofeed2.jpg',
  '#ef4444',
  1
),
(
  'c0000000-0000-4000-8000-000000000003',
  'real-estate',
  'REAL ESTATE',
  'realestate',
  '/portadarealtor.jpg',
  'PREMIUM PROPERTY',
  'PROPIEDADES PREMIUM, PRESENTACIÓN PREMIUM',
  'Volantes elegantes y publicaciones que posicionan tu marca como la asesora de confianza del mercado.',
  $json$["Diseño exclusivo", "Estrategia", "Identidad gráfica"]$json$::jsonb,
  '/realtorfeed.jpg',
  '/realtorfeed1.jpg',
  '/realtorfeed2.jpg',
  '#0ea5e9',
  2
),
(
  'c0000000-0000-4000-8000-000000000004',
  'talleres-automotrices',
  'TALLERES AUTOMOTRICES',
  'talleres',
  '/talleresportada.jpg',
  'AUTO INDUSTRY',
  'MECÁNICA DE PRIMER NIVEL, IMAGEN DE PRIMER NIVEL',
  'Identidad gráfica y contenido que transmiten confianza y calidad en tu taller.',
  $json$["Diseño exclusivo", "Estrategia", "Identidad gráfica"]$json$::jsonb,
  '/tallerfeed.jpg',
  '/tallerfeed1.jpg',
  '/tallerfeed2.jpg',
  '#f59e0b',
  3
),
(
  'c0000000-0000-4000-8000-000000000005',
  'makeup',
  'MAKEUP',
  'makeup',
  '/placeholder-nicho.svg',
  'BEAUTY BRANDING',
  'MARCAS DE BELLEZA QUE BRILLAN CON INTENCIÓN',
  'Maquillaje, skincare y marcas personales con una imagen que enamora desde el primer scroll.',
  $json$["Estética premium", "Contenido visual", "Marca personal"]$json$::jsonb,
  '/placeholder-nicho.svg',
  '/placeholder-nicho.svg',
  '/placeholder-nicho.svg',
  '#d946ef',
  4
)
on conflict (id) do update set
  slug = excluded.slug,
  titulo_tarjeta = excluded.titulo_tarjeta,
  icono = excluded.icono,
  url_imagen_tarjeta = excluded.url_imagen_tarjeta,
  etiqueta_categoria = excluded.etiqueta_categoria,
  titulo_descripcion = excluded.titulo_descripcion,
  texto_descripcion = excluded.texto_descripcion,
  etiquetas_destacadas = excluded.etiquetas_destacadas,
  url_imagen_feed_1 = excluded.url_imagen_feed_1,
  url_imagen_feed_2 = excluded.url_imagen_feed_2,
  url_imagen_feed_3 = excluded.url_imagen_feed_3,
  color_primario = excluded.color_primario,
  orden = excluded.orden;

-- ------------------------------------------------------------
-- Clientes por nicho
-- ------------------------------------------------------------
insert into public.clientes_nicho (
  id, nicho_id, nombre_cliente, descripcion_cliente, url_sitio, estado, orden
) values
(
  'd0000000-0000-4000-8000-000000000001',
  'c0000000-0000-4000-8000-000000000001',
  'Dulzuras by IR',
  'Marca de postres con especialidad en Alfajores',
  'https://www.instagram.com/dulzurasbyir/',
  'PERFIL EN VIVO',
  0
),
(
  'd0000000-0000-4000-8000-000000000002',
  'c0000000-0000-4000-8000-000000000001',
  'Crunchie Bite',
  'Marca de postres con especialidad en Galletas NY',
  'https://www.instagram.com/crunchievzla/',
  'PERFIL EN VIVO',
  1
),
(
  'd0000000-0000-4000-8000-000000000003',
  'c0000000-0000-4000-8000-000000000002',
  'Dojo Ylan Flores',
  'Dojo de Karate',
  'https://www.instagram.com/dojoylanjflores/',
  'PERFIL EN VIVO',
  0
),
(
  'd0000000-0000-4000-8000-000000000004',
  'c0000000-0000-4000-8000-000000000003',
  'Javier Canizares',
  'Agente Inmobiliario Naples, FL',
  'https://www.instagram.com/jcanizaresrealtor/',
  'PERFIL EN VIVO',
  0
),
(
  'd0000000-0000-4000-8000-000000000005',
  'c0000000-0000-4000-8000-000000000003',
  'Dolores Rodríguez',
  'Agente Inmobiliario SouthWest Florida',
  'https://www.instagram.com/doloresrodriguezrealtor/',
  'PERFIL EN VIVO',
  1
),
(
  'd0000000-0000-4000-8000-000000000006',
  'c0000000-0000-4000-8000-000000000004',
  'Radiadores DAYAREY',
  'Taller de Radiadores Automotrices y Plantas Eléctricas',
  'https://www.instagram.com/radiadoresdayarey',
  'PERFIL EN VIVO',
  0
)
on conflict (id) do update set
  nicho_id = excluded.nicho_id,
  nombre_cliente = excluded.nombre_cliente,
  descripcion_cliente = excluded.descripcion_cliente,
  url_sitio = excluded.url_sitio,
  estado = excluded.estado,
  orden = excluded.orden;

-- ------------------------------------------------------------
-- Sobre nosotros
-- ------------------------------------------------------------
insert into public.sobre_nosotros (
  id, url_imagen_pareja, url_isologo_flotante,
  titulo_porque_naranja, texto_porque_naranja,
  titulo_sobre_nosotros, texto_sobre_nosotros,
  descripcion_marux, descripcion_doug,
  texto_enfasis_venezolanos,
  valor_marcas_potenciadas, valor_proyectos_disenados,
  valor_anos_estrategia, firma_texto, firma_subtitulo, slogan
) values (
  '22222222-2222-4222-8222-222222222222',
  '/nosotros.jpg',
  '/logonew.png',
  '¿POR QUÉ SOMOS NARANJA?',
  'Elegimos este color porque representa la **alegría**, la **creatividad** y el **optimismo**. Es la chispa diferencial que queremos aportar a través de nuestro trabajo para cada cliente, seguidor y amigo.',
  'SOBRE NOSOTROS',
  'Detrás de Redes y Marketting estamos María Eugenia (Marux) y Douglas Aponte (Doug), esposos unidos por la fe y los sueños. Dios cruzó nuestros caminos y hoy construimos juntos el proyecto más importante de nuestras vidas: nuestra familia. Esa misma complicidad la llevamos a cada cliente, ayudándoles a destacar con __autenticidad__, sin importar la competencia.',
  'Cristiana, economista, estratega de redes sociales, asesora de marca, madre y conferencista.',
  'Cristiano, ingeniero en sistemas, padre, músico de corazón, diseñador gráfico y curioso incansable.',
  'Orgullosamente venezolanos, creemos en el poder del emprendimiento impulsado siempre por la preparación académica y la cultura, convencidos de que __el conocimiento abre todas las puertas__.',
  '10+',
  '100+',
  '3+',
  'Marux y Doug',
  'Redes y Marketting',
  'Somos Diferentes para Ti'
)
on conflict (id) do update set
  url_imagen_pareja = excluded.url_imagen_pareja,
  url_isologo_flotante = excluded.url_isologo_flotante,
  titulo_porque_naranja = excluded.titulo_porque_naranja,
  texto_porque_naranja = excluded.texto_porque_naranja,
  titulo_sobre_nosotros = excluded.titulo_sobre_nosotros,
  texto_sobre_nosotros = excluded.texto_sobre_nosotros,
  descripcion_marux = excluded.descripcion_marux,
  descripcion_doug = excluded.descripcion_doug,
  texto_enfasis_venezolanos = excluded.texto_enfasis_venezolanos,
  valor_marcas_potenciadas = excluded.valor_marcas_potenciadas,
  valor_proyectos_disenados = excluded.valor_proyectos_disenados,
  valor_anos_estrategia = excluded.valor_anos_estrategia,
  firma_texto = excluded.firma_texto,
  firma_subtitulo = excluded.firma_subtitulo,
  slogan = excluded.slogan;

-- ------------------------------------------------------------
-- Administrador inicial (solo si el usuario ya existe en Auth)
-- ------------------------------------------------------------
insert into public.administradores (usuario_id, correo, activo)
select id, email, true
from auth.users
where email = 'redesymarketting@gmail.com'
on conflict (usuario_id) do update set
  correo = excluded.correo,
  activo = true;
