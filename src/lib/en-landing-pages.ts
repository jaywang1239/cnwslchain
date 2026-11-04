/**
 * 英文核心商业词落地页（/en/<slug>）。
 *
 * 2026-11-03 新建。背景：站内英文已有 334 个产品页 + 7 个行业方案页，
 * 但没有任何 URL 命中 "cable-carrier" / "drag-chain" / "e-chain" 这几个
 * 最核心的商业检索词 —— 用户搜 "cable carrier manufacturer" 时，落地页
 * 只能落到 /en/products/micro 这种偏窄的分类页。
 *
 * 本文件为「品类主词 + 采购意图词」建独立落地页，与产品分类页的分工：
 * - 分类页：按规格找型号（内高/内宽），偏选型中期；
 * - 本落地页：按品类/供应商找厂商，偏采购早期或比价阶段。
 * 两者互相内链，不抢同一个词。
 *
 * 语言口径：只有英文（北美 + 欧洲主战场）。其余语种由
 * requireEnOnlyLocale() 404，因此**不声明 hreflang**，sitemap 只登
 * /en/... 单条 —— 与 /en/solutions 的做法完全一致。
 *
 * 事实边界（写文案不得越过）：
 * - 产品线只有工程塑料 PA66+GF30 与 TPU，**没有钢制拖链**；
 * - 唯一工厂在浙江乐清（Yueqing），深圳/常州是销售办事处，不是分厂；
 * - Fraunhofer IPA 报告 ZH 2608-1800 只覆盖 WWC.28.65 白色，ISO Class 1，
 *   不是整机认证、不等于客户产线达标；
 * - CTI 报告 A2260607033101E 只测表面电阻（1.19e6 / 2.42e6 Ω），
 *   不是洁净认证，不能写成 "cleanroom certified"。
 */

export type EnLandingSection = {
  heading: string;
  body?: string[];
  bullets?: { label: string; text: string }[];
  table?: { caption?: string; head: string[]; rows: string[][] };
};

export type EnLandingPage = {
  slug: string;
  /** 面包屑 / 卡片标题 */
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lede: string[];
  sections: EnLandingSection[];
  specs: { label: string; value: string }[];
  faq: { q: string; a: string }[];
  relatedCategories: { href: string; label: string }[];
  relatedPosts: { href: string; label: string }[];
  relatedPages: { href: string; label: string }[];
  image: string;
  imageAlt: string;
  ctaTitle: string;
  ctaBody: string;
};

const IMG = {
  carrier: "/images/solutions/machine-tool.webp",
  drag: "/images/solutions/automotive.webp",
  echain: "/images/solutions/robotics.webp",
  manufacturer: "/images/solutions/cleanroom.webp",
  price: "/images/solutions/new-energy.webp",
  selection: "/images/solutions/laser.webp",
};

export const EN_LANDING_PAGES: EnLandingPage[] = [
  /* ------------------------------------------------------------------ */
  /* 1. cable-carrier —— 绝对主词，全站词根                              */
  /* ------------------------------------------------------------------ */
  {
    slug: "cable-carrier",
    name: "Cable Carrier",
    metaTitle:
      "Cable Carriers — Nylon & TPU, 5–80 mm Inner Height | CNWSL",
    metaDescription:
      "Plastic cable carriers from a manufacturer in Yueqing, China. Inner height 5–80 mm, six series including micro, heavy-duty, silent and cleanroom. 15M+ cycle life, quote in 24 h.",
    h1: "Cable carriers: what they are, and how to choose one that lasts",
    lede: [
      "A cable carrier is a segmented plastic or metal track that constrains cables and hoses along a moving machine axis. It holds a fixed bend radius so the cable flexes the way it was designed to, instead of kinking at whatever radius the machine happens to impose.",
      "This page is the index to our range: six series covering 5–80 mm inner height, all injection-moulded in glass-filled PA66 or TPU. If you already know your inner height and width, jump straight to the series table. If not, start with the two numbers that decide everything.",
    ],
    sections: [
      {
        heading: "The three names you will see for the same part",
        body: [
          "Cable carrier, drag chain, and energy chain (often written e-chain) describe the same product family. The naming came from different regions and different supplier brands, not from any technical difference.",
          "That matters when you search: a distributor in Germany may only ever say Energiekette, a machine builder in Ohio says drag chain, and a Japanese automation catalogue says cable chain. If you are comparing quotes, make sure all three are quoting the same structure, link pitch and material before you compare price.",
        ],
        bullets: [
          {
            label: "Cable carrier",
            text: "the most neutral term, common in North America and in most OEM datasheets.",
          },
          {
            label: "Drag chain",
            text: "common in machine-tool and heavy-equipment contexts; sometimes shortened to tank chain.",
          },
          {
            label: "Energy chain / e-chain",
            text: "the German market term. e-chain is a brand-associated spelling, so it is best used generically as energy chain.",
          },
        ],
      },
      {
        heading: "Two numbers decide the whole selection",
        body: [
          "Before wall thickness, before colour, before anything else: inner height and inner width. Get these wrong and nothing downstream can be fixed.",
          "Inner height has to clear the thickest cable plus a stack allowance. Inner width follows from the total cable cross-section divided by a fill factor — 60 % is the working ceiling for most layouts. Our selection guide walks through the arithmetic, including the trap of using conductor cross-section instead of outer diameter.",
        ],
        table: {
          caption: "Our six series by inner height",
          head: ["Series", "Inner height", "Structure", "Typical use"],
          rows: [
            ["Micro", "5 / 6 / 7 / 10 / 15 mm", "Open, bridge type", "Small CNC, test rigs, electronics assembly"],
            ["Medium", "18 / 20 / 25 / 30 mm", "Open bridge or enclosed", "General automation, machine tools"],
            ["Heavy-duty", "45 / 55 / 65 / 80 mm", "Reinforced side plate", "Steel mills, foundry, gantry"],
            ["Silent", "18–45 mm", "Low-noise sliding shoes", "High-speed, low-noise cells"],
            ["Portable", "Per model", "Openable crossbar, hand-carried", "Mobile rigs, demo units, quick rework"],
            ["Cleanroom", "15 / 18 / 22 / 28 / 35 mm", "TPU, low particle emission", "Semiconductor, medical, panel"],
          ],
        },
      },
      {
        heading: "What separates a 3-month carrier from a 15-million-cycle carrier",
        body: [
          "The failure mode people describe as 'the chain broke' is almost never a broken link. It is accumulated wear at the pin and at the contact between links, which shows up as lengthening pitch, then sag, then a cable chafing through its own jacket.",
          "Three things control that rate: the material, the pin design, and whether the installed length was calculated for the actual stroke. We test to a minimum of 15 million cycles on our standard series. That number is a test result on a defined rig, not a promise about your machine — your stroke, speed, fill and environment all move it.",
        ],
        bullets: [
          {
            label: "Material",
            text: "PA66 with 30 % glass fibre is the workhorse: stiff enough to hold radius, tough enough to survive repeated impact. TPU is used only where particle emission matters, at some cost in stiffness.",
          },
          {
            label: "Pin and bore",
            text: "clearance is a trade-off. Too tight and the link seizes in cold weather; too loose and it hammers under acceleration. We size for the acceleration range in the datasheet, not for a single speed.",
          },
          {
            label: "Length",
            text: "calculated from stroke plus bend allowance, then rounded to whole links. A chain that is one link short will be forced past its radius every cycle, and will fail far earlier than the test data suggests.",
          },
        ],
      },
      {
        heading: "Why buyers end up talking to us",
        body: [
          "We are a manufacturer, not a trader: one factory in Yueqing, Zhejiang, roughly 70 injection moulding machines and 3,000+ moulds, IATF 16949 certified. Shenzhen and Changzhou are sales offices — worth saying plainly, because a number of listings on B2B platforms imply a branch plant in the customer's city that does not exist.",
          "In practice the conversations that convert are about three things: a size that other suppliers treat as non-standard, a delivery date that a stockist cannot hit, and a willingness to send a drawing or 3D model before money changes hands.",
        ],
        bullets: [
          {
            label: "Non-standard sizes",
            text: "custom inner width and mounting brackets from a defined starting quantity, drawings returned before tooling.",
          },
          {
            label: "Stock range",
            text: "common metric sizes held for immediate dispatch; the exact list is on the downloads page rather than in marketing copy.",
          },
          {
            label: "Documentation",
            text: "material datasheet, cycle test summary, and — for the cleanroom series — the original Fraunhofer IPA report, not a summary slide.",
          },
        ],
      },
    ],
    specs: [
      { label: "Inner height range", value: "5 – 80 mm across six series" },
      { label: "Materials", value: "PA66 + 30 % glass fibre; TPU for cleanroom series" },
      { label: "Colours", value: "Black standard; grey, white and custom on request" },
      { label: "Cycle life (test)", value: "≥ 15 million cycles on standard series" },
      { label: "Warranty", value: "36 months on standard series" },
      { label: "Factory", value: "Yueqing, Zhejiang, China (IATF 16949)" },
      { label: "Lead time", value: "Stock sizes ship in days; custom tooling quoted per drawing" },
    ],
    faq: [
      {
        q: "What is the difference between a cable carrier and a drag chain?",
        a: "Nothing structural — they are two names for the same product. Cable carrier is the more neutral term in North America; drag chain is common in machine-tool and heavy-equipment contexts. Both describe a segmented track that constrains cables to a fixed bend radius.",
      },
      {
        q: "Do you make steel cable carriers?",
        a: "No. Our range is engineering plastics only — PA66 with 30 % glass fibre, plus TPU for the cleanroom series. If your application needs a steel carrier, we are not the right supplier and will say so rather than quote a plastic part that will fail.",
      },
      {
        q: "How many cycles will a carrier last?",
        a: "We test standard series to a minimum of 15 million cycles on a defined rig. Treat that as a test result, not a guarantee: stroke length, speed, acceleration, fill ratio and ambient temperature all change the real number. Send us the duty and we will tell you what we would expect.",
      },
      {
        q: "Can I get a 3D model before ordering?",
        a: "Yes, for the sizes we already tool. Send the model number and the mounting orientation and we return STEP or the native format your CAD uses. For custom sizes we return a drawing first and a model after the drawing is signed off.",
      },
      {
        q: "What is the minimum order?",
        a: "One piece for stock sizes. Custom inner width or custom brackets start from a defined quantity, which depends on the tooling involved — ask with your drawing and we will give you the number, not a range.",
      },
      {
        q: "Where is the factory?",
        a: "Yueqing, Zhejiang, China. That is the only manufacturing site, and it is the only place we can host a factory audit. Shenzhen and Changzhou are sales offices, not branch plants.",
      },
    ],
    relatedCategories: [
      { href: "/products/micro", label: "Micro cable carriers (5–15 mm)" },
      { href: "/products/medium", label: "Medium cable carriers (18–30 mm)" },
      { href: "/products/heavy", label: "Heavy-duty cable carriers (45–80 mm)" },
      { href: "/products/cleanroom", label: "Cleanroom cable carriers (TPU)" },
    ],
    relatedPosts: [
      { href: "/blog/cable-carrier-selection-8-steps", label: "Cable carrier selection in 8 steps" },
      { href: "/blog/cable-carrier-inner-height", label: "How to size inner height" },
      { href: "/blog/cable-carrier-inner-width", label: "The 60 % fill rule for inner width" },
      { href: "/blog/cable-carrier-material-comparison", label: "PA66 vs TPU: material comparison" },
    ],
    relatedPages: [
      { href: "/drag-chain", label: "Drag chain — the same product, other name" },
      { href: "/energy-chain", label: "Energy chain / e-chain explained" },
      { href: "/cable-carrier-manufacturer", label: "Choosing a cable carrier manufacturer" },
      { href: "/cable-carrier-price", label: "How cable carriers are priced" },
    ],
    image: IMG.carrier,
    imageAlt: "Plastic cable carrier carrying cables on a machine tool axis",
    ctaTitle: "Send the stroke and the cable list",
    ctaBody:
      "With stroke length, cable outer diameters and travel speed we can size the inner height and width and quote a specific model — usually within one working day.",
  },

  /* ------------------------------------------------------------------ */
  /* 2. drag-chain —— 同义词，承接 machine-tool 意图                      */
  /* ------------------------------------------------------------------ */
  {
    slug: "drag-chain",
    name: "Drag Chain",
    metaTitle: "Drag Chain — Plastic Cable Drag Chains, 5–80 mm | CNWSL",
    metaDescription:
      "Drag chains (tank chains) in glass-filled PA66, inner height 5–80 mm. Bridge and enclosed types, 15M+ cycle life, IATF 16949 factory in Yueqing. Drawings and 3D models on request.",
    h1: "Drag chains for machine tools and automation axes",
    lede: [
      "Drag chain, tank chain and cable carrier all refer to the same part. The name drag chain is most common where the application is a machine tool slide or a gantry: a track that drags the cable bundle back and forth along the axis while keeping it inside a controlled bend radius.",
      "If you searched for drag chain because a machine builder or a maintenance team used that word, the specification work is identical to cable carrier selection. The difference in this page is where we start: from the axis, not from the catalogue.",
    ],
    sections: [
      {
        heading: "Starting from the axis instead of the catalogue",
        body: [
          "Most sizing mistakes we see come from starting at a catalogue table. Someone picks the size that looks close and then the chain sags in the middle of the stroke, or the link hammers at reversal.",
          "Work outward from the machine instead: stroke length gives you the required chain length and the number of links; the cable bundle gives you the cross-section; acceleration gives you the material and pin class. Only then does the catalogue row matter.",
        ],
        bullets: [
          {
            label: "Stroke",
            text: "fixed travel plus the bend allowance at both ends, rounded up to whole links. Under-length is the single most common cause of premature failure.",
          },
          {
            label: "Bundle",
            text: "total outer-diameter cross-section of every cable and hose, then divided by the fill ceiling. Never use conductor cross-section.",
          },
          {
            label: "Dynamics",
            text: "speed and acceleration decide whether a standard pin is enough or the duty needs the reinforced side plate.",
          },
        ],
      },
      {
        heading: "Bridge type or enclosed type",
        body: [
          "Bridge (open) chains have a gap between crossbars, so you can lay cables in from above at any point during commissioning. Enclosed chains close the cavity and protect the bundle from chips, coolant and swarf.",
          "On a machine tool the choice usually comes down to swarf. If chips can reach the chain, the open version will eventually pack the cavity and abrade the jacket. If the chain runs in clean air and you expect to re-route cables during commissioning, the open version saves hours.",
        ],
        table: {
          caption: "Which structure for which duty",
          head: ["Condition", "Bridge (open)", "Enclosed"],
          rows: [
            ["Chips / swarf present", "Not advised", "Recommended"],
            ["Coolant spray", "Marginal", "Recommended"],
            ["Cables re-routed often", "Recommended", "Access via removable lid"],
            ["Clean air, high fill", "Recommended", "Viable"],
            ["Long stroke, high speed", "Recommended", "Check weight"],
          ],
        },
      },
      {
        heading: "Mounting: the detail that decides noise and life",
        body: [
          "Two anchors, one fixed and one moving, at the same height, is the default. Get the height wrong and the chain will either run with the upper run resting on the lower one — which is fine and by design for gliding — or hang unsupported, which is not.",
          "For long strokes the upper run is meant to glide on the lower run. That requires the right material pairing and a floor that does not wear. For short strokes the chain should not touch itself at all. Mixing the two setups is what produces the complaint that a chain 'suddenly got loud'.",
        ],
        bullets: [
          {
            label: "A1 — both ends at the same height",
            text: "the standard layout, upper run glides on lower run for long strokes.",
          },
          {
            label: "A2 — moving end raised",
            text: "used when the machine structure forces an offset; check the chain is not asked to exceed its radius.",
          },
          {
            label: "A3 — fixed end raised",
            text: "the reverse offset; confirm clearance at reversal, where the chain is most likely to clash.",
          },
          {
            label: "A4 — both ends offset",
            text: "needs an explicit drawing check; do not take it from a catalogue sketch.",
          },
        ],
      },
      {
        heading: "Where plastic is the wrong answer",
        body: [
          "We make plastic drag chains and nothing else, so this is worth stating plainly: there are duties where steel is the correct choice, and we will tell you when yours is one of them.",
          "Very high ambient temperature, molten metal splash, or a load per metre far beyond the plastic range all point to steel. Our heavy-duty series covers up to 80 mm inner height in reinforced PA66, which handles most foundry and steel-mill cable bundles — but it is still plastic, and it has a temperature ceiling.",
        ],
      },
    ],
    specs: [
      { label: "Inner height range", value: "5 – 80 mm" },
      { label: "Structures", value: "Bridge (open) and enclosed" },
      { label: "Material", value: "PA66 + 30 % glass fibre" },
      { label: "Mounting forms", value: "A1 / A2 / A3 / A4" },
      { label: "Cycle life (test)", value: "≥ 15 million cycles" },
      { label: "Warranty", value: "36 months" },
    ],
    faq: [
      {
        q: "Is a drag chain the same as a cable carrier?",
        a: "Yes. Drag chain, tank chain and cable carrier are different names for the same product. The word choice usually reflects the region or the machine type rather than any design difference.",
      },
      {
        q: "Bridge type or fully enclosed — which should I order?",
        a: "If chips or coolant can reach the chain, order enclosed. If the chain runs in clean air and you expect to re-route cables during commissioning, bridge type is faster to work with. On machine tools the deciding factor is almost always swarf.",
      },
      {
        q: "Do you supply steel drag chains?",
        a: "No. Our range is engineering plastics only — PA66 with glass fibre, and TPU for cleanroom. For very high temperature or molten splash, steel is the correct choice and we are not the right supplier.",
      },
      {
        q: "How do I calculate drag chain length?",
        a: "Fixed travel plus bend allowance at both ends, then rounded up to whole links. Our blog article on length calculation walks through the formula with a worked example — the short version is that rounding down is never safe.",
      },
      {
        q: "Can the chain run vertically or in a rotating application?",
        a: "Vertical travel and rotating applications are possible but need an explicit review: the load on the pin and the unsupported span change completely. Send the arrangement drawing rather than ordering from the standard table.",
      },
    ],
    relatedCategories: [
      { href: "/products/medium", label: "Medium drag chains (18–30 mm)" },
      { href: "/products/heavy", label: "Heavy-duty drag chains (45–80 mm)" },
      { href: "/products/micro", label: "Micro drag chains (5–15 mm)" },
    ],
    relatedPosts: [
      { href: "/blog/cable-carrier-length-calculation", label: "Drag chain length calculation" },
      { href: "/blog/cable-carrier-vs-tank-chain", label: "Cable carrier vs tank chain" },
      { href: "/blog/cable-carrier-bend-radius", label: "Setting the bend radius" },
    ],
    relatedPages: [
      { href: "/cable-carrier", label: "Cable carrier — full range index" },
      { href: "/energy-chain", label: "Energy chain / e-chain" },
      { href: "/cable-carrier-price", label: "Drag chain pricing" },
    ],
    image: IMG.drag,
    imageAlt: "Plastic drag chain installed on a machine tool axis",
    ctaTitle: "Send the axis drawing",
    ctaBody:
      "Stroke length, mounting heights and the cable bundle are enough for us to size the chain and return a model number with a drawing.",
  },

  /* ------------------------------------------------------------------ */
  /* 3. energy-chain —— e-chain 同义词，承接欧洲/德语区意图                */
  /* ------------------------------------------------------------------ */
  {
    slug: "energy-chain",
    name: "Energy Chain",
    metaTitle: "Energy Chain (E-Chain) — Plastic Cable Carriers | CNWSL",
    metaDescription:
      "Energy chains, also called e-chains: plastic cable carriers in PA66 and TPU, 5–80 mm inner height. Same product as cable carrier and drag chain. Manufacturer in Yueqing, China.",
    h1: "Energy chains (e-chains): the German-market name for a cable carrier",
    lede: [
      "Energy chain is the direct translation of Energiekette, the term used across German-speaking machine building. E-chain is a brand-associated spelling of the same idea. Neither name implies a different product: an energy chain is a cable carrier.",
      "We write this page separately because the search behaviour is different. Buyers searching energy chain or e-chain are often working from a European machine drawing that already specifies a chain size, and their question is about interchangeability rather than selection from scratch.",
    ],
    sections: [
      {
        heading: "Interchange: what has to match",
        body: [
          "When you are replacing a chain on an existing machine, five dimensions decide whether a part will drop in. Get all five and you can compare across suppliers; get four and you are guessing.",
        ],
        bullets: [
          {
            label: "Inner height and inner width",
            text: "the cavity the cables sit in. Width is measured between the inner faces of the side plates, not over the outside.",
          },
          {
            label: "Bend radius (R)",
            text: "measured to the inner edge of the curve. Replacing an R38 chain with an R28 chain will over-flex the cable even if the cavity size matches.",
          },
          {
            label: "Pitch",
            text: "centre distance between pins. Pitch and link count together give the chain length, so they must be agreed together.",
          },
          {
            label: "Mounting hole pattern",
            text: "the bolt spacing on the end bracket. This is where most 'equivalent' parts quietly fail to fit.",
          },
          {
            label: "Outer profile",
            text: "height and width over the outside, which decides whether the chain clears the machine guard.",
          },
        ],
      },
      {
        heading: "A note on brand names",
        body: [
          "E-chain is a registered trademark of a specific German manufacturer. We use the term here only because buyers search for it when they mean the product category — we do not claim any affiliation, and we do not describe our range as that brand's product.",
          "What we do offer is dimensional interchange for common metric sizes: if your drawing specifies an inner height, inner width, pitch and bend radius we can tell you whether one of our series matches, and where it does not. When it does not match, we say so.",
        ],
      },
      {
        heading: "Two constraints that change with the European duty",
        body: [
          "Chains designed for European machine tools often run at higher speed and with tighter noise limits than the same size in other markets. That has two practical consequences.",
          "First, the pin and bore clearance matters more: at high reversal frequency, a loose pin hammers and a tight pin runs hot. Second, gliding wear on long strokes becomes the dominant life limit, so the material pairing between upper and lower runs matters as much as the links themselves.",
        ],
        bullets: [
          {
            label: "Noise",
            text: "silent series uses sliding shoes to cut impact noise at reversal; the trade-off is a lower speed ceiling than an open bridge chain of the same size.",
          },
          {
            label: "Gliding wear",
            text: "for long strokes, confirm the upper run is designed to glide and that the machine surface under it will not wear unevenly.",
          },
        ],
      },
    ],
    specs: [
      { label: "Equivalent terms", value: "Cable carrier, drag chain, tank chain, energy chain, e-chain" },
      { label: "Inner height range", value: "5 – 80 mm" },
      { label: "Bend radius", value: "Model-specific; stated per size on the datasheet" },
      { label: "Material", value: "PA66 + 30 % glass fibre; TPU for cleanroom" },
      { label: "Customs code", value: "Provided per shipment on request" },
    ],
    faq: [
      {
        q: "Is an energy chain the same as an e-chain?",
        a: "Yes. Energy chain is the translated German term; e-chain is a brand-associated spelling of the same product category. Both refer to a cable carrier.",
      },
      {
        q: "Can I replace a branded e-chain with your part?",
        a: "Sometimes, if the five interchange dimensions match: inner height, inner width, bend radius, pitch, and the mounting hole pattern on the end bracket. Send the drawing and we will check it against our range and tell you where it does not fit.",
      },
      {
        q: "Are you affiliated with the brand that owns the e-chain trademark?",
        a: "No. E-chain is a registered trademark of another manufacturer. We refer to it only because buyers use it as a category word. We make our own carriers and make no claim of affiliation.",
      },
      {
        q: "Do you supply to Europe?",
        a: "Yes, including customs documentation and the material datasheets needed for incoming inspection. Talk to us about the incoterm and the paperwork your forwarder expects before the first shipment, not after.",
      },
    ],
    relatedCategories: [
      { href: "/products/medium", label: "Medium energy chains" },
      { href: "/products/silent", label: "Silent energy chains (low noise)" },
      { href: "/products/heavy", label: "Heavy-duty energy chains" },
    ],
    relatedPosts: [
      { href: "/blog/cable-carrier-bend-radius", label: "Bend radius: how to set it" },
      { href: "/blog/low-noise-cable-carrier", label: "Reducing chain noise" },
      { href: "/blog/cable-carrier-speed-acceleration", label: "Speed and acceleration limits" },
    ],
    relatedPages: [
      { href: "/cable-carrier", label: "Cable carrier — full range" },
      { href: "/drag-chain", label: "Drag chain" },
    ],
    image: IMG.echain,
    imageAlt: "Energy chain guiding cables on a robotic axis",
    ctaTitle: "Checking interchange? Send the drawing",
    ctaBody:
      "Send the five interchange dimensions or the original drawing and we will tell you which of our series matches, and which do not.",
  },

  /* ------------------------------------------------------------------ */
  /* 4. cable-carrier-manufacturer —— 采购意图词                          */
  /* ------------------------------------------------------------------ */
  {
    slug: "cable-carrier-manufacturer",
    name: "Manufacturer",
    metaTitle:
      "Cable Carrier Manufacturer — Factory, Not Trader | CNWSL",
    metaDescription:
      "IATF 16949 cable carrier manufacturer with one factory in Yueqing, Zhejiang. 70+ injection moulding machines, 3,000+ moulds, own material compounding. Factory audits welcome.",
    h1: "Choosing a cable carrier manufacturer, not a reseller",
    lede: [
      "On B2B platforms, a large share of accounts selling cable carriers do not make them. That is not automatically a problem — a good stockist is worth having — but it changes what you can ask for: drawings, tooling changes, cycle test data and factory audits all disappear one step up the chain.",
      "This page is about how to tell the difference, and what we can and cannot do as a manufacturer. Both halves matter; a supplier who only tells you the first half is selling.",
    ],
    sections: [
      {
        heading: "Six questions that separate a factory from a reseller",
        body: [
          "None of these require a factory visit. All of them are hard to fake consistently across a few emails.",
        ],
        bullets: [
          {
            label: "Which specific machine makes this part?",
            text: "a manufacturer names the tonnage and the machine. A reseller says 'our partner factory' and changes the subject.",
          },
          {
            label: "Can you change the inner width without new tooling?",
            text: "if the answer is always yes with no cost, they are not tooling anything — width changes usually mean an insert or a new mould.",
          },
          {
            label: "Whose material is it, and what grade?",
            text: "PA66+GF30 is a category, not a grade. A manufacturer can name the compound and the supplier; a reseller repeats the category.",
          },
          {
            label: "Show me the cycle test rig",
            text: "a photo of the actual rig, with the model number visible. Test reports without a rig are usually a template.",
          },
          {
            label: "Which address would an auditor visit?",
            text: "one address, or none. A 'factory' that turns out to be an office is the most common finding in a first audit.",
          },
          {
            label: "Who signs the drawing?",
            text: "the same person who can stop a production run. If the drawing comes from a sales address with no engineering counterpart, you are buying from a trader.",
          },
        ],
      },
      {
        heading: "What we are, precisely",
        body: [
          "One factory in Yueqing, Zhejiang — that is the only manufacturing site and the only address we can host an audit at. Shenzhen and Changzhou are sales offices. We say this because a number of listings for similar products imply a local plant that does not exist, and buyers discover it at the audit.",
          "Approximately 70 injection moulding machines, 3,000+ moulds, in-house material compounding, IATF 16949. The certificates are on the about page as original PDFs, not as re-keyed numbers.",
        ],
        table: {
          caption: "Scope, stated plainly",
          head: ["Item", "Status"],
          rows: [
            ["Manufacturing site", "Yueqing, Zhejiang, China (single site)"],
            ["Sales offices", "Shenzhen, Changzhou — not factories"],
            ["Quality system", "IATF 16949, ISO 9001"],
            ["Cleanroom test", "Fraunhofer IPA ZH 2608-1800 — WWC.28.65 white only, ISO Class 1"],
            ["Antistatic data", "CTI report A2260607033101E — surface resistance only"],
            ["Steel carriers", "Not manufactured"],
            ["Factory audit", "Welcome, with notice; Yueqing only"],
          ],
        },
      },
      {
        heading: "Where we lose, honestly",
        body: [
          "Against the large European brands we are not going to win a specification that names their part number, and we do not try. Their catalogue depth, their application engineering and their global stock are real advantages, and a buyer who needs a chain in three days in Ohio should use them.",
          "Against domestic competitors we are not the cheapest. If price per metre is the only variable, someone will always quote lower — usually with a lower glass content, thinner side plates, or a pin clearance that works in the sample and hammers in production.",
          "What we compete on is the middle ground: a size that is not in anyone's catalogue, a drawing returned in days, test data that matches the part you receive, and a factory you can actually visit.",
        ],
      },
      {
        heading: "How a first order usually runs",
        body: [
          "Most new relationships start with one size, not a container. That is fine and we would rather it did.",
        ],
        bullets: [
          {
            label: "1. Requirement",
            text: "stroke, cable list, speed, environment. A photo of the existing installation is often faster than a form.",
          },
          {
            label: "2. Proposal",
            text: "a specific model with drawing and, where relevant, the test data for that series — not a catalogue page.",
          },
          {
            label: "3. Sample",
            text: "stock sizes ship for evaluation; custom sizes go to tooling after drawing sign-off.",
          },
          {
            label: "4. Production",
            text: "batch with the agreed material grade; certificate of conformity on request.",
          },
        ],
      },
    ],
    specs: [
      { label: "Legal name", value: "Zhejiang CNWSL Plastic Co., Ltd." },
      { label: "Factory", value: "Yueqing, Zhejiang, China" },
      { label: "Sales offices", value: "Shenzhen, Changzhou" },
      { label: "Injection machines", value: "70+" },
      { label: "Moulds", value: "3,000+" },
      { label: "Quality system", value: "IATF 16949, ISO 9001" },
      { label: "Material", value: "In-house compounding of PA66+GF30 and TPU" },
    ],
    faq: [
      {
        q: "Are you a factory or a trading company?",
        a: "A factory. One manufacturing site in Yueqing, Zhejiang. Shenzhen and Changzhou are sales offices. If you want to audit, Yueqing is the only address that will show you a production line.",
      },
      {
        q: "Will you send samples before we order?",
        a: "Yes for stock sizes. For custom sizes we produce a sample after drawing sign-off, because a sample made without agreed dimensions is not useful to either side.",
      },
      {
        q: "What certifications do you hold?",
        a: "IATF 16949 and ISO 9001, with the original certificates on the about page. Separately, the cleanroom model WWC.28.65 in white was tested by Fraunhofer IPA to ISO Class 1 — that report covers one model, not the whole range.",
      },
      {
        q: "Can you make a size that is not in your catalogue?",
        a: "Yes, for inner width and brackets. Height changes usually require a new mould and are quoted separately. Send the drawing and we will tell you which of the two it is.",
      },
      {
        q: "Do you sell to distributors?",
        a: "Yes. Terms depend on whether you are stocking a region or reselling into projects — ask and we will be specific rather than sending a generic dealer policy.",
      },
    ],
    relatedCategories: [
      { href: "/products/micro", label: "Micro series" },
      { href: "/products/medium", label: "Medium series" },
      { href: "/products/heavy", label: "Heavy-duty series" },
      { href: "/products/cleanroom", label: "Cleanroom series" },
    ],
    relatedPosts: [
      { href: "/blog/custom-cable-carrier-delivery-process", label: "Custom carrier delivery process" },
      { href: "/blog/lifespan-testing-and-warranty", label: "Life testing and warranty" },
    ],
    relatedPages: [
      { href: "/cable-carrier", label: "Cable carrier range" },
      { href: "/cable-carrier-price", label: "How pricing works" },
      { href: "/about", label: "Company and certificates" },
    ],
    image: IMG.manufacturer,
    imageAlt: "CNWSL cleanroom cable carrier production in Yueqing factory",
    ctaTitle: "Ask for a factory audit date",
    ctaBody:
      "If the audit matters more than the price, tell us the month you plan to travel. We will confirm the Yueqing schedule and send the document package in advance.",
  },

  /* ------------------------------------------------------------------ */
  /* 5. cable-carrier-price —— 价格意图词                                  */
  /* ------------------------------------------------------------------ */
  {
    slug: "cable-carrier-price",
    name: "Price",
    metaTitle:
      "Cable Carrier Price — What Drives Cost per Metre | CNWSL",
    metaDescription:
      "Why cable carrier prices differ: material grade, side plate thickness, pin design, inner width step and order quantity. What we need to quote a real number, not a range.",
    h1: "What actually drives a cable carrier price",
    lede: [
      "\"Cable carrier price per metre\" is not a single number, and any supplier who answers it with one figure is answering a different question than the one you asked. Price per metre at 20 mm inner height is not comparable to price per metre at 80 mm.",
      "This page breaks the cost into the five variables that move it, so you can compare quotes on equal terms — including ours.",
    ],
    sections: [
      {
        heading: "The five variables that move the price",
        body: [
          "Two carriers can look identical in a photo and differ by a factor of three in cost. These five are the reason.",
        ],
        bullets: [
          {
            label: "Material grade",
            text: "PA66+GF30 is a category. Recycled content, glass percentage and impact modifier all change cost, and all change life. Ask which grade, not which category.",
          },
          {
            label: "Side plate and pin",
            text: "thicker plate and a larger pin cost more material and a longer cycle. This is where a cheap chain usually saves.",
          },
          {
            label: "Inner width step",
            text: "each step up widens the links, side plates and pins together. Cost is not linear in width — it climbs in steps.",
          },
          {
            label: "Order quantity",
            text: "tooling amortisation and setup dominate small orders; at volume the material and cycle time dominate instead.",
          },
          {
            label: "Customisation",
            text: "custom brackets, colours or non-standard widths add tooling and inspection, which is why they are quoted per drawing.",
          },
        ],
      },
      {
        heading: "Why 'price per metre' is a misleading unit",
        body: [
          "Chains are priced per metre because that is how they are cut and shipped, but the metre price is a function of the cross-section: a metre of 80 mm heavy-duty chain uses several times the material of a metre of 10 mm micro chain.",
          "When you compare two quotes, convert to the same basis first: same inner height, same inner width, same bend radius, same material grade, same quantity. If a quote does not state those five, it is not comparable yet.",
        ],
        table: {
          caption: "What to normalise before comparing two quotes",
          head: ["Variable", "Why it must match"],
          rows: [
            ["Inner height", "drives material volume and link size"],
            ["Inner width", "cost steps up non-linearly"],
            ["Bend radius", "larger radius needs longer chain for the same stroke"],
            ["Material grade", "PA66+GF30 vs reduced glass is a different lifetime"],
            ["Quantity", "tooling amortisation changes the unit price"],
            ["Incoterm", "FOB vs DDP is not a price difference, it is a delivery difference"],
          ],
        },
      },
      {
        heading: "How to get a real number from us",
        body: [
          "We quote specific models, not price bands. To do that we need four things, and with them we can usually answer within one working day.",
        ],
        bullets: [
          {
            label: "Stroke length",
            text: "the travel the chain has to cover, in mm.",
          },
          {
            label: "Cable list",
            text: "outer diameters and quantity of each cable and hose, so we can size the cavity.",
          },
          {
            label: "Speed and environment",
            text: "travel speed, and whether chips, coolant or washdown are present.",
          },
          {
            label: "Quantity and destination",
            text: "first order quantity and the delivery city, so the Incoterm is unambiguous.",
          },
        ],
      },
      {
        heading: "What we will not do to win a price",
        body: [
          "There are several ways to cut a quoted price without changing the model number. Reducing glass content, thinning the side plate, or opening up pin clearance all lower cost and all shorten life — usually after the warranty window, which is why they are common.",
          "We do not do that on a stock model. If your budget and the duty are genuinely incompatible, we would rather tell you and let you decide, including the option of going to a cheaper supplier for a non-critical axis.",
        ],
      },
    ],
    specs: [
      { label: "Quotation basis", value: "Specific model, not price band" },
      { label: "Typical response", value: "Within one working day with complete data" },
      { label: "Incoterms", value: "EXW / FOB / CIF / DDP on request" },
      { label: "Minimum order", value: "1 piece for stock sizes" },
      { label: "Payment", value: "Confirmed per order and destination" },
    ],
    faq: [
      {
        q: "How much does a cable carrier cost per metre?",
        a: "It depends on inner height and width more than anything else: a metre of 10 mm micro chain and a metre of 80 mm heavy-duty chain are not comparable units. Send the size and quantity and we will give you a specific number rather than a range.",
      },
      {
        q: "Why is your price higher than another quote for the same size?",
        a: "Usually the material grade, the side plate thickness or the pin clearance. Ask the other supplier for the glass percentage and the plate thickness; if they cannot answer, the saving is coming from somewhere in the part.",
      },
      {
        q: "Do you have a price list?",
        a: "No public list, because the price depends on the five variables above. We quote per requirement. If you are budgeting a project, send approximate sizes and quantities and we will give you a budgetary figure.",
      },
      {
        q: "Does the price include brackets?",
        a: "It depends on the model. Some are quoted with end brackets, some without. Ask explicitly which is included before comparing two quotes — a missing bracket is a common source of a misleadingly low number.",
      },
      {
        q: "What about freight and duties?",
        a: "We quote the Incoterm you ask for. FOB and DDP are different arrangements, not a discount; we will state which one a price refers to so you can compare like with like.",
      },
    ],
    relatedCategories: [
      { href: "/products/micro", label: "Micro series pricing by size" },
      { href: "/products/medium", label: "Medium series" },
      { href: "/products/heavy", label: "Heavy-duty series" },
    ],
    relatedPosts: [
      { href: "/blog/cable-carrier-selection-8-steps", label: "Selection in 8 steps" },
      { href: "/blog/cable-carrier-inner-width", label: "Sizing inner width" },
      { href: "/blog/lifespan-testing-and-warranty", label: "What the warranty covers" },
    ],
    relatedPages: [
      { href: "/cable-carrier", label: "Cable carrier range" },
      { href: "/cable-carrier-manufacturer", label: "Manufacturer or reseller?" },
    ],
    image: IMG.price,
    imageAlt: "Cable carrier links ready for dispatch",
    ctaTitle: "Send four numbers, get a real price",
    ctaBody:
      "Stroke, cable outer diameters, speed and quantity. That is enough for a quoted model rather than a price band.",
  },
];

export function getEnLandingPage(slug: string): EnLandingPage | undefined {
  return EN_LANDING_PAGES.find((page) => page.slug === slug);
}

/** 供 sitemap 与首页内链使用，顺序即优先级。 */
export const EN_LANDING_SLUGS = EN_LANDING_PAGES.map((page) => page.slug);

/* ──────────────────────────────────────────────────────────────────────────
 * 总入口（hub）：/en/cable-carrier-guides
 *
 * 2026-11-04 新增。上面 5 个落地页各自回答一个问题，但没有一个页面告诉
 * 访客「我现在该看哪一篇」。hub 的作用是分流 —— 按采购阶段把人送到对应
 * 的页，而不是再写一遍内容。
 *
 * SEO 上这是 hub-and-spoke 结构：hub 向 5 个 spoke 出链，5 个 spoke 的
 * 页尾 relatedPages 回链（其中已包含 /cable-carrier，其余加在 hub 的
 * guides 数组里）。内链集中后，5 个页不再是孤岛。
 *
 * 同样只有英文，requireEnOnlyLocale() 收口，不声明 hreflang。
 * ────────────────────────────────────────────────────────────────────────── */

export type EnGuidesHub = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lede: string[];
  /** 按采购阶段分流 —— hub 的核心结构，不是内容堆砌。 */
  stages: {
    stage: string;
    title: string;
    situation: string;
    primary: { href: string; label: string };
    secondary?: { href: string; label: string }[];
  }[];
  guides: {
    href: string;
    name: string;
    summary: string;
    who: string;
    minutes: string;
  }[];
  series: { href: string; label: string; note: string }[];
  posts: { href: string; label: string }[];
  faq: { q: string; a: string }[];
  image: string;
  imageAlt: string;
  ctaTitle: string;
  ctaBody: string;
};

export const EN_GUIDES_HUB: EnGuidesHub = {
  slug: "cable-carrier-guides",
  name: "Cable Carrier Guides",
  metaTitle: "Cable Carrier Guides — Sizing, Pricing and Suppliers | CNWSL",
  metaDescription:
    "Five cable carrier guides organised by where you are in the buying process: no part number, another brand's number, supplier comparison, or a 3x price spread.",
  h1: "Cable carrier guides: start where you actually are",
  lede: [
    "Almost every cable carrier enquiry arrives in one of four states. You are sizing a machine and have no part number. You have a part number, but it belongs to another brand. You are comparing suppliers and cannot tell them apart. Or you have three quotes for the same drawing and they differ by a factor of three.",
    "The five guides below are organised by that, not by product. Pick the situation that matches yours and skip the parts you already know. Each guide stands alone, so none of them assumes you have read the others.",
  ],
  stages: [
    {
      stage: "Stage 1",
      title: "No part number yet",
      situation:
        "You know the stroke, the speed and roughly how many cables, but nothing in the drawing looks like a model code. Start with the range and narrow by inner height, then inner width, then bend radius.",
      primary: { href: "/cable-carrier", label: "Cable carrier range" },
      secondary: [{ href: "/products", label: "All six series by size" }],
    },
    {
      stage: "Stage 2",
      title: "You have another brand's number",
      situation:
        "European drawings usually carry an igus number; Japanese drawings more often a Tsubaki or Misumi one. Four dimensions have to line up before a swap is safe: inner height, inner width, bend radius and pitch.",
      primary: { href: "/energy-chain", label: "Cross-brand sizing" },
      secondary: [{ href: "/cable-carrier", label: "What the dimensions mean" }],
    },
    {
      stage: "Stage 3",
      title: "Comparing suppliers",
      situation:
        "Six questions separate the company that owns the mould from the company that forwards your drawing. Tooling ownership, who runs the press, where the plant is, what the certificate covers, who answers technical questions, and what happens to a failed batch.",
      primary: { href: "/cable-carrier-manufacturer", label: "Factory or reseller" },
      secondary: [{ href: "/factory", label: "Our plant and inspection" }],
    },
    {
      stage: "Stage 4",
      title: "Quotes differ by 3x",
      situation:
        "On an identical drawing, a threefold spread is almost never margin. It is glass content, side-plate wall thickness, pin material, whether sampling is included, and whether the quote quietly excludes mounting brackets.",
      primary: { href: "/cable-carrier-price", label: "Cost per metre" },
      secondary: [{ href: "/price", label: "How we quote" }],
    },
  ],
  guides: [
    {
      href: "/cable-carrier",
      name: "Cable Carrier",
      summary:
        "What a cable carrier does, the four dimensions that define every model, and how to read a supplier's size table without getting caught by nominal versus actual inner width.",
      who: "First-time buyers and anyone starting from a machine drawing.",
      minutes: "8 min",
    },
    {
      href: "/drag-chain",
      name: "Drag Chain",
      summary:
        "The same product under its machine-tool name, with the duty differences that matter on gantries, transfer lines and robot axes: unsupported length, acceleration and chip exposure.",
      who: "Machine tool builders and integrators who size for acceleration.",
      minutes: "7 min",
    },
    {
      href: "/energy-chain",
      name: "Energy Chain (E-Chain)",
      summary:
        "Why the European market calls it an energy chain, and how to convert an existing e-chain number into our sizing without losing the mounting interface.",
      who: "Anyone replacing an imported chain on an existing machine.",
      minutes: "6 min",
    },
    {
      href: "/cable-carrier-manufacturer",
      name: "Cable Carrier Manufacturer",
      summary:
        "Six checks you can run before a sample is even sent — most of them from public records and one phone call — plus the answers that indicate a trading company.",
      who: "Purchasing and sourcing, before the first RFQ goes out.",
      minutes: "9 min",
    },
    {
      href: "/cable-carrier-price",
      name: "Cable Carrier Price",
      summary:
        "The five variables that actually move cost per metre, which ones are worth arguing over, and why a cheaper metre can cost more over the life of the machine.",
      who: "Buyers holding two or more quotes that do not reconcile.",
      minutes: "7 min",
    },
  ],
  series: [
    { href: "/products/micro", label: "Micro series", note: "Inner height 10–15 mm" },
    { href: "/products/medium", label: "Medium series", note: "General machine duty" },
    { href: "/products/heavy", label: "Heavy duty", note: "Long unsupported spans" },
    { href: "/products/silent", label: "Silent / high speed", note: "Low-noise, high-cycle" },
    { href: "/products/portable", label: "Portable", note: "Hand-held and mobile" },
    { href: "/products/cleanroom", label: "Cleanroom", note: "WWC15–WWC35 only" },
  ],
  posts: [
    {
      href: "/blog/cable-carrier-selection-8-steps",
      label: "Cable carrier selection in eight steps",
    },
    {
      href: "/blog/cable-carrier-length-calculation",
      label: "How to calculate chain length from stroke",
    },
    {
      href: "/blog/linear-module-cable-carrier",
      label: "Sizing a carrier for a linear module",
    },
  ],
  faq: [
    {
      q: "I only have the machine drawing — where do I start?",
      a: "Start with Stage 1. Pull the stroke, the travel speed and the cable bundle diameter off the drawing. With those three numbers the inner height and bend radius are already constrained, and only the inner width is still open. If the drawing also shows another brand's part number, go to Stage 2 instead and compare the four key dimensions.",
    },
    {
      q: "Do these guides only apply if I buy from CNWSL?",
      a: "No. The dimensioning rules, the cost drivers and the supplier checks in these pages are general to plastic cable carriers, and several of them are written to help you reject a bad supplier — including us, if we fail a check. The only parts that are specific to us are where our own series and certificates are named.",
    },
    {
      q: "Which guide covers cleanroom applications?",
      a: "None of the five is cleanroom-specific; cleanroom is a material and emission question rather than a sizing one. The relevant facts are on the cleanroom series page: only WWC15, WWC18, WWC22, WWC28 and WWC35 exist, and the Fraunhofer IPA report ZH 2608-1800 covers the white WWC28 only, tested to ISO Class 1 at 0.5, 1.0 and 2.0 m/s. It is a single-specimen particle emission test, not a certification of your line.",
    },
  ],
  image: IMG.carrier,
  imageAlt: "Plastic cable carrier on a machine tool axis",
  ctaTitle: "Not sure which stage you are in?",
  ctaBody:
    "Send the drawing or a photo of the existing chain. We will tell you which of the five guides applies and what is still missing before a model can be quoted.",
};

/** hub 自身也进 sitemap，与 5 个 spoke 同批登记。 */
export const EN_HUB_SLUG = EN_GUIDES_HUB.slug;
