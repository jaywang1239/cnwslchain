import type { Locale } from "@/lib/i18n/config";

export type ContentLocale = Exclude<Locale, "zh">;

export type LocalizedPostFields = {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
};

export type LocalizedNewsFields = {
  title: string;
  content: string;
  type: string;
};

const postsBySlug: Record<string, Record<ContentLocale, LocalizedPostFields>> = {
  "cable-carrier-selection-guide": {
    en: {
      title: "European-standard dust-proof carrier selection: matching inner width and bend radius",
      excerpt:
        "From travel length and fill ratio to bend radius, a practical checklist for engineers evaluating localization alternatives.",
      content:
        "In industrial automation and CNC upgrades, cable carrier selection directly affects cable life and machine stability.\n\nFirst confirm inner width and fill ratio: the total cable cross-section should generally stay below 60% of the carrier cavity, with extra margin for high-speed motion. Next, choose a bend radius no smaller than the cable maker’s recommended minimum—European-standard dust-proof carriers typically offer several R values.\n\nFor dusty CNC and molding environments, prefer fully enclosed covers and review pin materials and wear-resistant side plates. After selection, bench life testing can validate reliability at no less than 15 million cycles.\n\nThis article is a placeholder; detailed selection tables and case data will follow.",
      category: "Technical selection",
      author: "CNWSL Engineering",
    },
    vi: {
      title: "Hướng dẫn chọn xích chống bụi chuẩn châu Âu: khớp chiều rộng trong và bán kính uốn",
      excerpt:
        "Từ hành trình thiết bị, tỷ lệ lấp đầy đến bán kính uốn—checklist thực tế giúp kỹ sư đánh giá phương án thay thế nội địa hóa.",
      content:
        "Trong tự động hóa công nghiệp và nâng cấp CNC, việc chọn xích dẫn cáp ảnh hưởng trực tiếp đến tuổi thọ cáp và độ ổn định máy.\n\nTrước hết cần xác nhận chiều rộng trong và tỷ lệ lấp đầy: tổng tiết diện cáp thường không vượt quá 60% tiết diện lòng xích, đồng thời chừa dư cho chuyển động tốc độ cao. Tiếp theo, bán kính uốn không được nhỏ hơn giá trị tối thiểu do nhà sản xuất cáp khuyến nghị—xích chống bụi chuẩn châu Âu thường có nhiều giá trị R.\n\nVới môi trường CNC và ép phun nhiều bụi, nên ưu tiên nắp kín hoàn toàn và đánh giá vật liệu chốt cùng tấm bên chống mòn. Sau khi chọn mẫu, thử nghiệm tuổi thọ trên băng tải có thể xác minh độ tin cậy ở mức không dưới 15 triệu chu kỳ.\n\nBài viết này là nội dung chỗ trống; bảng đối chiếu và dữ liệu case sẽ được bổ sung sau.",
      category: "Chọn mẫu kỹ thuật",
      author: "Đội kỹ thuật CNWSL",
    },
    es: {
      title: "Guía de selección de portacables antipolvo de estándar europeo: ancho interior y radio de curvado",
      excerpt:
        "Desde el recorrido y el factor de llenado hasta el radio de curvado: una lista práctica para evaluar alternativas de localización.",
      content:
        "En automatización industrial y modernización de CNC, la selección del portacables influye directamente en la vida útil del cable y la estabilidad de la máquina.\n\nPrimero confirme el ancho interior y el factor de llenado: la sección total de cables no debería superar habitualmente el 60% de la cavidad, dejando margen para movimiento a alta velocidad. A continuación, elija un radio de curvado no inferior al mínimo recomendado por el fabricante del cable; los portacables antipolvo de estándar europeo suelen ofrecer varios valores R.\n\nEn entornos con polvo (CNC, inyección), priorice tapas totalmente cerradas y revise materiales de pasadores y laterales resistentes al desgaste. Tras la selección, ensayos de vida en banco pueden validar fiabilidad bajo al menos 15 millones de ciclos.\n\nEste artículo es provisional; se añadirán tablas de selección y datos de casos.",
      category: "Selección técnica",
      author: "Ingeniería CNWSL",
    },
    it: {
      title: "Guida alla selezione delle catene antipolvere a standard europeo: larghezza interna e raggio di curvatura",
      excerpt:
        "Da corsa e rapporto di riempimento al raggio di curvatura: una checklist pratica per valutare alternative di localizzazione.",
      content:
        "Nell’automazione industriale e negli upgrade CNC, la selezione della catena portacavi influisce direttamente sulla vita utile dei cavi e sulla stabilità della macchina.\n\nPer prima cosa verificate larghezza interna e rapporto di riempimento: la sezione totale dei cavi non dovrebbe di norma superare il 60% della cavità, lasciando margine per il moto ad alta velocità. Poi scegliete un raggio di curvatura non inferiore al minimo consigliato dal produttore del cavo—le catene antipolvere a standard europeo offrono tipicamente più valori R.\n\nPer ambienti polverosi (CNC, stampaggio), preferite coperchi completamente chiusi e valutate materiali dei perni e fianchi antiusura. Dopo la selezione, prove di vita su banco possono validare l’affidabilità ad almeno 15 milioni di cicli.\n\nQuesto articolo è un placeholder; seguiranno tabelle di selezione e dati di caso.",
      category: "Selezione tecnica",
      author: "Engineering CNWSL",
    },
    ru: {
      title: "Подбор пылезащитных кабель-каналов европейского стандарта: внутренняя ширина и радиус изгиба",
      excerpt:
        "От длины хода и коэффициента заполнения до радиуса изгиба — практический чек-лист для инженеров при оценке локализационных альтернатив.",
      content:
        "В промышленной автоматизации и модернизации станков с ЧПУ выбор кабельной цепи напрямую влияет на срок службы кабелей и стабильность оборудования.\n\nСначала подтвердите внутреннюю ширину и коэффициент заполнения: суммарное сечение кабелей, как правило, не должно превышать 60% полости цепи, с запасом для высокоскоростного движения. Затем выберите радиус изгиба не меньше минимума, рекомендованного производителем кабеля — пылезащитные цепи европейского стандарта обычно предлагают несколько значений R.\n\nДля запылённых сред ЧПУ и литья под давлением предпочтительны полностью закрытые крышки; оцените материалы пальцев и износостойких боковых пластин. После подбора стендовые ресурсные испытания могут подтвердить надёжность не менее чем на 15 млн циклов.\n\nСтатья является заглушкой; подробные таблицы подбора и кейсы будут добавлены позже.",
      category: "Технический подбор",
      author: "Инженеры CNWSL",
    },
  },
  "tpu-cable-carrier-performance": {
    en: {
      title: "How TPU cable carriers perform in heat and oil mist",
      excerpt:
        "Comparing nylon and TPU on abrasion, oil resistance and UV, and where flexible carriers fit demanding duty cycles.",
      content:
        "TPU (thermoplastic polyurethane) combines elasticity with abrasion resistance, making it suitable for frequent reciprocating motion, cold starts or oil-mist environments.\n\nVersus traditional nylon PA66, TPU carriers often excel in tear and ozone resistance, but wall thickness and joint design must match the load. Field checks show properly selected TPU series can cut jacket wear around molding cells and outdoor automation lines.\n\nIn service: avoid excess torsion, keep support roller spacing sensible, and inspect hinges and covers on the maintenance schedule.\n\nPlaceholder content—test curves and material tables will be added later.",
      category: "Materials",
      author: "CNWSL Materials Engineer",
    },
    vi: {
      title: "Hiệu năng xích TPU trong môi trường nhiệt độ cao và dầu mỡ",
      excerpt:
        "So sánh nylon và TPU về chống mòn, chịu dầu và chống UV, làm rõ phạm vi dùng xích linh hoạt trong điều kiện khắc nghiệt.",
      content:
        "TPU (polyurethane nhiệt dẻo) kết hợp đàn hồi và chống mòn, phù hợp chuyển động qua lại thường xuyên, khởi động lạnh hoặc môi trường sương dầu.\n\nSo với nylon PA66 truyền thống, xích TPU thường vượt trội về chống xé và chống ozone, nhưng độ dày thành và kết cấu nối phải khớp tải. Thực tế cho thấy dòng TPU chọn đúng có thể giảm mòn vỏ cáp quanh máy ép phun và dây chuyền ngoài trời.\n\nKhi vận hành: tránh xoắn quá mức, giữ khoảng cách con lăn đỡ hợp lý và kiểm tra bản lề cùng nắp theo lịch bảo trì.\n\nNội dung chỗ trống—sẽ bổ sung đường cong thử nghiệm và bảng thông số vật liệu.",
      category: "Công nghệ vật liệu",
      author: "Kỹ sư vật liệu CNWSL",
    },
    es: {
      title: "Rendimiento de portacables TPU en calor y niebla de aceite",
      excerpt:
        "Comparación de nailon y TPU en abrasión, resistencia al aceite y UV, y el ámbito de uso de portacables flexibles.",
      content:
        "El TPU (poliuretano termoplástico) combina elasticidad y resistencia a la abrasión, adecuado para movimiento alternativo frecuente, arranques en frío o niebla de aceite.\n\nFrente al nailon PA66, los portacables TPU suelen destacar en resistencia al desgarro y al ozono, pero el espesor de pared y el diseño de unión deben ajustarse a la carga. En campo, series TPU bien seleccionadas pueden reducir el desgaste de la cubierta del cable en inyección y líneas exteriores.\n\nEn servicio: evite torsión excesiva, mantenga una separación razonable de rodillos de apoyo e inspeccione bisagras y tapas según el plan de mantenimiento.\n\nContenido provisional: se añadirán curvas de ensayo y tablas de materiales.",
      category: "Materiales",
      author: "Ingeniero de materiales CNWSL",
    },
    it: {
      title: "Prestazioni delle catene TPU in calore e nebbia d’olio",
      excerpt:
        "Confronto nylon/TPU su usura, resistenza all’olio e UV, e ambito d’uso delle catene flessibili in condizioni severe.",
      content:
        "Il TPU (poliuretano termoplastico) unisce elasticità e resistenza all’abrasione, adatto a moto alternato frequente, avvii a freddo o ambienti con nebbia d’olio.\n\nRispetto al nylon PA66, le catene TPU spesso eccellono in resistenza allo strappo e all’ozono, ma spessore di parete e giunti devono adeguarsi al carico. In campo, serie TPU correttamente scelte possono ridurre l’usura della guaina intorno a presse a iniezione e linee outdoor.\n\nIn esercizio: evitate torsioni eccessive, mantenete distanze sensate tra rulli di supporto e ispezionate cerniere e coperchi secondo il piano di manutenzione.\n\nContenuto placeholder: seguiranno curve di prova e tabelle materiali.",
      category: "Materiali",
      author: "Ingegnere materiali CNWSL",
    },
    ru: {
      title: "Как кабельные цепи из TPU работают при нагреве и масляном тумане",
      excerpt:
        "Сравнение нейлона и TPU по износу, маслостойкости и УФ-стойкости — и где гибкие цепи уместны при жёстких режимах.",
      content:
        "TPU (термопластичный полиуретан) сочетает эластичность с абразивной стойкостью и подходит для частого возвратно-поступательного движения, холодных пусков или сред с масляным туманом.\n\nПо сравнению с традиционным нейлоном PA66 цепи из TPU часто превосходят по стойкости к разрыву и озону, однако толщина стенки и конструкция соединений должны соответствовать нагрузке. Практика показывает: правильно подобранные серии TPU снижают износ оболочки кабеля около литьевых ячеек и наружных линий автоматизации.\n\nВ эксплуатации: избегайте избыточного кручения, выдерживайте разумные интервалы опорных роликов и проверяйте шарниры и крышки по графику ТО.\n\nЧерновой материал — кривые испытаний и таблицы материалов будут добавлены позже.",
      category: "Материалы",
      author: "Инженер по материалам CNWSL",
    },
  },
  "lifespan-testing-and-warranty": {
    en: {
      title: "What stands behind a 36-month warranty: life-test methods",
      excerpt:
        "Bench cycling, accelerated aging and line correlation—why CNWSL can offer a 36-month product warranty.",
      content:
        "Warranty commitments must rest on reproducible test data. Our life validation includes standard reciprocating bench tests, dust/coolant accelerated aging, and sampling correlated to customer lines.\n\nBench logs track cycle count, lateral force and noise drift; at design-life thresholds we assess hinge clearance and cover deformation. Feedback from 70+ molding machines closes the improvement loop.\n\nFor European-standard localization projects, we can state a 36-month warranty in contracts and provide install/maintenance guidance to cut early failure risk.\n\nPlaceholder—selected test summaries will be published later.",
      category: "Quality validation",
      author: "CNWSL Quality Center",
    },
    vi: {
      title: "Đằng sau bảo hành 36 tháng: phương pháp thử nghiệm tuổi thọ",
      excerpt:
        "Thử trên băng tải, lão hóa gia tốc và đối chiếu hiện trường—vì sao CNWSL có thể cam kết bảo hành sản phẩm 36 tháng.",
      content:
        "Cam kết bảo hành phải dựa trên dữ liệu thử nghiệm có thể tái lập. Xác minh tuổi thọ của chúng tôi gồm thử qua lại tiêu chuẩn trên băng tải, lão hóa gia tốc bụi/dung dịch làm mát, và lấy mẫu đối chiếu với dây chuyền khách hàng.\n\nNhật ký băng tải ghi số chu kỳ, lực ngang và thay đổi tiếng ồn; khi đạt ngưỡng tuổi thọ thiết kế sẽ đánh giá khe bản lề và biến dạng nắp. Phản hồi từ hơn 70 máy ép phun tạo vòng cải tiến khép kín.\n\nVới dự án thay thế chuẩn châu Âu, chúng tôi có thể ghi rõ bảo hành 36 tháng trong hợp đồng và cung cấp hướng dẫn lắp đặt/bảo trì để giảm rủi ro hỏng sớm.\n\nNội dung chỗ trống—sẽ công bố một phần tóm tắt thử nghiệm.",
      category: "Xác minh chất lượng",
      author: "Trung tâm chất lượng CNWSL",
    },
    es: {
      title: "Detrás de 36 meses de garantía: métodos de ensayo de vida útil",
      excerpt:
        "Ciclos en banco, envejecimiento acelerado y correlación en línea: por qué CNWSL puede ofrecer 36 meses de garantía.",
      content:
        "Una garantía debe apoyarse en datos de ensayo reproducibles. Nuestra validación de vida incluye ensayos alternativos estándar en banco, envejecimiento acelerado con polvo/refrigerante y muestreo correlacionado con líneas de cliente.\n\nEl banco registra ciclos, fuerza lateral y deriva de ruido; al umbral de vida de diseño evaluamos holgura de bisagra y deformación de tapa. La realimentación de más de 70 inyectoras cierra el bucle de mejora.\n\nEn proyectos de localización de estándar europeo podemos fijar 36 meses de garantía en contrato y aportar guías de instalación/mantenimiento para reducir fallos tempranos.\n\nContenido provisional: se publicarán resúmenes de ensayo seleccionados.",
      category: "Validación de calidad",
      author: "Centro de calidad CNWSL",
    },
    it: {
      title: "Dietro la garanzia di 36 mesi: metodi di prova di vita utile",
      excerpt:
        "Cicli a banco, invecchiamento accelerato e correlazione in linea: perché CNWSL può offrire 36 mesi di garanzia.",
      content:
        "Un impegno di garanzia deve basarsi su dati di prova riproducibili. La nostra validazione di vita include prove alternative standard a banco, invecchiamento accelerato con polvere/refrigerante e campionamenti correlati alle linee cliente.\n\nIl banco registra cicli, forza laterale e deriva del rumore; alla soglia di vita di progetto valutiamo gioco delle cerniere e deformazione dei coperchi. Il feedback da oltre 70 presse a iniezione chiude il ciclo di miglioramento.\n\nNei progetti di localizzazione a standard europeo possiamo indicare 36 mesi di garanzia in contratto e fornire guide di installazione/manutenzione per ridurre i guasti precoci.\n\nContenuto placeholder: verranno pubblicati riepiloghi di prova selezionati.",
      category: "Validazione qualità",
      author: "Centro qualità CNWSL",
    },
    ru: {
      title: "Что стоит за гарантией 36 месяцев: методы ресурсных испытаний",
      excerpt:
        "Стендовые циклы, ускоренное старение и корреляция с линией — почему CNWSL может предложить 36-месячную гарантию на продукцию.",
      content:
        "Гарантийные обязательства должны опираться на воспроизводимые данные испытаний. Наша ресурсная валидация включает стандартные возвратно-поступательные стендовые тесты, ускоренное старение в пыли/СОЖ и выборку, коррелированную с линиями заказчиков.\n\nСтендовые журналы фиксируют число циклов, боковую силу и дрейф шума; на пороге расчётного ресурса оцениваем зазоры шарниров и деформацию крышек. Обратная связь с более чем 70 литьевыми машинами замыкает цикл улучшений.\n\nДля проектов локализации европейского стандарта мы можем зафиксировать в договоре гарантию 36 месяцев и предоставить руководства по монтажу/обслуживанию, снижая риск ранних отказов.\n\nЗаглушка — отдельные сводки испытаний будут опубликованы позже.",
      category: "Подтверждение качества",
      author: "Центр качества CNWSL",
    },
  },
  "custom-cable-carrier-delivery-process": {
    en: {
      title: "[Draft] Custom carrier delivery from survey to mass production",
      excerpt:
        "Site survey, 3D modeling, sampling and production milestones for non-standard carrier projects.",
      content:
        "Custom projects typically follow: requirements → site survey → concept & 3D → sample testing → pilot → mass delivery.\n\nEarly clarity on travel, speed, acceleration, media and install space is critical. With 3000+ molds, non-standard lead times can shrink—but this draft is internal only and not published.\n\nDev can preview this post; production filters it because isPublished=false.",
      category: "Custom service",
      author: "CNWSL Project Office",
    },
    vi: {
      title: "[Nháp] Quy trình giao hàng xích tùy chỉnh từ khảo sát đến sản xuất hàng loạt",
      excerpt:
        "Khảo sát hiện trường, mô hình 3D, mẫu thử và các mốc sản xuất cho dự án xích phi tiêu chuẩn.",
      content:
        "Dự án tùy chỉnh thường gồm: xác nhận nhu cầu → khảo sát hiện trường → phương án & 3D → thử mẫu → thử loạt nhỏ → giao hàng loạt.\n\nQuan trọng là sớm làm rõ hành trình, tốc độ, gia tốc, môi trường và không gian lắp đặt. Với hơn 3000 bộ khuôn, chu kỳ phi tiêu chuẩn có thể rút ngắn—nhưng bản nháp này chỉ nội bộ, không xuất bản.\n\nMôi trường dev có thể xem trước; production lọc vì isPublished=false.",
      category: "Dịch vụ tùy chỉnh",
      author: "Ban dự án CNWSL",
    },
    es: {
      title: "[Borrador] Entrega de portacables a medida del relevamiento a la serie",
      excerpt:
        "Relevamiento, modelado 3D, prototipos y hitos de producción para proyectos no estándar.",
      content:
        "Los proyectos a medida suelen seguir: requisitos → relevamiento → concepto y 3D → prueba de muestras → piloto → entrega en serie.\n\nEs clave aclarar pronto recorrido, velocidad, aceleración, medios y espacio de montaje. Con más de 3000 moldes se pueden acortar plazos no estándar, pero este borrador es interno y no se publica.\n\nEl entorno de desarrollo puede previsualizarlo; producción lo filtra porque isPublished=false.",
      category: "Servicio a medida",
      author: "Oficina de proyectos CNWSL",
    },
    it: {
      title: "[Bozza] Consegna catene su misura dal rilievo alla produzione di serie",
      excerpt:
        "Rilievo in sito, modellazione 3D, campionatura e milestone di produzione per progetti non standard.",
      content:
        "I progetti custom tipicamente seguono: requisiti → rilievo → concept e 3D → test campioni → pilota → consegna di serie.\n\nÈ essenziale chiarire presto corsa, velocità, accelerazione, mezzi e spazio di installazione. Con oltre 3000 stampi i tempi non standard possono ridursi—ma questa bozza è solo interna e non pubblicata.\n\nL’ambiente di sviluppo può anteprima; la produzione la filtra perché isPublished=false.",
      category: "Servizio custom",
      author: "Ufficio progetti CNWSL",
    },
    ru: {
      title: "[Черновик] Поставка заказных кабельных цепей: от обследования до серийного производства",
      excerpt:
        "Обследование площадки, 3D-моделирование, образцы и этапы производства для нестандартных проектов кабельных цепей.",
      content:
        "Заказные проекты обычно идут по схеме: требования → обследование площадки → концепция и 3D → испытания образцов → пилот → серийная поставка.\n\nНа раннем этапе критично уточнить ход, скорость, ускорение, среду и монтажное пространство. Более 3000 пресс-форм позволяют сократить сроки нестандарта — но этот черновик только внутренний и не публикуется.\n\nВ среде разработки пост можно просмотреть; в production он отфильтровывается, так как isPublished=false.",
      category: "Заказной сервис",
      author: "Проектный офис CNWSL",
    },
  },
  "autumn-expo-preview-2026": {
    en: {
      title: "[Scheduled] 2026 autumn expo preview and product highlights",
      excerpt:
        "Preview of upcoming dust-proof carrier launches and expo schedule—visible after the publish time.",
      content:
        "This post verifies scheduled publishing: isPublished is true, but publishedAt is in the future.\n\nIn production builds the article appears only when the current time reaches publishedAt. Hourly CI builds approximate timed go-live.\n\nLocal npm run dev is unrestricted. Booth and product lists will be replaced with final copy later.",
      category: "News & exhibitions",
      author: "CNWSL Marketing",
    },
    vi: {
      title: "[Hẹn giờ] Xem trước triển lãm mùa thu 2026 và điểm nhấn sản phẩm mới",
      excerpt:
        "Xem trước dòng xích chống bụi sắp ra mắt và lịch triển lãm—hiển thị sau thời điểm xuất bản.",
      content:
        "Bài này dùng để kiểm tra logic hẹn giờ: isPublished = true nhưng publishedAt ở tương lai.\n\nKhi build production, bài chỉ xuất hiện khi thời gian hiện tại đạt publishedAt. CI mỗi giờ giúp gần với lịch lên sóng.\n\nnpm run dev không bị giới hạn. Số gian và danh sách sản phẩm sẽ thay bằng nội dung chính thức.",
      category: "Tin tức & triển lãm",
      author: "Marketing CNWSL",
    },
    es: {
      title: "[Programado] Avance de la feria de otoño 2026 y novedades",
      excerpt:
        "Avance de nuevos portacables antipolvo y agenda de feria—visible tras la hora de publicación.",
      content:
        "Esta entrada verifica la publicación programada: isPublished es true, pero publishedAt está en el futuro.\n\nEn builds de producción solo aparece cuando la hora actual alcanza publishedAt. Builds horarios aproximan el lanzamiento.\n\nnpm run dev no tiene esta restricción. Stand y listado de productos se sustituirán por el texto final.",
      category: "Noticias y ferias",
      author: "Marketing CNWSL",
    },
    it: {
      title: "[Programmata] Anteprima fiera autunno 2026 e highlight prodotto",
      excerpt:
        "Anteprima delle nuove catene antipolvere e del calendario fieristico—visibile dopo l’orario di pubblicazione.",
      content:
        "Questo post verifica la pubblicazione programmata: isPublished è true, ma publishedAt è nel futuro.\n\nNei build di produzione l’articolo compare solo quando l’ora corrente raggiunge publishedAt. Build orari approssimano il go-live.\n\nnpm run dev non ha questo limite. Stand e elenco prodotti saranno sostituiti dal testo definitivo.",
      category: "Notizie e fiere",
      author: "Marketing CNWSL",
    },
    ru: {
      title: "[По расписанию] Анонс осенней выставки 2026 и ключевые продукты",
      excerpt:
        "Превью предстоящих запусков пылезащитных кабельных цепей и расписания выставки — видно после времени публикации.",
      content:
        "Этот пост проверяет отложенную публикацию: isPublished = true, но publishedAt находится в будущем.\n\nВ production-сборках статья появляется только когда текущее время достигает publishedAt. Почасовые CI-сборки приближают timed go-live.\n\nЛокальный npm run dev без ограничений. Стенд и списки продуктов позже заменят финальным текстом.",
      category: "Новости и выставки",
      author: "Маркетинг CNWSL",
    },
  },
};

const newsBySlug: Record<string, Record<ContentLocale, LocalizedNewsFields>> = {
  "eu-standard-compatibility-certified": {
    en: {
      title: "Raw materials aligned with IATF 16949 / ISO 9001 for traceable quality",
      content:
        "Engineering plastics used in CNWSL cable carriers come from supplier systems that meet IATF 16949, ISO 9001 and ISO 14001 related requirements, supporting consistency and traceability from the source.\n\nIn storage we batch-label materials and follow FIFO, linking lots to molding parameters so each carrier batch keeps stable properties and appearance.\n\nWe will keep expanding material datasheets and third-party reports for selection and incoming inspection.",
      type: "Company news",
    },
    vi: {
      title: "Nguyên liệu đạt IATF 16949 / ISO 9001, chất lượng truy xuất được",
      content:
        "Nhựa kỹ thuật dùng cho xích dẫn cáp CNWSL đến từ hệ thống nhà cung cấp đáp ứng yêu cầu liên quan IATF 16949, ISO 9001 và ISO 14001, bảo đảm tính nhất quán và truy xuất từ nguồn.\n\nTrong kho, nguyên liệu được gắn lô và FIFO, liên kết với thông số ép phun để mỗi lô xích giữ ổn định về vật tính và ngoại quan.\n\nChúng tôi sẽ tiếp tục bổ sung bảng vật tính và báo cáo bên thứ ba phục vụ chọn mẫu và đối chiếu đầu vào.",
      type: "Tin công ty",
    },
    es: {
      title: "Materias primas alineadas con IATF 16949 / ISO 9001 para calidad trazable",
      content:
        "Los plásticos de ingeniería usados en portacables CNWSL proceden de sistemas de suministro que cumplen requisitos relacionados con IATF 16949, ISO 9001 e ISO 14001, asegurando consistencia y trazabilidad desde el origen.\n\nEn almacén etiquetamos por lote y aplicamos FIFO, vinculando cada partida a parámetros de inyección para mantener propiedades y aspecto estables.\n\nSeguiremos ampliando fichas de material e informes de terceros para selección e inspección de entrada.",
      type: "Noticias de la empresa",
    },
    it: {
      title: "Materie prime allineate a IATF 16949 / ISO 9001 per qualità tracciabile",
      content:
        "Le plastiche tecniche usate nelle catene CNWSL provengono da sistemi fornitori conformi a requisiti correlati a IATF 16949, ISO 9001 e ISO 14001, a garanzia di coerenza e tracciabilità dalla fonte.\n\nIn magazzino etichettiamo per lotto e applichiamo FIFO, collegando ciascun lotto ai parametri di stampaggio per proprietà e aspetto stabili.\n\nContinueremo ad ampliare schede materiali e report di terzi per selezione e controllo in ingresso.",
      type: "Notizie aziendali",
    },
    ru: {
      title: "Сырьё в соответствии с IATF 16949 / ISO 9001 для прослеживаемого качества",
      content:
        "Инженерные пластики для кабельных цепей CNWSL поступают из систем поставщиков, отвечающих связанным требованиям IATF 16949, ISO 9001 и ISO 14001, что обеспечивает согласованность и прослеживаемость с источника.\n\nНа складе материалы маркируются по партиям и выдаются по FIFO; партии связываются с параметрами литья, чтобы каждая партия цепей сохраняла стабильные свойства и внешний вид.\n\nМы продолжим расширять даташиты материалов и отчёты третьих сторон для подбора и входного контроля.",
      type: "Новости компании",
    },
  },
  "industrial-expo-2026-preview": {
    en: {
      title: "CNWSL at the industrial expo: micro, heavy-duty carriers and cooling pipes on display",
      content:
        "CNWSL exhibited at an industrial trade show with micro, light-duty, reinforced carriers and cooling pipes, offering on-site samples and selection consulting.\n\nThe booth covered multiple inner-height series. Engineers can advise on travel, bend radius and fill ratio. OEMs, integrators and distributors are welcome.\n\nScan the booth QR code for more materials, or download catalogs from our website.",
      type: "Exhibitions",
    },
    vi: {
      title: "CNWSL tại triển lãm công nghiệp: trưng bày xích mini, gia cường và ống làm mát",
      content:
        "CNWSL tham gia triển lãm công nghiệp, gian hàng trưng bày xích mini, xích nhẹ toàn đen, xích gia cường và ống làm mát, kèm mẫu và tư vấn chọn mẫu tại chỗ.\n\nGian hàng phủ nhiều chiều cao trong. Kỹ sư có thể tư vấn hành trình, bán kính uốn và tỷ lệ lấp đầy. OEM, nhà tích hợp và đại lý đều được chào đón.\n\nQuét mã QR gian hàng để lấy tài liệu, hoặc tải catalog trên website.",
      type: "Triển lãm",
    },
    es: {
      title: "CNWSL en la feria industrial: portacables micro, reforzados y tubos de refrigeración",
      content:
        "CNWSL participó en una feria industrial con portacables micro, ligeros, reforzados y tubos de refrigeración, con muestras y asesoría de selección en el stand.\n\nEl stand cubrió varias alturas interiores. Los ingenieros pueden orientar sobre recorrido, radio de curvado y factor de llenado. OEMs, integradores y distribuidores son bienvenidos.\n\nEscanee el QR del stand o descargue catálogos en el sitio web.",
      type: "Ferias",
    },
    it: {
      title: "CNWSL alla fiera industriale: catene micro, rinforzate e tubi di raffreddamento",
      content:
        "CNWSL ha esposto a una fiera industriale con catene micro, leggere, rinforzate e tubi di raffreddamento, con campioni e consulenza di selezione in stand.\n\nLo stand ha coperto più altezze interne. Gli ingegneri possono consigliare su corsa, raggio di curvatura e riempimento. OEM, integrator e distributori sono i benvenuti.\n\nScansionate il QR dello stand o scaricate i cataloghi dal sito.",
      type: "Fiere",
    },
    ru: {
      title: "CNWSL на промышленной выставке: микро- и усиленные цепи, трубы охлаждения",
      content:
        "CNWSL представила на промышленной выставке микро-, лёгкие и усиленные кабельные цепи, а также трубы охлаждения — с образцами и консультациями по подбору на стенде.\n\nСтенд охватывал серии с разной внутренней высотой. Инженеры консультируют по ходу, радиусу изгиба и коэффициенту заполнения. OEM, интеграторы и дистрибьюторы приглашены.\n\nОтсканируйте QR-код стенда для материалов или скачайте каталоги на сайте.",
      type: "Выставки",
    },
  },
  "south-china-capacity-expansion": {
    en: {
      title: "Injection workshop capacity upgrade with Haitian precision presses",
      content:
        "To meet rising orders, CNWSL expanded injection capacity with Haitian and other precision presses for chain links, end connectors and related parts.\n\nStandard lead times are shorter, and custom projects reach sampling and pilot faster. Mold turnover and warehouse logistics were tightened for peak supply stability.\n\nShare demand forecasts early so we can reserve capacity and delivery windows.",
      type: "Company news",
    },
    vi: {
      title: "Nâng công suất xưởng ép phun với máy chính xác Haitian",
      content:
        "Để đáp ứng đơn hàng tăng, CNWSL mở rộng công suất ép phun với máy Haitian và thiết bị chính xác khác cho mắt xích, đầu nối và phụ kiện.\n\nThời gian giao mẫu tiêu chuẩn rút ngắn; dự án tùy chỉnh vào mẫu và loạt nhỏ nhanh hơn. Luân chuyển khuôn và logistics kho được tối ưu để ổn định cao điểm.\n\nVui lòng chia sẻ dự báo nhu cầu sớm để giữ chỗ công suất và cửa sổ giao hàng.",
      type: "Tin công ty",
    },
    es: {
      title: "Ampliación de capacidad de inyección con prensas de precisión Haitian",
      content:
        "Ante el crecimiento de pedidos, CNWSL amplió la capacidad de inyección con prensas Haitian y otros equipos de precisión para eslabones, conectores y piezas afines.\n\nLos plazos estándar se acortan y los proyectos a medida llegan antes a muestreo y piloto. Se optimizó la rotación de moldes y la logística de almacén para picos de demanda.\n\nComparta previsiones con antelación para reservar capacidad y ventanas de entrega.",
      type: "Noticias de la empresa",
    },
    it: {
      title: "Upgrade della capacità di stampaggio con presse di precisione Haitian",
      content:
        "Per rispondere alla crescita degli ordini, CNWSL ha ampliato la capacità di stampaggio con presse Haitian e altri impianti di precisione per maglie, terminali e componenti correlati.\n\nI lead time standard si riducono e i progetti custom raggiungono prima campionatura e pilota. Rotazione stampi e logistica di magazzino sono state ottimizzate per i picchi.\n\nCondividete le previsioni di domanda in anticipo per riservare capacità e finestre di consegna.",
      type: "Notizie aziendali",
    },
    ru: {
      title: "Расширение мощностей цеха литья на прецизионных прессах Haitian",
      content:
        "Чтобы закрыть растущие заказы, CNWSL расширила мощности литья под давлением прессами Haitian и другим прецизионным оборудованием для звеньев, концевых соединителей и смежных деталей.\n\nСроки стандартных поставок сократились, а заказные проекты быстрее выходят на образцы и пилот. Обороты пресс-форм и складская логистика ужесточены для стабильности в пиках.\n\nДелитесь прогнозами спроса заранее — так мы резервируем мощности и окна поставки.",
      type: "Новости компании",
    },
  },
  "cable-protection-seminar-recap": {
    en: {
      title: "On the show floor: heavy-duty carriers and multi-size samples open for hands-on review",
      content:
        "During the exhibition, CNWSL displayed heavy-duty carriers and multi-size samples with bend-radius, opening style and end-connector demos for engineers to compare on site.\n\nOur team discussed dusty duty, high-speed reciprocation and localization options, collecting machine parameters for post-show selection advice.\n\nWe will publish a FAQ summary on the technical blog afterward.",
      type: "Exhibitions",
    },
    vi: {
      title: "Tại triển lãm: trải nghiệm xích chịu tải và mẫu đa quy cách",
      content:
        "Trong triển lãm, gian hàng CNWSL bày xích chịu tải và mẫu nhiều quy cách, demo bán kính uốn, kiểu mở và đầu nối để kỹ sư đối chiếu trực tiếp.\n\nĐội kỹ thuật trao đổi về môi trường bụi, chuyển động tốc độ cao và thay thế nội địa hóa, thu thập thông số thiết bị để tư vấn sau hội.\n\nSau sự kiện chúng tôi sẽ đăng FAQ trên blog kỹ thuật.",
      type: "Triển lãm",
    },
    es: {
      title: "En la feria: portacables de carga y muestras multi-medida abiertas a prueba",
      content:
        "Durante la feria, CNWSL expuso portacables de carga y muestras de varias medidas, con demos de radio de curvado, apertura y conectores para comparación in situ.\n\nEl equipo técnico habló de polvo, reciprocación a alta velocidad y localización, recogiendo parámetros de máquina para asesoría posterior.\n\nPublicaremos un resumen de preguntas frecuentes en el blog técnico.",
      type: "Ferias",
    },
    it: {
      title: "In fiera: catene heavy-duty e campioni multi-misura aperti al confronto",
      content:
        "Durante la fiera, CNWSL ha esposto catene heavy-duty e campioni multi-misura con demo di raggio di curvatura, apertura e terminali per un confronto diretto.\n\nIl team tecnico ha discusso di polvere, moto alternato ad alta velocità e localizzazione, raccogliendo parametri macchina per consigli post-evento.\n\nPubblicheremo un riepilogo FAQ sul blog tecnico.",
      type: "Fiere",
    },
    ru: {
      title: "На стенде: усиленные кабельные цепи и мультиразмерные образцы для сравнения",
      content:
        "На выставке CNWSL представила усиленные кабельные цепи и образцы разных размеров с демонстрацией радиуса изгиба, типа открытия и концевых соединителей — инженеры могли сравнивать на месте.\n\nКоманда обсуждала запылённые режимы, высокоскоростное возвратно-поступательное движение и варианты локализации, собирая параметры оборудования для подбора после мероприятия.\n\nПосле выставки мы опубликуем сводку FAQ в техническом блоге.",
      type: "Выставки",
    },
  },
  "annual-supply-agreements-signed": {
    en: {
      title: "Finished carriers staged for shipment to keep machine-tool supply stable",
      content:
        "CNWSL assembly and warehousing staged multiple carrier batches—finished goods sorted by size with connectors and labels—supporting stable deliveries to machine-tool and automation customers.\n\nWe maintain annual supply collaboration with equipment makers, focusing on key platforms and fast after-sales response, plus joint validation and life improvements.\n\nContact sales and engineering for framework agreements or safety-stock plans.",
      type: "Company news",
    },
    vi: {
      title: "Xích thành phẩm xếp sẵn xuất kho, bảo đảm cung ứng ổn định cho máy công cụ",
      content:
        "Khâu lắp ráp và kho CNWSL hoàn tất nhiều lô xích thành phẩm theo quy cách, kèm đầu nối và nhãn trước khi xuất hàng, phục vụ giao ổn định cho khách máy công cụ và tự động hóa.\n\nChúng tôi duy trì hợp tác cung ứng năm với nhiều OEM, tập trung dòng máy then chốt, phản hồi sau bán hàng nhanh và xác minh chung để tối ưu tuổi thọ.\n\nLiên hệ thương mại và kỹ thuật nếu cần khung hợp đồng hoặc tồn kho an toàn.",
      type: "Tin công ty",
    },
    es: {
      title: "Portacables terminados preparados para envío y suministro estable a máquinas-herramienta",
      content:
        "Montaje y almacén de CNWSL prepararon varios lotes de portacables terminados por medida, con conectores y etiquetas, para entregas estables a clientes de máquinas-herramienta y automatización.\n\nMantenemos colaboración anual de suministro con OEM, priorizando plataformas clave, posventa rápida y validaciones conjuntas de vida útil.\n\nContacte a ventas e ingeniería para acuerdos marco o stock de seguridad.",
      type: "Noticias de la empresa",
    },
    it: {
      title: "Catene finite pronte alla spedizione per una fornitura stabile alle macchine utensili",
      content:
        "Assemblaggio e magazzino CNWSL hanno predisposto più lotti di catene finite per misura, con terminali ed etichette, a supporto di consegne stabili a clienti di macchine utensili e automazione.\n\nManteniamo collaborazioni annuali di fornitura con OEM, con focus su piattaforme chiave, post-vendita rapido e validazioni congiunte di vita utile.\n\nContattate sales e engineering per accordi quadro o safety stock.",
      type: "Notizie aziendali",
    },
    ru: {
      title: "Готовые кабельные цепи подготовлены к отгрузке для стабильных поставок станкостроению",
      content:
        "Сборка и склад CNWSL подготовили несколько партий готовых кабельных цепей — сортировка по размерам с соединителями и маркировкой — для стабильных поставок заказчикам станков и автоматизации.\n\nМы поддерживаем годовые соглашения о поставках с производителями оборудования, фокусируясь на ключевых платформах, быстрой послепродажной реакции, а также совместной валидации и улучшении ресурса.\n\nСвяжитесь с отделом продаж и инженерами по рамочным договорам или планам страхового запаса.",
      type: "Новости компании",
    },
  },
  "expo-booth-3d175-highlights": {
    en: {
      title: "Booth 3D175: one-stop display of cable carriers and cooling pipes",
      content:
        "CNWSL’s industrial expo booth showcased plastic cable carriers and cooling pipes, with multi-size samples on the table and application graphics on the backdrop.\n\nBook on-site selection talks—engineers advise by inner height, travel and environment, and can arrange sample shipments after the show.\n\nFollow CNWSL for more exhibition updates and new releases.",
      type: "Exhibitions",
    },
    vi: {
      title: "Gian hàng 3D175: trưng bày xích dẫn cáp và ống làm mát một điểm",
      content:
        "Gian hàng triển lãm CNWSL trưng bày xích dẫn cáp nhựa và ống làm mát, bàn mẫu nhiều quy cách và hình ứng dụng trên backdrop.\n\nĐặt lịch tư vấn chọn mẫu tại chỗ—kỹ sư tư vấn theo chiều cao trong, hành trình và môi trường, hỗ trợ gửi mẫu sau hội.\n\nTheo dõi CNWSL để cập nhật triển lãm và sản phẩm mới.",
      type: "Triển lãm",
    },
    es: {
      title: "Stand 3D175: exposición integral de portacables y tubos de refrigeración",
      content:
        "El stand de CNWSL en la feria industrial mostró portacables de plástico y tubos de refrigeración, con muestras multi-medida y gráficos de aplicación en el fondo.\n\nReserve asesoría de selección in situ: los ingenieros orientan por altura interior, recorrido y entorno, y pueden enviar muestras tras la feria.\n\nSiga a CNWSL para más novedades de ferias y productos.",
      type: "Ferias",
    },
    it: {
      title: "Stand 3D175: esposizione one-stop di catene portacavi e tubi di raffreddamento",
      content:
        "Lo stand CNWSL in fiera ha mostrato catene portacavi in plastica e tubi di raffreddamento, con campioni multi-misura e grafiche applicative sullo sfondo.\n\nPrenotate consulenze di selezione in loco: gli ingegneri consigliano per altezza interna, corsa e ambiente e possono inviare campioni dopo l’evento.\n\nSeguite CNWSL per aggiornamenti fiere e novità.",
      type: "Fiere",
    },
    ru: {
      title: "Стенд 3D175: единая витрина кабельных цепей и труб охлаждения",
      content:
        "Стенд CNWSL на промышленной выставке представил пластиковые кабельные цепи и трубы охлаждения: на столе — мультиразмерные образцы, на фоне — схемы применений.\n\nЗапишитесь на подбор на месте — инженеры консультируют по внутренней высоте, ходу и среде и могут организовать отправку образцов после выставки.\n\nСледите за CNWSL: новые выставки и релизы продуктов.",
      type: "Выставки",
    },
  },
  "assembly-workshop-tour": {
    en: {
      title: "Inside the assembly shop: efficient carrier assembly and packing lines",
      content:
        "In the CNWSL assembly workshop, carrier assembly, inspection and packing run in sequence with fixtures and tote control for consistent batch delivery.\n\nFrom link assembly to boxed goods, in-process checks reduce miss-assembly and mix-ups for machine-tool and automation customers.\n\nFactory visits are welcome—see production and quality control first-hand.",
      type: "Company news",
    },
    vi: {
      title: "Thực tế xưởng lắp ráp: dây chuyền lắp và đóng gói xích vận hành hiệu quả",
      content:
        "Trong xưởng lắp ráp CNWSL, lắp xích, kiểm tra và đóng gói nối tiếp với đồ gá và thùng luân chuyển, bảo đảm giao lô ổn định.\n\nTừ lắp mắt xích đến đóng thùng, kiểm soát quá trình giảm thiếu lắp và lẫn lô cho khách máy công cụ và tự động hóa.\n\nHoan nghênh đặt lịch tham quan nhà máy để xem sản xuất và kiểm soát chất lượng.",
      type: "Tin công ty",
    },
    es: {
      title: "Taller de montaje: líneas eficientes de ensamblaje y embalaje de portacables",
      content:
        "En el taller de montaje CNWSL, ensamblaje, inspección y embalaje se encadenan con utillaje y cajones de tránsito para entregas por lote consistentes.\n\nDel eslabón al embalaje, los controles en proceso reducen omisiones y mezclas de lote para clientes de máquinas-herramienta y automatización.\n\nLas visitas a fábrica son bienvenidas para ver producción y control de calidad.",
      type: "Noticias de la empresa",
    },
    it: {
      title: "Reparto assemblaggio: linee efficienti di montaggio e imballo catene",
      content:
        "Nel reparto assemblaggio CNWSL, montaggio, ispezione e imballo si susseguono con attrezzature e cassette di transito per consegne a lotto coerenti.\n\nDalla maglia alla cassa, i controlli di processo riducono mancanze e mescolanze di lotto per clienti di macchine utensili e automazione.\n\nLe visite in fabbrica sono benvenute per vedere produzione e qualità.",
      type: "Notizie aziendali",
    },
    ru: {
      title: "Внутри сборочного цеха: эффективные линии сборки и упаковки кабельных цепей",
      content:
        "В сборочном цехе CNWSL сборка, контроль и упаковка кабельных цепей идут последовательно с оснасткой и контролем тары — для стабильной поставки партий.\n\nОт сборки звеньев до коробок межоперационный контроль снижает пропуски сборки и пересортицу для заказчиков станков и автоматизации.\n\nПриглашаем на экскурсии по заводу — посмотрите производство и контроль качества своими глазами.",
      type: "Новости компании",
    },
  },
  "expo-product-display-highlights": {
    en: {
      title: "Booth product close-up: multi-series bend demos and cooling-pipe displays",
      content:
        "The expo booth centered on multi-series black carrier samples, with bend-radius demos and cooling-pipe displays showing coverage from micro to heavy-duty sizes.\n\nVisitors can feel opening action, pin structure and cover styles, then discuss localization paths with engineers based on machine duty.\n\nCatalogs and drawings are available in the downloads center.",
      type: "Exhibitions",
    },
    vi: {
      title: "Cận cảnh sản phẩm gian hàng: demo uốn đa series và ống làm mát",
      content:
        "Gian hàng lấy mẫu xích đen đa series làm trung tâm, kèm demo bán kính uốn và ống làm mát, thể hiện phủ từ mini đến chịu tải.\n\nKhách có thể cảm nhận kiểu mở, cấu trúc chốt và nắp, rồi thảo luận đường thay thế nội địa hóa với kỹ sư theo điều kiện máy.\n\nCatalog và bản vẽ có tại trung tâm tải về.",
      type: "Triển lãm",
    },
    es: {
      title: "Detalle de productos en el stand: demos de curvado multi-serie y tubos de refrigeración",
      content:
        "El stand centró muestras de portacables negros multi-serie, con demos de radio de curvado y tubos de refrigeración que muestran cobertura de micro a heavy-duty.\n\nLos visitantes pueden probar apertura, pasadores y tapas, y hablar de localización con ingenieros según el régimen de la máquina.\n\nCatálogos y planos están en el centro de descargas.",
      type: "Ferias",
    },
    it: {
      title: "Dettaglio prodotti in stand: demo di curvatura multi-serie e tubi di raffreddamento",
      content:
        "Lo stand ha messo al centro campioni di catene nere multi-serie, con demo di raggio di curvatura e tubi di raffreddamento che mostrano la copertura da micro a heavy-duty.\n\nI visitatori possono provare apertura, perni e coperchi e discutere percorsi di localizzazione con gli ingegneri in base al regime macchina.\n\nCataloghi e disegni sono nel centro download.",
      type: "Fiere",
    },
    ru: {
      title: "Крупный план стенда: демо изгиба по сериям и экспозиция труб охлаждения",
      content:
        "В центре стенда — чёрные образцы кабельных цепей нескольких серий, демо радиуса изгиба и витрина труб охлаждения: покрытие от микро- до усиленных размеров.\n\nПосетители могут оценить открытие, конструкцию пальцев и типы крышек, затем обсудить с инженерами пути локализации под режим оборудования.\n\nКаталоги и чертежи доступны в центре загрузок.",
      type: "Выставки",
    },
  },
};

function contentLocale(locale: Locale): ContentLocale | null {
  return locale === "zh" ? null : locale;
}

export function localizePostContent<
  T extends {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
  },
>(post: T, locale: Locale): T {
  const target = contentLocale(locale);
  if (!target) return post;
  const entry = postsBySlug[post.slug];
  // Never silently serve Chinese source on non-zh locales.
  const translated = entry?.[target] ?? entry?.en;
  if (!translated) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[content-i18n] missing ${target}/en for post: ${post.slug}`);
    }
    return {
      ...post,
      title: post.slug,
      excerpt: "",
      content: "Translation pending.",
    };
  }
  return { ...post, ...translated };
}

export function localizeNewsContent<
  T extends {
    slug: string;
    title: string;
    content: string;
    type: string;
  },
>(
  item: T,
  locale: Locale,
): Omit<T, keyof LocalizedNewsFields> & LocalizedNewsFields {
  const target = contentLocale(locale);
  if (!target) {
    return item as Omit<T, keyof LocalizedNewsFields> & LocalizedNewsFields;
  }
  const entry = newsBySlug[item.slug];
  const translated = entry?.[target] ?? entry?.en;
  if (!translated) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[content-i18n] missing ${target}/en for news: ${item.slug}`);
    }
    return {
      ...item,
      title: item.slug,
      content: "Translation pending.",
      type: entry?.en?.type ?? "News",
    } as Omit<T, keyof LocalizedNewsFields> & LocalizedNewsFields;
  }
  return { ...item, ...translated };
}
