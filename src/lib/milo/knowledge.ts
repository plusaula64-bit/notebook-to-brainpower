// Biblioteca académica de Milo: temas estructurados que el motor interno usa sin internet ni IA externa.
// Formato de cada `map`: «# Apartado | resumen» («#>» si sus ideas siguen un orden) y «- Idea: detalle > ejemplo; ejemplo».
import type { MindBranch } from "@/lib/study-ai";
import { PERU_HISTORY } from "./knowledge-peru";

export type Area = "ciencias" | "exactas" | "sociales" | "letras" | "humanidades";
export type TopicBranch = MindBranch & { ordered?: boolean };
export type Topic = {
  id: string;
  keys: string[];
  title: string;
  area: Area;
  intro: string;
  branches: TopicBranch[];
  example: string;
  question: string;
  apply: [string, string][];
  links?: string;
};
type Raw = Omit<Topic, "branches" | "apply"> & { map: string; apply?: [string, string][] };
export type RawTopic = Raw;

export const AREA_LINKS: Record<Area, string> = {
  ciencias:
    "Se conecta con la **química** (las reacciones que ocurren en los seres vivos), la **física** (energía y movimiento), la **medicina** y la **ecología**. En la vida diaria aparece en la salud, la alimentación y el cuidado del ambiente.",
  exactas:
    "Se conecta con la **física** y la **química** (fórmulas y cálculos), la **economía** (porcentajes, gráficos), la **informática** (algoritmos) y la **ingeniería**. En la vida diaria la usas al comprar, medir o planificar tu tiempo.",
  sociales:
    "Se conecta con la **geografía** (dónde ocurrieron los hechos), la **economía** (recursos y comercio), la **literatura** de la época y la **educación cívica**. Te ayuda a entender las noticias y la sociedad actual.",
  letras:
    "Se conecta con la **historia** (contexto de las obras), la **filosofía** (ideas), el **arte** y con **todas las asignaturas**, porque leer y escribir bien te permite comprender y explicar cualquier tema.",
  humanidades:
    "Se conecta con la **historia**, la **psicología**, la **educación cívica** y la **ética** de la vida diaria. Te ayuda a argumentar mejor y a comprender a otras personas.",
};

const RAW: Raw[] = [
  {
    id: "anatomia",
    keys: ["anatomia", "anatomico", "cuerpo humano"],
    title: "Anatomía humana",
    area: "ciencias",
    intro:
      "La **anatomía** es la ciencia que estudia la estructura del cuerpo humano: la forma, la ubicación y la relación entre sus órganos y sistemas. Junto con la **fisiología**, que estudia cómo funcionan, es la base de la medicina y de las ciencias de la salud.",
    map: `
# Ramas de la anatomía | Se divide según el enfoque y la escala con que se estudia el cuerpo
- Anatomía descriptiva: estudia el cuerpo sistema por sistema > Osteología (huesos); Miología (músculos); Neuroanatomía
- Anatomía topográfica: analiza el cuerpo por regiones y la relación entre sus estructuras > Cabeza y cuello; Tórax y abdomen; Miembros
- Anatomía microscópica: estudia células y tejidos con ayuda del microscopio > Histología; Citología
- Anatomía del desarrollo: estudia cómo se forma el cuerpo antes del nacimiento > Embriología
#> Niveles de organización | El cuerpo se organiza de lo más simple a lo más complejo
- Célula: es la unidad estructural y funcional de la vida > Neurona; Glóbulo rojo
- Tejido: agrupa células parecidas que cumplen una función común > Epitelial; Conectivo; Muscular; Nervioso
- Órgano: une varios tejidos para realizar una función concreta > Corazón; Estómago
- Sistema: coordina órganos que trabajan juntos para mantener la vida > Sistema digestivo; Sistema nervioso
# Sistemas del cuerpo | Conjuntos de órganos que cumplen las funciones vitales
- Sostén y movimiento: los sistemas óseo y muscular sostienen y mueven el cuerpo > 206 huesos; Más de 600 músculos
- Control: los sistemas nervioso y endocrino coordinan todas las funciones > Impulsos nerviosos; Hormonas
- Nutrición: los sistemas digestivo, respiratorio, circulatorio y excretor obtienen y reparten nutrientes > Absorción; Intercambio de gases
- Reproducción y defensa: los sistemas reproductor e inmunitario perpetúan la especie y protegen el cuerpo > Gametos; Anticuerpos
# Terminología anatómica | Lenguaje preciso para ubicar cualquier estructura
- Posición anatómica: es la postura de referencia, de pie, mirando al frente y con las palmas hacia adelante > Referencia universal
- Planos anatómicos: son cortes imaginarios que dividen el cuerpo > Sagital (derecha e izquierda); Frontal (anterior y posterior); Transversal (superior e inferior)
- Términos de dirección: describen la ubicación relativa de una estructura > Superior / inferior; Medial / lateral; Proximal / distal`,
    example:
      "Cuando un médico dice que una herida está «en la cara anterior del antebrazo, en su tercio distal», usa la terminología anatómica: **anterior** es el lado de la palma (en posición anatómica) y **distal** significa más cerca de la muñeca que del codo.",
    apply: [
      [
        "Un paciente siente dolor en la cara medial de la rodilla. ¿Hacia qué lado está el dolor?",
        "Hacia el lado interno de la rodilla, el más cercano a la línea media del cuerpo.",
      ],
      [
        "Un estudiante observa al microscopio un corte de piel. ¿Qué rama de la anatomía está aplicando?",
        "La anatomía microscópica, en concreto la histología, porque estudia tejidos.",
      ],
    ],
    question:
      "¿Por qué la anatomía necesita una posición de referencia y planos universales para describir el cuerpo?",
    links:
      "Se relaciona con la **fisiología** (cómo funciona cada estructura), la **biología celular** (células y tejidos), la **medicina** (diagnóstico y cirugía), la **educación física** (movimiento) y la **imagenología** (radiografías y tomografías).",
  },
  {
    id: "biologia",
    keys: ["biologia", "seres vivos", "ciencias naturales"],
    title: "Biología",
    area: "ciencias",
    intro:
      "La **biología** es la ciencia que estudia los seres vivos: su estructura, su funcionamiento, su evolución y sus relaciones con el ambiente.",
    map: `
# Ramas de la biología | Cada rama se enfoca en un nivel o un grupo de seres vivos
- Citología y genética: estudian la célula y la herencia > ADN; Genes
- Botánica y zoología: estudian las plantas y los animales > Clasificación; Fisiología
- Microbiología: estudia bacterias, virus, hongos y protozoos > Vacunas; Fermentación
- Ecología: estudia las relaciones de los seres vivos con su ambiente > Ecosistemas; Cadenas tróficas
# Características de los seres vivos | Propiedades que distinguen lo vivo de lo inerte
- Organización celular: todo ser vivo está formado por una o más células > Unicelulares; Pluricelulares
- Nutrición: obtienen materia y energía para vivir > Autótrofos; Heterótrofos
- Relación: perciben estímulos y responden a ellos > Irritabilidad; Homeostasis
- Reproducción: originan nuevos individuos y transmiten su información genética > Sexual; Asexual
#> Niveles de organización | La materia viva se organiza de lo simple a lo complejo
- Nivel molecular: lo forman biomoléculas como proteínas, lípidos, glúcidos y ácidos nucleicos > ADN; Enzimas
- Nivel celular: tiene a la célula como unidad básica de la vida > Procariota; Eucariota
- Nivel de organismo: integra tejidos, órganos y sistemas en un individuo > Ser humano; Árbol
- Nivel ecológico: abarca población, comunidad, ecosistema y biosfera > Manada; Bosque
# Teorías fundamentales | Ideas que explican y unifican la biología
- Teoría celular: afirma que todos los seres vivos están formados por células que provienen de otras células > Schleiden y Schwann; Virchow
- Evolución: explica que las especies cambian con el tiempo por selección natural > Darwin; Adaptación
- Herencia: explica cómo los caracteres se transmiten de padres a hijos mediante genes > Mendel; Cromosomas`,
    example:
      "Un champiñón no hace fotosíntesis: es **heterótrofo** y se alimenta descomponiendo materia orgánica. Por eso los hongos no se clasifican como plantas, aunque tampoco se desplacen.",
    apply: [
      [
        "Encuentras un organismo microscópico que se reproduce y se aleja de la luz. ¿Qué características de los seres vivos demuestra?",
        "Demuestra reproducción y relación (responde a un estímulo); además, como es un ser vivo, tiene organización celular.",
      ],
    ],
    question:
      "¿Por qué los virus generan debate sobre si son o no seres vivos? Usa las características de los seres vivos para responder.",
  },
  {
    id: "quimica",
    keys: ["quimica"],
    title: "Química",
    area: "exactas",
    intro:
      "La **química** estudia la materia: su composición, su estructura, sus propiedades y las transformaciones que experimenta en las reacciones químicas.",
    map: `
# Ramas de la química | Se divide según el tipo de sustancias o el enfoque de estudio
- Química orgánica: estudia los compuestos del carbono > Hidrocarburos; Biomoléculas
- Química inorgánica: estudia los compuestos que no forman cadenas de carbono > Sales; Óxidos; Ácidos
- Fisicoquímica: aplica las leyes de la física a los procesos químicos > Termoquímica; Cinética
- Bioquímica: estudia la química de los seres vivos > Metabolismo; Enzimas
# Materia y sus estados | Todo lo que tiene masa y ocupa un lugar en el espacio
- Estados de agregación: la materia puede ser sólida, líquida, gaseosa o plasma > Hielo; Agua; Vapor
- Sustancias puras: tienen composición fija y pueden ser elementos o compuestos > Oxígeno (O₂); Agua (H₂O)
- Mezclas: combinan sustancias que conservan sus propiedades > Homogéneas; Heterogéneas
# Estructura atómica | El átomo es la unidad básica de los elementos
- Núcleo: contiene protones con carga positiva y neutrones sin carga > Número atómico Z; Número másico A
- Electrones: giran en niveles de energía alrededor del núcleo > Configuración electrónica; Valencia
- Tabla periódica: ordena los elementos según su número atómico > Grupos; Periodos
# Reacciones químicas | Transformaciones en las que unas sustancias se convierten en otras
- Reactivos y productos: son las sustancias iniciales y las que se forman > A + B → C
- Conservación de la masa: la masa total no cambia durante una reacción > Lavoisier; Balanceo
- Tipos de reacción: pueden ser de síntesis, descomposición, sustitución o combustión > Oxidación; Neutralización`,
    example:
      "Cuando un clavo se oxida, el hierro (Fe) reacciona con el oxígeno del aire y forma óxido de hierro: es una **reacción química**, porque aparece una sustancia nueva con propiedades distintas.",
    apply: [
      [
        "Disuelves sal en agua y luego evaporas el agua: recuperas la sal. ¿Fue un cambio físico o químico?",
        "Un cambio físico: la sal no se transformó en otra sustancia; solo se mezcló y se volvió a separar.",
      ],
    ],
    question:
      "¿Cómo demostrarías con un experimento sencillo que en una reacción química la masa se conserva?",
  },
  {
    id: "fisica",
    keys: ["fisica"],
    title: "Física",
    area: "exactas",
    intro:
      "La **física** estudia la materia, la energía, el espacio y el tiempo, y las leyes que explican fenómenos como el movimiento, la luz, el calor o la electricidad.",
    map: `
# Ramas de la física | Cada rama estudia un tipo de fenómeno
- Mecánica: estudia el movimiento y sus causas > Cinemática; Dinámica; Estática
- Termodinámica: estudia el calor, la temperatura y la energía > Leyes de la termodinámica
- Electromagnetismo: estudia la electricidad, el magnetismo y su relación > Circuitos; Imanes
- Óptica y física moderna: estudian la luz, la relatividad y el mundo cuántico > Reflexión; Einstein
# Magnitudes y unidades | Todo lo que se mide se expresa con un número y una unidad
- Magnitudes fundamentales: son la longitud, la masa, el tiempo, la temperatura y la corriente > Metro; Kilogramo; Segundo
- Magnitudes derivadas: se obtienen combinando las fundamentales > Velocidad (m/s); Fuerza (N)
- Escalares y vectoriales: las vectoriales además tienen dirección y sentido > Masa (escalar); Fuerza (vector)
# Movimiento y fuerzas | Cómo y por qué se mueven los cuerpos
- Velocidad: es la distancia recorrida por unidad de tiempo, v = d / t > 100 km en 2 h = 50 km/h
- Aceleración: es el cambio de velocidad por unidad de tiempo > Gravedad terrestre: 9,8 m/s²
- Leyes de Newton: explican la inercia, la relación F = m · a y la acción-reacción > Unidad: newton (N)
# Energía | Capacidad de un cuerpo para realizar trabajo
- Energía cinética: es la energía del movimiento, Ec = ½ m v² > Auto en marcha
- Energía potencial: es la energía por la posición, Ep = m g h > Agua en una represa
- Conservación de la energía: la energía no se crea ni se destruye, se transforma > Cinética ↔ potencial`,
    example:
      "Si dejas caer una pelota desde 2 m, su **energía potencial** (m · g · h) se transforma en **energía cinética** mientras cae: justo antes de tocar el suelo, casi toda su energía es de movimiento.",
    apply: [
      [
        "Un ciclista recorre 30 km en 1,5 h. ¿Cuál es su velocidad media?",
        "v = d / t = 30 km ÷ 1,5 h = 20 km/h.",
      ],
    ],
    question:
      "¿Por qué un astronauta en la Luna pesa menos pero tiene la misma masa que en la Tierra?",
  },
  {
    id: "matematica",
    keys: ["matematica", "matematicas"],
    title: "Matemática",
    area: "exactas",
    intro:
      "La **matemática** estudia los números, las formas, las cantidades y sus relaciones mediante el razonamiento lógico. Es la herramienta con la que se modelan y resuelven problemas en la ciencia, la tecnología y la vida diaria.",
    map: `
# Ramas de la matemática | Cada rama estudia un tipo de objeto matemático
- Aritmética: estudia los números y sus operaciones > Fracciones; Porcentajes
- Álgebra: usa letras para representar cantidades y resolver ecuaciones > 2x + 3 = 11
- Geometría y trigonometría: estudian figuras, medidas y ángulos > Teorema de Pitágoras; Seno y coseno
- Cálculo y estadística: estudian el cambio, los datos y el azar > Derivadas; Media; Probabilidad
#> Conjuntos numéricos | Los números se agrupan en conjuntos cada vez más amplios
- Naturales (ℕ): sirven para contar > 1, 2, 3…
- Enteros (ℤ): incluyen los números negativos y el cero > −3, 0, 5
- Racionales (ℚ): pueden escribirse como una fracción > 1/2; 0,75
- Reales (ℝ): incluyen los irracionales, que no se pueden escribir como fracción > π; √2
# Ecuaciones y funciones | Herramientas para expresar relaciones entre cantidades
- Ecuación: es una igualdad con una incógnita que se resuelve despejando > 2x + 3 = 11 → x = 4
- Función: es una regla que asigna a cada valor de x un único valor de y > f(x) = 2x + 1
- Gráfica: representa una función en el plano cartesiano > Eje x; Eje y
#> Resolución de problemas | Método para enfrentar cualquier ejercicio
- Comprender: consiste en identificar los datos, la incógnita y las condiciones > Subrayar los datos
- Plantear: consiste en traducir el problema a una operación o ecuación > Definir la variable
- Resolver: consiste en operar respetando las propiedades y la jerarquía de operaciones > Paréntesis primero
- Comprobar: consiste en verificar que el resultado tenga sentido > Reemplazar el resultado`,
    example:
      "Si un polo cuesta S/ 25 y tiene 20 % de descuento, calculas 25 × 20 ÷ 100 = 5; el precio final es 25 − 5 = **S/ 20**.",
    apply: [
      [
        "El triple de un número más 4 es 19. ¿Cuál es el número?",
        "Planteas 3x + 4 = 19 → 3x = 15 → x = 5.",
      ],
    ],
    question:
      "¿Por qué √2 no puede escribirse como una fracción exacta? ¿A qué conjunto numérico pertenece?",
  },
  {
    id: "historia",
    keys: ["historia", "historico"],
    title: "Historia",
    area: "sociales",
    intro:
      "La **historia** es la ciencia social que estudia el pasado de la humanidad a partir de fuentes, para comprender los cambios y las continuidades que explican el presente.",
    map: `
#> Edades de la historia | Grandes periodos marcados por hechos clave
- Prehistoria: va desde la aparición del ser humano hasta la invención de la escritura > Paleolítico; Neolítico
- Edad Antigua: va de la escritura (c. 3500 a. C.) a la caída de Roma (476) > Mesopotamia; Egipto; Grecia y Roma
- Edad Media: va de 476 a la caída de Constantinopla (1453) > Feudalismo; Cristiandad
- Edades Moderna y Contemporánea: van de 1453 a la Revolución Francesa (1789) y de allí hasta hoy > Renacimiento; Revoluciones
# Fuentes históricas | Evidencias con las que se reconstruye el pasado
- Fuentes primarias: fueron producidas en la época estudiada > Cartas; Restos arqueológicos
- Fuentes secundarias: se elaboraron después, interpretando las primarias > Libros de historia
- Crítica de fuentes: analiza el autor, la fecha, la intención y la fiabilidad > ¿Quién la escribió?; ¿Para qué?
# Tiempo histórico | Herramientas para analizar los hechos
- Cronología: ordena los hechos en el tiempo > Línea de tiempo; Siglos
- Causas y consecuencias: explican por qué ocurren los hechos y qué provocan > Multicausalidad
- Cambio y permanencia: distinguen lo que se transforma de lo que se mantiene > Tradiciones; Revoluciones
# Enfoques de la historia | Maneras de estudiar el pasado
- Historia política: estudia gobiernos, guerras y Estados > Independencias
- Historia económica y social: estudia el trabajo, el comercio y los grupos sociales > Clases sociales
- Historia cultural: estudia las ideas, el arte, la religión y la vida cotidiana > Costumbres`,
    example:
      "Una carta escrita por un soldado en 1824 sobre la batalla de Ayacucho es una **fuente primaria**; un libro de 2020 que analiza esa batalla es una **fuente secundaria**.",
    apply: [
      [
        "Encuentras un periódico de 1921 que narra el centenario de la independencia. ¿Qué tipo de fuente es para estudiar 1921?",
        "Una fuente primaria, porque se produjo en la misma época que se quiere estudiar.",
      ],
    ],
    question:
      "¿Por qué un mismo hecho histórico suele tener varias causas? Elige un ejemplo y explícalo.",
  },
  {
    id: "psicologia",
    keys: ["psicologia", "conducta", "maslow", "piaget"],
    title: "Psicología",
    area: "humanidades",
    intro:
      "La **psicología** es la ciencia que estudia la mente y el comportamiento: cómo pensamos, sentimos, aprendemos, recordamos y nos relacionamos.",
    map: `
# Ramas de la psicología | Áreas de estudio y de aplicación
- Psicología clínica: evalúa y trata trastornos y malestar psicológico > Terapia; Diagnóstico
- Psicología educativa: estudia el aprendizaje y el desarrollo en la escuela > Orientación vocacional
- Psicología social: estudia cómo los demás influyen en nuestra conducta > Conformidad; Prejuicios
- Psicología del desarrollo: estudia los cambios a lo largo de la vida > Etapas de Piaget
# Corrientes psicológicas | Enfoques teóricos para explicar la conducta
- Psicoanálisis: destaca el papel del inconsciente y de la infancia > Freud
- Conductismo: estudia la conducta observable y el aprendizaje por estímulos > Pavlov; Skinner
- Humanismo: enfatiza el crecimiento personal y la autorrealización > Maslow; Rogers
- Cognitivismo: estudia procesos mentales como la memoria y el pensamiento > Procesamiento de la información
# Procesos psicológicos | Funciones de la mente
- Procesos básicos: incluyen la sensación, la percepción, la atención y la memoria > Memoria a corto plazo
- Procesos superiores: incluyen el pensamiento, el lenguaje y la inteligencia > Resolución de problemas
- Procesos afectivos: incluyen las emociones, la motivación y los sentimientos > Motivación intrínseca
#> Pirámide de Maslow | Jerarquía de necesidades humanas, de la base a la cima
- Necesidades fisiológicas: son el alimento, el agua y el descanso > Base de la pirámide
- Seguridad y afiliación: incluyen la protección, la estabilidad, el amor y la pertenencia > Familia; Amigos
- Reconocimiento: incluye la autoestima y el respeto de los demás > Logros
- Autorrealización: consiste en desarrollar el propio potencial > Cima de la pirámide`,
    example:
      "Si un perro saliva al escuchar la campana que antes anunciaba la comida, ocurre un **condicionamiento clásico** (Pavlov): el perro asoció un estímulo neutro con otro que provoca la respuesta.",
    apply: [
      [
        "Estudias más cuando tu profesora te felicita en público. ¿Qué corriente explica mejor este comportamiento?",
        "El conductismo: la felicitación funciona como refuerzo positivo que aumenta la conducta de estudiar.",
      ],
    ],
    question:
      "¿Por qué, según Maslow, a un estudiante con hambre le cuesta concentrarse en aprender?",
  },
  {
    id: "lenguaje",
    keys: ["comunicacion", "lenguaje", "gramatica", "lengua", "castellano"],
    title: "Comunicación y lenguaje",
    area: "letras",
    intro:
      "El curso de **Comunicación** estudia cómo usamos la lengua para expresarnos y comprender: los elementos de la comunicación, la gramática, la ortografía y los tipos de texto.",
    map: `
# Elementos de la comunicación | Componentes de todo acto comunicativo
- Emisor y receptor: son quien envía y quien recibe el mensaje > Hablante; Oyente
- Mensaje y código: son la información y el sistema de signos que se usa > Idioma; Señales
- Canal y contexto: son el medio físico y la situación que da sentido al mensaje > Aire; Papel; Situación
# Categorías gramaticales | Clases de palabras según su función
- Sustantivo: nombra personas, animales, cosas o ideas > Perro; Lima; Alegría
- Verbo: expresa acciones, estados o procesos > Correr; Ser; Crecer
- Adjetivo y adverbio: el adjetivo califica al sustantivo y el adverbio modifica al verbo > Rápido; Rápidamente
# Acentuación | Normas para colocar la tilde
- Palabras agudas: llevan tilde si terminan en n, s o vocal > Canción; Café
- Palabras graves: llevan tilde si no terminan en n, s o vocal > Árbol; Lápiz
- Palabras esdrújulas: siempre llevan tilde > Música; Teléfono
# Tipos de texto | Según la intención comunicativa
- Texto narrativo: cuenta hechos con inicio, nudo y desenlace > Cuento; Novela
- Texto expositivo: explica un tema de forma clara y objetiva > Enciclopedia; Libro escolar
- Texto argumentativo: defiende una tesis con argumentos > Ensayo; Artículo de opinión`,
    example:
      "En un chat, tú eres el **emisor**, tu amigo el **receptor**, el **canal** es el celular, el **código** es el español escrito y el **mensaje** es lo que le cuentas.",
    apply: [
      [
        "¿Por qué «examen» no lleva tilde pero «exámenes» sí?",
        "«Examen» es grave terminada en n (no lleva tilde); «exámenes» es esdrújula y las esdrújulas siempre llevan tilde.",
      ],
    ],
    question: "Escribe un mensaje breve e identifica en él los seis elementos de la comunicación.",
  },
  {
    id: "literatura",
    keys: ["literatura", "literario", "generos literarios"],
    title: "Literatura",
    area: "letras",
    intro:
      "La **literatura** es el arte que usa la palabra con intención estética para expresar ideas, emociones y visiones del mundo. Se estudia por géneros, movimientos, autores y recursos expresivos.",
    map: `
# Géneros literarios | Grandes formas de la expresión literaria
- Género narrativo: relata hechos a través de un narrador > Cuento; Novela; Fábula
- Género lírico: expresa sentimientos y emociones, generalmente en verso > Poema; Oda
- Género dramático: se representa con diálogos ante un público > Tragedia; Comedia
# Recursos literarios | Figuras que embellecen la expresión
- Metáfora: identifica dos realidades sin usar «como» > «Tus ojos son luceros»
- Símil: compara dos realidades usando «como» o «cual» > «Blanco como la nieve»
- Personificación: atribuye cualidades humanas a seres inanimados > «El viento canta»
#> Movimientos literarios | Corrientes según su época y su estilo
- Siglo de Oro: es el apogeo de la literatura española > Cervantes; Lope de Vega
- Romanticismo: exalta el sentimiento, la libertad y la naturaleza > Bécquer
- Realismo y Modernismo: retratan la sociedad y buscan la belleza formal > Galdós; Rubén Darío
- Vanguardias y Boom: experimentan y renuevan la narrativa latinoamericana > Vallejo; García Márquez; Vargas Llosa
#> Análisis literario | Pasos para comentar una obra
- Contexto: sitúa al autor, la época y el movimiento > Biografía; Momento histórico
- Tema y estructura: identifican la idea principal y cómo se organiza la obra > Inicio, nudo y desenlace
- Estilo: analiza los recursos, el narrador y el lenguaje > Figuras literarias`,
    example:
      "En «Los heraldos negros», César Vallejo usa la **metáfora** de los «golpes» para expresar el dolor inexplicable de la vida: no habla de golpes físicos, sino de sufrimientos profundos.",
    apply: [
      [
        "Lees: «La ciudad dormía bajo la lluvia». ¿Qué recurso literario aparece?",
        "Una personificación: se atribuye a la ciudad una acción humana, dormir.",
      ],
    ],
    question:
      "¿Qué diferencia hay entre leer una novela como entretenimiento y analizarla literariamente?",
  },
  {
    id: "geografia",
    keys: ["geografia", "relieve", "clima", "mapa geografico"],
    title: "Geografía",
    area: "sociales",
    intro:
      "La **geografía** estudia la superficie terrestre, sus paisajes y la relación entre la sociedad y el espacio donde vive.",
    map: `
# Ramas de la geografía | Se divide en física y humana
- Geografía física: estudia el relieve, el clima, las aguas y los suelos > Geomorfología; Climatología; Hidrografía
- Geografía humana: estudia la población, las ciudades y las actividades económicas > Demografía; Urbanismo
- Cartografía: representa la Tierra en mapas > Escala; Leyenda
# Relieve | Formas de la superficie terrestre
- Relieve continental: incluye montañas, mesetas, llanuras y valles > Cordillera de los Andes
- Relieve costero: incluye playas, acantilados, bahías y penínsulas > Bahía de Paracas
- Relieve submarino: incluye la plataforma, el talud y las fosas oceánicas > Fosa de las Marianas
# Clima | Condiciones atmosféricas de un lugar durante largo tiempo
- Elementos del clima: son la temperatura, la precipitación, la humedad, la presión y el viento > Termómetro; Pluviómetro
- Factores del clima: son la latitud, la altitud, el relieve y las corrientes marinas > Corriente de Humboldt
- Tipos de clima: pueden ser cálidos, templados, fríos o de montaña > Tropical; Polar
# Coordenadas geográficas | Sistema para ubicar cualquier punto del planeta
- Latitud: es la distancia en grados al norte o al sur del ecuador > De 0° a 90°
- Longitud: es la distancia en grados al este o al oeste de Greenwich > De 0° a 180°
- Husos horarios: son franjas de 15° que comparten la misma hora > Perú: UTC −5`,
    example:
      "La **corriente de Humboldt**, de aguas frías, explica que la costa peruana tenga pocas lluvias aunque esté cerca del ecuador: enfría el aire y dificulta que se formen nubes de lluvia.",
    apply: [
      [
        "Una ciudad está a 3400 m de altitud y otra al nivel del mar, en la misma latitud. ¿Cuál será más fría y por qué?",
        "La de 3400 m, porque la temperatura baja con la altitud (unos 0,6 °C cada 100 m).",
      ],
    ],
    question: "¿Qué factores del clima explican que en Perú existan tantos climas distintos?",
  },
  {
    id: "economia",
    keys: ["economia", "oferta", "demanda", "mercado"],
    title: "Economía",
    area: "sociales",
    intro:
      "La **economía** estudia cómo las personas, las empresas y los países administran recursos escasos para satisfacer necesidades ilimitadas.",
    map: `
# Conceptos básicos | Ideas que fundamentan la economía
- Escasez: significa que los recursos son limitados frente a necesidades ilimitadas > Elegir implica renunciar
- Costo de oportunidad: es el valor de la mejor alternativa a la que se renuncia > Estudiar o trabajar
- Bienes y servicios: son lo que satisface las necesidades > Bien: pan; Servicio: clases
# Ramas de la economía | Escalas de análisis
- Microeconomía: estudia a consumidores, empresas y mercados individuales > Precio de un producto
- Macroeconomía: estudia la economía de un país en conjunto > PBI; Inflación; Desempleo
- Economía internacional: estudia el comercio y las finanzas entre países > Exportaciones; Tipo de cambio
# Mercado | Lugar donde se encuentran la oferta y la demanda
- Demanda: es la cantidad que los consumidores quieren comprar a cada precio > Si el precio sube, se compra menos
- Oferta: es la cantidad que los productores quieren vender a cada precio > Si el precio sube, se ofrece más
- Precio de equilibrio: es el precio donde la oferta y la demanda coinciden > Sin escasez ni excedente
#> Proceso económico | Etapas que siguen los bienes
- Producción: es la creación de bienes y servicios > Tierra, trabajo y capital
- Circulación: es el traslado e intercambio de los productos > Comercio; Transporte
- Distribución: es el reparto de los ingresos generados > Salarios; Ganancias
- Consumo: es el uso final de los bienes para satisfacer necesidades > Compras familiares`,
    example:
      "Si sale una nueva consola y todos la quieren, la **demanda** sube; si hay pocas unidades, el precio aumenta hasta que la cantidad que la gente compra coincide con la que hay disponible.",
    apply: [
      [
        "Tienes S/ 50 y eliges ir al cine en vez de comprar un libro. ¿Cuál es tu costo de oportunidad?",
        "El libro al que renunciaste: era la mejor alternativa que dejaste de lado.",
      ],
    ],
    question:
      "¿Qué pasaría con el precio de las mascarillas si de pronto aumenta mucho su demanda y la oferta no cambia?",
  },
  {
    id: "filosofia",
    keys: ["filosofia", "etica", "epistemologia"],
    title: "Filosofía",
    area: "humanidades",
    intro:
      "La **filosofía** busca responder con razones las grandes preguntas sobre la realidad, el conocimiento, el ser humano, la moral y la sociedad.",
    map: `
# Disciplinas filosóficas | Áreas según la pregunta que plantean
- Metafísica: se pregunta qué es la realidad y qué significa existir > Ser; Existencia
- Epistemología: se pregunta cómo conocemos y qué es la verdad > Razón; Experiencia
- Ética: se pregunta qué es lo bueno y cómo debemos actuar > Moral; Valores
- Lógica y estética: estudian el razonamiento correcto y la belleza > Argumentos; Arte
#> Etapas de la filosofía | Grandes periodos del pensamiento
- Filosofía antigua: nace en Grecia al pasar del mito a la razón (logos) > Sócrates; Platón; Aristóteles
- Filosofía medieval: relaciona la fe con la razón > San Agustín; Santo Tomás
- Filosofía moderna: se centra en el sujeto y en el método > Descartes; Kant
- Filosofía contemporánea: reflexiona sobre la existencia, el lenguaje y la sociedad > Nietzsche; Sartre
# Teorías del conocimiento | Respuestas sobre el origen del saber
- Racionalismo: sostiene que el conocimiento procede de la razón > Descartes: «Pienso, luego existo»
- Empirismo: sostiene que el conocimiento procede de la experiencia sensible > Locke; Hume
- Criticismo: sostiene que el conocimiento une razón y experiencia > Kant`,
    example:
      "Cuando debates si está bien copiar en un examen «porque todos lo hacen», estás haciendo **ética**: evalúas si una acción es correcta con argumentos, no solo por costumbre.",
    apply: [
      [
        "Un científico solo acepta lo que puede comprobar con experimentos. ¿Qué teoría del conocimiento se parece más a su postura?",
        "El empirismo, porque basa el conocimiento en la experiencia y la observación.",
      ],
    ],
    question: "¿Puede una acción ser legal pero no ética? Argumenta con un ejemplo.",
  },
  {
    id: "sistema-oseo",
    keys: ["sistema oseo", "esqueleto", "huesos", "hueso", "osteologia"],
    title: "Sistema óseo",
    area: "ciencias",
    intro:
      "El **sistema óseo** es el conjunto de huesos, cartílagos y articulaciones que forman el esqueleto. En el adulto tiene **206 huesos** que sostienen, protegen y permiten el movimiento.",
    map: `
# Funciones del esqueleto | Para qué sirven los huesos
- Sostén: da forma y soporte a todo el cuerpo > Columna vertebral
- Protección: resguarda los órganos vitales > Cráneo: encéfalo; Costillas: corazón y pulmones
- Movimiento: los huesos actúan como palancas que mueven los músculos > Articulaciones
- Hematopoyesis: la médula ósea roja fabrica las células de la sangre > Glóbulos rojos; Reserva de calcio
# Clasificación de los huesos | Según su forma
- Huesos largos: son más largos que anchos, con diáfisis y epífisis > Fémur; Húmero
- Huesos cortos: tienen forma cúbica y dan estabilidad > Carpo; Tarso
- Huesos planos: son delgados y protegen órganos > Esternón; Parietal; Omóplato
- Huesos irregulares: tienen una forma compleja > Vértebras; Mandíbula
# Divisiones del esqueleto | Esqueleto axial y apendicular
- Esqueleto axial: forma el eje del cuerpo con 80 huesos > Cráneo; Columna; Caja torácica
- Esqueleto apendicular: forma los miembros y sus cinturas con 126 huesos > Cintura escapular; Pelvis
- Huesos destacados: el fémur es el más largo y el estribo el más pequeño > Fémur (muslo); Estribo (oído)
# Articulaciones | Uniones entre los huesos
- Sinartrosis: son articulaciones inmóviles > Suturas del cráneo
- Anfiartrosis: son articulaciones semimóviles > Entre las vértebras
- Diartrosis: son articulaciones móviles con líquido sinovial > Rodilla; Hombro`,
    example:
      "Cuando alguien se fractura el brazo, el **húmero** (hueso largo) se repara formando hueso nuevo; por eso se inmoviliza con yeso: para mantener alineados los extremos mientras sana.",
    apply: [
      [
        "Un deportista se lesiona la rodilla y pierde amplitud de movimiento. ¿Qué tipo de articulación se afectó?",
        "Una diartrosis: la rodilla es una articulación móvil con líquido sinovial.",
      ],
    ],
    question:
      "¿Por qué el cráneo tiene articulaciones inmóviles mientras que el hombro tiene una muy móvil?",
  },
  {
    id: "sistema-muscular",
    keys: ["sistema muscular", "musculos", "musculo", "miologia"],
    title: "Sistema muscular",
    area: "ciencias",
    intro:
      "El **sistema muscular** está formado por más de **600 músculos** que, al contraerse, producen movimiento, mantienen la postura y generan calor.",
    map: `
# Tipos de músculo | Según su estructura y su control
- Músculo esquelético: es estriado y voluntario, y se une a los huesos > Bíceps; Cuádriceps
- Músculo liso: es involuntario y forma las paredes de los órganos huecos > Estómago; Vasos sanguíneos
- Músculo cardíaco: es estriado e involuntario, y forma el corazón > Miocardio
# Funciones | Qué hacen los músculos
- Movimiento: los músculos tiran de los huesos mediante los tendones > Caminar; Masticar
- Postura: mantienen el cuerpo erguido y estable > Músculos de la espalda
- Producción de calor: generan calor al contraerse > Escalofríos
#> Contracción muscular | Cómo se mueve un músculo
- Estímulo nervioso: una neurona motora envía la orden al músculo > Placa motora
- Liberación de calcio: el calcio activa las proteínas contráctiles > Ca²⁺
- Deslizamiento de filamentos: la actina y la miosina se deslizan y acortan la fibra > Gasta ATP
- Relajación: el calcio se retira y la fibra recupera su longitud > Fin de la contracción
# Músculos antagonistas | Trabajan en pares opuestos
- Músculo flexor: dobla una articulación > Bíceps (flexiona el codo)
- Músculo extensor: estira una articulación > Tríceps (extiende el codo)
- Tendones y ligamentos: el tendón une músculo con hueso y el ligamento une hueso con hueso > Tendón de Aquiles`,
    example:
      "Al levantar una mochila, el **bíceps** se contrae (flexor) y el **tríceps** se relaja; para bajarla, el tríceps se contrae (extensor). Por eso se llaman músculos **antagonistas**.",
    apply: [
      [
        "¿Por qué no puedes detener voluntariamente los latidos de tu corazón?",
        "Porque el músculo cardíaco es involuntario: su contracción no depende de tu voluntad.",
      ],
    ],
    question: "¿Qué pasaría con el movimiento del codo si el tríceps no pudiera contraerse?",
  },
  {
    id: "sistema-nervioso",
    keys: ["sistema nervioso", "neurona", "neuronas", "cerebro", "encefalo", "nervios"],
    title: "Sistema nervioso",
    area: "ciencias",
    intro:
      "El **sistema nervioso** recibe información del entorno y del propio cuerpo, la procesa y coordina las respuestas. Su unidad funcional es la **neurona**.",
    map: `
# Divisiones | Organización del sistema nervioso
- Sistema nervioso central: lo forman el encéfalo y la médula espinal, que procesan la información > Cerebro; Cerebelo; Tronco encefálico
- Sistema nervioso periférico: lo forman los nervios que conectan el sistema central con el cuerpo > Nervios craneales; Nervios raquídeos
- Sistema nervioso autónomo: controla de forma involuntaria los órganos internos > Simpático; Parasimpático
# La neurona | Célula especializada en transmitir impulsos
- Dendritas: reciben los estímulos de otras células > Muchas ramificaciones
- Cuerpo celular: contiene el núcleo e integra la señal > Soma
- Axón: conduce el impulso nervioso hacia otras células > Vaina de mielina
- Sinapsis: comunica una neurona con otra mediante neurotransmisores > Dopamina; Serotonina
# Encéfalo | Centro de control del cuerpo
- Cerebro: controla el pensamiento, la memoria, el lenguaje y los movimientos voluntarios > Lóbulos frontal, parietal, temporal y occipital
- Cerebelo: coordina el equilibrio y la precisión del movimiento > Postura
- Tronco encefálico: controla funciones vitales automáticas > Respiración; Ritmo cardíaco
#> Arco reflejo | Respuesta rápida e involuntaria
- Receptor: capta el estímulo > Piel
- Neurona sensitiva: lleva la señal hasta la médula espinal > Vía aferente
- Médula espinal: elabora la respuesta sin esperar al cerebro > Interneurona
- Efector: es el músculo que ejecuta la respuesta > Retirar la mano`,
    example:
      "Si tocas una olla caliente, retiras la mano antes de sentir dolor: es un **arco reflejo**, porque la médula espinal ordena la respuesta sin esperar a que el cerebro procese la información.",
    apply: [
      [
        "Una persona sufre una lesión en el cerebelo. ¿Qué dificultad tendrá probablemente?",
        "Problemas de equilibrio y de coordinación de los movimientos.",
      ],
    ],
    question: "¿Por qué los actos reflejos son más rápidos que los movimientos voluntarios?",
  },
  {
    id: "sistema-circulatorio",
    keys: ["sistema circulatorio", "circulatorio", "corazon", "sangre", "cardiovascular"],
    title: "Sistema circulatorio",
    area: "ciencias",
    intro:
      "El **sistema circulatorio** transporta oxígeno, nutrientes, hormonas y desechos por todo el cuerpo. Está formado por el **corazón**, los **vasos sanguíneos** y la **sangre**.",
    map: `
# El corazón | Bomba muscular con cuatro cavidades
- Aurículas: son las cavidades superiores que reciben la sangre > Aurícula derecha; Aurícula izquierda
- Ventrículos: son las cavidades inferiores que impulsan la sangre > El izquierdo tiene la pared más gruesa
- Válvulas: impiden que la sangre retroceda > Tricúspide; Mitral
# Vasos sanguíneos | Conductos por donde circula la sangre
- Arterias: llevan la sangre desde el corazón y tienen paredes gruesas > Aorta
- Venas: devuelven la sangre al corazón y tienen válvulas > Venas cavas
- Capilares: son muy finos y en ellos ocurre el intercambio de sustancias > Intercambio de O₂ y CO₂
# Tipos de circulación | Circulación doble, cerrada y completa
- Circulación menor: lleva la sangre del ventrículo derecho a los pulmones y la regresa a la aurícula izquierda > Oxigena la sangre
- Circulación mayor: lleva la sangre del ventrículo izquierdo a todo el cuerpo y la regresa a la aurícula derecha > Reparte el oxígeno
# La sangre | Tejido líquido de transporte
- Plasma: es la parte líquida, con agua, sales y proteínas > 55 % de la sangre
- Glóbulos rojos: transportan el oxígeno gracias a la hemoglobina > Eritrocitos
- Glóbulos blancos y plaquetas: defienden el cuerpo y permiten la coagulación > Leucocitos; Plaquetas`,
    example:
      "Cuando corres, el corazón late más rápido para que la **circulación mayor** lleve más oxígeno a los músculos, y respiras más para que la **circulación menor** recargue ese oxígeno en los pulmones.",
    apply: [
      [
        "Te haces un corte pequeño y la sangre deja de salir en unos minutos. ¿Qué componente de la sangre lo hizo posible?",
        "Las plaquetas, que participan en la coagulación.",
      ],
    ],
    question: "¿Por qué la pared del ventrículo izquierdo es más gruesa que la del derecho?",
  },
  {
    id: "sistema-digestivo",
    keys: ["sistema digestivo", "digestivo", "digestion", "estomago", "intestino"],
    title: "Sistema digestivo",
    area: "ciencias",
    intro:
      "El **sistema digestivo** transforma los alimentos en nutrientes que el cuerpo puede absorber y elimina lo que no se aprovecha.",
    map: `
#> Recorrido del alimento | Órganos del tubo digestivo en orden
- Boca: tritura el alimento e inicia la digestión del almidón con la saliva > Amilasa salival
- Esófago y estómago: el bolo baja por peristaltismo y el estómago lo mezcla con jugo gástrico > Quimo; Ácido clorhídrico
- Intestino delgado: termina la digestión y absorbe los nutrientes > Vellosidades intestinales
- Intestino grueso: absorbe agua y forma las heces > Flora intestinal
# Glándulas anexas | Producen sustancias digestivas
- Glándulas salivales: secretan la saliva > Parótidas
- Hígado: produce la bilis, que emulsiona las grasas > Vesícula biliar
- Páncreas: produce el jugo pancreático con enzimas > Lipasa; Tripsina
# Procesos digestivos | Etapas de la digestión
- Digestión mecánica: tritura y mezcla los alimentos > Masticación; Peristaltismo
- Digestión química: las enzimas rompen las moléculas grandes en otras pequeñas > Proteínas → aminoácidos
- Absorción: los nutrientes pasan a la sangre > Intestino delgado
- Egestión: expulsa los restos no digeridos > Heces`,
    example:
      "Cuando masticas pan durante un rato, empieza a saber dulce: la **amilasa salival** está rompiendo el almidón en azúcares más simples. Es digestión química que empieza en la boca.",
    apply: [
      [
        "Una persona sin vesícula biliar debe comer con menos grasa. ¿Por qué?",
        "Porque la bilis, que ayuda a emulsionar las grasas, ya no se almacena ni se libera en cantidad suficiente al comer.",
      ],
    ],
    question:
      "¿Por qué el intestino delgado tiene millones de vellosidades? Relaciónalo con su función.",
  },
  {
    id: "sistema-respiratorio",
    keys: ["sistema respiratorio", "respiratorio", "pulmones", "pulmon"],
    title: "Sistema respiratorio",
    area: "ciencias",
    intro:
      "El **sistema respiratorio** permite el intercambio de gases: incorpora **oxígeno** del aire y elimina **dióxido de carbono**.",
    map: `
#> Vías respiratorias | Recorrido del aire
- Fosas nasales: filtran, calientan y humedecen el aire > Vellos; Moco
- Faringe y laringe: conducen el aire, y la laringe contiene las cuerdas vocales > Epiglotis
- Tráquea y bronquios: son tubos con anillos de cartílago que llevan el aire a los pulmones > Bronquiolos
- Alvéolos: son sacos diminutos donde ocurre el intercambio de gases > Rodeados de capilares
# Mecánica respiratoria | Ventilación pulmonar
- Inspiración: el diafragma se contrae y el aire entra en los pulmones > Proceso activo
- Espiración: el diafragma se relaja y el aire sale > Proceso pasivo en reposo
- Frecuencia respiratoria: son unas 12 a 20 respiraciones por minuto en reposo > Aumenta con el ejercicio
# Intercambio de gases | Difusión en los alvéolos
- Oxígeno: pasa del alvéolo a la sangre > Se une a la hemoglobina
- Dióxido de carbono: pasa de la sangre al alvéolo para ser expulsado > Desecho celular
- Respiración celular: las células usan el oxígeno para obtener energía > Mitocondrias`,
    example:
      "Al subir a una ciudad de altura, respiras más rápido: el aire tiene menos presión de **oxígeno** y tu cuerpo compensa aumentando la **frecuencia respiratoria**.",
    apply: [
      [
        "¿Por qué es mejor respirar por la nariz que por la boca cuando hace frío?",
        "Porque las fosas nasales calientan, humedecen y filtran el aire antes de que llegue a los pulmones.",
      ],
    ],
    question:
      "¿Qué relación hay entre el sistema respiratorio y el circulatorio en el intercambio de gases?",
  },
  {
    id: "celula",
    keys: ["celula", "celulas", "citologia", "organelos"],
    title: "La célula",
    area: "ciencias",
    intro:
      "La **célula** es la unidad estructural, funcional y de origen de todos los seres vivos. Puede ser un organismo completo (unicelular) o formar parte de uno pluricelular.",
    map: `
# Tipos de célula | Según la presencia de núcleo
- Célula procariota: no tiene núcleo definido y su ADN está libre en el citoplasma > Bacterias
- Célula animal: es eucariota, tiene núcleo y no tiene pared celular > Neurona; Glóbulo blanco
- Célula vegetal: es eucariota, con pared celular y cloroplastos > Células de la hoja
# Estructuras básicas | Partes comunes a todas las células
- Membrana plasmática: controla qué sustancias entran y salen de la célula > Permeabilidad selectiva
- Citoplasma: es el medio donde ocurren las reacciones y se ubican los organelos > Citosol
- Material genético: es el ADN que contiene las instrucciones de la célula > Núcleo en eucariotas
# Organelos | Estructuras con funciones especializadas
- Mitocondria: produce energía (ATP) mediante la respiración celular > Central energética
- Ribosomas: fabrican las proteínas > Retículo endoplasmático rugoso
- Aparato de Golgi: empaqueta y distribuye sustancias > Vesículas
- Cloroplasto: realiza la fotosíntesis en las células vegetales > Clorofila
# Teoría celular | Principios fundamentales
- Unidad estructural: todos los seres vivos están formados por células > Schleiden y Schwann
- Unidad funcional: en la célula ocurren las funciones vitales > Metabolismo
- Unidad de origen: toda célula proviene de otra célula > Virchow`,
    example:
      "Las células del músculo tienen muchísimas **mitocondrias** porque necesitan mucha energía para contraerse; en cambio, las células de la piel tienen menos.",
    apply: [
      [
        "Observas al microscopio una célula con pared celular y cloroplastos. ¿De qué tipo es?",
        "Es una célula vegetal (eucariota).",
      ],
    ],
    question: "¿Por qué una célula vegetal necesita cloroplastos y una animal no?",
  },
  {
    id: "fotosintesis",
    keys: ["fotosintesis", "clorofila", "cloroplasto"],
    title: "Fotosíntesis",
    area: "ciencias",
    intro:
      "La **fotosíntesis** es el proceso por el cual plantas, algas y algunas bacterias transforman la energía de la luz en energía química: fabrican **glucosa** y liberan **oxígeno**.",
    map: `
# Lo que necesita la planta | Materias primas del proceso
- Luz solar: es la fuente de energía y la capta la clorofila > Pigmento verde
- Agua: la absorben las raíces y sube por el tallo > H₂O
- Dióxido de carbono: entra desde el aire por los estomas de las hojas > CO₂
#> Fases de la fotosíntesis | Dos etapas dentro del cloroplasto
- Fase luminosa: ocurre en los tilacoides, donde la luz rompe el agua y se libera oxígeno > Produce ATP y NADPH
- Fase oscura o ciclo de Calvin: ocurre en el estroma, donde se fija el CO₂ y se forma glucosa > No necesita luz directa
# Productos | Resultado del proceso
- Glucosa: es el alimento y la fuente de energía de la planta > C₆H₁₂O₆
- Oxígeno: se libera a la atmósfera > El O₂ que respiramos
- Ecuación general: 6 CO₂ + 6 H₂O + luz → C₆H₁₂O₆ + 6 O₂ > Reactivos → productos
# Importancia | Por qué es vital para la vida
- Base de las cadenas tróficas: los productores alimentan a todos los demás seres vivos > Herbívoros
- Oxígeno atmosférico: mantiene la respiración de casi todos los seres vivos > Atmósfera
- Regulación del clima: absorbe CO₂, un gas de efecto invernadero > Bosques; Fitoplancton`,
    example:
      "Si cubres una hoja con papel aluminio durante varios días, esa zona se pone amarillenta: sin **luz** no hay fotosíntesis y la planta deja de fabricar glucosa y clorofila allí.",
    apply: [
      [
        "En un acuario con plantas aparecen burbujas en las hojas cuando les da el sol. ¿Qué gas es?",
        "Oxígeno, liberado en la fase luminosa de la fotosíntesis.",
      ],
    ],
    question: "¿Por qué se dice que sin fotosíntesis no existirían los animales?",
  },
  {
    id: "genetica",
    keys: ["genetica", "adn", "herencia", "mendel", "cromosomas", "genes"],
    title: "Genética y ADN",
    area: "ciencias",
    intro:
      "La **genética** estudia la herencia biológica: cómo se transmiten las características de padres a hijos a través del **ADN** y los **genes**.",
    map: `
# El ADN | Molécula de la herencia
- Estructura del ADN: es una doble hélice formada por nucleótidos > Watson y Crick (1953)
- Bases nitrogenadas: son adenina, timina, citosina y guanina > A con T; C con G
- Función del ADN: guarda las instrucciones para fabricar proteínas > Código genético
#> Del nucleótido al genoma | Niveles de organización del material genético
- Nucleótido: es la unidad del ADN, con azúcar, fosfato y una base > Desoxirribosa
- Gen: es un fragmento de ADN que contiene la información de una característica > Color de ojos
- Cromosoma: es ADN muy enrollado y compactado > 46 en humanos (23 pares)
- Genoma: es todo el ADN de un organismo > Unos 20 000 genes humanos
# Leyes de Mendel | Bases de la herencia clásica
- Ley de la uniformidad: al cruzar razas puras, toda la primera generación es igual > Generación F1
- Ley de la segregación: los alelos se separan al formar los gametos > Proporción 3:1
- Ley de la transmisión independiente: los caracteres se heredan por separado > Proporción 9:3:3:1
# Conceptos clave | Vocabulario de la genética
- Alelo: es cada versión de un mismo gen > Dominante (A); Recesivo (a)
- Genotipo y fenotipo: son la combinación genética y el rasgo visible > AA, Aa, aa
- Mutación: es un cambio en el ADN que puede generar variabilidad > Motor de la evolución`,
    example:
      "Dos padres con ojos marrones (Aa) pueden tener un hijo con ojos claros (aa): cada uno le transmite el **alelo recesivo**. Por eso hay una probabilidad de 1 en 4.",
    apply: [
      [
        "Cruzas una planta Aa con otra Aa. ¿Qué proporción de la descendencia mostrará el rasgo recesivo?",
        "Un 25 % (1 de cada 4), los que resulten aa.",
      ],
    ],
    question:
      "¿Por qué dos hermanos con los mismos padres no son genéticamente idénticos (salvo los gemelos)?",
  },
  {
    id: "ecosistema",
    keys: [
      "ecosistema",
      "ecosistemas",
      "ecologia",
      "cadena alimenticia",
      "cadena trofica",
      "biodiversidad",
    ],
    title: "Ecosistemas",
    area: "ciencias",
    intro:
      "Un **ecosistema** es el sistema formado por los seres vivos (**biocenosis**), el medio físico donde viven (**biotopo**) y las relaciones entre ellos.",
    map: `
# Componentes | Factores del ecosistema
- Factores bióticos: son los seres vivos del ecosistema > Plantas; Animales; Hongos
- Factores abióticos: son las condiciones físicas y químicas del medio > Luz; Agua; Temperatura; Suelo
- Hábitat y nicho: son el lugar donde vive una especie y la función que cumple > Rol ecológico
#> Cadena trófica | Flujo de energía entre niveles
- Productores: fabrican su propio alimento por fotosíntesis > Plantas; Algas
- Consumidores primarios: son herbívoros que se alimentan de productores > Conejo
- Consumidores secundarios: son carnívoros que se alimentan de herbívoros > Zorro; Águila
- Descomponedores: reciclan la materia orgánica y la devuelven al suelo > Hongos; Bacterias
# Relaciones entre especies | Interacciones biológicas
- Depredación: un organismo caza y se alimenta de otro > León y cebra
- Mutualismo: ambas especies se benefician > Abeja y flor
- Parasitismo: una especie se beneficia perjudicando a otra > Garrapata
- Comensalismo: una especie se beneficia sin afectar a la otra > Rémora y tiburón
# Tipos de ecosistema | Según el medio
- Ecosistemas terrestres: incluyen bosques, desiertos y praderas > Selva amazónica
- Ecosistemas acuáticos: pueden ser marinos o de agua dulce > Mar peruano; Lago Titicaca
- Amenazas: son la deforestación, la contaminación y el cambio climático > Pérdida de biodiversidad`,
    example:
      "En el mar peruano, el **fitoplancton** (productor) alimenta a la **anchoveta** (consumidor primario), que a su vez es alimento de aves guaneras y lobos marinos (consumidores secundarios).",
    apply: [
      [
        "Si desaparecen los zorros de un ecosistema, ¿qué pasará probablemente con la población de conejos?",
        "Aumentará al principio, porque pierde a su depredador, y luego podría agotar las plantas de las que se alimenta.",
      ],
    ],
    question:
      "¿Por qué los descomponedores son indispensables aunque no aparezcan en la parte alta de la cadena trófica?",
  },
  {
    id: "atomo",
    keys: ["atomo", "atomos", "tabla periodica", "modelo atomico", "electrones", "protones"],
    title: "El átomo y la tabla periódica",
    area: "exactas",
    intro:
      "El **átomo** es la unidad más pequeña de un elemento químico que conserva sus propiedades. Tiene un **núcleo** con protones y neutrones, rodeado de **electrones**.",
    map: `
# Partículas subatómicas | Componentes del átomo
- Protones: tienen carga positiva y están en el núcleo > Definen el elemento
- Neutrones: no tienen carga y están en el núcleo > Originan los isótopos
- Electrones: tienen carga negativa y se mueven alrededor del núcleo > Forman los enlaces
# Números del átomo | Identifican a cada átomo
- Número atómico (Z): es la cantidad de protones > Carbono: Z = 6
- Número másico (A): es la suma de protones y neutrones > A = Z + N
- Isótopos: son átomos del mismo elemento con distinto número de neutrones > Carbono-12; Carbono-14
#> Modelos atómicos | Evolución de la idea del átomo
- Modelo de Dalton: propone esferas macizas e indivisibles > 1808
- Modelo de Thomson: propone electrones incrustados en una masa positiva > 1904
- Modelo de Rutherford: descubre un núcleo pequeño, denso y positivo > 1911
- Modelo de Bohr: ubica a los electrones en niveles de energía > 1913; Base del modelo actual
# Tabla periódica | Organización de los 118 elementos
- Periodos: son las 7 filas horizontales e indican niveles de energía > Periodo 2: del Li al Ne
- Grupos: son las 18 columnas con propiedades semejantes > Grupo 1: metales alcalinos
- Familias de elementos: se distinguen metales, no metales y gases nobles > Sodio; Oxígeno; Neón`,
    example:
      "El **carbono-14** es un isótopo que se desintegra lentamente; midiendo cuánto queda en un hueso antiguo, los arqueólogos calculan su edad (datación por radiocarbono).",
    apply: [
      [
        "Un átomo tiene 11 protones y 12 neutrones. ¿Cuál es su número atómico y su número másico?",
        "Z = 11 (es sodio) y A = 11 + 12 = 23.",
      ],
    ],
    question:
      "¿Por qué los elementos de un mismo grupo de la tabla periódica tienen propiedades parecidas?",
  },
  {
    id: "newton",
    keys: ["leyes de newton", "newton", "dinamica", "inercia", "fuerza", "fuerzas"],
    title: "Leyes de Newton",
    area: "exactas",
    intro:
      "Las **leyes de Newton** (1687) explican la relación entre las fuerzas y el movimiento de los cuerpos. Son la base de la mecánica clásica.",
    map: `
#> Las tres leyes | Principios de la dinámica
- Primera ley o inercia: un cuerpo mantiene su reposo o su movimiento uniforme si ninguna fuerza neta actúa sobre él > Frenazo del bus
- Segunda ley: la fuerza neta es igual a la masa por la aceleración, F = m · a > Unidad: newton (N)
- Tercera ley o acción y reacción: a toda acción le corresponde una reacción igual y opuesta > Cohete; Remar
# Tipos de fuerza | Fuerzas frecuentes en los problemas
- Peso: es la fuerza con que la Tierra atrae a un cuerpo, P = m · g > g = 9,8 m/s²
- Fuerza normal: es la fuerza perpendicular que ejerce una superficie > Mesa que sostiene un libro
- Rozamiento: es la fuerza que se opone al deslizamiento > Frenos; Suela de zapatillas
- Tensión: es la fuerza transmitida por cuerdas o cables > Polea
# Conceptos clave | Vocabulario de la dinámica
- Masa: es la cantidad de materia y mide la inercia de un cuerpo > Kilogramo (kg)
- Fuerza neta: es la suma vectorial de todas las fuerzas > Resultante
- Diagrama de cuerpo libre: es el dibujo de todas las fuerzas que actúan sobre un cuerpo > Primer paso para resolver`,
    example:
      "Cuando el bus frena de golpe, tu cuerpo se va hacia adelante: por **inercia** tiendes a seguir moviéndote a la velocidad que llevabas.",
    apply: [
      [
        "Empujas una caja de 10 kg con una fuerza neta de 20 N. ¿Cuál es su aceleración?",
        "a = F ÷ m = 20 N ÷ 10 kg = 2 m/s².",
      ],
    ],
    question:
      "Si la Tierra te atrae con tu peso, ¿por qué tú también atraes a la Tierra según la tercera ley?",
  },
  {
    id: "energia",
    keys: ["energia", "energias"],
    title: "La energía",
    area: "exactas",
    intro:
      "La **energía** es la capacidad de un sistema para realizar trabajo o producir cambios. Se mide en **julios (J)** y se transforma constantemente.",
    map: `
# Formas de energía | Manifestaciones principales
- Energía cinética: está asociada al movimiento, Ec = ½ m v² > Viento; Auto en marcha
- Energía potencial: está asociada a la posición o la deformación, Ep = m g h > Represa; Resorte
- Energía térmica y química: corresponden al calor y a la energía de los enlaces > Combustibles; Alimentos
- Energía eléctrica: se debe al movimiento de cargas eléctricas > Batería; Enchufe
# Fuentes de energía | Origen de la energía que usamos
- Fuentes renovables: se regeneran de forma natural > Solar; Eólica; Hidráulica
- Fuentes no renovables: se agotan porque tardan millones de años en formarse > Petróleo; Gas; Carbón
- Impacto ambiental: los combustibles fósiles emiten CO₂ > Efecto invernadero
# Conservación de la energía | La energía se transforma
- Principio de conservación: la energía no se crea ni se destruye, solo se transforma > Energía total constante
- Transformaciones: una forma de energía se convierte en otra > Eléctrica → luminosa
- Eficiencia: parte de la energía se disipa como calor > Foco LED frente a incandescente
# Trabajo y potencia | Magnitudes relacionadas
- Trabajo: es la fuerza por la distancia recorrida en su dirección, W = F · d > Julio (J)
- Potencia: es el trabajo realizado por unidad de tiempo, P = W / t > Vatio (W)`,
    example:
      "Una central hidroeléctrica aprovecha la **energía potencial** del agua embalsada: al caer se vuelve **cinética**, mueve turbinas y se transforma en **energía eléctrica**.",
    apply: [
      [
        "Levantas una mochila de 5 kg hasta 2 m de altura. ¿Cuánta energía potencial gana? (g = 10 m/s²)",
        "Ep = m · g · h = 5 · 10 · 2 = 100 J.",
      ],
    ],
    question: "Si la energía no se destruye, ¿por qué se dice que «ahorramos energía»?",
  },
  {
    id: "fracciones",
    keys: ["fraccion", "fracciones", "numerador", "denominador"],
    title: "Fracciones",
    area: "exactas",
    intro:
      "Una **fracción** representa una o varias partes iguales de una unidad. Se escribe a/b, donde **a** es el numerador y **b** el denominador (b ≠ 0).",
    map: `
# Elementos | Partes de una fracción
- Numerador: indica cuántas partes se toman > El 3 en 3/4
- Denominador: indica en cuántas partes iguales se divide la unidad > El 4 en 3/4
- Fracción como división: a/b equivale a dividir a ÷ b > 3/4 = 0,75
# Clasificación | Tipos de fracciones
- Fracciones propias: el numerador es menor que el denominador y valen menos que 1 > 2/5
- Fracciones impropias: el numerador es mayor o igual y valen 1 o más > 7/4 = 1 entero y 3/4
- Fracciones equivalentes: representan la misma cantidad > 1/2 = 2/4 = 3/6
# Operaciones | Cómo operar con fracciones
- Suma y resta: con igual denominador se suman los numeradores y, si no, se busca el MCM > 1/2 + 1/4 = 3/4
- Multiplicación: se multiplica numerador por numerador y denominador por denominador > 2/3 · 3/5 = 2/5
- División: se multiplica por la fracción inversa > 1/2 ÷ 1/4 = 2
#> Simplificación | Cómo llegar a la fracción irreducible
- Buscar un divisor común: se dividen numerador y denominador por el mismo número > 6/8 = 3/4
- Usar el MCD: dividir por el máximo común divisor simplifica de una vez > MCD(12, 18) = 6
- Fracción irreducible: es la que ya no se puede simplificar más > 2/3`,
    example:
      "Si una pizza tiene 8 tajadas y comes 3, comiste **3/8**; si tu amigo come 2/8, entre los dos comieron 3/8 + 2/8 = **5/8** (mismo denominador: solo se suman los numeradores).",
    apply: [
      [
        "Ana leyó 2/5 de un libro el lunes y 1/5 el martes. ¿Qué fracción le falta leer?",
        "Leyó 3/5, así que le faltan 5/5 − 3/5 = 2/5.",
      ],
    ],
    question: "¿Por qué para sumar 1/2 + 1/3 no basta con sumar numeradores y denominadores?",
  },
  {
    id: "ecuaciones",
    keys: ["ecuacion", "ecuaciones", "algebra", "incognita"],
    title: "Ecuaciones",
    area: "exactas",
    intro:
      "Una **ecuación** es una igualdad entre dos expresiones que contiene una o más **incógnitas**. Resolverla es encontrar el valor que hace verdadera la igualdad.",
    map: `
# Elementos | Partes de una ecuación
- Miembros: son las expresiones a cada lado del signo igual > Primer miembro = segundo miembro
- Incógnita: es la letra que representa el valor desconocido > x, y, z
- Coeficiente: es el número que multiplica a la incógnita > En 3x, el coeficiente es 3
# Tipos de ecuación | Según el grado
- Primer grado: la incógnita tiene exponente 1 > 2x + 3 = 11
- Segundo grado: la incógnita aparece al cuadrado, ax² + bx + c = 0 > Fórmula general
- Sistemas de ecuaciones: tienen varias ecuaciones con varias incógnitas > Sustitución; Reducción
#> Pasos para resolver | Ecuación de primer grado
- Agrupar términos: se pasan los términos con x a un lado y los números al otro > Cambian de signo al pasar
- Reducir: se suman los términos semejantes > 2x = 8
- Despejar: se divide entre el coeficiente de la incógnita > x = 4
- Comprobar: se reemplaza el resultado en la ecuación original > 2(4) + 3 = 11 ✓
# Fórmula general | Ecuación de segundo grado
- Fórmula cuadrática: x = (−b ± √(b² − 4ac)) / 2a > Hasta dos soluciones
- Discriminante: Δ = b² − 4ac indica cuántas soluciones reales hay > Δ positivo: dos; Δ = 0: una; Δ negativo: ninguna real`,
    example:
      "Si 3 cuadernos y un lapicero de S/ 2 cuestan S/ 17, planteas 3x + 2 = 17 → 3x = 15 → **x = 5**: cada cuaderno cuesta S/ 5.",
    apply: [["Resuelve 5x − 7 = 2x + 8.", "5x − 2x = 8 + 7 → 3x = 15 → x = 5."]],
    question: "¿Por qué al pasar un término al otro lado de la ecuación cambia de signo?",
  },
  {
    id: "derivadas",
    keys: ["derivada", "derivadas", "calculo diferencial"],
    title: "Derivadas",
    area: "exactas",
    intro:
      "La **derivada** mide la rapidez con que cambia una función. Geométricamente es la **pendiente de la recta tangente** a la curva en un punto.",
    map: `
# Concepto | Qué representa la derivada
- Tasa de cambio instantánea: indica cuánto varía f(x) cuando x cambia muy poco > Velocidad instantánea
- Definición formal: es el límite de [f(x + h) − f(x)] / h cuando h tiende a 0 > Cociente incremental
- Notación: se escribe f′(x), dy/dx o Df > Lagrange; Leibniz
# Reglas de derivación | Derivadas más usadas
- Regla de la constante: la derivada de una constante es 0 > (5)′ = 0
- Regla de la potencia: (xⁿ)′ = n · xⁿ⁻¹ > (x³)′ = 3x²
- Regla del producto: (f · g)′ = f′ · g + f · g′ > (x · sen x)′
- Regla de la cadena: se deriva la función externa y se multiplica por la derivada de la interna > (sen 2x)′ = 2 cos 2x
# Aplicaciones | Para qué sirve la derivada
- Máximos y mínimos: se encuentran donde f′(x) = 0 > Optimización
- Crecimiento: si f′(x) es positiva la función crece y si es negativa decrece > Monotonía
- Física: la velocidad es la derivada de la posición respecto al tiempo > v = dx/dt`,
    example:
      "Si la posición de un auto es x(t) = 5t² metros, su velocidad es la derivada: v(t) = **10t**. A los 3 segundos va a 30 m/s.",
    apply: [["Deriva f(x) = 4x³ − 2x + 7.", "f′(x) = 12x² − 2 (la constante 7 se anula)."]],
    question: "¿Qué significa que la derivada de una función sea cero en un punto?",
  },
  {
    id: "revolucion-francesa",
    keys: ["revolucion francesa", "bastilla", "robespierre"],
    title: "Revolución Francesa",
    area: "sociales",
    intro:
      "La **Revolución Francesa** (1789–1799) acabó con el absolutismo en Francia, difundió los ideales de **libertad, igualdad y fraternidad** y marcó el inicio de la Edad Contemporánea.",
    map: `
# Causas | Factores que provocaron la revolución
- Crisis económica: el Estado estaba endeudado y las malas cosechas encarecieron el pan > Hambre
- Desigualdad social: el Tercer Estado pagaba impuestos sin tener privilegios > Clero; Nobleza; Tercer Estado
- Ideas ilustradas: defendían la razón, la soberanía popular y la división de poderes > Rousseau; Montesquieu
#> Etapas | Desarrollo del proceso
- Monarquía constitucional (1789–1792): se reúnen los Estados Generales, cae la Bastilla y se proclaman los Derechos del Hombre > 14 de julio de 1789
- República y Terror (1792–1794): se ejecuta a Luis XVI y gobiernan los jacobinos > Robespierre
- Directorio (1795–1799): gobierna un régimen moderado e inestable > Golpe de Napoleón (1799)
# Consecuencias | Impacto del proceso
- Fin del absolutismo: la soberanía pasa del rey a la nación > Constitución
- Derechos ciudadanos: se establece la igualdad ante la ley > Declaración de 1789
- Difusión en el mundo: inspira las independencias americanas > Liberalismo; Nacionalismo
# Personajes | Actores principales
- Luis XVI: fue el rey guillotinado en 1793 > María Antonieta
- Robespierre: fue el líder jacobino del periodo del Terror > Comité de Salvación Pública
- Napoleón Bonaparte: cerró la revolución con el Consulado > 18 de brumario`,
    example:
      "La toma de la **Bastilla** (14 de julio de 1789) fue simbólica: era una prisión que representaba el poder absoluto del rey. Hoy es la fiesta nacional de Francia.",
    apply: [
      [
        "¿Por qué la Revolución Francesa influyó en la independencia del Perú?",
        "Porque difundió ideas de soberanía popular y libertad que inspiraron a los criollos a cuestionar el dominio español.",
      ],
    ],
    question:
      "¿Cuál de las causas de la Revolución Francesa crees que fue decisiva? Justifica tu respuesta.",
  },
  {
    id: "independencia-peru",
    keys: ["independencia del peru", "independencia", "san martin", "ayacucho", "emancipacion"],
    title: "Independencia del Perú",
    area: "sociales",
    intro:
      "La **independencia del Perú** fue el proceso por el cual el país se separó de España. Se proclamó el **28 de julio de 1821** y se consolidó con la batalla de **Ayacucho (1824)**.",
    map: `
# Causas | Factores del proceso emancipador
- Causas internas: el descontento criollo, las reformas borbónicas y las rebeliones previas > Túpac Amaru II (1780)
- Causas externas: la Ilustración, la independencia de EE. UU., la Revolución Francesa y la invasión napoleónica a España > 1808
#> Etapas | Desarrollo del proceso
- Rebeliones precursoras: hubo levantamientos indígenas y criollos > Túpac Amaru II (1780); Zela (1811); Pumacahua (1814)
- Corriente libertadora del sur: José de San Martín desembarca en Paracas > 8 de septiembre de 1820
- Proclamación: San Martín proclama la independencia en Lima > 28 de julio de 1821
- Consolidación: Bolívar y Sucre vencen a los realistas > Junín (6 de agosto de 1824); Ayacucho (9 de diciembre de 1824)
# Personajes | Protagonistas del proceso
- José de San Martín: fue el libertador argentino y primer Protector del Perú > Bandera; Himno
- Simón Bolívar: fue el libertador venezolano que culminó la guerra > Junín
- Antonio José de Sucre: fue el vencedor de la batalla de Ayacucho > Capitulación de Ayacucho
# Consecuencias | Resultados del proceso
- Nace la República: se forma un nuevo Estado independiente > Primer Congreso (1822)
- Continuidades sociales: se mantuvieron el tributo indígena y la esclavitud por décadas > Abolidos en 1854
- Inestabilidad política: predominaron los caudillos militares en los primeros años > Primer militarismo`,
    example:
      "Aunque el Perú se declaró independiente en 1821, el virrey seguía controlando gran parte del territorio: la independencia solo se **consolidó** tras la **capitulación de Ayacucho** en diciembre de 1824.",
    apply: [
      [
        "¿Por qué se dice que la independencia no cambió de inmediato la situación de indígenas y esclavos?",
        "Porque el tributo indígena y la esclavitud continuaron hasta 1854: cambió el gobierno, pero no la estructura social.",
      ],
    ],
    question:
      "¿Por qué fue necesaria la llegada de Bolívar si San Martín ya había proclamado la independencia?",
  },
  {
    id: "incas",
    keys: ["incas", "inca", "tahuantinsuyo", "imperio incaico"],
    title: "El Imperio inca",
    area: "sociales",
    intro:
      "El **Imperio inca** o **Tahuantinsuyo** fue el Estado más extenso de la América prehispánica (siglos XV y XVI), con capital en el **Cusco**.",
    map: `
# Organización política | Un Estado centralizado
- Sapa Inca: era el gobernante absoluto, considerado hijo del Sol > Pachacútec; Huayna Cápac
- Los cuatro suyos: el territorio se dividía en Chinchaysuyo, Collasuyo, Antisuyo y Contisuyo > Centro: Cusco
- Funcionarios: gobernadores y curacas administraban las regiones > Tucuyricuy (supervisor)
# Economía | Basada en la agricultura y la reciprocidad
- Ayllu: era la comunidad de familias que compartía tierras > Base social
- Reciprocidad: el trabajo se intercambiaba entre familias y con el Estado > Ayni; Minka; Mita
- Agricultura: usaba andenes, camellones y canales de riego > Papa; Maíz; Quinua
# Logros culturales | Aportes tecnológicos y artísticos
- Qhapaq Ñan: era una red de caminos de más de 30 000 km > Chasquis
- Arquitectura: ensamblaba piedras sin argamasa > Machu Picchu; Sacsayhuamán
- Quipus: eran cuerdas con nudos para registrar datos > Contabilidad
#> Expansión y caída | Del curacazgo al imperio
- Origen: según la leyenda, Manco Cápac y Mama Ocllo fundaron el Cusco > Lago Titicaca
- Expansión: Pachacútec convirtió el reino en imperio > Siglo XV
- Guerra civil: Huáscar y Atahualpa se disputaron el poder > 1529–1532
- Conquista: Pizarro capturó a Atahualpa en Cajamarca > 1532`,
    example:
      "Los **andenes** son terrazas de cultivo en las laderas: evitan la erosión, aprovechan el agua y crean microclimas. Muchos se siguen usando hoy en el valle del Colca.",
    apply: [
      [
        "¿Cómo se comunicaba rápidamente un territorio tan extenso sin escritura alfabética?",
        "Con los chasquis, que corrían por el Qhapaq Ñan llevando mensajes y quipus en relevos.",
      ],
    ],
    question: "¿Por qué la guerra civil entre Huáscar y Atahualpa facilitó la conquista española?",
  },
  {
    id: "primera-guerra",
    keys: ["primera guerra mundial", "gran guerra"],
    title: "Primera Guerra Mundial",
    area: "sociales",
    intro:
      "La **Primera Guerra Mundial** (1914–1918) enfrentó a la Triple Entente con las Potencias Centrales. Causó millones de muertes y transformó el mapa de Europa.",
    map: `
# Causas | Factores del conflicto
- Imperialismo: las potencias competían por colonias y mercados > África; Asia
- Nacionalismo: aumentaron las rivalidades entre naciones y la carrera armamentista > Paz armada
- Sistema de alianzas: la Triple Entente se enfrentaba a la Triple Alianza > Francia, Reino Unido y Rusia
- Detonante: el archiduque Francisco Fernando fue asesinado en Sarajevo > 28 de junio de 1914
#> Fases | Desarrollo de la guerra
- Guerra de movimientos (1914): el avance alemán fue frenado en el Marne > Plan Schlieffen
- Guerra de trincheras (1915–1917): los frentes se estancaron con enorme desgaste > Verdún; Somme
- Fin del conflicto (1917–1918): entró EE. UU., salió Rusia y se rindieron las Potencias Centrales > Armisticio: 11 de noviembre de 1918
# Consecuencias | Resultados de la guerra
- Consecuencias humanas: murieron unos 10 millones de soldados > Crisis demográfica
- Consecuencias políticas: cayeron los imperios alemán, austrohúngaro, ruso y otomano > Nuevos países
- Tratado de Versalles: impuso duras sanciones a Alemania > 1919; Sociedad de Naciones`,
    example:
      "Las **trincheras** eran zanjas donde los soldados vivían durante meses entre barro y enfermedades; avanzar unos metros podía costar miles de vidas, como en la batalla del Somme.",
    apply: [
      [
        "¿Por qué el asesinato de un archiduque desencadenó una guerra mundial?",
        "Por el sistema de alianzas: al declararse la guerra Austria-Hungría y Serbia, sus aliados entraron en cadena.",
      ],
    ],
    question:
      "¿Cómo crees que el Tratado de Versalles influyó en el inicio de la Segunda Guerra Mundial?",
  },
  {
    id: "segunda-guerra",
    keys: ["segunda guerra mundial"],
    title: "Segunda Guerra Mundial",
    area: "sociales",
    intro:
      "La **Segunda Guerra Mundial** (1939–1945) enfrentó a los **Aliados** contra el **Eje** (Alemania, Italia y Japón). Fue el conflicto más destructivo de la historia.",
    map: `
# Causas | Origen del conflicto
- Tratado de Versalles: generó resentimiento en Alemania por las duras sanciones > Revanchismo
- Crisis de 1929: el desempleo y la pobreza favorecieron a los extremismos > Gran Depresión
- Totalitarismos: surgieron el nazismo, el fascismo y el militarismo japonés > Hitler; Mussolini
- Detonante: Alemania invadió Polonia > 1 de septiembre de 1939
#> Fases | Desarrollo de la guerra
- Ofensiva del Eje (1939–1942): la guerra relámpago permitió ocupar gran parte de Europa > Blitzkrieg
- Giro de la guerra (1942–1943): el Eje sufrió sus primeras grandes derrotas > Stalingrado; Midway
- Victoria aliada (1944–1945): llegaron el desembarco de Normandía, la caída de Berlín y las bombas atómicas > Día D; Hiroshima y Nagasaki
# Consecuencias | Resultados de la guerra
- Consecuencias humanas: murieron más de 50 millones de personas y ocurrió el Holocausto > Genocidio judío
- Consecuencias políticas: nació la ONU y Alemania quedó dividida > 1945
- Guerra Fría: comenzó la rivalidad entre EE. UU. y la URSS > Bloques capitalista y comunista`,
    example:
      "La **ONU** se creó en 1945 para evitar otra guerra mundial: reemplazó a la Sociedad de Naciones, que había fracasado en detener a los regímenes totalitarios.",
    apply: [
      [
        "¿Por qué la crisis de 1929 ayudó al ascenso de Hitler?",
        "Porque el desempleo y la pobreza hicieron que muchos alemanes apoyaran soluciones extremas que prometían recuperar el país.",
      ],
    ],
    question:
      "¿Qué relación hay entre el final de la Segunda Guerra Mundial y el inicio de la Guerra Fría?",
  },
  {
    id: "figuras-literarias",
    keys: [
      "figuras literarias",
      "figura literaria",
      "recursos literarios",
      "metafora",
      "hiperbole",
      "simil",
    ],
    title: "Figuras literarias",
    area: "letras",
    intro:
      "Las **figuras literarias** son recursos del lenguaje que se apartan del uso común para dar belleza, fuerza o expresividad a un texto.",
    map: `
# Figuras de significado | Cambian el sentido habitual de las palabras
- Metáfora: identifica una realidad con otra sin usar nexo > «Tus dientes son perlas»
- Símil: compara dos realidades con un nexo como «como» o «cual» > «Fuerte como un roble»
- Hipérbole: exagera para enfatizar una idea > «Te lo dije mil veces»
- Personificación: atribuye cualidades humanas a seres inanimados > «La luna sonríe»
# Figuras de repetición | Repiten sonidos o palabras
- Anáfora: repite una palabra al inicio de varios versos > «Temprano levantó la muerte el vuelo, temprano madrugó la madrugada»
- Aliteración: repite un mismo sonido > «El ruido con que rueda la ronca tempestad»
- Polisíndeton: repite conjunciones > «Y canta, y ríe, y salta»
# Figuras de contraste | Oponen ideas
- Antítesis: contrapone dos ideas opuestas > «Es tan corto el amor y es tan largo el olvido»
- Oxímoron: une dos términos contradictorios > «Silencio atronador»
- Ironía: da a entender lo contrario de lo que se dice > «¡Qué día tan bonito!» (bajo la lluvia)`,
    example:
      "Si dices «estoy muerto de cansancio», usas una **hipérbole**: exageras para expresar que estás muy cansado, no que hayas muerto.",
    apply: [
      [
        "Identifica la figura: «Sus manos eran dos palomas blancas».",
        "Metáfora: identifica las manos con palomas sin usar «como».",
      ],
    ],
    question: "¿Qué diferencia hay entre una metáfora y un símil? Crea un ejemplo de cada uno.",
  },
  {
    id: "acentuacion",
    keys: ["acentuacion", "tildacion", "tilde", "tildes", "agudas", "esdrujulas", "acento"],
    title: "Reglas de acentuación",
    area: "letras",
    intro:
      "La **acentuación** indica qué sílaba se pronuncia con más fuerza (**sílaba tónica**) y cuándo esa fuerza se marca con **tilde** según las reglas generales.",
    map: `
# Reglas generales | Según la posición de la sílaba tónica
- Palabras agudas: tienen la tónica en la última sílaba y llevan tilde si terminan en n, s o vocal > Canción; Café; Reloj (sin tilde)
- Palabras graves: tienen la tónica en la penúltima y llevan tilde si no terminan en n, s o vocal > Árbol; Lápiz; Examen (sin tilde)
- Palabras esdrújulas: tienen la tónica en la antepenúltima y siempre llevan tilde > Música; Teléfono
# Tilde diacrítica | Distingue palabras que se escriben igual
- Él y el: él es pronombre y el es artículo > Él trajo el libro
- Tú y tu: tú es pronombre y tu es posesivo > Tú tienes tu cuaderno
- Sí y si: sí afirma y si expresa condición > Sí iré si no llueve
# Diptongo e hiato | Encuentros de vocales
- Diptongo: dos vocales en una misma sílaba siguen las reglas generales > Ciudad; Huésped
- Hiato: las vocales están en sílabas distintas > Po-e-ta
- Hiato con vocal cerrada tónica: siempre lleva tilde sobre la i o la u > Día; Baúl; País
# Interrogativos y exclamativos | Qué, quién, cómo, cuándo, dónde
- Con tilde: llevan tilde cuando preguntan o exclaman > ¿Qué estudias?
- Sin tilde: no la llevan cuando funcionan como relativos > Lo que estudias`,
    example:
      "«**Tú** sabes que **tu** examen es mañana»: el primer «tú» es pronombre (lleva tilde diacrítica) y el segundo es posesivo (sin tilde).",
    apply: [
      [
        "¿Por qué «reloj» no lleva tilde aunque sea aguda?",
        "Porque termina en j, no en n, s ni vocal.",
      ],
    ],
    question: "¿Por qué «país» lleva tilde si las agudas terminadas en s ya la llevan? ¿Y «ataúd»?",
  },
  {
    id: "memoria",
    keys: ["memoria", "olvido", "repaso espaciado", "tecnicas de estudio"],
    title: "La memoria",
    area: "humanidades",
    intro:
      "La **memoria** es el proceso psicológico que permite codificar, almacenar y recuperar información. Sin memoria no habría aprendizaje.",
    map: `
#> Etapas de la memoria | Procesamiento de la información
- Codificación: transforma la información para poder guardarla > Requiere atención
- Almacenamiento: mantiene la información a lo largo del tiempo > Se consolida durante el sueño
- Recuperación: permite acceder a la información guardada > Evocar; Reconocer
# Tipos de memoria | Modelo de Atkinson y Shiffrin
- Memoria sensorial: retiene los estímulos durante milisegundos > Icónica; Ecoica
- Memoria a corto plazo: retiene unos 7 elementos durante segundos > Recordar un número de teléfono
- Memoria a largo plazo: tiene una capacidad casi ilimitada > Explícita; Implícita
# Memoria a largo plazo | Subtipos
- Memoria episódica: guarda recuerdos de experiencias personales > Tu último cumpleaños
- Memoria semántica: guarda conocimientos y significados > La capital de Francia
- Memoria procedimental: guarda habilidades y hábitos > Montar bicicleta
# Estrategias para recordar | Técnicas de estudio con respaldo científico
- Repaso espaciado: consiste en repasar en días distintos > Flashcards; Curva del olvido
- Recuperación activa: consiste en ponerse a prueba en vez de releer > Autoevaluación
- Elaboración: consiste en relacionar lo nuevo con lo que ya sabes > Ejemplos propios`,
    example:
      "Si estudias 20 minutos hoy, 10 mañana y 5 dentro de una semana, recordarás mucho más que estudiando una hora la noche anterior: es el efecto del **repaso espaciado**.",
    apply: [
      [
        "Recuerdas cómo nadar aunque no lo hagas hace años. ¿Qué tipo de memoria interviene?",
        "La memoria procedimental, que guarda habilidades motoras.",
      ],
    ],
    question: "¿Por qué dormir bien antes de un examen ayuda a recordar lo estudiado?",
  },
];

const strip = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

function parseMap(map: string): TopicBranch[] {
  const branches: TopicBranch[] = [];
  for (const raw of map.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const head = line.match(/^#(>)?\s*(.+?)\s*\|\s*(.+)$/);
    if (head) {
      branches.push({
        label: head[2]!,
        summary: head[3]!,
        points: [],
        ...(head[1] ? { ordered: true } : {}),
      });
      continue;
    }
    const pt = line.match(/^-\s*(.+?):\s*(.+?)(?:\s+>\s+(.+))?$/);
    const branch = branches[branches.length - 1];
    if (!pt || !branch) continue;
    const items = pt[3]
      ? pt[3]
          .split(";")
          .map((x) => x.trim())
          .filter(Boolean)
      : [];
    branch.points.push({ label: pt[1]!, detail: pt[2]!, ...(items.length ? { items } : {}) });
  }
  return branches;
}

export const TOPICS: Topic[] = [...RAW, ...PERU_HISTORY].map(({ map, apply, keys, ...t }) => ({
  ...t,
  keys: keys.map(strip),
  branches: parseMap(map),
  apply: apply ?? [],
}));
