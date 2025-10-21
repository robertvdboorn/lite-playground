import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      /*
      // Uniform assets
      { protocol: "https", hostname: "*.uniform.global" },

      // Cloudinary
      // Note: you can restrict to your cloud name in pathname if you want
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },

      // Shopify CDN
      { protocol: "https", hostname: "cdn.shopify.com", pathname: "/**" },

      // Contentful images
      { protocol: "https", hostname: "images.ctfassets.net", pathname: "/**" },

      // Bynder (standard CDN domains)
      { protocol: "https", hostname: "bynder.com", pathname: "/**" }, // top-level
      { protocol: "https", hostname: "*.bynder.com", pathname: "/**" }, // your tenant subdomain(s)
      { protocol: "https", hostname: "cdn.bynder.io", pathname: "/**" },

      // Scaleflex / Filerobot
      { protocol: "https", hostname: "*.scaleflexcdn.net", pathname: "/**" },
      { protocol: "https", hostname: "cdn.filerobot.com", pathname: "/**" },
      */
    ],
  },
  i18n: {
    locales: [
      // English variants (9) - Major markets
      "en-US", // English (United States)
      "en-GB", // English (United Kingdom)
      "en-CA", // English (Canada)
      "en-AU", // English (Australia)
      "en-NZ", // English (New Zealand)
      "en-IE", // English (Ireland)
      "en-ZA", // English (South Africa)
      "en-IN", // English (India)
      "en-SG", // English (Singapore)
      
      // Spanish variants (12) - Major markets
      "es-ES", // Spanish (Spain)
      "es-MX", // Spanish (Mexico)
      "es-AR", // Spanish (Argentina)
      "es-CO", // Spanish (Colombia)
      "es-CL", // Spanish (Chile)
      "es-PE", // Spanish (Peru)
      "es-VE", // Spanish (Venezuela)
      "es-EC", // Spanish (Ecuador)
      "es-CR", // Spanish (Costa Rica)
      "es-PA", // Spanish (Panama)
      "es-UY", // Spanish (Uruguay)
      "es-DO", // Spanish (Dominican Republic)
      
      // French variants (5)
      "fr-FR", // French (France)
      "fr-CA", // French (Canada)
      "fr-BE", // French (Belgium)
      "fr-CH", // French (Switzerland)
      "fr-LU", // French (Luxembourg)
      
      // German variants (5)
      "de-DE", // German (Germany)
      "de-AT", // German (Austria)
      "de-CH", // German (Switzerland)
      "de-LU", // German (Luxembourg)
      "de-LI", // German (Liechtenstein)
      
      // Portuguese variants (4)
      "pt-BR", // Portuguese (Brazil)
      "pt-PT", // Portuguese (Portugal)
      "pt-AO", // Portuguese (Angola)
      "pt-MZ", // Portuguese (Mozambique)
      
      // Italian variants (2)
      "it-IT", // Italian (Italy)
      "it-CH", // Italian (Switzerland)
      
      // Dutch variants (2)
      "nl-NL", // Dutch (Netherlands)
      "nl-BE", // Dutch (Belgium)
      
      // Nordic languages (8)
      "sv-SE", // Swedish (Sweden)
      "sv-FI", // Swedish (Finland)
      "da-DK", // Danish (Denmark)
      "fi-FI", // Finnish (Finland)
      "no-NO", // Norwegian (Norway)
      "nb-NO", // Norwegian Bokmål (Norway)
      "nn-NO", // Norwegian Nynorsk (Norway)
      "is-IS", // Icelandic (Iceland)
      
      // Slavic languages (10)
      "pl-PL", // Polish (Poland)
      "ru-RU", // Russian (Russia)
      "uk-UA", // Ukrainian (Ukraine)
      "cs-CZ", // Czech (Czech Republic)
      "sk-SK", // Slovak (Slovakia)
      "bg-BG", // Bulgarian (Bulgaria)
      "hr-HR", // Croatian (Croatia)
      "sr-RS", // Serbian (Serbia)
      "sl-SI", // Slovenian (Slovenia)
      "be-BY", // Belarusian (Belarus)
      
      // Baltic languages (3)
      "et-EE", // Estonian (Estonia)
      "lv-LV", // Latvian (Latvia)
      "lt-LT", // Lithuanian (Lithuania)
      
      // Asian languages (15) - Major markets
      "ja-JP", // Japanese (Japan)
      "ko-KR", // Korean (South Korea)
      "zh-CN", // Chinese Simplified (China)
      "zh-TW", // Chinese Traditional (Taiwan)
      "zh-HK", // Chinese Traditional (Hong Kong)
      "hi-IN", // Hindi (India)
      "th-TH", // Thai (Thailand)
      "vi-VN", // Vietnamese (Vietnam)
      "id-ID", // Indonesian (Indonesia)
      "ms-MY", // Malay (Malaysia)
      "tl-PH", // Tagalog (Philippines)
      "bn-BD", // Bengali (Bangladesh)
      "ta-IN", // Tamil (India)
      "ur-PK", // Urdu (Pakistan)
      "km-KH", // Khmer (Cambodia)
      
      // Middle Eastern & Central Asian (10) - Major markets
      "ar-SA", // Arabic (Saudi Arabia)
      "ar-AE", // Arabic (United Arab Emirates)
      "ar-EG", // Arabic (Egypt)
      "ar-MA", // Arabic (Morocco)
      "ar-JO", // Arabic (Jordan)
      "ar-KW", // Arabic (Kuwait)
      "ar-QA", // Arabic (Qatar)
      "he-IL", // Hebrew (Israel)
      "tr-TR", // Turkish (Turkey)
      "fa-IR", // Persian (Iran)
      
      // Other European languages (7)
      "el-GR", // Greek (Greece)
      "ro-RO", // Romanian (Romania)
      "hu-HU", // Hungarian (Hungary)
      "ca-ES", // Catalan (Spain)
      "eu-ES", // Basque (Spain)
      "ga-IE", // Irish (Ireland)
      "cy-GB", // Welsh (United Kingdom)
    ],
    defaultLocale: "en-US",
  },
};

export default nextConfig;
