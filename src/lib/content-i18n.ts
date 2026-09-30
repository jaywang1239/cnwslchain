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
  "cleanroom-cable-carrier-selection-guide": {
    en: {
      title: "Cleanroom cable carrier selection: particle emission, bend radius and life verification",
      excerpt: "A cleanroom carrier is not an upgraded nylon chain: switching to TPU changes particle emission, temperature window and noise. Here is the WWC selection order, the three test reports to request, and four installation traps.",
      content: "A cleanroom cable carrier is not a nylon chain with a cover added. Inside a cleanroom it does two jobs at once: it carries the cables, and it **does not release particles into the environment**. Most selection mistakes come from looking only at the first one.\n\n## 1. Material first: cleanroom carriers use TPU, not nylon\n\nA standard nylon cable carrier is made of PA66 with 30% glass fibre, and it relies on stiffness and wear resistance to survive long travel. A cleanroom carrier has a different priority — how much material gets rubbed off — so the mainstream approach is to switch to TPU (thermoplastic polyurethane).\n\nChanging the material has three knock-on effects:\n\n- **The wear mechanism changes.** Nylon gets its hardness from glass fibre, so the debris from chain-link contact is harder and heavier. TPU is more elastic, spreads the load across the contact surface, and sheds fewer and softer particles.\n- **The temperature window changes.** The CNWSL WWC cleanroom carrier is rated at -20°C to 120°C, which does not match the standard nylon ranges. High-temperature cleanroom duty needs to be calculated separately.\n- **Noise behaviour changes.** The damping properties of TPU naturally reduce impact noise in high-speed reciprocation — one reason ESD-sensitive workshops often pick it up at the same time.\n\nIf a customer insists on \"making nylon clean\", ask about the required cleanliness class first. When the two materials are close, making up the difference with sealing structures usually costs more.\n\n## 2. Fix the cleanliness class before anything else\n\nThe cleanroom class is an input to selection, not a result you verify afterwards. The international standard is ISO 14644-1, which ranks ISO Class 1–9 by particle concentration per unit volume of air; the older US FED-STD-209E used Class 1–100000, and **ISO Class 5 corresponds roughly to the old Class 100**.\n\nIt is worth unpacking the phrase \"meets Class 100 and above\":\n\n- Which standard does the site actually work to? Is acceptance based on particle-counter data or on the supplier's declaration?\n- Is it at rest or in operation? Particle counts rise noticeably once the machine is running.\n- Is the carrier the only particle source, or just one of several?\n\nThe CNWSL WWC series is designed for semiconductor, flat-panel and pharmaceutical cleanrooms, with low particle emission and low noise. **Which class it actually achieves must be backed by the test report for the specific batch** — write that requirement into the technical agreement at the selection stage and the rest gets easier.\n\n## 3. Four parameters, in this order\n\n### 3.1 Inner height and inner width: keep the fill ratio under 60%\n\nList every cable that has to run through the carrier — power, signal, air hose and fibre counted separately — total up the cross-sections, then apply a safety factor of about 1.6. The total cable cross-section should generally stay under 60% of the carrier cavity, and lower still for high-speed duty.\n\nWider is not better. Too much spare room lets the cables shift inside the cavity, which increases both wear and noise.\n\n### 3.2 Bend radius: work backwards from the cable\n\nThe bend radius is decided by the cable, not by the carrier. Take the **thickest, stiffest cable** in the run (usually the power line or the air hose), look up the manufacturer's minimum bend radius, and apply 1.1×–1.2× margin. That gives the R value the carrier has to offer.\n\nOne point that gets confused often: the carrier's R value sets the **installation height and the space it occupies**. It is not, by itself, a cable life figure.\n\n### 3.3 Travel and mounting\n\n- Under 2 m travel, horizontal mounting: standard support is enough.\n- Long travel or high-speed reciprocation: calculate the self-supporting capacity and sag of the unsupported span, and add a guide trough or support rollers where needed.\n- Vertical mounting: evaluate the continuous load the chain's own weight puts on the pins, plus the swing amplitude.\n\nThis part is hard to explain in prose — run through the [selection calculation flow](/en/guides/selection) with your travel, speed and acceleration instead.\n\n### 3.4 Temperature, media and static\n\n- Temperature: the WWC series is rated -20°C to 120°C. Outside that range, consider a different material.\n- Media: coolant, cleaning agents and alcohol wipes are daily reality in a cleanroom. List them and have the supplier confirm compatibility.\n- Static: electronics assembly and panel lines often carry ESD requirements. Be clear whether you need \"dissipative material\" or \"conductive grounding\" — they are built differently.\n\n## 4. WWC series at a glance\n\nCNWSL cleanroom carriers currently cover five inner heights, all in TPU, rated -20°C to 120°C:\n\n| Model | Inner height | Inner width | Available bend radii |\n|---|---|---|---|\n| WWC15 | 15 mm | 25 mm | R40 / R50 / R60 / R70 |\n| WWC18 | 18 mm | 32 mm | R40 / R50 / R60 / R70 |\n| WWC22 | 22 mm | 40 mm | R40 / R50 / R60 / R70 |\n| WWC28 | 28 mm | 65 mm | R40 / R60 / R70 / R90 |\n| WWC35 | 35 mm | 65 mm | R60 / R70 / R90 |\n\nThese are the standard inner widths. A non-standard width or a non-standard bend radius needs tooling, so confirm the mould and the lead time early — otherwise the project stalls at this step. The full dimension tables are on the [cleanroom carrier series page](/en/products/cleanroom), model by model, for example [WWC15](/en/products/cleanroom/wwc15).\n\n## 5. Factory audit and acceptance: which documents to ask for\n\nWhen you buy a cleanroom carrier, \"evidence\" is the easiest thing to leave vague. Put the list directly into the technical agreement:\n\n1. **Low particle emission test report** — test method, sampling conditions (loaded or unloaded), particle count results.\n2. **High/low temperature cycling test** — confirms the material does not crack or harden at either -20°C or 120°C.\n3. **Fatigue life bench data** — cycle count and failure criteria (sudden noise increase, excessive link clearance, breakage).\n4. **Material declarations** — TPU grade, halogen content, RoHS status.\n\nFor CNWSL, these three reports (particle emission, temperature cycling, fatigue life) are available from the [downloads page](/en/downloads) together with the cleanroom catalogue. **Being able to issue a report and being willing to issue it are two different things** — send the list at the selection stage; how fast the other side responds is itself a screening test.\n\n## 6. Four installation traps\n\n- **Mounting the carrier downstream in the airflow.** Cleanroom airflow is designed deliberately. If carrier debris settles above the product flow, the selection was wasted.\n- **Reversing the fixed and moving ends.** The curved section should sit away from the side that has to stay clean.\n- **Ignoring cable clamping.** Clamp the cables a short distance from each end of the carrier so that bending happens only inside it. Running cables straight in and out cuts life noticeably.\n- **Accepting on static conditions only.** Run it empty, run it loaded, run it continuously for more than 8 hours, and record noise and particle data in all three states.\n\n## 7. FAQ\n\n**Can a domestic cleanroom carrier replace an imported brand?**\n\nWhether it can replace one depends on the acceptance criteria, not on the brand. Write the cleanliness class, particle emission limit and life requirement as measurable clauses, and domestic supply chains pass under most standard conditions. Conversely, if the requirement itself is not measurable, any supplier will end up arguing about it.\n\n**What are typical lead times?**\n\nStocked standard sizes are the fastest. A non-standard inner width or bend radius requires tooling, and the lead time has to be confirmed separately. CNWSL holds stock in Dongguan, Foshan and Shanghai; ask sales about shipping cadence for standard parts.\n\n**Cleanroom carrier or silent carrier?**\n\nThe two requirements overlap but are not identical. If particles are the core problem, choose the cleanroom carrier (TPU). If noise is the core problem, choose the [silent series](/en/products/silent). If both matter, write both metrics into the agreement and then compare samples.\n\n**Can we audit the factory?**\n\nYes. Production is in Yueqing, Zhejiang, and factory audits and sampling are arranged there, with the moulds and production lines available on site.\n\n**Do you hold IATF16949?**\n\nYes, IATF16949 is held. One more note: if the project involves automotive customers or export certification, ISO14001 is usually required as well — please confirm the current status with sales before ordering rather than assuming it.\n\n## Conclusion\n\nThe hard part of cleanroom carrier selection is not the parameters, it is the chain of evidence: a measurable class requirement, traceable particle data, and verifiable installation constraints. Nail those three down at the selection stage and acceptance and mass production get much smoother.\n\nTo run the numbers against your actual travel and cable list, start from the [cleanroom carrier series](/en/products/cleanroom) or read the [selection calculation flow](/en/guides/selection) first.",
      category: "Technical selection",
      author: "CNWSL Engineering",
    },
    vi: {
      title: "Hướng dẫn chọn xích dẫn cáp phòng sạch: phát thải hạt, bán kính uốn và kiểm chứng tuổi thọ",
      excerpt: "Xích phòng sạch không phải bản nâng cấp của xích nylon: chuyển sang TPU làm thay đổi phát thải hạt, dải nhiệt độ và độ ồn. Đây là trình tự chọn WWC, ba loại báo cáo cần yêu cầu và bốn lỗi lắp đặt.",
      content: "Xích dẫn cáp phòng sạch không phải là xích nylon được gắn thêm nắp. Trong phòng sạch, nó làm hai việc cùng lúc: dẫn cáp, và **không thải hạt ra môi trường**. Phần lớn sai sót khi chọn mẫu đều do chỉ nhìn vào việc thứ nhất.\n\n## 1. Chất liệu trước tiên: xích phòng sạch dùng TPU, không phải nylon\n\nXích dẫn cáp nylon thông thường làm từ PA66 + 30% sợi thủy tinh, dựa vào độ cứng và độ chịu mài mòn để chạy hành trình dài. Xích phòng sạch có ưu tiên khác — lượng vật liệu bị mài rơi ra — nên cách làm phổ biến là chuyển sang TPU (polyurethane nhiệt dẻo).\n\nĐổi vật liệu kéo theo ba hệ quả:\n\n- **Cơ chế phát thải hạt thay đổi.** Nylon cứng nhờ sợi thủy tinh nên mạt sinh ra từ ma sát giữa các mắt xích cứng và nặng hơn. TPU đàn hồi tốt hơn, phân tán lực trên bề mặt tiếp xúc, sinh ít hạt hơn và mềm hơn.\n- **Dải nhiệt độ thay đổi.** Xích phòng sạch WWC của CNWSL có nhiệt độ làm việc danh định -20°C ~ 120°C, không giống các dòng nylon thông thường. Điều kiện nhiệt độ cao cần tính riêng.\n- **Độ ồn thay đổi.** Đặc tính giảm chấn của TPU vốn đã hạ tiếng va đập khi chạy tốc độ cao, đây cũng là lý do các xưởng nhạy tĩnh điện thường chọn luôn.\n\nNếu khách hàng vẫn muốn \"làm sạch xích nylon\", hãy hỏi cấp độ sạch yêu cầu trước. Khi hai vật liệu không chênh nhau nhiều, việc bù bằng kết cấu kín thường tốn kém hơn.\n\n## 2. Xác định cấp độ sạch trước, rồi mới bàn phần còn lại\n\nCấp phòng sạch là điều kiện đầu vào để chọn mẫu, không phải kết quả kiểm tra sau đó. Tiêu chuẩn phổ biến là ISO 14644-1, phân theo nồng độ hạt trong một đơn vị thể tích không khí thành ISO Class 1~9; tiêu chuẩn Mỹ cũ FED-STD-209E dùng Class 1~100000, và **ISO Class 5 tương đương gần đúng Class 100 cũ**.\n\nNên tách câu \"đạt Class 100 trở lên\" thành các câu hỏi cụ thể:\n\n- Hiện trường đang áp dụng tiêu chuẩn nào? Nghiệm thu dựa trên dữ liệu máy đếm hạt hay tuyên bố của nhà cung cấp?\n- Đạt khi tĩnh hay khi chạy? Số hạt sẽ cao hơn rõ rệt khi thiết bị hoạt động.\n- Xích là nguồn phát thải duy nhất hay chỉ là một trong nhiều nguồn?\n\nDòng WWC của CNWSL được thiết kế cho bán dẫn, màn hình phẳng và phòng sạch dược phẩm, phát thải hạt thấp và độ ồn thấp. **Nhưng đạt cấp nào phải căn cứ vào báo cáo kiểm định của đúng lô hàng đó**, hãy ghi yêu cầu này vào thỏa thuận kỹ thuật ngay từ bước chọn mẫu.\n\n## 3. Bốn thông số, theo đúng trình tự\n\n### 3.1 Chiều cao và chiều rộng trong: giữ tỷ lệ lấp đầy dưới 60%\n\nLiệt kê toàn bộ cáp đi trong lượt này — cáp động lực, cáp tín hiệu, ống khí, sợi quang tính riêng — cộng tổng tiết diện rồi nhân hệ số an toàn khoảng 1,6. Tổng tiết diện cáp thường không vượt quá 60% tiết diện lòng xích, và thấp hơn nữa với tốc độ cao.\n\nRộng hơn không phải tốt hơn. Dư quá nhiều khiến cáp xê dịch trong lòng xích, làm tăng cả mài mòn lẫn tiếng ồn.\n\n### 3.2 Bán kính uốn: suy ngược từ cáp\n\nBán kính uốn do cáp quyết định, không phải do xích. Lấy **sợi cáp to và cứng nhất** trong lượt (thường là cáp động lực hoặc ống khí), tra bán kính uốn nhỏ nhất do nhà sản xuất khuyến nghị, nhân biên 1,1~1,2 lần, ra giá trị R mà xích phải đáp ứng.\n\nMột điểm hay bị lẫn: giá trị R của xích quyết định **chiều cao lắp đặt và không gian chiếm chỗ**, bản thân nó không phải chỉ số tuổi thọ cáp.\n\n### 3.3 Hành trình và cách lắp\n\n- Hành trình dưới 2 m, lắp ngang: đỡ tiêu chuẩn là đủ.\n- Hành trình dài hoặc chạy tốc độ cao: phải tính khả năng tự đỡ và độ võng của đoạn treo, thêm máng dẫn hướng hoặc con lăn đỡ khi cần.\n- Lắp thẳng đứng: cần đánh giá tải trọng liên tục của trọng lượng xích lên chốt, cùng biên độ dao động.\n\nPhần này khó nói bằng chữ, nên chạy trực tiếp [quy trình tính chọn mẫu](/vi/guides/selection) với hành trình, tốc độ, gia tốc của bạn.\n\n### 3.4 Nhiệt độ, môi chất và tĩnh điện\n\n- Nhiệt độ: dòng WWC danh định -20°C ~ 120°C. Vượt dải này cần xem xét đổi vật liệu.\n- Môi chất: dung dịch cắt, chất tẩy rửa, cồn lau là chuyện hằng ngày trong phòng sạch. Hãy liệt kê và để nhà cung cấp xác nhận tương thích.\n- Tĩnh điện: dây chuyền điện tử, màn hình thường có yêu cầu chống tĩnh điện. Cần rõ là \"vật liệu kháng tĩnh điện\" hay \"nối đất dẫn điện\" — hai cách làm khác nhau.\n\n## 4. Tra nhanh dòng WWC\n\nXích phòng sạch CNWSL hiện có năm cỡ chiều cao trong, vật liệu đều là TPU, nhiệt độ làm việc -20°C ~ 120°C:\n\n| Model | Chiều cao trong | Chiều rộng trong | Bán kính uốn khả dụng |\n|---|---|---|---|\n| WWC15 | 15 mm | 25 mm | R40 / R50 / R60 / R70 |\n| WWC18 | 18 mm | 32 mm | R40 / R50 / R60 / R70 |\n| WWC22 | 22 mm | 40 mm | R40 / R50 / R60 / R70 |\n| WWC28 | 28 mm | 65 mm | R40 / R60 / R70 / R90 |\n| WWC35 | 35 mm | 65 mm | R60 / R70 / R90 |\n\nTrên đây là chiều rộng trong tiêu chuẩn. Chiều rộng trong hoặc bán kính uốn phi tiêu chuẩn cần làm khuôn, phải xác nhận khuôn và tiến độ sớm, nếu không dự án sẽ kẹt ở bước này. Bảng kích thước đầy đủ nằm ở [trang dòng xích phòng sạch](/vi/products/cleanroom), tra theo từng model, ví dụ [WWC15](/vi/products/cleanroom/wwc15).\n\n## 5. Thẩm định nhà máy và nghiệm thu: cần những tài liệu nào\n\nKhi mua xích phòng sạch, \"bằng chứng\" là thứ dễ bị nói chung chung nhất. Hãy ghi thẳng danh mục vào thỏa thuận kỹ thuật:\n\n1. **Báo cáo thử phát thải hạt thấp** — phương pháp thử, điều kiện lấy mẫu (có tải hay không), kết quả đếm hạt.\n2. **Thử chu trình nhiệt độ cao/thấp** — xác nhận vật liệu không nứt hay hóa cứng ở -20°C và 120°C.\n3. **Dữ liệu tuổi thọ mỏi trên băng thử** — số chu kỳ, tiêu chí hỏng (ồn tăng vọt, khe mắt xích vượt ngưỡng, đứt).\n4. **Chứng nhận vật liệu** — mác TPU, có halogen hay không, tình trạng RoHS.\n\nVới CNWSL, ba loại báo cáo này (phát thải hạt, chu trình nhiệt, tuổi thọ mỏi) có sẵn ở [trang tải tài liệu](/vi/downloads) cùng catalogue phòng sạch. **Có thể ra báo cáo và sẵn sàng ra báo cáo là hai việc khác nhau** — gửi danh mục ngay ở bước chọn mẫu, tốc độ phản hồi tự nó đã là một lần sàng lọc.\n\n## 6. Bốn lỗi lắp đặt thường gặp\n\n- **Lắp xích ở phía hạ lưu luồng gió.** Hướng gió phòng sạch đã được thiết kế; nếu mạt xích rơi phía trên luồng sản phẩm thì coi như chọn sai.\n- **Lắp ngược đầu cố định và đầu di động.** Đoạn uốn cong nên nằm xa phía cần giữ sạch.\n- **Bỏ qua việc cố định cáp.** Kẹp cáp một đoạn ở hai đầu xích để việc uốn chỉ xảy ra bên trong xích; kéo thẳng vào ra sẽ rút ngắn tuổi thọ rõ rệt.\n- **Chỉ nghiệm thu trạng thái tĩnh.** Chạy không tải, chạy có tải, chạy liên tục trên 8 giờ, và lưu dữ liệu ồn cùng hạt ở cả ba trạng thái.\n\n## 7. Câu hỏi thường gặp\n\n**Xích phòng sạch nội địa có thay được hàng nhập không?**\n\nThay được hay không phụ thuộc tiêu chí nghiệm thu, không phụ thuộc thương hiệu. Hãy viết cấp độ sạch, giới hạn phát thải hạt và yêu cầu tuổi thọ thành các điều khoản đo được; chuỗi cung ứng nội địa đáp ứng được ở phần lớn điều kiện thông thường. Ngược lại, nếu yêu cầu tự nó không đo được thì nhà nào làm cũng sẽ tranh cãi.\n\n**Thời gian giao hàng bao lâu?**\n\nCỡ tiêu chuẩn có sẵn hàng là nhanh nhất. Chiều rộng trong hoặc bán kính uốn phi tiêu chuẩn cần làm khuôn, tiến độ phải xác nhận riêng. CNWSL có kho ở Đông Quản, Phật Sơn và Thượng Hải; nhịp giao hàng cho hàng tiêu chuẩn hỏi trực tiếp bộ phận kinh doanh.\n\n**Chọn xích phòng sạch hay xích êm?**\n\nHai nhu cầu chồng lấn nhưng không hoàn toàn giống nhau. Nếu mâu thuẫn cốt lõi là \"hạt\", chọn xích phòng sạch (vật liệu TPU). Nếu mâu thuẫn cốt lõi là \"tiếng ồn\", chọn [dòng êm](/vi/products/silent). Nếu cần cả hai, hãy đưa cả hai chỉ tiêu vào thỏa thuận rồi so mẫu.\n\n**Có thể thẩm định nhà máy không?**\n\nCó. Cơ sở sản xuất đặt tại Nhạc Thanh, Chiết Giang; thẩm định nhà máy và lấy mẫu đều bố trí tại đó, có thể xem khuôn và dây chuyền tại chỗ.\n\n**Các bạn có IATF16949 không?**\n\nCó, đã sở hữu IATF16949. Thêm một lưu ý: nếu dự án liên quan khách hàng ô tô hoặc chứng nhận xuất khẩu, thường còn yêu cầu ISO14001 — hãy xác nhận tình trạng mới nhất với bộ phận kinh doanh trước khi đặt hàng, đừng mặc định.\n\n## Kết luận\n\nĐiểm khó của việc chọn xích phòng sạch không nằm ở thông số, mà ở chuỗi bằng chứng: yêu cầu cấp độ đo được, dữ liệu phát thải hạt tra được, ràng buộc lắp đặt kiểm chứng được. Chốt ba việc này ngay ở bước chọn mẫu thì nghiệm thu và sản lượng hàng loạt sẽ thuận hơn nhiều.\n\nMuốn tính theo hành trình và danh mục cáp thực tế, bắt đầu từ [dòng xích phòng sạch](/vi/products/cleanroom) hoặc xem trước [quy trình tính chọn mẫu](/vi/guides/selection).",
      category: "Chọn mẫu kỹ thuật",
      author: "Đội kỹ thuật CNWSL",
    },
    es: {
      title: "Selección de portacables para sala limpia: emisión de partículas, radio de curvatura y vida útil",
      excerpt: "Un portacables de sala limpia no es una cadena de nailon mejorada: pasar a TPU cambia la emisión de partículas, el rango de temperatura y el ruido. Aquí la secuencia WWC, los tres informes a solicitar y cuatro errores de instalación.",
      content: "Un portacables de sala limpia no es una cadena de nailon con una tapa añadida. Dentro de una sala limpia hace dos trabajos a la vez: guía los cables y **no libera partículas al ambiente**. La mayoría de los errores de selección vienen de mirar solo el primero.\n\n## 1. Primero el material: los portacables de sala limpia usan TPU, no nailon\n\nUn portacables de nailon estándar se fabrica con PA66 + 30% de fibra de vidrio y se apoya en la rigidez y la resistencia al desgaste para soportar carreras largas. Un portacables de sala limpia tiene otra prioridad —cuánto material se desprende por fricción—, así que el enfoque habitual es pasar a TPU (poliuretano termoplástico).\n\nCambiar el material arrastra tres consecuencias:\n\n- **Cambia el mecanismo de emisión.** El nailon obtiene su dureza de la fibra de vidrio, por lo que los residuos del contacto entre eslabones son más duros y pesados. El TPU es más elástico, reparte la carga en la superficie de contacto y desprende menos partículas, y más blandas.\n- **Cambia la ventana de temperatura.** El portacables de sala limpia WWC de CNWSL está especificado de -20 °C a 120 °C, distinto de las gamas de nailon habituales. El servicio a alta temperatura debe calcularse aparte.\n- **Cambia el comportamiento acústico.** El amortiguamiento del TPU reduce de forma natural el ruido de impacto en el vaivén a alta velocidad; es una razón por la que los talleres sensibles a la estática lo eligen también.\n\nSi el cliente insiste en \"hacer limpio el nailon\", pregunte primero por la clase de limpieza exigida. Cuando ambos materiales están cerca, compensar con estructuras de sellado suele costar más.\n\n## 2. Fije la clase de limpieza antes de nada\n\nLa clase de sala limpia es una entrada de la selección, no un resultado que se verifica después. La norma internacional es ISO 14644-1, que ordena ISO Class 1–9 según la concentración de partículas por unidad de volumen de aire; la antigua norma estadounidense FED-STD-209E usaba Class 1–100000, y **ISO Class 5 corresponde aproximadamente al antiguo Class 100**.\n\nConviene desglosar la frase \"cumple Class 100 o superior\":\n\n- ¿Qué norma aplica realmente la planta? ¿La aceptación se basa en datos de contador de partículas o en la declaración del proveedor?\n- ¿Se cumple en reposo o en funcionamiento? El recuento sube de forma apreciable cuando la máquina trabaja.\n- ¿El portacables es la única fuente de partículas o solo una más?\n\nLa serie WWC de CNWSL está diseñada para semiconductores, paneles planos y salas limpias farmacéuticas, con baja emisión de partículas y bajo ruido. **Pero la clase que realmente alcanza debe respaldarse con el informe de ensayo del lote concreto**; incluya ese requisito en el acuerdo técnico desde la fase de selección.\n\n## 3. Cuatro parámetros, en este orden\n\n### 3.1 Altura y ancho interior: mantenga la tasa de ocupación por debajo del 60%\n\nEnumere todos los cables del recorrido —potencia, señal, manguera de aire y fibra por separado—, sume las secciones y aplique un factor de seguridad de aproximadamente 1,6. La sección total de cables no debería superar el 60% de la cavidad, y menos aún en servicio a alta velocidad.\n\nMás ancho no es mejor. Un exceso de holgura deja que los cables se muevan dentro de la cavidad, lo que aumenta el desgaste y el ruido.\n\n### 3.2 Radio de curvatura: calcúlelo desde el cable\n\nEl radio de curvatura lo decide el cable, no el portacables. Tome el **cable más grueso y rígido** del recorrido (normalmente la línea de potencia o la manguera de aire), consulte el radio mínimo recomendado por su fabricante y aplique un margen de 1,1×–1,2×. Ese es el valor R que debe ofrecer el portacables.\n\nUn punto que se confunde a menudo: el valor R del portacables fija la **altura de instalación y el espacio ocupado**. No es, por sí mismo, un dato de vida útil del cable.\n\n### 3.3 Carrera y montaje\n\n- Menos de 2 m de carrera, montaje horizontal: con el soporte estándar es suficiente.\n- Carrera larga o vaivén a alta velocidad: calcule la capacidad autoportante y la flecha del tramo sin apoyo, y añada canaleta guía o rodillos de apoyo si hace falta.\n- Montaje vertical: evalúe la carga continua del propio peso de la cadena sobre los pasadores y la amplitud de oscilación.\n\nEsta parte es difícil de explicar por escrito: recorra el [flujo de cálculo de selección](/es/guides/selection) con su carrera, velocidad y aceleración.\n\n### 3.4 Temperatura, medios y estática\n\n- Temperatura: la serie WWC está especificada de -20 °C a 120 °C. Fuera de ese rango hay que considerar otro material.\n- Medios: refrigerante, agentes de limpieza y alcohol son el día a día de una sala limpia. Enumere los medios y pida al proveedor que confirme la compatibilidad.\n- Estática: el montaje electrónico y las líneas de paneles suelen exigir ESD. Deje claro si necesita \"material disipativo\" o \"puesta a tierra conductiva\": se construyen de forma distinta.\n\n## 4. Serie WWC de un vistazo\n\nLos portacables de sala limpia de CNWSL cubren cinco alturas interiores, todas en TPU, de -20 °C a 120 °C:\n\n| Modelo | Altura interior | Ancho interior | Radios de curvatura disponibles |\n|---|---|---|---|\n| WWC15 | 15 mm | 25 mm | R40 / R50 / R60 / R70 |\n| WWC18 | 18 mm | 32 mm | R40 / R50 / R60 / R70 |\n| WWC22 | 22 mm | 40 mm | R40 / R50 / R60 / R70 |\n| WWC28 | 28 mm | 65 mm | R40 / R60 / R70 / R90 |\n| WWC35 | 35 mm | 65 mm | R60 / R70 / R90 |\n\nEstos son los anchos interiores estándar. Un ancho o un radio de curvatura no estándar requiere utillaje, así que confirme el molde y el plazo cuanto antes; de lo contrario el proyecto se atasca en este paso. Las tablas de dimensiones completas están en la [página de la serie de sala limpia](/es/products/cleanroom), modelo a modelo, por ejemplo [WWC15](/es/products/cleanroom/wwc15).\n\n## 5. Auditoría de fábrica y aceptación: qué documentos pedir\n\nAl comprar un portacables de sala limpia, la \"evidencia\" es lo más fácil de dejar en el aire. Ponga la lista directamente en el acuerdo técnico:\n\n1. **Informe de ensayo de baja emisión de partículas** — método, condiciones de muestreo (con o sin carga) y resultados del recuento.\n2. **Ensayo de ciclado térmico alto/bajo** — confirma que el material no se agrieta ni se endurece a -20 °C ni a 120 °C.\n3. **Datos de vida a fatiga en banco** — número de ciclos y criterios de fallo (aumento brusco de ruido, holgura excesiva entre eslabones, rotura).\n4. **Declaraciones de material** — grado de TPU, contenido de halógenos, situación RoHS.\n\nEn CNWSL, estos tres informes (emisión de partículas, ciclado térmico y vida a fatiga) están disponibles en la [página de descargas](/es/downloads) junto con el catálogo de sala limpia. **Poder emitir un informe y estar dispuesto a emitirlo son dos cosas distintas**: envíe la lista en la fase de selección; la rapidez de respuesta ya es un filtro en sí mismo.\n\n## 6. Cuatro trampas de instalación\n\n- **Montar el portacables aguas abajo del flujo de aire.** El flujo de una sala limpia está diseñado a propósito. Si los residuos caen por encima del flujo de producto, la selección se desperdició.\n- **Invertir el extremo fijo y el móvil.** El tramo curvo debe quedar lejos del lado que hay que mantener limpio.\n- **Ignorar la fijación de los cables.** Sujete los cables a cierta distancia de cada extremo para que la flexión ocurra solo dentro del portacables. Entrar y salir en línea recta acorta la vida de forma notable.\n- **Aceptar solo en estático.** Hágalo funcionar en vacío, con carga y más de 8 horas seguidas, y registre ruido y partículas en los tres estados.\n\n## 7. Preguntas frecuentes\n\n**¿Puede un portacables nacional sustituir a una marca importada?**\n\nQue pueda sustituirla depende del criterio de aceptación, no de la marca. Redacte la clase de limpieza, el límite de emisión de partículas y el requisito de vida útil como cláusulas medibles, y la cadena de suministro nacional las cumple en la mayoría de condiciones habituales. A la inversa, si el requisito no es medible, cualquier proveedor acabará discutiendo.\n\n**¿Cuáles son los plazos de entrega?**\n\nLas medidas estándar con existencias son lo más rápido. Un ancho interior o un radio no estándar exige utillaje y el plazo debe confirmarse aparte. CNWSL tiene almacén en Dongguan, Foshan y Shanghái; consulte a ventas el ritmo de envío de las piezas estándar.\n\n**¿Portacables de sala limpia o serie silenciosa?**\n\nLos dos requisitos se solapan pero no son idénticos. Si el problema central son las partículas, elija el de sala limpia (TPU). Si el problema central es el ruido, elija la [serie silenciosa](/es/products/silent). Si importan ambos, ponga las dos métricas en el acuerdo y compare muestras.\n\n**¿Se puede auditar la fábrica?**\n\nSí. La producción está en Yueqing, Zhejiang, y las auditorías y el muestreo se organizan allí, con los moldes y las líneas disponibles en planta.\n\n**¿Tienen IATF16949?**\n\nSí, IATF16949 está en vigor. Una nota más: si el proyecto implica clientes de automoción o certificación de exportación, normalmente también se exige ISO14001; confirme el estado actual con ventas antes de pedir, no lo dé por hecho.\n\n## Conclusión\n\nLo difícil de seleccionar un portacables de sala limpia no son los parámetros, sino la cadena de evidencia: un requisito de clase medible, datos de emisión trazables y restricciones de instalación verificables. Fije esas tres cosas en la fase de selección y la aceptación y la producción en serie irán mucho más fluidas.\n\nPara calcular con su carrera y su lista de cables reales, empiece por la [serie de sala limpia](/es/products/cleanroom) o lea antes el [flujo de cálculo de selección](/es/guides/selection).",
      category: "Selección técnica",
      author: "Ingeniería CNWSL",
    },
    it: {
      title: "Selezione della catena portacavi per camera bianca: rilascio di particelle, raggio di curvatura e vita utile",
      excerpt: "Una catena per camera bianca non è una catena in nylon potenziata: passare al TPU cambia rilascio di particelle, range di temperatura e rumorosità. Ecco l'ordine di selezione WWC, i tre report da richiedere e quattro errori di installazione.",
      content: "Una catena portacavi per camera bianca non è una catena in nylon con un coperchio aggiunto. In una camera bianca svolge due compiti insieme: guida i cavi e **non rilascia particelle nell'ambiente**. La maggior parte degli errori di selezione nasce dal guardare solo il primo.\n\n## 1. Prima il materiale: le catene per camera bianca usano TPU, non nylon\n\nUna catena portacavi in nylon standard è in PA66 + 30% fibra di vetro e si affida alla rigidità e alla resistenza all'usura per sostenere corse lunghe. Una catena per camera bianca ha una priorità diversa —quanto materiale viene asportato per attrito— quindi l'approccio diffuso è passare al TPU (poliuretano termoplastico).\n\nCambiare materiale porta con sé tre conseguenze:\n\n- **Cambia il meccanismo di rilascio.** Il nylon prende la durezza dalla fibra di vetro, quindi i detriti del contatto tra maglie sono più duri e pesanti. Il TPU è più elastico, distribuisce il carico sulla superficie di contatto e rilascia meno particelle, e più morbide.\n- **Cambia la finestra di temperatura.** La catena per camera bianca WWC di CNWSL è dichiarata da -20 °C a 120 °C, diversamente dalle gamme in nylon standard. L'impiego ad alta temperatura va calcolato a parte.\n- **Cambia il comportamento acustico.** Lo smorzamento del TPU riduce naturalmente il rumore d'urto nell'andirivieni ad alta velocità; è anche per questo che gli stabilimenti sensibili all'elettrostatica la scelgono.\n\nSe il cliente insiste nel \"rendere pulito il nylon\", chiedete prima la classe di pulizia richiesta. Quando i due materiali sono vicini, compensare con strutture di tenuta costa in genere di più.\n\n## 2. Fissate la classe di pulizia prima di tutto il resto\n\nLa classe della camera bianca è un dato di ingresso della selezione, non un risultato da verificare dopo. La norma internazionale è ISO 14644-1, che ordina ISO Class 1–9 in base alla concentrazione di particelle per unità di volume d'aria; la vecchia norma statunitense FED-STD-209E usava Class 1–100000, e **ISO Class 5 corrisponde all'incirca al vecchio Class 100**.\n\nVale la pena scomporre la frase \"soddisfa Class 100 e superiori\":\n\n- A quale norma lavora realmente il sito? L'accettazione si basa sui dati del contatore di particelle o sulla dichiarazione del fornitore?\n- Vale a riposo o in funzione? Il conteggio sale in modo evidente quando la macchina lavora.\n- La catena è l'unica fonte di particelle o solo una fra tante?\n\nLa serie WWC di CNWSL è progettata per semiconduttori, pannelli piani e camere bianche farmaceutiche, con basso rilascio di particelle e bassa rumorosità. **Ma la classe effettivamente raggiunta va supportata dal rapporto di prova del lotto specifico**: inserite questo requisito nell'accordo tecnico già in fase di selezione.\n\n## 3. Quattro parametri, in quest'ordine\n\n### 3.1 Altezza e larghezza interna: tenete il rapporto di riempimento sotto il 60%\n\nElenco di tutti i cavi del percorso —potenza, segnale, tubo aria e fibra conteggiati separatamente—, sommate le sezioni e applicate un fattore di sicurezza di circa 1,6. La sezione totale dei cavi non dovrebbe superare il 60% della cavità, e ancora meno in impieghi ad alta velocità.\n\nPiù larga non è meglio. Un gioco eccessivo lascia che i cavi si spostino nella cavità, aumentando usura e rumore.\n\n### 3.2 Raggio di curvatura: ricavatelo dal cavo\n\nIl raggio di curvatura lo decide il cavo, non la catena. Prendete il **cavo più grosso e rigido** del percorso (di solito la linea di potenza o il tubo aria), cercate il raggio minimo raccomandato dal produttore e applicate un margine di 1,1×–1,2×. Quello è il valore R che la catena deve offrire.\n\nUn punto spesso confuso: il valore R della catena determina l'**altezza di installazione e lo spazio occupato**. Non è di per sé un dato sulla vita del cavo.\n\n### 3.3 Corsa e montaggio\n\n- Meno di 2 m di corsa, montaggio orizzontale: il supporto standard è sufficiente.\n- Corsa lunga o andirivieni ad alta velocità: calcolate la capacità autoportante e la freccia del tratto non supportato, e aggiungete canalina di guida o rulli di supporto se serve.\n- Montaggio verticale: valutate il carico continuo del peso della catena sui perni e l'ampiezza di oscillazione.\n\nQuesta parte è difficile da spiegare a parole: percorrete il [flusso di calcolo per la selezione](/it/guides/selection) con corsa, velocità e accelerazione reali.\n\n### 3.4 Temperatura, fluidi ed elettrostatica\n\n- Temperatura: la serie WWC è dichiarata da -20 °C a 120 °C. Fuori da questo intervallo serve un altro materiale.\n- Fluidi: refrigerante, detergenti e alcol sono il quotidiano di una camera bianca. Elencateli e fate confermare la compatibilità al fornitore.\n- Elettrostatica: l'assemblaggio elettronico e le linee a pannelli richiedono spesso ESD. Chiarite se serve \"materiale dissipativo\" o \"messa a terra conduttiva\": si costruiscono in modo diverso.\n\n## 4. Serie WWC in breve\n\nLe catene per camera bianca CNWSL coprono cinque altezze interne, tutte in TPU, da -20 °C a 120 °C:\n\n| Modello | Altezza interna | Larghezza interna | Raggi di curvatura disponibili |\n|---|---|---|---|\n| WWC15 | 15 mm | 25 mm | R40 / R50 / R60 / R70 |\n| WWC18 | 18 mm | 32 mm | R40 / R50 / R60 / R70 |\n| WWC22 | 22 mm | 40 mm | R40 / R50 / R60 / R70 |\n| WWC28 | 28 mm | 65 mm | R40 / R60 / R70 / R90 |\n| WWC35 | 35 mm | 65 mm | R60 / R70 / R90 |\n\nQueste sono le larghezze interne standard. Una larghezza o un raggio non standard richiede attrezzaggio, quindi confermate stampo e tempi per tempo; altrimenti il progetto si blocca a questo passo. Le tabelle dimensionali complete sono nella [pagina della serie per camera bianca](/it/products/cleanroom), modello per modello, per esempio [WWC15](/it/products/cleanroom/wwc15).\n\n## 5. Audit in fabbrica e collaudo: quali documenti chiedere\n\nQuando si acquista una catena per camera bianca, la \"prova\" è la cosa più facile da lasciare nel vago. Mettete l'elenco direttamente nell'accordo tecnico:\n\n1. **Rapporto di prova sul basso rilascio di particelle** — metodo, condizioni di campionamento (con o senza carico), risultati del conteggio.\n2. **Prova di ciclaggio termico alto/basso** — conferma che il materiale non si fessura né si indurisce a -20 °C e 120 °C.\n3. **Dati di vita a fatica su banco** — numero di cicli e criteri di cedimento (aumento improvviso di rumore, gioco eccessivo tra maglie, rottura).\n4. **Dichiarazioni di materiale** — grado di TPU, contenuto di alogeni, stato RoHS.\n\nPer CNWSL questi tre rapporti (rilascio di particelle, ciclaggio termico, vita a fatica) sono disponibili nella [pagina download](/it/downloads) insieme al catalogo per camera bianca. **Poter emettere un rapporto ed essere disposti a emetterlo sono due cose diverse**: inviate l'elenco già in fase di selezione; la rapidità di risposta è già di per sé un filtro.\n\n## 6. Quattro trappole di installazione\n\n- **Montare la catena a valle del flusso d'aria.** Il flusso di una camera bianca è progettato apposta. Se i detriti cadono sopra il flusso di prodotto, la selezione è stata inutile.\n- **Invertire l'estremità fissa e quella mobile.** Il tratto curvo deve stare lontano dal lato da mantenere pulito.\n- **Ignorare il fissaggio dei cavi.** Fissate i cavi a breve distanza da ciascuna estremità, così la flessione avviene solo dentro la catena. Entrare e uscire in linea retta accorcia la vita in modo netto.\n- **Collaudare solo in statico.** Fatela girare a vuoto, con carico e per più di 8 ore di fila, registrando rumore e particelle nei tre stati.\n\n## 7. Domande frequenti\n\n**Una catena nazionale può sostituire un marchio importato?**\n\nSe possa sostituirlo dipende dal criterio di accettazione, non dal marchio. Scrivete classe di pulizia, limite di rilascio di particelle e requisito di vita come clausole misurabili: la filiera nazionale le soddisfa nella maggior parte delle condizioni ordinarie. Al contrario, se il requisito non è misurabile, qualsiasi fornitore finirà per discutere.\n\n**Quali sono i tempi di consegna?**\n\nLe misure standard a magazzino sono la parte più rapida. Una larghezza interna o un raggio non standard richiede attrezzaggio e i tempi vanno confermati a parte. CNWSL ha magazzini a Dongguan, Foshan e Shanghai; chiedete all'ufficio vendite il ritmo di spedizione dei pezzi standard.\n\n**Catena per camera bianca o serie silenziosa?**\n\nLe due esigenze si sovrappongono ma non coincidono. Se il problema centrale sono le particelle, scegliete quella per camera bianca (TPU). Se il problema centrale è il rumore, scegliete la [serie silenziosa](/it/products/silent). Se contano entrambi, mettete le due metriche nell'accordo e confrontate i campioni.\n\n**Si può fare un audit in fabbrica?**\n\nSì. La produzione è a Yueqing, Zhejiang, e audit e campionamenti si organizzano lì, con stampi e linee visibili in sito.\n\n**Avete la IATF16949?**\n\nSì, la IATF16949 è in essere. Un'ulteriore nota: se il progetto coinvolge clienti automotive o certificazione per l'export, di norma viene richiesta anche la ISO14001; confermate lo stato aggiornato con l'ufficio vendite prima di ordinare, non dattelo per scontato.\n\n## Conclusione\n\nLa difficoltà nella scelta di una catena per camera bianca non sono i parametri, ma la catena di prove: requisito di classe misurabile, dati di rilascio tracciabili e vincoli di installazione verificabili. Fissate questi tre punti in fase di selezione e collaudo e produzione in serie diventeranno molto più scorrevoli.\n\nPer fare i conti su corsa e lista cavi reali, partite dalla [serie per camera bianca](/it/products/cleanroom) oppure leggete prima il [flusso di calcolo per la selezione](/it/guides/selection).",
      category: "Selezione tecnica",
      author: "Engineering CNWSL",
    },
    ru: {
      title: "Подбор кабельной цепи для чистого помещения: пылевыделение, радиус изгиба и ресурс",
      excerpt: "Цепь для чистого помещения — не усиленная нейлоновая: переход на TPU меняет пылевыделение, температурный диапазон и шум. Здесь порядок подбора WWC, три запрашиваемых протокола и четыре ошибки монтажа.",
      content: "Кабельная цепь для чистого помещения — это не нейлоновая цепь с добавленной крышкой. В чистом помещении она делает две вещи одновременно: ведёт кабель и **не выделяет частицы в среду**. Большинство ошибок подбора возникает из-за того, что смотрят только на первую.\n\n## 1. Сначала материал: цепи для чистых помещений делают из TPU, а не из нейлона\n\nОбычная нейлоновая кабельная цепь изготавливается из PA66 + 30% стекловолокна и держится на жёсткости и износостойкости при длинных ходах. У цепи для чистого помещения приоритет другой — сколько материала стирается, — поэтому распространённый подход — переход на TPU (термопластичный полиуретан).\n\nСмена материала тянет за собой три следствия:\n\n- **Меняется механизм пылевыделения.** Нейлон получает твёрдость от стекловолокна, поэтому продукты износа от контакта звеньев жёстче и тяжелее. TPU более эластичен, распределяет нагрузку по площади контакта и выделяет меньше частиц, к тому же более мягких.\n- **Меняется температурный диапазон.** Цепь WWC для чистых помещений CNWSL заявлена от -20 °C до 120 °C — это не совпадает с обычными нейлоновыми сериями. Работу при высокой температуре нужно считать отдельно.\n- **Меняется шум.** Демпфирующие свойства TPU естественно снижают шум удара при высокоскоростном возвратно-поступательном движении; поэтому её часто берут и для цехов, чувствительных к статике.\n\nЕсли заказчик настаивает на «обеспыливании нейлона», сначала спросите требуемый класс чистоты. Когда материалы близки, компенсировать разницу уплотнительными конструкциями обычно дороже.\n\n## 2. Сначала класс чистоты, потом всё остальное\n\nКласс чистого помещения — это входной параметр подбора, а не результат, который проверяют после. Международный стандарт — ISO 14644-1, он делит ISO Class 1–9 по концентрации частиц в единице объёма воздуха; старый американский FED-STD-209E использовал Class 1–100000, и **ISO Class 5 примерно соответствует прежнему Class 100**.\n\nФразу «соответствует Class 100 и выше» стоит разобрать на части:\n\n- По какому стандарту реально работает площадка? Приёмка идёт по данным счётчика частиц или по заявлению поставщика?\n- Соответствие в покое или в работе? При запуске оборудования счёт заметно растёт.\n- Цепь — единственный источник частиц или только один из многих?\n\nСерия WWC от CNWSL рассчитана на полупроводники, плоские панели и фармацевтические чистые помещения: низкое пылевыделение, низкий шум. **Но какой класс реально достигается, должно подтверждаться протоколом испытаний конкретной партии** — впишите это требование в техническое соглашение уже на этапе подбора.\n\n## 3. Четыре параметра, в этом порядке\n\n### 3.1 Внутренняя высота и ширина: коэффициент заполнения ниже 60%\n\nПеречислите все кабели в этом ходу — питание, сигнал, пневмотрубку и оптику считайте отдельно, — просуммируйте сечения и примените коэффициент запаса около 1,6. Суммарное сечение кабелей обычно не должно превышать 60% сечения внутренней полости, а на высоких скоростях — меньше.\n\nШире не значит лучше. Слишком большой запас позволяет кабелям смещаться в полости, что увеличивает и износ, и шум.\n\n### 3.2 Радиус изгиба: считайте от кабеля\n\nРадиус изгиба определяет кабель, а не цепь. Возьмите **самый толстый и жёсткий кабель** в этом ходу (обычно силовая линия или пневмотрубка), найдите рекомендованный производителем минимальный радиус изгиба и примените запас 1,1×–1,2×. Это и есть значение R, которое должна обеспечить цепь.\n\nОдин момент, который часто путают: значение R цепи задаёт **высоту установки и занимаемое место**. Само по себе оно не является показателем ресурса кабеля.\n\n### 3.3 Ход и монтаж\n\n- Ход менее 2 м, горизонтальная установка: достаточно стандартной опоры.\n- Длинный ход или высокоскоростное движение: считайте несущую способность и провис неподдерживаемого участка, при необходимости добавьте направляющий лоток или опорные ролики.\n- Вертикальная установка: оцените постоянную нагрузку от собственного веса цепи на оси и амплитуду раскачивания.\n\nЭто трудно объяснить текстом — пройдите [процедуру расчёта подбора](/ru/guides/selection) со своим ходом, скоростью и ускорением.\n\n### 3.4 Температура, среды и статика\n\n- Температура: серия WWC заявлена от -20 °C до 120 °C. За пределами диапазона нужно рассматривать другой материал.\n- Среды: СОЖ, моющие средства и спирт — повседневность чистого помещения. Перечислите их и попросите поставщика подтвердить совместимость.\n- Статика: сборка электроники и линии панелей часто требуют защиты от статики. Уточните, что нужно — «диссипативный материал» или «проводящее заземление»: конструкции разные.\n\n## 4. Серия WWC кратко\n\nКабельные цепи для чистых помещений CNWSL охватывают пять внутренних высот, все из TPU, рабочая температура -20 °C … 120 °C:\n\n| Модель | Внутренняя высота | Внутренняя ширина | Доступные радиусы изгиба |\n|---|---|---|---|\n| WWC15 | 15 мм | 25 мм | R40 / R50 / R60 / R70 |\n| WWC18 | 18 мм | 32 мм | R40 / R50 / R60 / R70 |\n| WWC22 | 22 мм | 40 мм | R40 / R50 / R60 / R70 |\n| WWC28 | 28 мм | 65 мм | R40 / R60 / R70 / R90 |\n| WWC35 | 35 мм | 65 мм | R60 / R70 / R90 |\n\nЭто стандартные внутренние ширины. Нестандартная ширина или нестандартный радиус изгиба требуют оснастки, поэтому подтвердите пресс-форму и сроки заранее — иначе проект встанет на этом шаге. Полные таблицы размеров — на [странице серии для чистых помещений](/ru/products/cleanroom), по моделям, например [WWC15](/ru/products/cleanroom/wwc15).\n\n## 5. Аудит производства и приёмка: какие документы запрашивать\n\nПри покупке цепи для чистого помещения «доказательства» — самое простое, что можно оставить размытым. Впишите список прямо в техническое соглашение:\n\n1. **Протокол испытаний на низкое пылевыделение** — метод, условия отбора проб (под нагрузкой или без), результаты подсчёта частиц.\n2. **Испытание термоциклированием** — подтверждает, что материал не растрескивается и не твердеет при -20 °C и 120 °C.\n3. **Данные усталостного ресурса на стенде** — число циклов и критерии отказа (резкий рост шума, сверхнормативный зазор между звеньями, излом).\n4. **Декларации материалов** — марка TPU, содержание галогенов, статус RoHS.\n\nДля CNWSL эти три протокола (пылевыделение, термоциклирование, усталостный ресурс) доступны на [странице загрузок](/ru/downloads) вместе с каталогом для чистых помещений. **Уметь выдать протокол и быть готовым его выдать — две разные вещи** — отправьте список уже на этапе подбора; скорость ответа сама по себе является фильтром.\n\n## 6. Четыре ошибки монтажа\n\n- **Установка цепи ниже по потоку воздуха.** Поток в чистом помещении спроектирован осознанно. Если продукты износа падают выше потока продукта, подбор был напрасным.\n- **Путаница неподвижного и подвижного концов.** Изогнутый участок должен быть далеко от стороны, которую нужно держать чистой.\n- **Игнорирование крепления кабеля.** Закрепите кабель на небольшом расстоянии от каждого конца цепи, чтобы изгиб происходил только внутри неё. Если кабель входит и выходит по прямой, ресурс заметно падает.\n- **Приёмка только в статике.** Прогоните без нагрузки, под нагрузкой и непрерывно более 8 часов; фиксируйте шум и частицы во всех трёх состояниях.\n\n## 7. Частые вопросы\n\n**Может ли отечественная цепь заменить импортный бренд?**\n\nМожет или нет — зависит от критериев приёмки, а не от бренда. Опишите класс чистоты, предел пылевыделения и требование по ресурсу измеримыми пунктами, и отечественная цепочка поставок проходит их в большинстве обычных условий. И наоборот: если требование само по себе неизмеримо, спорить будет любой поставщик.\n\n**Какие сроки поставки?**\n\nБыстрее всего — стандартные типоразмеры со склада. Нестандартная внутренняя ширина или радиус изгиба требует оснастки, сроки подтверждаются отдельно. У CNWSL склады в Дунгуане, Фошане и Шанхае; о ритме отгрузки стандартных позиций спросите отдел продаж.\n\n**Цепь для чистого помещения или тихая серия?**\n\nЭти два требования пересекаются, но не совпадают. Если главная проблема — частицы, берите цепь для чистого помещения (TPU). Если главная проблема — шум, берите [тихую серию](/ru/products/silent). Если важны оба, впишите оба показателя в соглашение и сравните образцы.\n\n**Можно ли провести аудит производства?**\n\nДа. Производство находится в Юэцине, провинция Чжэцзян; аудит и отбор образцов организуются там, пресс-формы и линии можно посмотреть на месте.\n\n**Есть ли у вас IATF16949?**\n\nДа, IATF16949 действует. Ещё одна ремарка: если проект связан с автопромом или экспортной сертификацией, обычно требуется и ISO14001 — уточните актуальный статус у отдела продаж до заказа, не считайте это само собой разумеющимся.\n\n## Заключение\n\nСложность подбора цепи для чистого помещения не в параметрах, а в цепочке доказательств: измеримое требование по классу, прослеживаемые данные по пылевыделению и проверяемые монтажные ограничения. Закрепите эти три вещи на этапе подбора — и приёмка с серийным производством пойдут гораздо глаже.\n\nЧтобы посчитать по фактическому ходу и списку кабелей, начните со [серии для чистых помещений](/ru/products/cleanroom) или сначала посмотрите [процедуру расчёта подбора](/ru/guides/selection).",
      category: "Технический подбор",
      author: "Инженеры CNWSL",
    },
  },

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
      title: "Guía de selección de portacables antipolvo de estándar europeo: ancho interior y radio de curvatura",
      excerpt:
        "Desde el recorrido y el factor de llenado hasta el radio de curvatura: una lista práctica para evaluar alternativas de localización.",
      content:
        "En automatización industrial y modernización de CNC, la selección del portacables influye directamente en la vida útil del cable y la estabilidad de la máquina.\n\nPrimero confirme el ancho interior y el factor de llenado: la sección total de cables no debería superar habitualmente el 60% de la cavidad, dejando margen para movimiento a alta velocidad. A continuación, elija un radio de curvatura no inferior al mínimo recomendado por el fabricante del cable; los portacables antipolvo de estándar europeo suelen ofrecer varios valores R.\n\nEn entornos con polvo (CNC, inyección), priorice tapas totalmente cerradas y revise materiales de pasadores y laterales resistentes al desgaste. Tras la selección, ensayos de vida en banco pueden validar fiabilidad bajo al menos 15 millones de ciclos.\n\nEste artículo es provisional; se añadirán tablas de selección y datos de casos.",
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
      title: "Подбор пылезащитных кабельных цепей европейского стандарта: внутренняя ширина и радиус изгиба",
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
  "iicie-2026-shenzhen-booth-16d87": {
    en: {
      title: "IICIE 2026 Shenzhen: visit CNWSL at booth 16D87",
      content:
        "Zhejiang CNWSL Cable Drag Chain Co., Ltd. is exhibiting at IICIE 2026 — the International Integrated Circuit Innovation Expo (Shenzhen semiconductor show) at Shenzhen World Exhibition & Convention Center (Bao’an). The show runs 9–11 September 2026; our booth is 16D87.\n\nOn site we are presenting cleanroom cable carriers, standard carriers and cooling pipes, with selection support for semiconductor equipment, cleanroom and automation customers. New and existing partners are welcome.\n\nWatch the booth video for the stand layout and product display.",
      type: "Exhibitions",
    },
    vi: {
      title: "IICIE 2026 Thâm Quyến: mời đến gian hàng CNWSL 16D87",
      content:
        "Zhejiang CNWSL Cable Drag Chain Co., Ltd. đang tham gia IICIE 2026 — Triển lãm Đổi mới Mạch tích hợp Quốc tế (triển lãm bán dẫn Thâm Quyến) tại Trung tâm Hội chợ & Triển lãm Thế giới Thâm Quyến (Bảo An). Thời gian 9–11/9/2026; gian hàng 16D87.\n\nTại chỗ trưng bày xích phòng sạch, xích tiêu chuẩn và ống làm mát, tư vấn chọn mẫu cho thiết bị bán dẫn, phòng sạch và tự động hóa. Hoan nghênh khách hàng cũ và mới.\n\nXem video gian hàng để nắm bố trí gian và sản phẩm.",
      type: "Triển lãm",
    },
    es: {
      title: "IICIE 2026 Shenzhen: visítenos en el stand 16D87",
      content:
        "Zhejiang CNWSL Cable Drag Chain Co., Ltd. participa en IICIE 2026, la International Integrated Circuit Innovation Expo (feria de semiconductores de Shenzhen), en Shenzhen World Exhibition & Convention Center (Bao’an). Fechas: 9–11 de septiembre de 2026; stand 16D87.\n\nEn el stand presentamos portacables de sala limpia, portacables estándar y tubos de refrigeración, con asesoría de selección para equipos de semiconductores, salas limpias y automatización. Clientes nuevos y habituales son bienvenidos.\n\nVea el vídeo del stand para la disposición y los productos.",
      type: "Ferias",
    },
    it: {
      title: "IICIE 2026 Shenzhen: visitate CNWSL allo stand 16D87",
      content:
        "Zhejiang CNWSL Cable Drag Chain Co., Ltd. è presente a IICIE 2026 — International Integrated Circuit Innovation Expo (fiera dei semiconduttori di Shenzhen) presso lo Shenzhen World Exhibition & Convention Center (Bao’an). Date: 9–11 settembre 2026; stand 16D87.\n\nIn fiera mostriamo catene cleanroom, catene standard e tubi di raffreddamento, con supporto alla selezione per attrezzature semiconduttori, cleanroom e automazione. Clienti nuovi e storici sono i benvenuti.\n\nGuardate il video dello stand per layout e prodotti.",
      type: "Fiere",
    },
    ru: {
      title: "IICIE 2026 Шэньчжэнь: ждем вас на стенде CNWSL 16D87",
      content:
        "Zhejiang CNWSL Cable Drag Chain Co., Ltd. участвует в IICIE 2026 — International Integrated Circuit Innovation Expo (шаньчжэньская выставка полупроводников) в Shenzhen World Exhibition & Convention Center (Баоань). Даты: 9–11 сентября 2026 года; стенд 16D87.\n\nНа стенде представлены кабельные цепи для чистых помещений, стандартные цепи и трубы охлаждения, консультации по подбору для полупроводникового оборудования, чистых помещений и автоматизации. Приглашаем новых и постоянных клиентов.\n\nСмотрите видео стенда — планировка и экспозиция продукции.",
      type: "Выставки",
    },
  },
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
        "CNWSL participó en una feria industrial con portacables micro, ligeros, reforzados y tubos de refrigeración, con muestras y asesoría de selección en el stand.\n\nEl stand cubrió varias alturas interiores. Los ingenieros pueden orientar sobre recorrido, radio de curvatura y factor de llenado. OEMs, integradores y distribuidores son bienvenidos.\n\nEscanee el QR del stand o descargue catálogos en el sitio web.",
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
        "Durante la feria, CNWSL expuso portacables de carga y muestras de varias medidas, con demos de radio de curvatura, apertura y conectores para comparación in situ.\n\nEl equipo técnico habló de polvo, reciprocación a alta velocidad y localización, recogiendo parámetros de máquina para asesoría posterior.\n\nPublicaremos un resumen de preguntas frecuentes en el blog técnico.",
      type: "Ferias",
    },
    it: {
      title: "In fiera: catene per carichi pesanti e campioni multi-misura aperti al confronto",
      content:
        "Durante la fiera, CNWSL ha esposto catene per carichi pesanti e campioni multi-misura con demo di raggio di curvatura, apertura e terminali per un confronto diretto.\n\nIl team tecnico ha discusso di polvere, moto alternato ad alta velocità e localizzazione, raccogliendo parametri macchina per consigli post-evento.\n\nPubblicheremo un riepilogo FAQ sul blog tecnico.",
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
      title: "Detalle de productos en el stand: demos de curvatura multi-serie y tubos de refrigeración",
      content:
        "El stand centró muestras de portacables negros multi-serie, con demos de radio de curvatura y tubos de refrigeración que muestran cobertura de micro a gran carga.\n\nLos visitantes pueden probar apertura, pasadores y tapas, y hablar de localización con ingenieros según el régimen de la máquina.\n\nCatálogos y planos están en el centro de descargas.",
      type: "Ferias",
    },
    it: {
      title: "Dettaglio prodotti in stand: demo di curvatura multi-serie e tubi di raffreddamento",
      content:
        "Lo stand ha messo al centro campioni di catene nere multi-serie, con demo di raggio di curvatura e tubi di raffreddamento che mostrano la copertura da micro a carichi pesanti.\n\nI visitatori possono provare apertura, perni e coperchi e discutere percorsi di localizzazione con gli ingegneri in base al regime macchina.\n\nCataloghi e disegni sono nel centro download.",
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
