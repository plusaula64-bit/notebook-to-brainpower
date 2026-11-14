# AulaPlus
- [x] Student notebooks, individual pet progress, study tools, activities calendar.
- [x] Teacher student feedback, group creation, timer, noise meter, random selection, announcements.
- [x] Role onboarding, original mascot, adaptive layouts.
- [x] Optional Cloud progress saving and educational AI chat; verified a real tutor response.
- [x] Verify scoring rules and public interactive flows on desktop and mobile.
- [x] Replace connected saving and AI with local in-memory demo data.
- [x] Add five distinct pet species and notebook pet selection.
- [x] Add light, black/neon, school blue and custom-image backgrounds.
- [x] Add independent classrooms and teacher roster management; verify interactions.- [ ] Login local (correo + nombre) con animación, luego selector de rol; nombre reemplaza "Alex"; inicio limpio sin cuadernos/alumnos
- [x] Menú de perfil (Cuenta, Configuración, Editar Perfil) con cambio de nombre e idioma (10 idiomas)
- [x] Centro de ayuda con FAQs interactivas y guías
- [x] Calendario: fechas más legibles; paleta de colores ampliada
- [x] Tutor híbrido: base local amplia, lectura de archivos, mapas mentales, cuestionarios, tablas
- [x] Correcciones UI: paleta de colores del modal sin desborde, pestañas con scroll horizontal, espaciado móvil
- [x] PWA offline-first: service worker, manifest instalable, caché de interfaz + datos locales
- [x] Fecha real del navegador en calendario y panel principal
- [x] Logotipo oficial subido por la usuaria (libro y lápiz turquesa) en PWA, manifest y favicon
- [x] Sistema de Mascotas de Racha: nube animada en dashboard, catálogo de 8 mascotas, armario (30 accesorios + 10 pieles), monedas de estudio, calificación automática + autoevaluación Fácil/Regular/Difícil
- [x] Nubi (nube púrpura de la usuaria) como mascota principal en toda la app; mascotas 3D antiguas eliminadas
- [x] Desbloqueo por puntos: Nubi/Círculo/Cuadrado/Triángulo libres; Estrella/Hexágono/Rombo/Corazón a 50/60/70/80 pts
- [x] Español 100% en toda la interfaz (menús, botones, errores)
- [x] Mascotas de cuerpo completo (manos y pies flotantes) en tarjetas de cuaderno y panel lateral
- [x] Persistencia localStorage verificada (cuaderno sobrevive recarga) y FAQ actualizada
- [x] Tutor IA real (Lovable AI Gateway): system prompt experto, contexto del cuaderno activo, respuestas Markdown en streaming
- [x] Limpieza de texto importado: decodificar entidades HTML (&#8211; etc.), quitar basura de navegación (Share/Compartir/menús), que tutor y resúmenes lean contenido limpio
- [ ] i18n global real: toda la interfaz (menús, tarjetas, modales, botones) cambia al idioma elegido
- [ ] Importación masiva de estudiantes (Excel/CSV/Word/TXT) en gestión de equipos del profesor
- [ ] Publicar todo en aulaplus-app.lovable.app (aula-pal-buddy y aulaplus ocupados; usuaria eligió aulaplus-app)

## Migración a este proyecto (nov 2026)
- [x] Traer todo el código de AulaPlus desde GitHub sin quitar diseños ni funciones
- [x] Guardado local prioritario en IndexedDB (cuadernos, mascotas, chats) con migración automática
- [x] Modo offline real: arreglado el service worker (la página de inicio se guarda para abrir sin señal)
- [x] Pestañas del cuaderno: Chat, Fuentes, Resúmenes, Flashcards, Mapa mental, Apuntes, Autoevaluación, Tareas, Estudio+
- [x] Copia en la nube con Gmail: Guardar/Sincronizar y Descargar en otro dispositivo
- [ ] Probar el inicio de sesión con Google y la sincronización con una cuenta real (necesita a la usuaria)
- [x] Botón de papelera en cada tarjeta de "Mis cuadernos" con confirmación (borra también el chat del cuaderno)
- [x] Mapa mental, Resúmenes y Apuntes asistidos generados por IA con esquemas estructurados (respaldo local sin conexión)
- [x] Flashcards generadas por IA: mazo variado (concepto, causa, proceso, comparación, aplicación, completar, verdadero/falso) con pistas; mazo local mixto sin conexión

## Importación a este proyecto y mejoras finales (nov 2026)
- [x] Traer AulaPlus desde GitHub a este proyecto con Lovable Cloud (IA, copia en la nube con Google)
- [x] Mapa mental convertido en esquema de llaves jerárquico de 4 niveles generado por IA
- [x] Flashcards por IA con fuentes del cuaderno y «Nuevo mazo» que evita repetir preguntas
- [x] Papelera visible en cada tarjeta de «Mis cuadernos», borra al instante con «Deshacer»
- [x] Apuntes y Resúmenes adaptados al área de estudio (ciencias, historia, lengua…) e incluyen las fuentes
- [ ] Probar el inicio de sesión con Google y la copia en la nube con una cuenta real (necesita a la usuaria)
