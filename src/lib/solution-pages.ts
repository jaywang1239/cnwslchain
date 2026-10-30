/**
 * 英文应用场景落地页（/en/solutions/<id>）。
 *
 * 2026-10-30 新建：此前 /en/solutions 的 6 张场景卡全部只跳 /contact，
 * 英文站没有任何页面参与 "cleanroom cable carrier" 这类场景词竞争。
 *
 * 语言口径：只提供英文（北美主战场，主词 cable carrier）。
 * 非英文 locale 由 requireEnOnlyLocale() 直接 404，sitemap 也只登记 en 条目，
 * 不声明 hreflang —— 避免"声明了 hreflang 但实际 404"的低质信号。
 *
 * 事实边界（写文案时不得越过）：
 * - Fraunhofer IPA 证书只覆盖 WWC.28.65（白色），三档风速 0.5/1.0/2.0 m/s，ISO Class 1，
 *   不是整机认证、不等于客户产线达标；
 * - 产品线只有工程塑料（PA66+GF30 / TPU），**没有钢制拖链**；
 * - 唯一工厂在浙江乐清（Yueqing），深圳/常州是销售办事处，不是分厂。
 */

export type SolutionSection = {
  heading: string;
  body?: string[];
  bullets?: { label: string; text: string }[];
};

export type SolutionPage = {
  id: string;
  /** 页面 H1 与卡片标题共用 */
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lede: string[];
  sections: SolutionSection[];
  specs: { label: string; value: string }[];
  faq: { q: string; a: string }[];
  relatedCategories: { href: string; label: string }[];
  relatedPosts: { href: string; label: string }[];
  image: string;
  imageAlt: string;
  ctaTitle: string;
  ctaBody: string;
};

export const SOLUTION_PAGES: SolutionPage[] = [
  {
    id: "cleanroom",
    name: "Cleanroom / Semiconductor",
    metaTitle: "Cleanroom Cable Carrier, ISO Class 1 Tested | CNWSL",
    metaDescription:
      "TPU cleanroom cable carriers with low particle emission. Model WWC.28.65 tested by Fraunhofer IPA to ISO Class 1 at 0.5–2.0 m/s. 15–35 mm inner height, MOQ 1.",
    h1: "Cable carriers for cleanroom and semiconductor equipment",
    lede: [
      "Most carriers sold as cleanroom are ordinary carriers with a different label. Inside a fab the first thing to fail is rarely the chain breaking — it is the particle count drifting above limit while nobody can say which part produced it.",
      "We build cleanroom carriers in TPU instead of glass-filled PA66, because glass-filled nylon wears in a way that puts fine debris into the air stream. One model, WWC.28.65 in white, has been tested by Fraunhofer IPA to ISO Class 1. The other sizes have not. That distinction is more important than any headline number.",
    ],
    sections: [
      {
        heading: "What a cleanroom carrier is actually judged on",
        body: [
          "Four things decide whether a carrier belongs in a cleanroom. Only one of them usually appears on a datasheet.",
        ],
        bullets: [
          {
            label: "Particle emission at the sliding surfaces",
            text: "Pin and side-plate contact is where debris is generated. Enclosed covers keep chips out, but they also trap whatever the chain itself produces, so material choice matters more than enclosure.",
          },
          {
            label: "Wear mode of the material",
            text: "Glass-filled nylon is strong and stiff, and when it wears it releases hard filler particles. TPU wears more slowly and more benignly, which is why the cleanroom series is TPU.",
          },
          {
            label: "Noise and vibration",
            text: "In a quiet cleanroom a chain that rattles is audible, and vibration is also a wear accelerant. Silent-link geometry reduces both.",
          },
          {
            label: "Cleanability",
            text: "A carrier that cannot be wiped down, or that has open pockets holding residue, will fail an audit even if it measures clean on day one.",
          },
        ],
      },
      {
        heading: "Where our numbers come from",
        body: [
          "Report ZH 2608-1800, issued 2026-09-30 by Fraunhofer IPA and valid to 2031-09-30, tests the particle emission of one carrier assembly against ISO 14644-14, with classification to ISO 14644-1.",
          "Test conditions were 22 °C ± 0.5 °C and 45 % ± 5 % relative humidity. Three belt speeds were run — vf 0.5, 1.0 and 2.0 m/s, corresponding to ae 1.0, 2.0 and 4.0 m/s² — and all three returned ISO Class 1, with an overall result of Class 1. The report can be checked independently at tested-device.com using the report number.",
        ],
      },
      {
        heading: "What we build",
        body: [
          "The cleanroom series runs from 15 to 35 mm inner height in five steps: WWC15, WWC18, WWC22, WWC28 and WWC35. Bodies are TPU; covers can be enclosed or crossbar. Standard sizes ship in one to three days, and MOQ is one piece, because qualification samples rarely need a container.",
        ],
      },
      {
        heading: "What the test does not cover",
        body: [
          "Being specific here saves both of us a meeting.",
          "The certificate covers one model in one colour, in the condition it was tested. It is a statement about the particle emission of that component — not a certification of your tool, not a guarantee that your line holds its class, and not transferable to other sizes in the range.",
          "It also stops at 2.0 m/s and 4.0 m/s². Above that, the chain is outside the tested envelope and we will say so rather than quote the Class 1 figure anyway. Where ESD is required, the anti-static variant is a different material compound and is not covered by this report.",
        ],
      },
      {
        heading: "Where cleanroom installations go wrong",
        bullets: [
          {
            label: "Overfilling the cavity",
            text: "Above roughly 60 % fill the cables rub each other, not just the chain, and the debris source becomes the cable jacket. Many field failures blamed on the carrier are actually cable-to-cable abrasion.",
          },
          {
            label: "Mismatched jacket material",
            text: "A standard PVC jacket running against TPU wears quickly. Specify a jacket that suits continuous flex and low abrasion instead of whatever was on the shelf.",
          },
          {
            label: "Mounting flatness",
            text: "A few tenths of misalignment across a long travel puts side load on the pins and shortens life in a way that looks like a material problem but is not.",
          },
          {
            label: "Compressed cable ties",
            text: "Ties tight enough to deform the jacket create a wear point at the fixed end. Strain relief should hold position, not clamp hard.",
          },
        ],
      },
    ],
    specs: [
      { label: "Series", value: "WWC15 / WWC18 / WWC22 / WWC28 / WWC35" },
      { label: "Inner height", value: "15–35 mm" },
      { label: "Body material", value: "TPU (anti-static compound available)" },
      { label: "Tested model", value: "WWC.28.65, white only" },
      { label: "Classification", value: "ISO Class 1 at vf 0.5 / 1.0 / 2.0 m/s" },
      { label: "Report", value: "Fraunhofer IPA ZH 2608-1800, valid to 2031-09-30" },
      { label: "Lead time", value: "Standard sizes 1–3 days; MOQ 1" },
    ],
    faq: [
      {
        q: "Is the whole cleanroom range ISO Class 1 certified?",
        a: "No. The Fraunhofer IPA report covers WWC.28.65 in white only. Other sizes share the same TPU construction and design intent, but they have not been tested to ISO 14644-14, and we do not present them as certified.",
      },
      {
        q: "Can you supply the report for a customer qualification package?",
        a: "Yes. The PDF is available on request and can be verified at tested-device.com with the report number. It states the model, colour and test conditions — we send it unedited, because a truncated version causes more trouble in an audit than it saves.",
      },
      {
        q: "What if our travel speed is above 2 m/s?",
        a: "Then the tested envelope does not cover your duty. Options are to reduce speed at the carrier, re-route the run, or run our own bench test on a sample before you commit. We will not extrapolate the Class 1 result.",
      },
    ],
    relatedCategories: [
      { href: "/products/cleanroom", label: "Cleanroom cable carriers (WWC series)" },
      { href: "/products/silent", label: "Silent cable carriers" },
    ],
    relatedPosts: [
      {
        href: "/blog/cleanroom-cable-carrier-selection-guide",
        label: "Cleanroom carrier selection: what the ISO Class 1 report covers",
      },
      {
        href: "/blog/semiconductor-equipment-cable-carrier",
        label: "Cable carriers in semiconductor equipment",
      },
      {
        href: "/blog/tpu-cable-carrier-performance",
        label: "How TPU performs against PA66+GF30",
      },
    ],
    image: "/images/solutions/cleanroom.webp",
    imageAlt: "CNWSL TPU cleanroom cable carrier running in a semiconductor tool",
    ctaTitle: "Send the four numbers and we will size it",
    ctaBody:
      "Inner height, inner width or cable list, travel length, and speed with acceleration. That is enough to come back with a model, a bend radius and a price — usually the same working day.",
  },

  {
    id: "machine-tool",
    name: "Machine tools",
    metaTitle: "Cable Carrier for CNC Machine Tools | CNWSL",
    metaDescription:
      "Enclosed plastic cable carriers for CNC lathes, machining centres and grinders. Chip and coolant protection, 18–80 mm inner height, 15M+ cycles, 36-month warranty.",
    h1: "Cable carriers for CNC machine tools",
    lede: [
      "On a machine tool the carrier is not the expensive part, but it is the part that stops the machine. Nearly every failure we see in this application traces back to chips, coolant, or a fill ratio that was decided by eye at the assembly bench.",
      "We build enclosed and semi-enclosed plastic carriers between 18 and 80 mm inner height, and we keep standard sizes on the shelf — a machine down for a week costs more than the chain it needs.",
    ],
    sections: [
      {
        heading: "What the environment does to a carrier",
        bullets: [
          {
            label: "Chips pack the cavity",
            text: "Fine aluminium and cast-iron swarf works into the gaps between links, bridges across the bend, and turns a rolling contact into a grinding one. This is the single most common cause of short life on machining centres.",
          },
          {
            label: "Coolant attacks the surface",
            text: "Neat cutting oil is tolerable for PA66+GF30. Water-miscible coolant with high pH, or washdown with alkaline detergent, is not — it attacks the surface and accelerates pin wear.",
          },
          {
            label: "Heat from the process",
            text: "Near a spindle or a grinding zone the ambient is higher than the shop floor. Check the continuous temperature against the material, not the peak.",
          },
          {
            label: "Duty above the datasheet",
            text: "Machine tools accelerate hard. Acceleration damages a chain far more than top speed, and it is usually missing from the enquiry.",
          },
        ],
      },
      {
        heading: "Enclosed or open: a decision rule",
        body: [
          "Open carriers with high cover density are enough for wood dust, general automation and clean chip-free environments. They are easier to inspect and cheaper.",
          "Go enclosed when any of the following is true: fine chips that bridge, wet machining with flood coolant, grinding or plasma where abrasive dust is airborne, or an operator who will not clean the chain. Enclosed covers turn a chip-packing problem into a wiping problem.",
        ],
      },
      {
        heading: "Sizing that holds up",
        body: [
          "Sum the cable and hose outer diameters — outer diameter, not conductor cross-section — apply a 1.1 to 1.2 layout factor for spacing, and keep the total under about 60 % of the cavity area. Imported chains often publish life figures measured at around 50 % fill, so a chain sized to 60 % will not deliver the same cycle count.",
          "Pitch is the number most often ignored. Over the same one-metre mounting length, a 30 mm pitch and a 46 mm pitch differ by a dozen links, and the bend path lands somewhere else. Measure the old chain before ordering rather than matching height and width only.",
        ],
      },
      {
        heading: "Failures we see, and what actually fixes them",
        bullets: [
          {
            label: "Side-plate wear at the bend",
            text: "Usually fill ratio or a misaligned mounting, not a material defect. Check the cavity first.",
          },
          {
            label: "Broken link near the moving end",
            text: "Shock load from an aggressive acceleration ramp. Reduce the ramp or move up one frame size.",
          },
          {
            label: "Cable jacket scored lengthwise",
            text: "Chips trapped between cable and chain, or a separator missing. Add vertical separators and a shelf.",
          },
          {
            label: "End fitting fatigue",
            text: "Often the adapter, not the chain. Check that the bracket is flat against the machine and that the bolts are not in shear.",
          },
        ],
      },
      {
        heading: "What we do not make",
        body: [
          "Our range is plastic only — PA66+GF30 and TPU. We do not produce steel carriers.",
          "If your duty genuinely needs steel — very high loads, hot chips landing directly on the chain, or spans beyond what a plastic chain can carry — then steel is the right answer and it should come from a supplier who makes it. We would rather say that at the enquiry stage than take an order that fails in the field.",
        ],
      },
    ],
    specs: [
      { label: "Series", value: "Medium / heavy-duty / silent" },
      { label: "Inner height", value: "18–80 mm" },
      { label: "Material", value: "PA66 + 30 % GF; TPU for cleanroom duty" },
      { label: "Cover options", value: "Enclosed, semi-enclosed, crossbar" },
      { label: "Life test", value: "≥ 15 million cycles on the bench" },
      { label: "Warranty", value: "36 months" },
      { label: "Factory", value: "Yueqing, Zhejiang — one plant, open to audits" },
    ],
    faq: [
      {
        q: "Can you replace a chain without changing the mounting brackets?",
        a: "Sometimes. Pitch and mounting-hole spacing have to line up; if they do not, an adapter plate is the cheaper route. Send a photo of the old end fitting with a ruler in frame and we can usually tell you before you order.",
      },
      {
        q: "Do you hold stock for machine-tool sizes?",
        a: "Standard sizes in the medium and heavy series ship in one to three days. Non-standard widths and colours are made to order. We do not claim stock on every combination — ask and we will give you the actual position.",
      },
      {
        q: "Will a plastic carrier survive cast-iron dust?",
        a: "With an enclosed cover, yes, provided the cover is wiped at service intervals. Open carriers in cast-iron dust fail quickly. If the machine cannot be cleaned regularly, specify enclosed.",
      },
    ],
    relatedCategories: [
      { href: "/products/medium", label: "Medium cable carriers (18–30 mm)" },
      { href: "/products/heavy", label: "Heavy-duty cable carriers (45–80 mm)" },
      { href: "/products/silent", label: "Silent cable carriers (18–45 mm)" },
    ],
    relatedPosts: [
      { href: "/blog/cable-carrier-bend-radius", label: "Bend radius from travel length" },
      { href: "/blog/cable-carrier-inner-width", label: "Inner width from the cable list" },
      { href: "/blog/cable-carrier-material-comparison", label: "PA66+GF30 vs TPU" },
    ],
    image: "/images/solutions/machine-tool.webp",
    imageAlt: "CNWSL enclosed cable carrier on a CNC machining centre",
    ctaTitle: "Tell us the machine and the duty",
    ctaBody:
      "Machine model, old chain dimensions if you have them, cable list and the acceleration ramp. If the old chain failed, a photo of the failure point is worth more than a datasheet.",
  },

  {
    id: "robotics",
    name: "Robotics & gantries",
    metaTitle: "Cable Carrier for Robot Arms & Linear Tracks | CNWSL",
    metaDescription:
      "Cable carriers for 7th-axis tracks, gantries and robot cells. Where a 2D carrier fits, where it does not, and what to use instead. 18–80 mm inner height.",
    h1: "Cable carriers for robot arms, gantries and 7th-axis tracks",
    lede: [
      "A standard cable carrier bends in one plane. A six-axis wrist rotates, twists and reverses in three. Putting a 2D carrier on a wrist is the most common mistake in this application, and it usually fails within weeks rather than months.",
      "So this page is split honestly: where our carriers belong on a robot installation, and where they do not.",
    ],
    sections: [
      {
        heading: "Why a 2D carrier cannot follow a six-axis wrist",
        body: [
          "The links are designed to rotate about one axis. Applied torsion, the pin and bore are loaded in a direction they were never sized for, side plates spread, and the chain either binds or sheds links. No amount of extra support fixes a torsional load.",
          "If the motion at the wrist genuinely needs three-dimensional freedom, the correct solution is a dress pack with torsion-rated cable, a cable retraction system, or a multi-axis rotating carrier. We do not make the latter, and we will tell you that at the enquiry stage rather than after delivery.",
        ],
      },
      {
        heading: "Where these carriers do belong",
        bullets: [
          {
            label: "7th-axis linear tracks",
            text: "Long travel, one plane, high duty — exactly what a plastic carrier is built for. This is the largest part of our robot-related business.",
          },
          {
            label: "Gantries and trusses",
            text: "Two-axis Cartesian motion where the cable run stays in a single bending plane but the span is long.",
          },
          {
            label: "Robot cells and palletisers",
            text: "Fixed-cell cable routing between controller cabinet and the cell, where the machine moves but the robot base does not.",
          },
          {
            label: "End-of-arm dressing, in one plane",
            text: "Where the tooling only tilts about a single axis and the travel is short, a small micro carrier is often neater than a dress pack.",
          },
        ],
      },
      {
        heading: "Cable choice matters more here than the chain",
        body: [
          "On a track the chain controls the bend radius, but the cable has to survive the cycles. Use cable rated for continuous flex at the radius you are actually running, and anchor it at both ends — one end fixed to the carriage, one to the frame — so the chain carries the loop and the cable does not.",
          "A high-flex cable run at half its rated bend radius will fail before the carrier does, and the failure will be blamed on the carrier.",
        ],
      },
      {
        heading: "Common failures on robot installations",
        bullets: [
          {
            label: "Chain fitted to the wrist",
            text: "Torsion failure. Not repairable by adding supports. Re-route instead.",
          },
          {
            label: "Cable not anchored at the moving end",
            text: "The cable walks through the chain and pulls on the connector. Anchor it.",
          },
          {
            label: "Travel measured as stroke, not as chain length",
            text: "Chain length is roughly half the travel plus the bend arc; underestimating it puts the fixed end in the wrong place and the chain runs out of links at end of stroke.",
          },
          {
            label: "Mixed carriers on one cell",
            text: "Different materials wear at different rates and the ribbons interfere. Keep one family per cell where you can.",
          },
        ],
      },
    ],
    specs: [
      { label: "Series", value: "Micro / medium / heavy-duty" },
      { label: "Inner height", value: "5–80 mm" },
      { label: "Motion type", value: "Single-plane bending (2D)" },
      { label: "Typical use", value: "7th-axis track, gantry, robot cell" },
      { label: "Material", value: "PA66 + 30 % GF" },
      { label: "Life test", value: "≥ 15 million cycles" },
    ],
    faq: [
      {
        q: "Do you make cable carriers for six-axis robot wrists?",
        a: "No. Our carriers bend in one plane, and a wrist needs three-dimensional freedom. For that motion we recommend a dress pack or retraction system with torsion-rated cable.",
      },
      {
        q: "How do I work out the chain length for a 7th-axis track?",
        a: "Roughly half the travel plus the bend arc length, rounded up to whole links, then confirmed against the mounting positions at both ends. Give us the stroke and the mounting height and we will do the arithmetic and send the drawing.",
      },
      {
        q: "Can the same carrier run vertically on a lift axis?",
        a: "Yes, with the right frame size and a check on the hanging loop. Vertical runs need more care about cable weight and about the return loop resting on itself — send the layout.",
      },
    ],
    relatedCategories: [
      { href: "/products/micro", label: "Micro cable carriers (5–15 mm)" },
      { href: "/products/medium", label: "Medium cable carriers (18–30 mm)" },
    ],
    relatedPosts: [
      { href: "/blog/robot-arm-cable-carrier", label: "Cable routing on robot arms and tracks" },
      { href: "/blog/linear-module-cable-carrier", label: "Carriers for linear modules" },
      { href: "/blog/cable-carrier-speed-acceleration", label: "Speed, acceleration and cycle life" },
    ],
    image: "/images/solutions/robotics.webp",
    imageAlt: "CNWSL cable carrier on a robot 7th-axis linear track",
    ctaTitle: "Send the layout sketch",
    ctaBody:
      "Stroke, mounting height, whether the run is horizontal or vertical, and the motion type. A hand sketch with dimensions is enough to tell you whether a carrier fits or whether you need a dress pack.",
  },

  {
    id: "automotive",
    name: "Automotive & EV",
    metaTitle: "Cable Carrier for Automotive and EV Lines | CNWSL",
    metaDescription:
      "Cable carriers for body shops, paint lines and EV battery assembly. IATF 16949 certified plant, 15M+ cycle life, 36-month warranty, documentation for supplier qualification.",
    h1: "Cable carriers for automotive and EV assembly lines",
    lede: [
      "Automotive projects are decided by uptime and by paperwork. The chain itself is a small line item, but a stop on a body-shop line costs more per hour than the whole carrier order.",
      "We are IATF 16949 certified and we have been through supplier qualification with tier-one customers. What we can and cannot put in a qualification package is set out below, so nobody is surprised at the audit.",
    ],
    sections: [
      {
        heading: "What these lines demand",
        bullets: [
          {
            label: "Uptime over unit price",
            text: "A carrier that costs a little more and runs three years beats a cheaper one that stops the line in month eight. We quote cycle life with the test conditions attached so the comparison is real.",
          },
          {
            label: "Repeatable spares",
            text: "Lines run for a decade. The same model number has to be available in year eight, in the same dimensions. That is a supply-chain question as much as an engineering one.",
          },
          {
            label: "Documentation",
            text: "Material records, dimensional reports and declarations are usually required before the first delivery, not after.",
          },
          {
            label: "Colour and identification",
            text: "Colour coding by line or by station is common, and it makes maintenance faster. Standard colours are black and white; others are made to order.",
          },
        ],
      },
      {
        heading: "What we can put in a qualification package",
        body: [
          "IATF 16949:2016 and ISO 9001:2015 certificates; material batch records for the compound used; dimensional inspection reports against the drawing; RoHS and REACH declarations; and the 15-million-cycle bench test record with its conditions.",
          "What we are not going to pretend: if your process requires a full PPAP submission with an approved PSW, raise it at the RFQ stage so we can confirm scope before you plan around it. Committing to a document set we cannot produce is worse for both sides than saying so early.",
        ],
      },
      {
        heading: "Where EV lines differ from traditional body shops",
        bullets: [
          {
            label: "Longer travel on battery assembly",
            text: "Module and pack lines use long strokes with heavy cable bundles. Frame size and fill ratio matter more than speed here.",
          },
          {
            label: "Static control in electrode areas",
            text: "Anti-static compounds are available, but they are a different material and carry different wear behaviour. Specify it as a requirement, not as an assumption.",
          },
          {
            label: "Dust from electrode cutting",
            text: "Fine conductive dust is unforgiving. Enclosed covers plus a scheduled wipe is the workable combination; open carriers in that zone clog.",
          },
          {
            label: "Higher duty cycles",
            text: "Three-shift operation with short cycle times adds up faster than most duty estimates assume. Calculate cycles per year before comparing life figures.",
          },
        ],
      },
      {
        heading: "One plant, open to audit",
        body: [
          "Production is in Yueqing, Zhejiang. It is our only manufacturing site. Shenzhen and Changzhou are sales offices, and we say that plainly because supplier audits in this industry check exactly this claim.",
          "Visits are welcome with notice. If your process requires a witness audit of the mould shop or the assembly line, it can be arranged.",
        ],
      },
    ],
    specs: [
      { label: "Certification", value: "IATF 16949:2016, ISO 9001:2015" },
      { label: "Series", value: "Medium / heavy-duty / silent / cleanroom" },
      { label: "Inner height", value: "18–80 mm (5–80 mm across the range)" },
      { label: "Material", value: "PA66 + 30 % GF; TPU; anti-static compound on request" },
      { label: "Life test", value: "≥ 15 million cycles, conditions on record" },
      { label: "Warranty", value: "36 months" },
      { label: "Manufacturing site", value: "Yueqing, Zhejiang — single plant" },
    ],
    faq: [
      {
        q: "Are you IATF 16949 certified?",
        a: "Yes. Certificate T183571 / IATF 0608594, issued 2026-07-11 and valid to 2029-07-10, audited by NQA. The certificate PDF is available on request for your supplier file.",
      },
      {
        q: "Can you supply PPAP?",
        a: "Raise it at RFQ. Some elements we can supply directly, others depend on the scope and the customer-specific requirements. We will confirm what is achievable in writing before you commit to a timeline.",
      },
      {
        q: "Do you keep spares for a line that runs for ten years?",
        a: "The model range is stable and we hold the moulds in-house — over 3,000 of them. For long programmes we recommend agreeing a spares quantity at the start rather than relying on availability in year eight.",
      },
    ],
    relatedCategories: [
      { href: "/products/heavy", label: "Heavy-duty cable carriers (45–80 mm)" },
      { href: "/products/medium", label: "Medium cable carriers (18–30 mm)" },
    ],
    relatedPosts: [
      { href: "/blog/lifespan-testing-and-warranty", label: "How we test life, and what the warranty covers" },
      { href: "/blog/cable-carrier-material-comparison", label: "PA66+GF30 vs TPU" },
      { href: "/blog/cable-carrier-selection-8-steps", label: "Selection in eight steps" },
    ],
    image: "/images/solutions/automotive.webp",
    imageAlt: "CNWSL cable carrier on an automotive assembly line",
    ctaTitle: "Send the line data, not just the part number",
    ctaBody:
      "Cycles per year, stroke, cable list, ambient conditions and the documentation you need at delivery. With those five we can quote something that survives the audit and the line.",
  },

  {
    id: "laser",
    name: "Laser & plasma cutting",
    metaTitle: "Cable Carrier for Laser and Plasma Cutting | CNWSL",
    metaDescription:
      "Cable carriers for laser and plasma cutting tables — high acceleration, spark and slag protection, 18–45 mm inner height, 15M+ cycle life.",
    h1: "Cable carriers for laser cutting and plasma equipment",
    lede: [
      "Cutting tables are the harshest duty in our range: high acceleration, short cycle times, and sparks that land where nothing should be. The chain is also the cheapest component in the axis, which is why it is usually the one bought without calculation.",
      "We build plastic carriers for gantry and bed motion, and we are direct about the one thing plastic does not solve — direct slag impingement.",
    ],
    sections: [
      {
        heading: "Why this duty is harder than it looks",
        bullets: [
          {
            label: "Acceleration, not speed",
            text: "A cutting head reverses many times a minute. Shock load at each reversal is what cracks links, and it scales with the ramp, not with the feed rate.",
          },
          {
            label: "Sparks and hot particles",
            text: "Plastic will tolerate occasional sparks. Continuous molten spatter on the chain will not be fixed by material choice — it needs a physical shield.",
          },
          {
            label: "Abrasive dust",
            text: "Plasma and thick-plate cutting throw fine oxide dust that works into open carriers. Enclosed covers with a service wipe are the practical answer.",
          },
          {
            label: "Radiation and heat near the kerf",
            text: "Radiant heat plus reflected light raises the surface temperature of anything close to the cut. Keep the chain out of the direct line where the layout allows.",
          },
        ],
      },
      {
        heading: "What to specify",
        body: [
          "Enclosed or high-coverage covers on the cutting side, a shield plate where spatter can reach the chain, and a frame size with margin on the acceleration rather than on the price.",
          "For the cable, high-flex and abrasion-resistant jackets are not optional here. A standard jacket on a cutting table typically fails at the point where the chain reverses direction, and the scoring looks like chain damage in the photograph.",
        ],
      },
      {
        heading: "Where plastic is the right call, and where it is not",
        body: [
          "Plastic makes sense on the moving gantry: lower mass, lower inertia, less motor load, and no corrosion from coolant or water-table mist.",
          "It does not make sense where molten slag lands directly on the chain, or where a hot slug can sit on the cover. In that case the fix is a shield — a steel plate above the run, or a re-route — not a different plastic. We do not make steel carriers, so we will point at the shield rather than sell you something that will not last.",
        ],
      },
      {
        heading: "Sizing notes for cutting tables",
        bullets: [
          {
            label: "Take the acceleration from the drive",
            text: "The value in the controller, not the average from the cycle time. Peak acceleration at reversal is what loads the chain.",
          },
          {
            label: "Leave headroom in the cavity",
            text: "At 60 % fill or below the cables can move; above that the jacket rubs and the wear particles become the next failure.",
          },
          {
            label: "Check the loop at end of stroke",
            text: "On short tables the return loop can foul the frame. Confirm the bend arc clears before ordering.",
          },
        ],
      },
    ],
    specs: [
      { label: "Series", value: "Medium / silent / heavy-duty" },
      { label: "Inner height", value: "18–80 mm" },
      { label: "Cover options", value: "Enclosed, semi-enclosed, crossbar" },
      { label: "Material", value: "PA66 + 30 % GF" },
      { label: "Life test", value: "≥ 15 million cycles" },
      { label: "Warranty", value: "36 months" },
    ],
    faq: [
      {
        q: "Will a plastic carrier survive a plasma table?",
        a: "On the gantry, with enclosed covers and a shield above the run, yes. With molten slag landing directly on the chain, no material choice fixes that — the shield is the fix.",
      },
      {
        q: "Do you supply steel carriers?",
        a: "No. Our range is engineering plastics only. Where steel is genuinely required we would rather say so than substitute something that fails.",
      },
      {
        q: "What acceleration can the chain take?",
        a: "It depends on frame size, fill and cable weight — there is no single number. Send the peak acceleration from the drive and we will size with margin rather than quoting the maximum.",
      },
    ],
    relatedCategories: [
      { href: "/products/silent", label: "Silent cable carriers (18–45 mm)" },
      { href: "/products/medium", label: "Medium cable carriers (18–30 mm)" },
    ],
    relatedPosts: [
      { href: "/blog/cable-carrier-speed-acceleration", label: "Speed, acceleration and cycle life" },
      { href: "/blog/low-noise-cable-carrier", label: "Low-noise carriers for fast axes" },
      { href: "/blog/cable-carrier-bend-radius", label: "Bend radius from travel length" },
    ],
    image: "/images/solutions/laser.webp",
    imageAlt: "CNWSL cable carrier on a laser cutting gantry",
    ctaTitle: "Send the axis data",
    ctaBody:
      "Peak acceleration, stroke, cable list and a photo of the mounting area. If spatter reaches the chain, tell us — that changes the recommendation more than any other detail.",
  },

  {
    id: "new-energy",
    name: "Battery & PV lines",
    metaTitle: "Cable Carrier for Battery and PV Production | CNWSL",
    metaDescription:
      "Cable carriers for lithium battery and photovoltaic lines — long travel, high duty, low dust. 15M+ cycle life, 36-month warranty, factory in Yueqing, China.",
    h1: "Cable carriers for battery and photovoltaic production lines",
    lede: [
      "Battery and PV lines share a pattern: long travel, high duty, and a process that is unforgiving about particles. The carrier usually gets specified late, after the layout is fixed, which is exactly when the constraints are hardest.",
      "We build for that situation — long-stroke frames, low-dust materials, and honest numbers on what the chain will and will not do at your cycle rate.",
    ],
    sections: [
      {
        heading: "What these lines put on the carrier",
        bullets: [
          {
            label: "Long strokes",
            text: "Stacking, winding and stringer axes run several metres. Unsupported length and chain weight become the limiting factors before speed does.",
          },
          {
            label: "Continuous three-shift duty",
            text: "At a 20-second cycle the chain sees over a million cycles a year. That reframes the life figure: 15 million cycles is roughly a decade at that rate, and much less at ten seconds.",
          },
          {
            label: "Particle sensitivity",
            text: "Electrode cutting and coating zones tolerate very little dust. An open carrier shedding wear debris into that area is a quality problem, not a maintenance problem.",
          },
          {
            label: "Static control",
            text: "Anti-static compounds are available for zones where charge accumulation is a risk. It is a different material with different wear behaviour, so specify it as a requirement.",
          },
        ],
      },
      {
        heading: "Sizing for long travel",
        body: [
          "Chain length is roughly half the stroke plus the bend arc, rounded up to whole links, and the fixed end has to sit where the chain lands at full extension. Get that wrong and the loop either overruns the frame or pulls tight at end of stroke.",
          "On long runs, check the sag of the return loop and whether it can rest on itself. Above about three metres of unsupported travel, the frame size usually has to go up a step for stiffness rather than for load.",
        ],
      },
      {
        heading: "Dust: where it actually comes from",
        body: [
          "In most audits the carrier is blamed for particles that come from the cable jacket, not the chain. Two PVC-jacketed cables rubbing inside a chain produce more debris than the chain itself ever will.",
          "The practical fix is a combination: fill ratio below 60 %, vertical separators so cables do not touch, and a jacket material suited to continuous flex. That is cheaper than changing the carrier material and it usually solves the measurement.",
        ],
      },
      {
        heading: "What we can and cannot promise",
        body: [
          "We can promise a 15-million-cycle bench test with conditions on record, a 36-month warranty, one-piece MOQ for qualification samples, and 3D CAD before you commit.",
          "We cannot promise a cleanroom class for a line we have not tested, or a specific particle count in your enclosure. The only product in our range with a Fraunhofer IPA classification is WWC.28.65 in white — if particle emission is the deciding criterion, that is the model to evaluate.",
        ],
      },
    ],
    specs: [
      { label: "Series", value: "Medium / heavy-duty / cleanroom" },
      { label: "Inner height", value: "15–80 mm" },
      { label: "Material", value: "PA66 + 30 % GF; TPU; anti-static on request" },
      { label: "Life test", value: "≥ 15 million cycles" },
      { label: "Warranty", value: "36 months" },
      { label: "MOQ", value: "1 piece for samples" },
      { label: "Lead time", value: "Standard sizes 1–3 days" },
    ],
    faq: [
      {
        q: "How many cycles per year at a 20-second cycle time?",
        a: "About 1.08 million for a single shift year at 250 working days; roughly 3.2 million across three shifts. Compare that against the life figure before assuming a chain will last the programme.",
      },
      {
        q: "Can you supply anti-static carriers?",
        a: "Yes, as a separate compound. Note that it is not the same material as the standard range and is not covered by the cleanroom report — specify it as a requirement so it is quoted correctly.",
      },
      {
        q: "Do you have references in battery plants?",
        a: "We can share application cases where the customer has agreed to be named, and describe others in general terms without identifying them. We will not send a logo wall we cannot stand behind.",
      },
    ],
    relatedCategories: [
      { href: "/products/heavy", label: "Heavy-duty cable carriers (45–80 mm)" },
      { href: "/products/cleanroom", label: "Cleanroom cable carriers (WWC series)" },
    ],
    relatedPosts: [
      { href: "/blog/cable-carrier-length-calculation", label: "Working out chain length from stroke" },
      { href: "/blog/cable-carrier-inner-width", label: "Inner width from the cable list" },
      { href: "/blog/cable-carrier-speed-acceleration", label: "Speed, acceleration and cycle life" },
    ],
    image: "/images/solutions/new-energy.webp",
    imageAlt: "CNWSL cable carrier on a lithium battery production line",
    ctaTitle: "Send the stroke and the cycle time",
    ctaBody:
      "Stroke, cycle time, shift pattern, cable list, and whether the zone has a particle or static requirement. That is enough for a model, a length and a life estimate you can compare against the programme.",
  },
];

export function getSolutionPage(id: string): SolutionPage | undefined {
  return SOLUTION_PAGES.find((page) => page.id === id);
}

export function getSolutionIds(): string[] {
  return SOLUTION_PAGES.map((page) => page.id);
}
