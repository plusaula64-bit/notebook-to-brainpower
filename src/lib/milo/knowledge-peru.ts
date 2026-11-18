// Historia del Perú con periodización precisa (siguiendo a Jorge Basadre y los textos escolares peruanos).
// Cada etapa es un tema propio para que Milo nunca mezcle periodos (militarismos, guerra con Chile, etc.).
import type { RawTopic } from "./knowledge";

export const PERU_HISTORY: RawTopic[] = [
  {
    id: "historia-peru",
    keys: [
      "historia del peru",
      "historia de peru",
      "historia peruana",
      "peru republicano",
      "republica peruana",
      "etapas de la republica",
      "periodos de la republica",
    ],
    title: "Historia del Perú",
    area: "sociales",
    intro:
      "La **historia del Perú** se divide en grandes etapas: el **Perú antiguo** (culturas preíncas e incas), la **Conquista y el Virreinato** (1532–1821), la **Independencia** (proclamada en 1821 y consolidada en 1824) y la **República**, que a su vez tiene periodos bien diferenciados como el primer militarismo, la era del guano, la Guerra con Chile o el Oncenio de Leguía.",
    map: `
#> Perú antiguo | Desde los primeros pobladores hasta el Tahuantinsuyo
- Lítico y Arcaico: cazadores-recolectores y luego las primeras sociedades complejas > Pikimachay; Caral (c. 3000 a. C.)
- Horizonte temprano: Chavín difunde un culto religioso común en los Andes > Chavín de Huántar; Paracas
- Intermedio temprano y Horizonte medio: florecen Mochica y Nasca, y luego se expande el Estado Wari > Señor de Sipán; Líneas de Nasca; Wari
- Intermedio y Horizonte tardío: surgen reinos como Chimú y luego el Imperio inca > Chan Chan; Tahuantinsuyo (c. 1438–1532)
#> Conquista y Virreinato | Dominio español desde 1532 hasta la independencia
- Conquista (1532–1572): va de la captura de Atahualpa a la ejecución de Túpac Amaru I > Cajamarca (1532); Fundación de Lima (1535)
- Virreinato del Perú (desde 1542): gobierno colonial creado con las Leyes Nuevas > Primer virrey: Blasco Núñez Vela (1544)
- Reformas toledanas (1569–1581): el virrey Francisco de Toledo organiza reducciones y la mita minera > Potosí; Huancavelica
- Reformas borbónicas (siglo XVIII): aumentan impuestos y control, y provocan rebeliones > Túpac Amaru II (1780)
#> Independencia (1780–1824) | Proceso de emancipación
- Rebeliones precursoras: levantamientos indígenas y criollos contra el régimen colonial > Túpac Amaru II (1780); Zela (1811); Pumacahua (1814)
- Corriente libertadora del sur: San Martín desembarca en Paracas y proclama la independencia en Lima > 8 de septiembre de 1820; 28 de julio de 1821
- Corriente libertadora del norte: Bolívar y Sucre derrotan a los realistas y consolidan la independencia > Junín (6 de agosto de 1824); Ayacucho (9 de diciembre de 1824)
#> República en el siglo XIX | Etapas de 1821 a 1895
- Primer militarismo (1821–1845): caudillos militares de la independencia se disputan el poder > Gamarra; Santa Cruz; Confederación Perú-Boliviana (1836–1839)
- Era del guano o prosperidad falaz (1845–1872): el guano da grandes ingresos al Estado sin desarrollo duradero > Ramón Castilla; Contrato Dreyfus (1869)
- Primer civilismo (1872–1876): Manuel Pardo es el primer presidente civil y enfrenta la crisis fiscal > Partido Civil
- Guerra con Chile (1879–1883): guerra por el salitre que termina con el Tratado de Ancón > Grau; Bolognesi; Cáceres
- Reconstrucción nacional y segundo militarismo (1883–1895): los jefes militares de la guerra gobiernan un país arruinado > Iglesias; Cáceres; Contrato Grace (1889)
#> República en el siglo XX | De 1895 al año 2000
- República Aristocrática (1895–1919): gobiernan Piérola y luego el Partido Civil, ligado a la élite exportadora > Azúcar; Algodón; Caucho
- Oncenio de Leguía (1919–1930): once años de gobierno autoritario llamado «Patria Nueva» > Constitución de 1920; Tratado de Lima (1929)
- Tercer militarismo (1930–1939): Sánchez Cerro y Benavides gobiernan tras la caída de Leguía > Revolución de Trujillo (1932)
- Gobierno militar (1968–1980): Velasco y Morales Bermúdez aplican reformas estatistas > Reforma agraria (1969); Constitución de 1979
- Democracia y conflicto armado interno (1980–2000): crisis económica y violencia terrorista > Belaúnde; García; Fujimori`,
    example:
      "No hay que confundir los **militarismos**: el **primero** (1821–1845) nace del caos posterior a la independencia; el **segundo** (1883–1895), de la derrota ante Chile; y el **tercero** (1930–1939), de la caída de Leguía y la crisis mundial de 1929.",
    apply: [
      [
        "Un texto dice que en el Perú el Estado vivía de un fertilizante natural y gastaba sin invertir. ¿De qué periodo habla?",
        "De la era del guano o «prosperidad falaz» (1845–1872).",
      ],
      [
        "¿Qué periodo empieza justo después de la Guerra con Chile?",
        "La Reconstrucción nacional, gobernada por militares: el segundo militarismo (1883–1895).",
      ],
    ],
    question:
      "Ordena cronológicamente y explica en una línea: primer civilismo, primer militarismo, era del guano y Guerra con Chile.",
    links:
      "Se relaciona con la **geografía** del Perú (recursos como el guano y el salitre), la **economía** (ciclos exportadores), la **literatura peruana** (Ricardo Palma, González Prada, Vallejo) y la **educación cívica** (constituciones y democracia).",
  },
  {
    id: "preincas",
    keys: [
      "preinca",
      "preincas",
      "culturas preincas",
      "caral",
      "chavin",
      "paracas",
      "mochica",
      "moche",
      "nasca",
      "nazca",
      "wari",
      "huari",
      "chimu",
      "tiahuanaco",
      "tiwanaku",
    ],
    title: "Culturas preíncas",
    area: "sociales",
    intro:
      "Antes de los incas se desarrollaron en el territorio peruano muchas culturas. Los arqueólogos las ordenan en **horizontes** (épocas en que una cultura se extiende por gran parte de los Andes) e **intermedios** (épocas de desarrollo regional).",
    map: `
#> Periodos y culturas | Secuencia del Perú antiguo
- Arcaico: Caral, la civilización más antigua de América, surge hacia el 3000 a. C. > Valle de Supe; Ruth Shady
- Horizonte temprano: Chavín difunde una religión común en los Andes > Chavín de Huántar; Lanzón monolítico
- Intermedio temprano: florecen culturas regionales como Mochica y Nasca > Señor de Sipán; Líneas de Nasca
- Horizonte medio: Wari forma el primer Estado expansivo andino > Ayacucho; Pikillacta
- Intermedio tardío: aparecen reinos regionales como Chimú, Chincha y Chachapoyas > Chan Chan; Kuélap
# Culturas de la costa | Grandes logros en el desierto
- Paracas: destaca por sus mantos textiles y las trepanaciones craneanas > Ica; c. 700 a. C.–200 d. C.
- Mochica: destaca por la cerámica retrato y los templos de adobe > Huacas del Sol y de la Luna; Señor de Sipán
- Nasca: destaca por la cerámica polícroma, los acueductos y los geoglifos > Líneas de Nasca; Cantalloc
- Chimú: tuvo como capital Chan Chan, la mayor ciudad de barro de América > Conquistado por los incas (c. 1470)
# Culturas de la sierra | Centros religiosos y Estados andinos
- Chavín: construyó un templo con galerías subterráneas y culto al felino > Chavín de Huántar (Áncash)
- Wari: organizó centros administrativos y caminos que anteceden a los incas > Pikillacta (Cusco)
- Tiahuanaco: fue un gran centro ceremonial junto al lago Titicaca > Puerta del Sol`,
    example:
      "El **Señor de Sipán**, descubierto en 1987 por Walter Alva en Lambayeque, era un gobernante **mochica** enterrado con joyas de oro y plata; su tumba mostró la riqueza y jerarquía de esa sociedad.",
    apply: [
      [
        "Un sitio arqueológico tiene pirámides de unos 5000 años en el valle de Supe. ¿De qué cultura se trata?",
        "De Caral, del periodo Arcaico, la civilización más antigua de América.",
      ],
    ],
    question:
      "¿Qué diferencia hay entre un «horizonte» y un «intermedio» en la cronología del Perú antiguo?",
  },
  {
    id: "virreinato",
    keys: [
      "virreinato",
      "virrey",
      "colonia",
      "colonial",
      "conquista del peru",
      "pizarro",
      "conquista espanola",
    ],
    title: "Conquista y Virreinato del Perú",
    area: "sociales",
    intro:
      "La **conquista** (1532–1572) fue el proceso por el cual los españoles dominaron el Tahuantinsuyo. Después se organizó el **Virreinato del Perú** (creado en 1542), que duró hasta la independencia.",
    map: `
#> Conquista | De la llegada de Pizarro a la caída de Vilcabamba
- Expediciones de Pizarro: Pizarro, Almagro y Luque organizan los viajes desde Panamá > Capitulación de Toledo (1529)
- Captura de Atahualpa: Pizarro apresa al inca en Cajamarca y lo ejecuta al año siguiente > 16 de noviembre de 1532; 1533
- Fundación de Lima: Pizarro funda la Ciudad de los Reyes > 18 de enero de 1535
- Resistencia inca: los incas de Vilcabamba resisten hasta la ejecución de Túpac Amaru I > 1572
# Organización del Virreinato | Instituciones coloniales
- Virrey: era el representante del rey y la máxima autoridad > Primer virrey: Blasco Núñez Vela (1544)
- Real Audiencia y cabildo: eran el tribunal de justicia y el gobierno de las ciudades > Real Audiencia de Lima
- Corregimientos: eran provincias gobernadas por corregidores, con abusos como el reparto de mercancías > Corregidor de indios
# Economía colonial | Base de la riqueza virreinal
- Minería: la plata de Potosí y el mercurio de Huancavelica sostenían la economía > Mita minera
- Encomienda y hacienda: daban tierras y tributo indígena a los españoles > Tributo indígena
- Monopolio comercial: solo se comerciaba con España por puertos autorizados > Callao; Sistema de flotas
#> Reformas y rebeliones | Cambios a lo largo del periodo
- Reformas toledanas (1569–1581): Francisco de Toledo crea reducciones de indios y organiza la mita > Reducciones
- Reformas borbónicas (siglo XVIII): aumentan los impuestos y se crean nuevos virreinatos > Nueva Granada; Río de la Plata (1776)
- Rebelión de Túpac Amaru II (1780): fue el mayor levantamiento contra los abusos coloniales > Ejecutado en Cusco (1781)`,
    example:
      "La creación del **Virreinato del Río de la Plata (1776)** hizo que Potosí y su plata dejaran de depender de Lima: el comercio limeño se debilitó, una de las consecuencias de las **reformas borbónicas**.",
    apply: [
      [
        "¿Por qué la mita minera fue tan dañina para las comunidades indígenas?",
        "Porque obligaba a los indígenas a trabajar por turnos en minas como Potosí y Huancavelica en condiciones durísimas, con alta mortalidad.",
      ],
    ],
    question: "¿Qué relación hay entre las reformas borbónicas y la rebelión de Túpac Amaru II?",
  },
  {
    id: "militarismo",
    keys: [
      "militarismo",
      "militarismos",
      "primer militarismo",
      "segundo militarismo",
      "tercer militarismo",
      "caudillismo",
      "caudillos",
      "reconstruccion nacional",
    ],
    title: "Los militarismos en el Perú",
    area: "sociales",
    intro:
      "En la República del Perú se distinguen **tres militarismos**, periodos en que jefes militares controlaron el gobierno. No deben confundirse: el **primero (1821–1845)** surge del vacío de poder tras la independencia; el **segundo (1883–1895)**, tras la derrota en la Guerra con Chile; y el **tercero (1930–1939)**, tras la caída de Leguía y la crisis mundial de 1929.",
    map: `
# Primer militarismo (1821–1845) | Los caudillos de la independencia se disputan el poder
- Causas: no existían partidos ni instituciones sólidas y el prestigio militar daba poder > Vacío de poder tras 1821
- Caudillos: se suceden golpes y guerras civiles entre jefes militares > La Mar; Gamarra; Orbegoso; Salaverry
- Confederación Perú-Boliviana (1836–1839): Andrés de Santa Cruz une Perú y Bolivia hasta su derrota en Yungay > Batalla de Yungay (1839)
- Fin: la anarquía (1842–1844) termina con el triunfo de Ramón Castilla > Carmen Alto (1844); Castilla presidente (1845)
# Segundo militarismo (1883–1895) | Los jefes de la Guerra con Chile gobiernan durante la Reconstrucción nacional
- Contexto: el país quedó arruinado, endeudado y sin el salitre tras la guerra > Tratado de Ancón (1883)
- Gobernantes: Miguel Iglesias firma la paz y luego gobiernan Cáceres y Morales Bermúdez > Cáceres (1886–1890 y 1894–1895)
- Contrato Grace (1889): los acreedores cancelan la deuda externa a cambio de administrar los ferrocarriles por 66 años > Peruvian Corporation
- Fin: la revolución de Nicolás de Piérola derroca a Cáceres > 1895; Inicio de la República Aristocrática
# Tercer militarismo (1930–1939) | Militares gobiernan tras la caída de Leguía y la crisis de 1929
- Luis M. Sánchez Cerro: derroca a Leguía en 1930 y gobierna hasta ser asesinado en 1933 > Pronunciamiento de Arequipa (1930)
- Enfrentamiento con el APRA: hay persecución política y la revolución aprista de Trujillo > Trujillo (1932)
- Óscar R. Benavides: gobierna de 1933 a 1939 con mano dura y algunas obras sociales > Seguro Social Obrero (1936)
- Fin: en 1939 asume el poder Manuel Prado, un civil elegido > Elecciones de 1939
# Comparación | Qué tienen en común y en qué se diferencian
- Rasgo común: el poder lo ejercen jefes militares ante la debilidad de los civiles > Golpes de Estado; Guerras civiles
- Origen distinto: nacen de la independencia, de la derrota ante Chile y de la crisis de 1929, respectivamente > 1821; 1883; 1930
- Lo que vino después: la era del guano, la República Aristocrática y los gobiernos de Prado y Bustamante > 1845; 1895; 1939`,
    example:
      "Andrés Avelino Cáceres fue héroe de la resistencia de la Breña durante la Guerra con Chile y después presidente: por eso el **segundo militarismo** está ligado a la posguerra, no a la independencia.",
    apply: [
      [
        "Un presidente militar gobierna en 1887 con un país endeudado tras perder Tarapacá. ¿En qué militarismo estamos?",
        "En el segundo militarismo (1883–1895), durante la Reconstrucción nacional; se trata de Cáceres.",
      ],
      [
        "¿En qué militarismo se formó la Confederación Perú-Boliviana?",
        "En el primer militarismo (1821–1845): duró de 1836 a 1839 y la dirigió Andrés de Santa Cruz.",
      ],
    ],
    question:
      "¿Por qué crees que los militares llegaron al poder en tres momentos tan distintos de la historia republicana?",
  },
  {
    id: "era-guano",
    keys: [
      "era del guano",
      "guano",
      "prosperidad falaz",
      "ramon castilla",
      "castilla",
      "contrato dreyfus",
    ],
    title: "Era del guano (1845–1872)",
    area: "sociales",
    intro:
      "La **era del guano** (1845–1872), llamada por Jorge Basadre **«prosperidad falaz»**, fue el periodo en que el Estado peruano obtuvo enormes ingresos por la exportación de guano, pero sin lograr un desarrollo duradero.",
    map: `
# Economía del guano | Un fertilizante que enriqueció al Estado
- El guano: era un fertilizante natural de las islas, muy demandado por la agricultura europea > Islas de Chincha
- Sistema de consignaciones: el Estado vendía el guano mediante comerciantes que cobraban comisiones > Consignatarios
- Contrato Dreyfus (1869): Balta y su ministro Piérola entregan la venta del guano a la casa francesa Dreyfus > Préstamos para ferrocarriles
# Ramón Castilla | Figura central del periodo
- Primer gobierno (1845–1851): pone fin al primer militarismo, ordena la hacienda y aprueba el primer presupuesto > Primer presupuesto nacional
- Abolición (1854): en su segundo gobierno abolió el tributo indígena y la esclavitud > Manumisión de esclavos
- Constituciones: se debaten la liberal de 1856 y la moderada de 1860 > Constitución de 1860
# Conflicto con España | Defensa de la soberanía
- Ocupación de las islas de Chincha (1864): una escuadra española ocupa las islas guaneras > Tratado Vivanco-Pareja
- Combate del Dos de Mayo (1866): el Callao rechaza a la escuadra española > José Gálvez
# Por qué fue «falaz» | Balance del periodo
- Gasto improductivo: los ingresos se usaron en burocracia y en la consolidación de la deuda interna > Escándalo de la consolidación
- Dependencia de un producto: al caer el guano, el Estado quedó en crisis > Bancarrota (1876)
- Modernización con deuda: ferrocarriles y obras públicas se financiaron con préstamos externos > Ferrocarril Central; Henry Meiggs`,
    example:
      "El **Ferrocarril Central**, construido por Henry Meiggs con préstamos garantizados con guano, fue una gran obra de ingeniería; pero la deuda que generó contribuyó a la bancarrota de 1876. Por eso Basadre habló de una prosperidad **falaz**.",
    apply: [
      [
        "¿Por qué Basadre llamó «falaz» a la prosperidad del guano?",
        "Porque los grandes ingresos no se invirtieron en un desarrollo productivo duradero y el país terminó endeudado y en bancarrota (1876).",
      ],
    ],
    question:
      "¿Qué habría pasado si los ingresos del guano se hubieran invertido en industria y educación?",
  },
  {
    id: "primer-civilismo",
    keys: ["primer civilismo", "manuel pardo"],
    title: "Primer civilismo (1872–1876)",
    area: "sociales",
    intro:
      "El **primer civilismo** (1872–1876) fue el gobierno de **Manuel Pardo**, fundador del Partido Civil y **primer presidente civil** del Perú. Intentó modernizar el Estado en plena crisis del guano.",
    map: `
# Manuel Pardo | Primer presidente civil
- Partido Civil: lo funda Pardo en 1871 con comerciantes, banqueros y profesionales > «República práctica»
- Descentralización: crea los concejos departamentales > 1873
- Educación: impulsa la instrucción pública y la formación técnica > Escuela de Ingenieros (1876)
# Crisis económica | El fin de la era del guano
- Agotamiento del guano: caen los ingresos y crece la deuda externa > Bancarrota (1876)
- Salitre: el Estado establece el estanco (1873) y luego expropia las salitreras de Tarapacá (1875) > Choque con capitales chilenos y británicos
- Crisis mundial de 1873: reduce la demanda y el crédito internacional > Depresión internacional
# Política exterior y final | Antecedentes de la Guerra con Chile
- Tratado de alianza defensiva (1873): pacto secreto con Bolivia > Antecedente de la guerra de 1879
- Final: Pardo entrega el poder a Mariano Ignacio Prado en 1876 y es asesinado en 1878 > 16 de noviembre de 1878`,
    example:
      "La expropiación de las salitreras de **Tarapacá (1875)** afectó a empresarios chilenos y británicos: es uno de los antecedentes económicos de la **Guerra con Chile**, que estalló cuatro años después.",
    apply: [
      [
        "¿Por qué el gobierno de Manuel Pardo marca un cambio respecto al primer militarismo?",
        "Porque fue el primer presidente civil, elegido con un partido político organizado, el Partido Civil.",
      ],
    ],
    question:
      "¿Por qué el tratado secreto de 1873 con Bolivia terminó arrastrando al Perú a la guerra de 1879?",
  },
  {
    id: "guerra-chile",
    keys: [
      "guerra con chile",
      "guerra del pacifico",
      "miguel grau",
      "grau",
      "bolognesi",
      "angamos",
      "tratado de ancon",
      "campana de la brena",
      "salitre",
      "huascar",
    ],
    title: "Guerra con Chile (1879–1883)",
    area: "sociales",
    intro:
      "La **Guerra del Pacífico** o **Guerra con Chile** (1879–1883) enfrentó a Chile contra el Perú y Bolivia por el control de la riqueza salitrera del desierto de Atacama. Terminó con el **Tratado de Ancón (1883)** y la pérdida de Tarapacá.",
    map: `
# Causas | Por qué estalló la guerra
- Riqueza del salitre: capitales chilenos y británicos explotaban el salitre de Antofagasta (Bolivia) y Tarapacá (Perú) > Desierto de Atacama
- Impuesto boliviano: Bolivia gravó con 10 centavos cada quintal de salitre exportado y Chile ocupó Antofagasta > 14 de febrero de 1879
- Tratado de alianza defensiva (1873): por el pacto secreto entre Perú y Bolivia, Chile declaró la guerra al Perú > 5 de abril de 1879
#> Campañas | Desarrollo del conflicto en orden
- Campaña marítima (1879): el Huáscar de Grau mantiene en jaque a la escuadra chilena hasta caer en Angamos > Iquique (21 de mayo); Angamos (8 de octubre)
- Campaña terrestre del sur (1879–1880): Chile ocupa Tarapacá, Tacna y Arica pese a la victoria peruana de Tarapacá > Tarapacá (27 de noviembre de 1879); Alto de la Alianza; Arica (7 de junio de 1880)
- Campaña de Lima (1881): Chile vence en San Juan, Chorrillos y Miraflores y ocupa la capital > 13 y 15 de enero de 1881
- Campaña de la Breña (1881–1883): Cáceres organiza la resistencia en la sierra hasta la derrota de Huamachuco > Huamachuco (10 de julio de 1883)
# Héroes | Personajes destacados
- Miguel Grau: comandante del Huáscar, muere en el combate de Angamos > «Caballero de los mares»
- Francisco Bolognesi: defiende Arica hasta morir > «Tengo deberes sagrados que cumplir…»
- Andrés Avelino Cáceres: dirige la resistencia de la Breña > «Brujo de los Andes»
- Alfonso Ugarte: muere en la defensa del morro de Arica > 7 de junio de 1880
# Consecuencias | Resultados de la guerra
- Tratado de Ancón (1883): el Perú cede Tarapacá y Tacna y Arica quedan bajo Chile por 10 años > Plebiscito que nunca se realizó
- Tratado de Lima (1929): Tacna vuelve al Perú y Arica queda para Chile > Reincorporación de Tacna (28 de agosto de 1929)
- Crisis nacional: ruina económica, deuda externa y pérdida del salitre > Reconstrucción nacional (1883–1895)`,
    example:
      "En el **combate de Angamos (8 de octubre de 1879)**, el monitor Huáscar fue capturado y murió **Miguel Grau**. Sin su flota, el Perú perdió el control del mar y Chile pudo desembarcar tropas en Tarapacá.",
    apply: [
      [
        "¿Por qué la pérdida del Huáscar fue decisiva en la guerra?",
        "Porque el Perú perdió el dominio del mar y Chile pudo trasladar tropas y abastecerlas por vía marítima para invadir el sur.",
      ],
      [
        "¿Qué territorio perdió definitivamente el Perú por el Tratado de Ancón?",
        "Tarapacá. Tacna y Arica quedaron bajo administración chilena; en 1929 Tacna volvió al Perú y Arica quedó para Chile.",
      ],
    ],
    question:
      "¿Qué relación hay entre el tratado secreto de 1873, el impuesto boliviano de 1878 y el inicio de la guerra en 1879?",
  },
  {
    id: "republica-aristocratica",
    keys: ["republica aristocratica", "oligarquia", "pierola", "partido civil"],
    title: "República Aristocrática (1895–1919)",
    area: "sociales",
    intro:
      "La **República Aristocrática** (1895–1919), nombre dado por Jorge Basadre, fue el periodo en que una élite de grandes propietarios y exportadores, agrupada sobre todo en el **Partido Civil**, gobernó el Perú con estabilidad política pero escasa participación popular.",
    map: `
#> Gobiernos | De Piérola a José Pardo
- Nicolás de Piérola (1895–1899): tras derrocar a Cáceres, moderniza el Estado y el ejército > Patrón oro; Escuela Militar de Chorrillos
- Gobiernos civilistas: gobiernan López de Romaña, Candamo, José Pardo y Leguía en su primer mandato > Leguía (1908–1912)
- Guillermo Billinghurst (1912–1914): gobierno de apoyo popular derrocado por Benavides > Golpe de 1914
- José Pardo (1915–1919): en su segundo gobierno decreta la jornada de 8 horas y es derrocado por Leguía > Jornada de 8 horas (1919)
# Economía | Auge exportador
- Azúcar y algodón: se producen en grandes haciendas de la costa > Valle de Chicama
- Caucho: hay un auge en la Amazonía con graves abusos contra los indígenas > Iquitos; Putumayo
- Minería y capital extranjero: crecen las inversiones estadounidenses y británicas > Cerro de Pasco Corporation
# Sociedad | Cambios sociales
- Oligarquía: un pequeño grupo de familias controla la economía y la política > Partido Civil
- Movimiento obrero: surgen huelgas y organizaciones de trabajadores > Jornada de 8 horas
- Indigenismo: denuncia la explotación del campesino indígena > Asociación Pro-Indígena (1909)`,
    example:
      "En enero de 1919, tras una gran huelga de trabajadores de Lima y Callao, el presidente **José Pardo** decretó la **jornada de 8 horas**: una conquista obrera dentro de un régimen oligárquico.",
    apply: [
      [
        "¿Por qué Basadre llamó «aristocrática» a esta república?",
        "Porque el poder lo concentraba una élite de terratenientes y exportadores, mientras la mayoría de la población no participaba en la política.",
      ],
    ],
    question:
      "¿Qué grupos sociales quedaban fuera de la política durante la República Aristocrática y por qué?",
  },
  {
    id: "oncenio",
    keys: ["oncenio", "leguia", "patria nueva"],
    title: "Oncenio de Leguía (1919–1930)",
    area: "sociales",
    intro:
      "El **Oncenio** (1919–1930) fue el segundo gobierno de **Augusto B. Leguía**, que duró once años. Llamado **«Patria Nueva»**, combinó modernización urbana e inversión estadounidense con autoritarismo y reelecciones.",
    map: `
# Política | Un gobierno personalista
- Golpe de 1919: Leguía toma el poder y promulga una nueva Constitución > Constitución de 1920
- Autoritarismo: se reelige en 1924 y 1929 y persigue a sus opositores > Destierro de Haya de la Torre
- Nuevas fuerzas políticas: nacen el APRA y el Partido Socialista > Haya de la Torre (1924); Mariátegui (1928)
# Economía y obras | Modernización con deuda
- Inversión de EE. UU.: llegan préstamos y empresas estadounidenses > Endeudamiento externo
- Obras públicas: se construyen carreteras y se moderniza Lima > Plaza San Martín (1921); Avenida Leguía (hoy Arequipa)
- Ley de conscripción vial: obligaba a los varones a trabajar gratis en las carreteras > Afectó sobre todo a los indígenas
# Fronteras | Tratados limítrofes
- Tratado Salomón-Lozano (1922): con Colombia, el Perú cede el trapecio de Leticia > Río Putumayo
- Tratado de Lima (1929): con Chile, Tacna vuelve al Perú y Arica queda para Chile > Reincorporación de Tacna
# Caída | Fin del Oncenio
- Crisis de 1929: el crac de Nueva York corta los préstamos > Gran Depresión
- Golpe de Sánchez Cerro: se subleva en Arequipa en agosto de 1930 > Inicio del tercer militarismo`,
    example:
      "Con el **Tratado de Lima (1929)**, firmado durante el Oncenio, **Tacna** se reincorporó al Perú el 28 de agosto de 1929, mientras **Arica** quedó definitivamente en poder de Chile.",
    apply: [
      [
        "¿Por qué la crisis de 1929 provocó la caída de Leguía?",
        "Porque su modelo dependía de préstamos estadounidenses; al cortarse el crédito estalló la crisis y Sánchez Cerro lo derrocó en 1930.",
      ],
    ],
    question:
      "¿Fue el Oncenio una etapa de modernización o de autoritarismo? Argumenta con dos ejemplos.",
  },
  {
    id: "gobierno-militar",
    keys: [
      "gobierno militar",
      "gobierno revolucionario",
      "velasco",
      "reforma agraria",
      "morales bermudez",
    ],
    title: "Gobierno militar (1968–1980)",
    area: "sociales",
    intro:
      "El **Gobierno Revolucionario de las Fuerzas Armadas** (1968–1980) comenzó con el golpe del general **Juan Velasco Alvarado** contra Fernando Belaúnde. Tuvo dos fases: la reformista de Velasco (1968–1975) y la de **Francisco Morales Bermúdez** (1975–1980), que devolvió el poder a los civiles.",
    map: `
#> Fases | Del golpe a la transición
- Primera fase (1968–1975): Velasco impulsa reformas nacionalistas y estatistas > Golpe del 3 de octubre de 1968
- Segunda fase (1975–1980): Morales Bermúdez frena las reformas ante la crisis económica > Tacnazo (1975)
- Transición: se elige una Asamblea Constituyente y se convocan elecciones > Constitución de 1979; Elecciones de 1980
# Reformas de Velasco | Cambios estructurales
- Nacionalización del petróleo: expropia a la International Petroleum Company > La Brea y Pariñas (9 de octubre de 1968)
- Reforma agraria (1969): expropia las haciendas y crea cooperativas > «Campesino, el patrón ya no comerá más de tu pobreza»
- Empresas estatales: el Estado pasa a controlar petróleo, pesca y minería > Petroperú; Pescaperú
- Reforma educativa: promueve la educación bilingüe y oficializa el quechua > Quechua oficial (1975)
# Balance | Logros y problemas
- Logros: pone fin al latifundio y debilita a la oligarquía terrateniente > Fin de las haciendas
- Problemas: provoca crisis fiscal, endeudamiento y baja productividad de las cooperativas > Inflación`,
    example:
      "La **reforma agraria de 1969** expropió grandes haciendas como las azucareras de la costa norte y las convirtió en cooperativas de trabajadores: terminó con el poder de los hacendados, aunque muchas cooperativas fracasaron económicamente.",
    apply: [
      [
        "¿Por qué el gobierno de Velasco es diferente de los militarismos del siglo XIX?",
        "Porque fue un gobierno institucional de las Fuerzas Armadas con un programa de reformas estructurales, no el poder personal de un caudillo.",
      ],
    ],
    question:
      "¿Por qué la reforma agraria fue tan importante para el campesinado y, a la vez, tan discutida?",
  },
  {
    id: "peru-1980-2000",
    keys: [
      "fujimori",
      "sendero luminoso",
      "terrorismo",
      "conflicto armado interno",
      "autogolpe",
      "hiperinflacion",
    ],
    title: "Perú 1980–2000: democracia y conflicto armado",
    area: "sociales",
    intro:
      "Entre 1980 y 2000 el Perú volvió a la democracia, pero enfrentó una grave crisis económica y el **conflicto armado interno** iniciado por **Sendero Luminoso**, al que se sumó el **MRTA**. Según la Comisión de la Verdad y Reconciliación (2003), las víctimas fatales se estiman en cerca de **69 000**.",
    map: `
#> Gobiernos | Presidentes del periodo
- Fernando Belaúnde (1980–1985): restablece la democracia mientras empieza la violencia senderista > Chuschi (17 de mayo de 1980)
- Alan García (1985–1990): su primer gobierno termina con hiperinflación > Intento de estatizar la banca (1987)
- Alberto Fujimori (1990–2000): aplica un ajuste drástico, da un autogolpe y gobierna de forma autoritaria > Autogolpe (5 de abril de 1992); Constitución de 1993
- Valentín Paniagua (2000–2001): dirige la transición tras la caída de Fujimori > Elecciones de 2001
# Conflicto armado interno | Violencia y víctimas
- Sendero Luminoso: grupo terrorista maoísta liderado por Abimael Guzmán > Captura de Guzmán (12 de septiembre de 1992)
- MRTA: grupo subversivo que tomó la residencia del embajador de Japón > 1996–1997
- Víctimas: la mayoría fueron campesinos quechuahablantes, sobre todo de Ayacucho > Informe final de la CVR (2003)
# Economía | De la crisis al ajuste
- Crisis de los 80: deuda externa, hiperinflación y caída de los salarios > Inflación anual de más de 7000 % (1990)
- Fujishock (1990): ajuste de precios para frenar la inflación > Agosto de 1990
- Reformas de mercado: privatizaciones y apertura comercial > Privatización de empresas estatales`,
    example:
      "La **captura de Abimael Guzmán** el 12 de septiembre de 1992, por el GEIN de la Policía, debilitó decisivamente a Sendero Luminoso: fue fruto de un trabajo de inteligencia, no de una operación militar.",
    apply: [
      [
        "¿Qué recomendó la CVR en su informe de 2003?",
        "Reparar a las víctimas, reformar las instituciones y recordar lo ocurrido para que no se repita la violencia.",
      ],
    ],
    question:
      "¿Por qué la mayoría de las víctimas del conflicto armado interno fueron campesinos quechuahablantes?",
  },
];
