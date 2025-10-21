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
      // English variants
      "en-US", // English (United States)
      "en-GB", // English (United Kingdom)
      "en-CA", // English (Canada)
      "en-AU", // English (Australia)
      "en-NZ", // English (New Zealand)
      "en-IE", // English (Ireland)
      "en-ZA", // English (South Africa)
      "en-IN", // English (India)
      "en-SG", // English (Singapore)
      
      // Spanish variants
      "es-ES", // Spanish (Spain)
      "es-MX", // Spanish (Mexico)
      "es-AR", // Spanish (Argentina)
      "es-CO", // Spanish (Colombia)
      "es-CL", // Spanish (Chile)
      "es-PE", // Spanish (Peru)
      "es-VE", // Spanish (Venezuela)
      "es-EC", // Spanish (Ecuador)
      "es-GT", // Spanish (Guatemala)
      "es-CU", // Spanish (Cuba)
      "es-BO", // Spanish (Bolivia)
      "es-DO", // Spanish (Dominican Republic)
      "es-HN", // Spanish (Honduras)
      "es-PY", // Spanish (Paraguay)
      "es-SV", // Spanish (El Salvador)
      "es-NI", // Spanish (Nicaragua)
      "es-CR", // Spanish (Costa Rica)
      "es-PA", // Spanish (Panama)
      "es-UY", // Spanish (Uruguay)
      
      // French variants
      "fr-FR", // French (France)
      "fr-CA", // French (Canada)
      "fr-BE", // French (Belgium)
      "fr-CH", // French (Switzerland)
      "fr-LU", // French (Luxembourg)
      
      // German variants
      "de-DE", // German (Germany)
      "de-AT", // German (Austria)
      "de-CH", // German (Switzerland)
      "de-LU", // German (Luxembourg)
      "de-LI", // German (Liechtenstein)
      
      // Portuguese variants
      "pt-BR", // Portuguese (Brazil)
      "pt-PT", // Portuguese (Portugal)
      "pt-AO", // Portuguese (Angola)
      "pt-MZ", // Portuguese (Mozambique)
      
      // Italian variants
      "it-IT", // Italian (Italy)
      "it-CH", // Italian (Switzerland)
      
      // Dutch variants
      "nl-NL", // Dutch (Netherlands)
      "nl-BE", // Dutch (Belgium)
      
      // Nordic languages
      "sv-SE", // Swedish (Sweden)
      "sv-FI", // Swedish (Finland)
      "da-DK", // Danish (Denmark)
      "fi-FI", // Finnish (Finland)
      "no-NO", // Norwegian (Norway)
      "nb-NO", // Norwegian Bokmål (Norway)
      "nn-NO", // Norwegian Nynorsk (Norway)
      "is-IS", // Icelandic (Iceland)
      
      // Slavic languages
      "pl-PL", // Polish (Poland)
      "ru-RU", // Russian (Russia)
      "uk-UA", // Ukrainian (Ukraine)
      "cs-CZ", // Czech (Czech Republic)
      "sk-SK", // Slovak (Slovakia)
      "bg-BG", // Bulgarian (Bulgaria)
      "hr-HR", // Croatian (Croatia)
      "sr-RS", // Serbian (Serbia)
      "sl-SI", // Slovenian (Slovenia)
      "mk-MK", // Macedonian (North Macedonia)
      "be-BY", // Belarusian (Belarus)
      
      // Baltic languages
      "et-EE", // Estonian (Estonia)
      "lv-LV", // Latvian (Latvia)
      "lt-LT", // Lithuanian (Lithuania)
      
      // Asian languages
      "ja-JP", // Japanese (Japan)
      "ko-KR", // Korean (South Korea)
      "zh-CN", // Chinese Simplified (China)
      "zh-TW", // Chinese Traditional (Taiwan)
      "zh-HK", // Chinese Traditional (Hong Kong)
      "zh-SG", // Chinese Simplified (Singapore)
      "hi-IN", // Hindi (India)
      "th-TH", // Thai (Thailand)
      "vi-VN", // Vietnamese (Vietnam)
      "id-ID", // Indonesian (Indonesia)
      "ms-MY", // Malay (Malaysia)
      "tl-PH", // Tagalog (Philippines)
      "bn-BD", // Bengali (Bangladesh)
      "ta-IN", // Tamil (India)
      "te-IN", // Telugu (India)
      "mr-IN", // Marathi (India)
      "ur-PK", // Urdu (Pakistan)
      "km-KH", // Khmer (Cambodia)
      "lo-LA", // Lao (Laos)
      "my-MM", // Burmese (Myanmar)
      "ne-NP", // Nepali (Nepal)
      "si-LK", // Sinhala (Sri Lanka)
      
      // Middle Eastern & Central Asian
      "ar-SA", // Arabic (Saudi Arabia)
      "ar-AE", // Arabic (United Arab Emirates)
      "ar-EG", // Arabic (Egypt)
      "ar-MA", // Arabic (Morocco)
      "ar-DZ", // Arabic (Algeria)
      "ar-TN", // Arabic (Tunisia)
      "ar-LY", // Arabic (Libya)
      "ar-JO", // Arabic (Jordan)
      "ar-IQ", // Arabic (Iraq)
      "ar-KW", // Arabic (Kuwait)
      "ar-BH", // Arabic (Bahrain)
      "ar-QA", // Arabic (Qatar)
      "ar-OM", // Arabic (Oman)
      "ar-YE", // Arabic (Yemen)
      "ar-SY", // Arabic (Syria)
      "ar-LB", // Arabic (Lebanon)
      "ar-PS", // Arabic (Palestine)
      "he-IL", // Hebrew (Israel)
      "tr-TR", // Turkish (Turkey)
      "fa-IR", // Persian (Iran)
      "az-AZ", // Azerbaijani (Azerbaijan)
      "ka-GE", // Georgian (Georgia)
      "hy-AM", // Armenian (Armenia)
      "kk-KZ", // Kazakh (Kazakhstan)
      "uz-UZ", // Uzbek (Uzbekistan)
      
      // African languages
      "sw-KE", // Swahili (Kenya)
      "sw-TZ", // Swahili (Tanzania)
      "am-ET", // Amharic (Ethiopia)
      "ha-NG", // Hausa (Nigeria)
      "yo-NG", // Yoruba (Nigeria)
      "ig-NG", // Igbo (Nigeria)
      "zu-ZA", // Zulu (South Africa)
      "af-ZA", // Afrikaans (South Africa)
      
      // Other European languages
      "el-GR", // Greek (Greece)
      "el-CY", // Greek (Cyprus)
      "ro-RO", // Romanian (Romania)
      "hu-HU", // Hungarian (Hungary)
      "sq-AL", // Albanian (Albania)
      "mt-MT", // Maltese (Malta)
      "ga-IE", // Irish (Ireland)
      "cy-GB", // Welsh (United Kingdom)
      "eu-ES", // Basque (Spain)
      "ca-ES", // Catalan (Spain)
      "gl-ES", // Galician (Spain)
      
      // Constructed/Special
      "eo", // Esperanto
    ],
    defaultLocale: "en-US",
  },
};

export default nextConfig;
