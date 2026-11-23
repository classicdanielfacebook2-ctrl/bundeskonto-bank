const IBAN_COUNTRIES = {
  AD: ["Andorra", 24],
  AE: ["United Arab Emirates", 23],
  AL: ["Albania", 28],
  AT: ["Austria", 20],
  AZ: ["Azerbaijan", 28],
  BA: ["Bosnia and Herzegovina", 20],
  BE: ["Belgium", 16],
  BG: ["Bulgaria", 22],
  BH: ["Bahrain", 22],
  BR: ["Brazil", 29],
  BY: ["Belarus", 28],
  CH: ["Switzerland", 21],
  CR: ["Costa Rica", 22],
  CY: ["Cyprus", 28],
  CZ: ["Czechia", 24],
  DE: ["Germany", 22],
  DK: ["Denmark", 18],
  DO: ["Dominican Republic", 28],
  EE: ["Estonia", 20],
  EG: ["Egypt", 29],
  ES: ["Spain", 24],
  FI: ["Finland", 18],
  FO: ["Faroe Islands", 18],
  FR: ["France", 27],
  GB: ["United Kingdom", 22],
  GE: ["Georgia", 22],
  GI: ["Gibraltar", 23],
  GL: ["Greenland", 18],
  GR: ["Greece", 27],
  GT: ["Guatemala", 28],
  HR: ["Croatia", 21],
  HU: ["Hungary", 28],
  IE: ["Ireland", 22],
  IL: ["Israel", 23],
  IQ: ["Iraq", 23],
  IS: ["Iceland", 26],
  IT: ["Italy", 27],
  JO: ["Jordan", 30],
  KW: ["Kuwait", 30],
  KZ: ["Kazakhstan", 20],
  LB: ["Lebanon", 28],
  LC: ["Saint Lucia", 32],
  LI: ["Liechtenstein", 21],
  LT: ["Lithuania", 20],
  LU: ["Luxembourg", 20],
  LV: ["Latvia", 21],
  MC: ["Monaco", 27],
  MD: ["Moldova", 24],
  ME: ["Montenegro", 22],
  MK: ["North Macedonia", 19],
  MR: ["Mauritania", 27],
  MT: ["Malta", 31],
  MU: ["Mauritius", 30],
  NL: ["Netherlands", 18],
  NO: ["Norway", 15],
  PK: ["Pakistan", 24],
  PL: ["Poland", 28],
  PS: ["Palestine", 29],
  PT: ["Portugal", 25],
  QA: ["Qatar", 29],
  RO: ["Romania", 24],
  RS: ["Serbia", 22],
  SA: ["Saudi Arabia", 24],
  SC: ["Seychelles", 31],
  SE: ["Sweden", 24],
  SI: ["Slovenia", 19],
  SK: ["Slovakia", 24],
  SM: ["San Marino", 27],
  TN: ["Tunisia", 24],
  TR: ["Turkey", 26],
  UA: ["Ukraine", 29],
  VA: ["Vatican City", 22],
  VG: ["British Virgin Islands", 24],
  XK: ["Kosovo", 20]
};

const ADJECTIVES = {
  AD: "Andorran", AE: "Emirati", AL: "Albanian", AT: "Austrian", AZ: "Azerbaijani",
  BA: "Bosnian", BE: "Belgian", BG: "Bulgarian", BH: "Bahraini", BR: "Brazilian",
  BY: "Belarusian", CH: "Swiss", CR: "Costa Rican", CY: "Cypriot", CZ: "Czech",
  DE: "German", DK: "Danish", DO: "Dominican", EE: "Estonian", EG: "Egyptian",
  ES: "Spanish", FI: "Finnish", FO: "Faroese", FR: "French", GB: "British",
  GE: "Georgian", GI: "Gibraltar", GL: "Greenlandic", GR: "Greek", GT: "Guatemalan",
  HR: "Croatian", HU: "Hungarian", IE: "Irish", IL: "Israeli", IQ: "Iraqi",
  IS: "Icelandic", IT: "Italian", JO: "Jordanian", KW: "Kuwaiti", KZ: "Kazakh",
  LB: "Lebanese", LC: "Saint Lucian", LI: "Liechtenstein", LT: "Lithuanian",
  LU: "Luxembourg", LV: "Latvian", MC: "Monégasque", MD: "Moldovan", ME: "Montenegrin",
  MK: "Macedonian", MR: "Mauritanian", MT: "Maltese", MU: "Mauritian", NL: "Dutch",
  NO: "Norwegian", PK: "Pakistani", PL: "Polish", PS: "Palestinian", PT: "Portuguese",
  QA: "Qatari", RO: "Romanian", RS: "Serbian", SA: "Saudi", SC: "Seychellois",
  SE: "Swedish", SI: "Slovenian", SK: "Slovak", SM: "Sammarinese", TN: "Tunisian",
  TR: "Turkish", UA: "Ukrainian", VA: "Vatican", VG: "British Virgin Islands", XK: "Kosovar"
};

export function compactIban(value) {
  return String(value || "").replace(/[\s-]+/g, "").toUpperCase();
}

export function groupIban(value) {
  return compactIban(value).replace(/(.{4})/g, "$1 ").trim();
}

export function flagEmoji(code) {
  if (!/^[A-Z]{2}$/.test(code)) return "";
  return String.fromCodePoint(...[...code].map((char) => 127397 + char.charCodeAt(0)));
}

function mod97(value) {
  let remainder = 0;
  for (const char of value) {
    remainder = (remainder * 10 + Number(char)) % 97;
  }
  return remainder;
}

function checksumOk(iban) {
  const rearranged = iban.slice(4) + iban.slice(0, 4);
  const numeric = rearranged.replace(/[A-Z]/g, (char) => String(char.charCodeAt(0) - 55));
  return mod97(numeric) === 1;
}

export function validateIban(value) {
  const iban = compactIban(value);
  if (!iban) return { empty: true, valid: false, iban };
  if (!/^[A-Z0-9]+$/.test(iban)) {
    return { valid: false, iban, code: "chars", message: "IBAN can only contain letters and numbers." };
  }
  const country = iban.slice(0, 2);
  const known = IBAN_COUNTRIES[country];
  if (!/^[A-Z]{2}/.test(iban) || !known) {
    return { valid: false, iban, code: "country", message: "Unknown IBAN country code." };
  }
  const [name, length] = known;
  if (iban.length !== length) {
    const adjective = ADJECTIVES[country] || name;
    return {
      valid: false,
      iban,
      code: "length",
      country,
      name,
      length,
      message: `${adjective} IBANs have ${length} characters, you entered ${iban.length}.`
    };
  }
  if (!checksumOk(iban)) {
    return { valid: false, iban, code: "checksum", country, name, message: "Invalid IBAN checksum." };
  }
  return { valid: true, iban, country, name, flag: flagEmoji(country) };
}
