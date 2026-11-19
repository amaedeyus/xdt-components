export interface ThemeInfo {
  id: string;
  name: string;
  category: string;
  description: string;
  font: string;
  accent: string;
  surface: string;
  cssTokens: string;
}

export const THEMES: ThemeInfo[] = [
  {
    id: 'claymorphism',
    name: 'Claymorphism',
    category: 'Skeuomorphic & 3D',
    description: 'Soft pastel inflated 3D surfaces, thick inner top-left highlights, deep outer drop shadows, plump rounded corners (24px)',
    font: 'Quicksand',
    accent: '#7467EE',
    surface: '#E8EEF5',
    cssTokens: `/* Claymorphism Theme Tokens */
[data-theme="claymorphism"] {
  --theme-id: "claymorphism";
  --theme-name: "Claymorphism";
  --theme-font: 'Quicksand', -apple-system, sans-serif;
  --theme-bg: #E3EAF3;
  --theme-surface: #E8EEF5;
  --theme-surface-alt: #DEE7F0;
  --theme-text: #2D3748;
  --theme-text-muted: #627288;
  --theme-radius: 24px;
  --theme-radius-sm: 14px;
  --theme-radius-lg: 32px;
  --theme-border-width: 0px;
  --theme-shadow-surface: 9px 9px 18px rgba(166, 180, 200, 0.65), -9px -9px 18px rgba(255, 255, 255, 0.95), inset 3px 3px 6px rgba(255, 255, 255, 0.8), inset -3px -3px 6px rgba(166, 180, 200, 0.3);
  --theme-primary-bg: #7467EE;
  --theme-primary-text: #FFFFFF;
  --theme-primary-shadow: 6px 6px 14px rgba(116, 103, 238, 0.4), -3px -3px 8px rgba(255, 255, 255, 0.8), inset 3px 3px 6px rgba(255, 255, 255, 0.5), inset -3px -3px 6px rgba(50, 40, 150, 0.3);
  --theme-secondary-bg: #E8EEF5;
  --theme-secondary-text: #394455;
  --theme-outline-border: 2px solid #7467EE;
  --theme-outline-text: #5B4ED4;
  --theme-input-bg: #E3EAF3;
  --theme-input-text: #2D3748;
  --theme-input-shadow: inset 4px 4px 8px rgba(166, 180, 200, 0.6), inset -4px -4px 8px rgba(255, 255, 255, 0.95);
  --theme-accent: #7467EE;
}`,
  },
  {
    id: 'retro-web',
    name: 'Retro-Web',
    category: 'Retro & Nostalgia',
    description: 'Early 2000s Webcore / Win98 system UI: #C0C0C0 silver surfaces, #000080 navy headers, 2px outset/inset beveled borders, crisp 0px corners',
    font: 'Tahoma / MS Sans Serif',
    accent: '#000080',
    surface: '#C0C0C0',
    cssTokens: `/* Retro-Web Theme Tokens */
[data-theme="retro-web"] {
  --theme-id: "retro-web";
  --theme-name: "Retro-Web";
  --theme-font: 'Tahoma', 'MS Sans Serif', sans-serif;
  --theme-bg: #008080;
  --theme-surface: #C0C0C0;
  --theme-surface-alt: #DFDFDF;
  --theme-text: #000000;
  --theme-text-muted: #4A4A4A;
  --theme-radius: 0px;
  --theme-radius-sm: 0px;
  --theme-radius-lg: 0px;
  --theme-border-width: 2px;
  --theme-border-style: solid;
  --theme-border: #808080;
  --theme-shadow-surface: inset 1px 1px 0px #FFFFFF, inset -1px -1px 0px #000000, inset 2px 2px 0px #DFDFDF, inset -2px -2px 0px #808080, 2px 2px 0px #000000;
  --theme-primary-bg: #C0C0C0;
  --theme-primary-text: #000000;
  --theme-primary-shadow: inset 1px 1px 0px #FFFFFF, inset -1px -1px 0px #000000, inset 2px 2px 0px #DFDFDF, inset -2px -2px 0px #808080, 0 0 0 1px #000080;
  --theme-secondary-bg: #C0C0C0;
  --theme-secondary-text: #000000;
  --theme-outline-border: 2px solid #000080;
  --theme-outline-text: #000080;
  --theme-input-bg: #FFFFFF;
  --theme-input-text: #000000;
  --theme-input-shadow: inset 1px 1px 0px #000000, inset -1px -1px 0px #FFFFFF, inset 2px 2px 0px #808080, inset -2px -2px 0px #DFDFDF;
  --theme-accent: #000080;
}`,
  },
  {
    id: 'gzhel',
    name: 'Gzhel',
    category: 'Cultural & Artisan',
    description: 'Traditional Russian cobalt-blue (#0038A8) and crisp porcelain white (#FFFFFF), delicate floral/porcelain border motifs, high-contrast ceramic gloss feel',
    font: 'Cormorant Garamond',
    accent: '#0038A8',
    surface: '#FFFFFF',
    cssTokens: `/* Gzhel Theme Tokens */
[data-theme="gzhel"] {
  --theme-id: "gzhel";
  --theme-name: "Gzhel";
  --theme-font: 'Cormorant Garamond', serif;
  --theme-bg: #F0F4FA;
  --theme-surface: #FFFFFF;
  --theme-surface-alt: #F4F8FD;
  --theme-text: #002266;
  --theme-text-muted: #4B6B9B;
  --theme-radius: 8px;
  --theme-radius-sm: 4px;
  --theme-radius-lg: 14px;
  --theme-border-width: 2px;
  --theme-border-style: solid;
  --theme-border: #0038A8;
  --theme-shadow-surface: 0 4px 20px rgba(0, 56, 168, 0.1), 0 0 0 1px #0038A8, inset 0 1px 2px rgba(255, 255, 255, 0.9);
  --theme-primary-bg: #0038A8;
  --theme-primary-text: #FFFFFF;
  --theme-primary-shadow: 0 4px 14px rgba(0, 56, 168, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4);
  --theme-secondary-bg: #FFFFFF;
  --theme-secondary-text: #0038A8;
  --theme-outline-border: 2px solid #0038A8;
  --theme-outline-text: #0038A8;
  --theme-input-bg: #FFFFFF;
  --theme-input-text: #002266;
  --theme-input-border: 1.5px solid #0038A8;
  --theme-accent: #0038A8;
}`,
  },
  {
    id: 'japanese-matchbox',
    name: 'Japanese Matchbox',
    category: 'Cultural & Vintage Print',
    description: 'Vintage Showa-era Japanese matchbox label aesthetic: warm aged cream paper (#F4ECD8), faded vermilion red (#C83E37), indigo ink (#1D2951), bold woodblock stamp borders',
    font: 'Shippori Mincho',
    accent: '#C83E37',
    surface: '#F4ECD8',
    cssTokens: `/* Japanese Matchbox Theme Tokens */
[data-theme="japanese-matchbox"] {
  --theme-id: "japanese-matchbox";
  --theme-name: "Japanese Matchbox";
  --theme-font: 'Shippori Mincho', serif;
  --theme-bg: #EFE4CC;
  --theme-surface: #F4ECD8;
  --theme-surface-alt: #E8DDBC;
  --theme-text: #1D2951;
  --theme-text-muted: #535F7E;
  --theme-radius: 3px;
  --theme-radius-sm: 2px;
  --theme-radius-lg: 4px;
  --theme-border-width: 2.5px;
  --theme-border-style: solid;
  --theme-border: #1D2951;
  --theme-shadow-surface: 4px 4px 0px #1D2951;
  --theme-primary-bg: #C83E37;
  --theme-primary-text: #F4ECD8;
  --theme-primary-shadow: 3px 3px 0px #1D2951;
  --theme-secondary-bg: #1D2951;
  --theme-secondary-text: #F4ECD8;
  --theme-outline-border: 2.5px solid #1D2951;
  --theme-outline-text: #1D2951;
  --theme-input-bg: #FAF5E8;
  --theme-input-text: #1D2951;
  --theme-accent: #C83E37;
}`,
  },
  {
    id: 'dirty-gradients',
    name: 'Dirty Gradients',
    category: 'Experimental & Acid',
    description: 'Acidic, muddy-neon mesh blends (chartreuse, bruised plum, burnt rust, slate) with subtle film grain noise overlay and sharp dark framing',
    font: 'Syne',
    accent: '#BFFF04',
    surface: '#171821',
    cssTokens: `/* Dirty Gradients Theme Tokens */
[data-theme="dirty-gradients"] {
  --theme-id: "dirty-gradients";
  --theme-name: "Dirty Gradients";
  --theme-font: 'Syne', sans-serif;
  --theme-bg: #0C0D11;
  --theme-surface: #171821;
  --theme-surface-alt: #1F202C;
  --theme-text: #F1F4F9;
  --theme-text-muted: #8F94A6;
  --theme-radius: 6px;
  --theme-radius-sm: 3px;
  --theme-radius-lg: 10px;
  --theme-border-width: 1px;
  --theme-border-style: solid;
  --theme-border: rgba(191, 255, 4, 0.25);
  --theme-shadow-surface: 0 10px 30px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(191, 255, 4, 0.2), inset 0 0 20px rgba(61, 30, 74, 0.4);
  --theme-primary-bg: #BFFF04;
  --theme-primary-text: #0D0E12;
  --theme-primary-shadow: 0 4px 20px rgba(191, 255, 4, 0.35);
  --theme-secondary-bg: #3D1E4A;
  --theme-secondary-text: #E5E7EB;
  --theme-accent: #BFFF04;
}`,
  },
  {
    id: 'angelcore',
    name: 'Angelcore',
    category: 'Ethereal & Classical',
    description: 'Heavenly ivory, pearl white, pale gold (#D4AF37), soft cloud-like diffuse glow shadows, delicate serif display accents, airy light surfaces',
    font: 'Cinzel',
    accent: '#D4AF37',
    surface: '#FFFFFF',
    cssTokens: `/* Angelcore Theme Tokens */
[data-theme="angelcore"] {
  --theme-id: "angelcore";
  --theme-name: "Angelcore";
  --theme-font: 'Cinzel', serif;
  --theme-bg: #FAF7F2;
  --theme-surface: #FFFFFF;
  --theme-surface-alt: #FDFBF8;
  --theme-text: #393226;
  --theme-text-muted: #7E725F;
  --theme-radius: 16px;
  --theme-radius-sm: 10px;
  --theme-radius-lg: 24px;
  --theme-border-width: 1px;
  --theme-border-style: solid;
  --theme-border: rgba(212, 175, 55, 0.4);
  --theme-shadow-surface: 0 10px 30px rgba(212, 175, 55, 0.12), 0 2px 8px rgba(0, 0, 0, 0.03);
  --theme-primary-bg: #D4AF37;
  --theme-primary-text: #2C2106;
  --theme-primary-shadow: 0 4px 18px rgba(212, 175, 55, 0.4);
  --theme-secondary-bg: #FFFFFF;
  --theme-secondary-text: #6B5318;
  --theme-accent: #D4AF37;
}`,
  },
  {
    id: 'frutiger-aero',
    name: 'Frutiger Aero',
    category: 'Glossy & Skeuomorphic',
    description: 'Mid-2000s glossy humanism: aqua blue (#00A8E8), lime grass green (#7ED957), translucent glass panels, specular top-half gloss highlights',
    font: 'Inter',
    accent: '#00A8E8',
    surface: '#FFFFFF',
    cssTokens: `/* Frutiger Aero Theme Tokens */
[data-theme="frutiger-aero"] {
  --theme-id: "frutiger-aero";
  --theme-name: "Frutiger Aero";
  --theme-font: 'Inter', sans-serif;
  --theme-bg: #E3F2FD;
  --theme-surface: rgba(255, 255, 255, 0.85);
  --theme-surface-alt: #E8F5E9;
  --theme-text: #0D2D44;
  --theme-text-muted: #4B6E86;
  --theme-radius: 14px;
  --theme-radius-sm: 8px;
  --theme-radius-lg: 20px;
  --theme-border-width: 1px;
  --theme-border: rgba(255, 255, 255, 0.8);
  --theme-shadow-surface: 0 10px 25px rgba(0, 168, 232, 0.18), inset 0 1px 2px rgba(255, 255, 255, 0.95);
  --theme-primary-bg: linear-gradient(180deg, #42D2FD 0%, #00A8E8 49%, #0087C2 50%, #029DE0 100%);
  --theme-primary-text: #FFFFFF;
  --theme-primary-shadow: 0 4px 14px rgba(0, 168, 232, 0.45);
  --theme-secondary-bg: linear-gradient(180deg, #99E57A 0%, #7ED957 49%, #68C440 50%, #75D44C 100%);
  --theme-secondary-text: #0E3B09;
  --theme-accent: #00A8E8;
}`,
  },
  {
    id: 'aurora',
    name: 'Aurora',
    category: 'Dark & Luminescent',
    description: 'Deep obsidian night base (#090D16) illuminated by diffused emerald, teal, and violet northern-lights luminescence and subtle glowing edges',
    font: 'Outfit',
    accent: '#00F2FE',
    surface: '#0E1322',
    cssTokens: `/* Aurora Theme Tokens */
[data-theme="aurora"] {
  --theme-id: "aurora";
  --theme-name: "Aurora";
  --theme-font: 'Outfit', sans-serif;
  --theme-bg: #07090F;
  --theme-surface: #0E1322;
  --theme-surface-alt: #141B30;
  --theme-text: #EEF3FA;
  --theme-text-muted: #8493B0;
  --theme-radius: 10px;
  --theme-radius-sm: 6px;
  --theme-border-width: 1px;
  --theme-border: rgba(0, 242, 254, 0.3);
  --theme-shadow-surface: 0 10px 32px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 242, 254, 0.15), 0 0 40px rgba(123, 97, 255, 0.12);
  --theme-primary-bg: linear-gradient(135deg, #00F2FE 0%, #4FACFE 50%, #7B61FF 100%);
  --theme-primary-text: #050811;
  --theme-primary-shadow: 0 4px 20px rgba(0, 242, 254, 0.4), 0 0 15px rgba(123, 97, 255, 0.3);
  --theme-secondary-bg: #141B30;
  --theme-secondary-text: #00F2FE;
  --theme-accent: #00F2FE;
}`,
  },
  {
    id: 'bauhaus',
    name: 'Bauhaus',
    category: 'Modernist & Constructivist',
    description: 'Primary red (#E63946), cobalt blue (#1D3557), cadmium yellow (#FFB703), stark off-white, 0px geometric corners, heavy black structural lines (3px solid #111)',
    font: 'Space Grotesk',
    accent: '#E63946',
    surface: '#FFFFFF',
    cssTokens: `/* Bauhaus Theme Tokens */
[data-theme="bauhaus"] {
  --theme-id: "bauhaus";
  --theme-name: "Bauhaus";
  --theme-font: 'Space Grotesk', sans-serif;
  --theme-bg: #EAE6DF;
  --theme-surface: #FFFFFF;
  --theme-surface-alt: #F7F5F0;
  --theme-text: #111111;
  --theme-text-muted: #4B4B4B;
  --theme-radius: 0px;
  --theme-border-width: 3px;
  --theme-border-style: solid;
  --theme-border: #111111;
  --theme-shadow-surface: 5px 5px 0px #111111;
  --theme-primary-bg: #E63946;
  --theme-primary-text: #FFFFFF;
  --theme-primary-shadow: 4px 4px 0px #111111;
  --theme-secondary-bg: #FFB703;
  --theme-secondary-text: #111111;
  --theme-accent: #1D3557;
}`,
  },
  {
    id: 'baroque',
    name: 'Baroque',
    category: 'Classical & Dramatic',
    description: 'Dramatic chiaroscuro: deep velvet burgundy/obsidian background, antique gilded gold (#C5A059) double-line ornate borders, high-contrast typography',
    font: 'Playfair Display',
    accent: '#C5A059',
    surface: '#1C0C13',
    cssTokens: `/* Baroque Theme Tokens */
[data-theme="baroque"] {
  --theme-id: "baroque";
  --theme-name: "Baroque";
  --theme-font: 'Playfair Display', serif;
  --theme-bg: #100609;
  --theme-surface: #1C0C13;
  --theme-surface-alt: #27121C;
  --theme-text: #F7EFE2;
  --theme-text-muted: #A38B75;
  --theme-radius: 4px;
  --theme-border-width: 1.5px;
  --theme-border: #C5A059;
  --theme-shadow-surface: 0 12px 36px rgba(0, 0, 0, 0.9), 0 0 18px rgba(197, 160, 89, 0.2);
  --theme-primary-bg: linear-gradient(135deg, #E6CA8F 0%, #C5A059 50%, #9F7B34 100%);
  --theme-primary-text: #17080E;
  --theme-primary-shadow: 0 4px 18px rgba(197, 160, 89, 0.45);
  --theme-secondary-bg: #2B131E;
  --theme-secondary-text: #E8D3A7;
  --theme-accent: #C5A059;
}`,
  },
  {
    id: 'biomorphic',
    name: 'Biomorphic',
    category: 'Organic & Fluid',
    description: 'Organic, cellular, fluid asymmetry: earthy sage, terracotta (#D97757), and warm sand tones with uneven organic border-radii',
    font: 'Outfit',
    accent: '#D97757',
    surface: '#FAF5ED',
    cssTokens: `/* Biomorphic Theme Tokens */
[data-theme="biomorphic"] {
  --theme-id: "biomorphic";
  --theme-name: "Biomorphic";
  --theme-font: 'Outfit', sans-serif;
  --theme-bg: #EFE7DC;
  --theme-surface: #FAF5ED;
  --theme-surface-alt: #E8DED1;
  --theme-text: #2D261E;
  --theme-text-muted: #7A6F62;
  --theme-radius: 24px 18px 26px 20px;
  --theme-border-width: 1.5px;
  --theme-border: #D5C5B0;
  --theme-shadow-surface: 0 10px 28px rgba(140, 115, 90, 0.14);
  --theme-primary-bg: #D97757;
  --theme-primary-text: #FFFFFF;
  --theme-primary-shadow: 0 6px 18px rgba(217, 119, 87, 0.35);
  --theme-secondary-bg: #7A9A7B;
  --theme-secondary-text: #FFFFFF;
  --theme-accent: #D97757;
}`,
  },
  {
    id: '8bit',
    name: '8-Bit Arcade',
    category: 'Retro & Pixel',
    description: 'Retro arcade pixel art: stepped pixel borders (box-shadow pixel steps), high-contrast NES/SNES palette (#E70012), crisp 0px corners',
    font: 'VT323',
    accent: '#E70012',
    surface: '#181828',
    cssTokens: `/* 8-Bit Arcade Theme Tokens */
[data-theme="8bit"] {
  --theme-id: "8bit";
  --theme-name: "8-Bit Arcade";
  --theme-font: 'VT323', monospace;
  --theme-bg: #0C0C14;
  --theme-surface: #181828;
  --theme-surface-alt: #24243C;
  --theme-text: #FCFCFC;
  --theme-text-muted: #8C8CA8;
  --theme-radius: 0px;
  --theme-border-width: 3px;
  --theme-border: #FCFCFC;
  --theme-shadow-surface: 4px 4px 0px #000000, 4px 4px 0px 1px #FCFCFC;
  --theme-primary-bg: #E70012;
  --theme-primary-text: #FCFCFC;
  --theme-primary-shadow: 4px 4px 0px #000000;
  --theme-secondary-bg: #0078F8;
  --theme-secondary-text: #FCFCFC;
  --theme-accent: #E70012;
}`,
  },
  {
    id: 'bohemian',
    name: 'Bohemian',
    category: 'Artisan & Earthy',
    description: 'Warm terracotta (#C46D4E), mustard ochre, deep teal (#1B4965), and raw linen textures, dashed stitch-style borders',
    font: 'Cormorant Garamond',
    accent: '#C46D4E',
    surface: '#FCFAF7',
    cssTokens: `/* Bohemian Theme Tokens */
[data-theme="bohemian"] {
  --theme-id: "bohemian";
  --theme-name: "Bohemian";
  --theme-font: 'Cormorant Garamond', serif;
  --theme-bg: #F5EFEB;
  --theme-surface: #FCFAF7;
  --theme-surface-alt: #EFE4DC;
  --theme-text: #2D2118;
  --theme-text-muted: #7A6251;
  --theme-radius: 10px;
  --theme-border-width: 2px;
  --theme-border-style: dashed;
  --theme-border: #C46D4E;
  --theme-shadow-surface: 0 8px 24px rgba(196, 109, 78, 0.12);
  --theme-primary-bg: #C46D4E;
  --theme-primary-text: #FCFAF7;
  --theme-primary-shadow: 0 4px 14px rgba(196, 109, 78, 0.35);
  --theme-secondary-bg: #1B4965;
  --theme-secondary-text: #FCFAF7;
  --theme-accent: #C46D4E;
}`,
  },
  {
    id: 'brutalism',
    name: 'Brutalism',
    category: 'Neo-Brutalist',
    description: 'Raw industrial monochrome + electric lime (#D4FF00)/safety orange (#FF5500), 3px solid #000 borders, hard 4px 4px 0px #000 offset shadows',
    font: 'Space Grotesk',
    accent: '#FF5500',
    surface: '#FFFFFF',
    cssTokens: `/* Brutalism Theme Tokens */
[data-theme="brutalism"] {
  --theme-id: "brutalism";
  --theme-name: "Brutalism";
  --theme-font: 'Space Grotesk', sans-serif;
  --theme-bg: #EAEAEA;
  --theme-surface: #FFFFFF;
  --theme-surface-alt: #F2F2F2;
  --theme-text: #000000;
  --theme-text-muted: #333333;
  --theme-radius: 0px;
  --theme-border-width: 3px;
  --theme-border-style: solid;
  --theme-border: #000000;
  --theme-shadow-surface: 5px 5px 0px #000000;
  --theme-primary-bg: #D4FF00;
  --theme-primary-text: #000000;
  --theme-primary-shadow: 4px 4px 0px #000000;
  --theme-secondary-bg: #FF5500;
  --theme-secondary-text: #FFFFFF;
  --theme-accent: #FF5500;
}`,
  },
  {
    id: 'conceptual-sketch',
    name: 'Conceptual Sketch',
    category: 'Handcrafted & Paper',
    description: 'Hand-drawn doodle art on graph/sketchbook paper: #FAF9F6 paper background, #1A1A1A ink strokes, uneven hand-drawn border radii, subtle pencil-hatch shadows',
    font: 'Caveat',
    accent: '#1A1A1A',
    surface: '#FAF9F6',
    cssTokens: `/* Conceptual Sketch Theme Tokens */
[data-theme="conceptual-sketch"] {
  --theme-id: "conceptual-sketch";
  --theme-name: "Conceptual Sketch";
  --theme-font: 'Caveat', cursive, sans-serif;
  --theme-bg: #F2EFE7;
  --theme-surface: #FAF9F6;
  --theme-surface-alt: #ECE7DA;
  --theme-text: #1A1A1A;
  --theme-text-muted: #595959;
  --theme-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
  --theme-border-width: 2px;
  --theme-border-style: solid;
  --theme-border: #1A1A1A;
  --theme-shadow-surface: 3px 4px 0px rgba(26, 26, 26, 0.5), 1px 1px 0px #1A1A1A;
  --theme-primary-bg: #1A1A1A;
  --theme-primary-text: #FAF9F6;
  --theme-primary-shadow: 3px 3px 0px rgba(26, 26, 26, 0.6);
  --theme-secondary-bg: #EAE6DB;
  --theme-secondary-text: #1A1A1A;
  --theme-accent: #1A1A1A;
}`,
  },
  {
    id: 'coquette',
    name: 'Coquette',
    category: 'Soft Aesthetic',
    description: 'Ballet slipper pink (#FADADD), cream lace white, cherry ribbon red (#B22222), scalloped/lace-inspired double borders, delicate micro-details',
    font: 'Playfair Display',
    accent: '#B22222',
    surface: '#FFFFFF',
    cssTokens: `/* Coquette Theme Tokens */
[data-theme="coquette"] {
  --theme-id: "coquette";
  --theme-name: "Coquette";
  --theme-font: 'Playfair Display', serif;
  --theme-bg: #FFF3F6;
  --theme-surface: #FFFFFF;
  --theme-surface-alt: #FEE8EE;
  --theme-text: #3D1F26;
  --theme-text-muted: #8E5A66;
  --theme-radius: 16px;
  --theme-border-width: 1.5px;
  --theme-border: #F5B8C5;
  --theme-shadow-surface: 0 10px 28px rgba(245, 184, 197, 0.35);
  --theme-primary-bg: #B22222;
  --theme-primary-text: #FFFFFF;
  --theme-primary-shadow: 0 4px 16px rgba(178, 34, 34, 0.35);
  --theme-secondary-bg: #FADADD;
  --theme-secondary-text: #B22222;
  --theme-accent: #B22222;
}`,
  },
  {
    id: 'ethereal',
    name: 'Ethereal',
    category: 'Luminescent & Soft',
    description: 'Iridescent pearl, pale lavender mist, silver-blue highlights, soft frosted translucency, whisper-thin luminous borders',
    font: 'Plus Jakarta Sans',
    accent: '#818CF8',
    surface: 'rgba(255, 255, 255, 0.88)',
    cssTokens: `/* Ethereal Theme Tokens */
[data-theme="ethereal"] {
  --theme-id: "ethereal";
  --theme-name: "Ethereal";
  --theme-font: 'Plus Jakarta Sans', sans-serif;
  --theme-bg: #F4F6FC;
  --theme-surface: rgba(255, 255, 255, 0.88);
  --theme-surface-alt: #EDF2FB;
  --theme-text: #232845;
  --theme-text-muted: #6B7299;
  --theme-radius: 14px;
  --theme-border-width: 1px;
  --theme-border: rgba(199, 210, 254, 0.65);
  --theme-shadow-surface: 0 10px 32px rgba(165, 180, 252, 0.18);
  --theme-primary-bg: linear-gradient(135deg, #B9C6FD 0%, #D8CEFE 50%, #E9D7FE 100%);
  --theme-primary-text: #202447;
  --theme-primary-shadow: 0 4px 18px rgba(199, 210, 254, 0.5);
  --theme-secondary-bg: #FFFFFF;
  --theme-secondary-text: #3730A3;
  --theme-accent: #818CF8;
}`,
  },
  {
    id: 'halftone',
    name: 'Halftone',
    category: 'Pop Art & Comic',
    description: 'Pop-art comic print: stark cyan, magenta (#EC008C), yellow, and black ink, Ben-Day halftone dot backgrounds, hard comic drop shadows',
    font: 'Syne',
    accent: '#EC008C',
    surface: '#FFFFFF',
    cssTokens: `/* Halftone Theme Tokens */
[data-theme="halftone"] {
  --theme-id: "halftone";
  --theme-name: "Halftone";
  --theme-font: 'Syne', sans-serif;
  --theme-bg: #FFFDF0;
  --theme-surface: #FFFFFF;
  --theme-surface-alt: #FFF4D0;
  --theme-text: #050505;
  --theme-text-muted: #3D3D3D;
  --theme-radius: 4px;
  --theme-border-width: 3px;
  --theme-border-style: solid;
  --theme-border: #050505;
  --theme-shadow-surface: 5px 5px 0px #050505;
  --theme-primary-bg: #EC008C;
  --theme-primary-text: #FFFFFF;
  --theme-primary-shadow: 4px 4px 0px #050505;
  --theme-secondary-bg: #00E5FF;
  --theme-secondary-text: #050505;
  --theme-accent: #EC008C;
}`,
  },
];
