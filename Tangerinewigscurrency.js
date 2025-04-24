/*!
* SquareConvert - Squarespace Currency Converter Extension to add Multiple Currencies on your site
* Author: SQSPStater <waqas@sqspstarter.com>
* License: Commercial License
* Version: 1.2.1
* 03.12.2024
*/(function (g, j) { var b = function (a) { return new i(a) }; b.version = "0.1.3"; var c = g.fxSetup || { rates: {}, base: "" }; b.rates = c.rates; b.base = c.base; b.settings = { from: c.from || b.base, to: c.to || b.base }; var h = b.convert = function (a, e) { if ("object" === typeof a && a.length) { for (var d = 0; d < a.length; d++)a[d] = h(a[d], e); return a } e = e || {}; if (!e.from) e.from = b.settings.from; if (!e.to) e.to = b.settings.to; var d = e.to, c = e.from, f = b.rates; f[b.base] = 1; if (!f[d] || !f[c]) throw "fx error"; d = c === b.base ? f[d] : d === b.base ? 1 / f[c] : f[d] * (1 / f[c]); return a * d }, i = function (a) { "string" === typeof a ? (this._v = parseFloat(a.replace(/[^0-9-.]/g, "")), this._fx = a.replace(/([^A-Za-z])/g, "")) : this._v = a }, c = b.prototype = i.prototype; c.convert = function () { var a = Array.prototype.slice.call(arguments); a.unshift(this._v); return h.apply(b, a) }; c.from = function (a) { a = b(h(this._v, { from: a, to: b.base })); a._fx = b.base; return a }; c.to = function (a) { return h(this._v, { from: this._fx ? this._fx : b.settings.from, to: a }) }; if ("undefined" !== typeof exports) { if ("undefined" !== typeof module && module.exports) exports = module.exports = b; exports.fx = fx } else "function" === typeof define && define.amd ? define([], function () { return b }) : (b.noConflict = function (a) { return function () { g.fx = a; b.noConflict = j; return b } }(g.fx), g.fx = b) })(this);
(function (p, z) { function q(a) { return !!("" === a || a && a.charCodeAt && a.substr) } function m(a) { return u ? u(a) : "[object Array]" === v.call(a) } function r(a) { return "[object Object]" === v.call(a) } function s(a, b) { var d, a = a || {}, b = b || {}; for (d in b) b.hasOwnProperty(d) && null == a[d] && (a[d] = b[d]); return a } function j(a, b, d) { var c = [], e, h; if (!a) return c; if (w && a.map === w) return a.map(b, d); for (e = 0, h = a.length; e < h; e++)c[e] = b.call(d, a[e], e, a); return c } function n(a, b) { a = Math.round(Math.abs(a)); return isNaN(a) ? b : a } function x(a) { var b = c.settings.currency.format; "function" === typeof a && (a = a()); return q(a) && a.match("%v") ? { pos: a, neg: a.replace("-", "").replace("%v", "-%v"), zero: a } : !a || !a.pos || !a.pos.match("%v") ? !q(b) ? b : c.settings.currency.format = { pos: b, neg: b.replace("%v", "-%v"), zero: b } : a } var c = { version: "0.4.1", settings: { currency: { symbol: "$", format: "%s%v", decimal: ".", thousand: ",", precision: 2, grouping: 3 }, number: { precision: 0, grouping: 3, thousand: ",", decimal: "." } } }, w = Array.prototype.map, u = Array.isArray, v = Object.prototype.toString, o = c.unformat = c.parse = function (a, b) { if (m(a)) return j(a, function (a) { return o(a, b) }); a = a || 0; if ("number" === typeof a) return a; var b = b || ".", c = RegExp("[^0-9-" + b + "]", ["g"]), c = parseFloat(("" + a).replace(/\((.*)\)/, "-$1").replace(c, "").replace(b, ".")); return !isNaN(c) ? c : 0 }, y = c.toFixed = function (a, b) { var b = n(b, c.settings.number.precision), d = Math.pow(10, b); return (Math.round(c.unformat(a) * d) / d).toFixed(b) }, t = c.formatNumber = c.format = function (a, b, d, i) { if (m(a)) return j(a, function (a) { return t(a, b, d, i) }); var a = o(a), e = s(r(b) ? b : { precision: b, thousand: d, decimal: i }, c.settings.number), h = n(e.precision), f = 0 > a ? "-" : "", g = parseInt(y(Math.abs(a || 0), h), 10) + "", l = 3 < g.length ? g.length % 3 : 0; return f + (l ? g.substr(0, l) + e.thousand : "") + g.substr(l).replace(/(\d{3})(?=\d)/g, "$1" + e.thousand) + (h ? e.decimal + y(Math.abs(a), h).split(".")[1] : "") }, A = c.formatMoney = function (a, b, d, i, e, h) { if (m(a)) return j(a, function (a) { return A(a, b, d, i, e, h) }); var a = o(a), f = s(r(b) ? b : { symbol: b, precision: d, thousand: i, decimal: e, format: h }, c.settings.currency), g = x(f.format); return (0 < a ? g.pos : 0 > a ? g.neg : g.zero).replace("%s", f.symbol).replace("%v", t(Math.abs(a), n(f.precision), f.thousand, f.decimal)) }; c.formatColumn = function (a, b, d, i, e, h) { if (!a) return []; var f = s(r(b) ? b : { symbol: b, precision: d, thousand: i, decimal: e, format: h }, c.settings.currency), g = x(f.format), l = g.pos.indexOf("%s") < g.pos.indexOf("%v") ? !0 : !1, k = 0, a = j(a, function (a) { if (m(a)) return c.formatColumn(a, f); a = o(a); a = (0 < a ? g.pos : 0 > a ? g.neg : g.zero).replace("%s", f.symbol).replace("%v", t(Math.abs(a), n(f.precision), f.thousand, f.decimal)); if (a.length > k) k = a.length; return a }); return j(a, function (a) { return q(a) && a.length < k ? l ? a.replace(f.symbol, f.symbol + Array(k - a.length + 1).join(" ")) : Array(k - a.length + 1).join(" ") + a : a }) }; if ("undefined" !== typeof exports) { if ("undefined" !== typeof module && module.exports) exports = module.exports = c; exports.accounting = c } else "function" === typeof define && define.amd ? define([], function () { return c }) : (c.noConflict = function (a) { return function () { p.accounting = a; c.noConflict = z; return c } }(p.accounting), p.accounting = c) })(this);
/**/
var CountryCurrCode = {
  AD: { countryName: "Andorra", currency: "EUR", thousand: ".", decimal: "," },
  AE: { countryName: "United Arab Emirates", currency: "AED", thousand: ",", decimal: "." },
  AF: { countryName: "Afghanistan", currency: "AFN", thousand: ",", decimal: "." },
  AG: { countryName: "Antigua and Barbuda", currency: "XCD", thousand: ",", decimal: "." },
  AI: { countryName: "Anguilla", currency: "XCD", thousand: ",", decimal: "." },
  AL: { countryName: "Albania", currency: "ALL", thousand: ".", decimal: "," },
  AM: { countryName: "Armenia", currency: "AMD", thousand: ".", decimal: "," },
  AO: { countryName: "Angola", currency: "AOA", thousand: ".", decimal: "," },
  AQ: { countryName: "Antarctica", currency: "", thousand: ".", decimal: "," },
  AR: { countryName: "Argentina", currency: "ARS", thousand: ".", decimal: "," },
  AS: { countryName: "American Samoa", currency: "USD", thousand: ",", decimal: "." },
  AT: { countryName: "Austria", currency: "EUR", thousand: ".", decimal: "," },
  AU: { countryName: "Australia", currency: "AUD", thousand: ",", decimal: "." },
  AW: { countryName: "Aruba", currency: "AWG", thousand: ".", decimal: "," },
  AX: { countryName: "Ã…land Islands", currency: "EUR", thousand: ".", decimal: "," },
  AZ: { countryName: "Azerbaijan", currency: "AZN", thousand: ".", decimal: "," },
  BA: { countryName: "Bosnia and Herzegovina", currency: "BAM", thousand: ".", decimal: "," },
  BB: { countryName: "Barbados", currency: "BBD", thousand: ",", decimal: "." },
  BD: { countryName: "Bangladesh", currency: "BDT", thousand: ",", decimal: "." },
  BE: { countryName: "Belgium", currency: "EUR", thousand: ".", decimal: "," },
  BF: { countryName: "Burkina Faso", currency: "XOF", thousand: ".", decimal: "," },
  BG: { countryName: "Bulgaria", currency: "BGN", thousand: ".", decimal: "," },
  BH: { countryName: "Bahrain", currency: "BHD", thousand: ",", decimal: "." },
  BI: { countryName: "Burundi", currency: "BIF", thousand: ",", decimal: "." },
  BJ: { countryName: "Benin", currency: "XOF", thousand: ".", decimal: "," },
  BL: { countryName: "Saint BarthÃ©lemy", currency: "EUR", thousand: ".", decimal: "," },
  BM: { countryName: "Bermuda", currency: "BMD", thousand: ",", decimal: "." },
  BN: { countryName: "Brunei Darussalam", currency: "BND", thousand: ",", decimal: "." },
  BO: { countryName: "Bolivia (Plurinational State of)", currency: "BOB", thousand: ".", decimal: "," },
  BQ: { countryName: "Bonaire, Sint Eustatius and Saba", currency: "USD", thousand: ",", decimal: "." },
  BR: { countryName: "Brazil", currency: "BRL", thousand: ".", decimal: "," },
  BS: { countryName: "Bahamas", currency: "BSD", thousand: ",", decimal: "." },
  BT: { countryName: "Bhutan", currency: "BTN", thousand: ",", decimal: "." },
  BV: { countryName: "Bouvet Island", currency: "", thousand: ".", decimal: "," },
  BW: { countryName: "Botswana", currency: "BWP", thousand: ".", decimal: "," },
  BY: { countryName: "Belarus", currency: "BYN", thousand: ".", decimal: "," },
  BZ: { countryName: "Belize", currency: "BZD", thousand: ",", decimal: "." },
  CA: { countryName: "Canada", currency: "CAD", thousand: ",", decimal: "." },
  CC: { countryName: "Cocos (Keeling) Islands", currency: "AUD", thousand: ",", decimal: "." },
  CD: { countryName: "Congo, Democratic Republic of the", currency: "CDF", thousand: ".", decimal: "," },
  CF: { countryName: "Central African Republic", currency: "XAF", thousand: ".", decimal: "," },
  CG: { countryName: "Congo", currency: "XAF", thousand: ".", decimal: "," },
  CH: { countryName: "Switzerland", currency: "CHF", thousand: "'", decimal: "." },
  CI: { countryName: "CÃ´te d'Ivoire", currency: "XOF", thousand: ".", decimal: "," },
  CK: { countryName: "Cook Islands", currency: "NZD", thousand: ",", decimal: "." },
  CL: { countryName: "Chile", currency: "CLP", thousand: ".", decimal: "," },
  CM: { countryName: "Cameroon", currency: "XAF", thousand: ".", decimal: "," },
  CN: { countryName: "China", currency: "CNY", thousand: ",", decimal: "." },
  CO: { countryName: "Colombia", currency: "COP", thousand: ".", decimal: "," },
  CR: { countryName: "Costa Rica", currency: "CRC", thousand: ",", decimal: "." },
  CU: { countryName: "Cuba", currency: "CUP", thousand: ",", decimal: "." },
  CV: { countryName: "Cabo Verde", currency: "CVE", thousand: ".", decimal: "," },
  CW: { countryName: "CuraÃ§ao", currency: "ANG", thousand: ",", decimal: "." },
  CX: { countryName: "Christmas Island", currency: "AUD", thousand: ",", decimal: "." },
  CY: { countryName: "Cyprus", currency: "EUR", thousand: ".", decimal: "," },
  CZ: { countryName: "Czechia", currency: "CZK", thousand: ".", decimal: "," },
  DE: { countryName: "Germany", currency: "EUR", thousand: ".", decimal: "," },
  DJ: { countryName: "Djibouti", currency: "DJF", thousand: ",", decimal: "." },
  DK: { countryName: "Denmark", currency: "DKK", thousand: ".", decimal: "," },
  DM: { countryName: "Dominica", currency: "XCD", thousand: ",", decimal: "." },
  DO: { countryName: "Dominican Republic", currency: "DOP", thousand: ",", decimal: "." },
  DZ: { countryName: "Algeria", currency: "DZD", thousand: ".", decimal: "," },
  EC: { countryName: "Ecuador", currency: "USD", thousand: ",", decimal: "." },
  EE: { countryName: "Estonia", currency: "EUR", thousand: ".", decimal: "," },
  EG: { countryName: "Egypt", currency: "EGP", thousand: ",", decimal: "." },
  EH: { countryName: "Western Sahara", currency: "MAD", thousand: ".", decimal: "," },
  ER: { countryName: "Eritrea", currency: "ERN", thousand: ",", decimal: "." },
  ES: { countryName: "Spain", currency: "EUR", thousand: ".", decimal: "," },
  ET: { countryName: "Ethiopia", currency: "ETB", thousand: ",", decimal: "." },
  FI: { countryName: "Finland", currency: "EUR", thousand: " ", decimal: "," },
  FJ: { countryName: "Fiji", currency: "FJD", thousand: ",", decimal: "." },
  FK: { countryName: "Falkland Islands (Malvinas)", currency: "FKP", thousand: ",", decimal: "." },
  FM: { countryName: "Micronesia (Federated States of)", currency: "USD", thousand: ",", decimal: "." },
  FO: { countryName: "Faroe Islands", currency: "DKK", thousand: ".", decimal: "," },
  FR: { countryName: "France", currency: "EUR", thousand: " ", decimal: "," },
  GA: { countryName: "Gabon", currency: "XAF", thousand: ".", decimal: "," },
  GB: { countryName: "United Kingdom of Great Britain and Northern Ireland", currency: "GBP", thousand: ",", decimal: "." },
  GD: { countryName: "Grenada", currency: "XCD", thousand: ",", decimal: "." },
  GE: { countryName: "Georgia", currency: "GEL", thousand: ".", decimal: "," },
  GF: { countryName: "French Guiana", currency: "EUR", thousand: " ", decimal: "," },
  GG: { countryName: "Guernsey", currency: "GBP", thousand: ",", decimal: "." },
  GH: { countryName: "Ghana", currency: "GHS", thousand: ",", decimal: "." },
  GI: { countryName: "Gibraltar", currency: "GIP", thousand: ",", decimal: "." },
  GL: { countryName: "Greenland", currency: "DKK", thousand: ".", decimal: "," },
  GM: { countryName: "Gambia", currency: "GMD", thousand: ",", decimal: "." },
  GN: { countryName: "Guinea", currency: "GNF", thousand: ",", decimal: "." },
  GP: { countryName: "Guadeloupe", currency: "EUR", thousand: " ", decimal: "," },
  GQ: { countryName: "Equatorial Guinea", currency: "XAF", thousand: ".", decimal: "," },
  GR: { countryName: "Greece", currency: "EUR", thousand: ".", decimal: "," },
  GS: { countryName: "South Georgia and the South Sandwich Islands", currency: "GBP", thousand: ",", decimal: "." },
  GT: { countryName: "Guatemala", currency: "GTQ", thousand: ",", decimal: "." },
  GU: { countryName: "Guam", currency: "USD", thousand: ",", decimal: "." },
  GW: { countryName: "Guinea-Bissau", currency: "XOF", thousand: ".", decimal: "," },
  GY: { countryName: "Guyana", currency: "GYD", thousand: ",", decimal: "." },
  HK: { countryName: "Hong Kong", currency: "HKD", thousand: ",", decimal: "." },
  HM: { countryName: "Heard Island and McDonald Islands", currency: "AUD", thousand: ",", decimal: "." },
  HN: { countryName: "Honduras", currency: "HNL", thousand: ",", decimal: "." },
  HR: { countryName: "Croatia", currency: "HRK", thousand: ".", decimal: "," },
  HT: { countryName: "Haiti", currency: "HTG", thousand: ",", decimal: "." },
  HU: { countryName: "Hungary", currency: "HUF", thousand: ".", decimal: "," },
  ID: { countryName: "Indonesia", currency: "IDR", thousand: ".", decimal: "," },
  IE: { countryName: "Ireland", currency: "EUR", thousand: ",", decimal: "." },
  IL: { countryName: "Israel", currency: "ILS", thousand: ",", decimal: "." },
  IM: { countryName: "Isle of Man", currency: "GBP", thousand: ",", decimal: "." },
  IN: { countryName: "India", currency: "INR", thousand: ",", decimal: "." },
  IO: { countryName: "British Indian Ocean Territory", currency: "USD", thousand: ",", decimal: "." },
  IQ: { countryName: "Iraq", currency: "IQD", thousand: ",", decimal: "." },
  IR: { countryName: "Iran (Islamic Republic of)", currency: "IRR", thousand: ",", decimal: "." },
  IS: { countryName: "Iceland", currency: "ISK", thousand: ".", decimal: "," },
  IT: { countryName: "Italy", currency: "EUR", thousand: ".", decimal: "," },
  JE: { countryName: "Jersey", currency: "GBP", thousand: ",", decimal: "." },
  JM: { countryName: "Jamaica", currency: "JMD", thousand: ",", decimal: "." },
  JO: { countryName: "Jordan", currency: "JOD", thousand: ",", decimal: "." },
  JP: { countryName: "Japan", currency: "JPY", thousand: ",", decimal: "." },
  KE: { countryName: "Kenya", currency: "KES", thousand: ",", decimal: "." },
  KG: { countryName: "Kyrgyzstan", currency: "KGS", thousand: " ", decimal: "." },
  KH: { countryName: "Cambodia", currency: "KHR", thousand: ",", decimal: "." },
  KI: { countryName: "Kiribati", currency: "AUD", thousand: ",", decimal: "." },
  KM: { countryName: "Comoros", currency: "KMF", thousand: ",", decimal: "." },
  KN: { countryName: "Saint Kitts and Nevis", currency: "XCD", thousand: ",", decimal: "." },
  KP: { countryName: "Korea (Democratic People's Republic of)", currency: "KPW", thousand: ",", decimal: "." },
  KR: { countryName: "Korea, Republic of", currency: "KRW", thousand: ",", decimal: "." },
  KW: { countryName: "Kuwait", currency: "KWD", thousand: ",", decimal: "." },
  KY: { countryName: "Cayman Islands", currency: "KYD", thousand: ",", decimal: "." },
  KZ: { countryName: "Kazakhstan", currency: "KZT", thousand: ".", decimal: "," },
  LA: { countryName: "Lao People's Democratic Republic", currency: "LAK", thousand: ",", decimal: "." },
  LB: { countryName: "Lebanon", currency: "LBP", thousand: ",", decimal: "." },
  LC: { countryName: "Saint Lucia", currency: "XCD", thousand: ",", decimal: "." },
  LI: { countryName: "Liechtenstein", currency: "CHF", thousand: "'", decimal: "." },
  LK: { countryName: "Sri Lanka", currency: "LKR", thousand: ",", decimal: "." },
  LR: { countryName: "Liberia", currency: "LRD", thousand: ",", decimal: "." },
  LS: { countryName: "Lesotho", currency: "LSL", thousand: ",", decimal: "." },
  LT: { countryName: "Lithuania", currency: "EUR", thousand: ".", decimal: "," },
  LU: { countryName: "Luxembourg", currency: "EUR", thousand: ".", decimal: "," },
  LV: { countryName: "Latvia", currency: "EUR", thousand: ".", decimal: "," },
  LY: { countryName: "Libya", currency: "LYD", thousand: ",", decimal: "." },
  MA: { countryName: "Morocco", currency: "MAD", thousand: ".", decimal: "," },
  MC: { countryName: "Monaco", currency: "EUR", thousand: ".", decimal: "," },
  MD: { countryName: "Moldova, Republic of", currency: "MDL", thousand: ".", decimal: "," },
  ME: { countryName: "Montenegro", currency: "EUR", thousand: ".", decimal: "," },
  MF: { countryName: "Saint Martin (French part)", currency: "EUR", thousand: ".", decimal: "," },
  MG: { countryName: "Madagascar", currency: "MGA", thousand: ".", decimal: "," },
  MH: { countryName: "Marshall Islands", currency: "USD", thousand: ",", decimal: "." },
  MK: { countryName: "North Macedonia", currency: "MKD", thousand: ".", decimal: "," },
  ML: { countryName: "Mali", currency: "XOF", thousand: ".", decimal: "," },
  MM: { countryName: "Myanmar", currency: "MMK", thousand: ",", decimal: "." },
  MN: { countryName: "Mongolia", currency: "MNT", thousand: ".", decimal: "," },
  MO: { countryName: "Macao", currency: "MOP", thousand: ",", decimal: "." },
  MP: { countryName: "Northern Mariana Islands", currency: "USD", thousand: ",", decimal: "." },
  MQ: { countryName: "Martinique", currency: "EUR", thousand: " ", decimal: "," },
  MR: { countryName: "Mauritania", currency: "MRU", thousand: ".", decimal: "," },
  MS: { countryName: "Montserrat", currency: "XCD", thousand: ",", decimal: "." },
  MT: { countryName: "Malta", currency: "EUR", thousand: ",", decimal: "." },
  MU: { countryName: "Mauritius", currency: "MUR", thousand: ",", decimal: "." },
  MV: { countryName: "Maldives", currency: "MVR", thousand: ",", decimal: "." },
  MW: { countryName: "Malawi", currency: "MWK", thousand: ",", decimal: "." },
  MX: { countryName: "Mexico", currency: "MXN", thousand: ",", decimal: "." },
  MY: { countryName: "Malaysia", currency: "MYR", thousand: ",", decimal: "." },
  MZ: { countryName: "Mozambique", currency: "MZN", thousand: ".", decimal: "," },
  NA: { countryName: "Namibia", currency: "NAD", thousand: ",", decimal: "." },
  NC: { countryName: "New Caledonia", currency: "XPF", thousand: ".", decimal: "," },
  NE: { countryName: "Niger", currency: "XOF", thousand: ".", decimal: "," },
  NF: { countryName: "Norfolk Island", currency: "AUD", thousand: ",", decimal: "." },
  NG: { countryName: "Nigeria", currency: "NGN", thousand: ",", decimal: "." },
  NI: { countryName: "Nicaragua", currency: "NIO", thousand: ",", decimal: "." },
  NL: { countryName: "Netherlands", currency: "EUR", thousand: ".", decimal: "," },
  NO: { countryName: "Norway", currency: "NOK", thousand: ".", decimal: "," },
  NP: { countryName: "Nepal", currency: "NPR", thousand: ",", decimal: "." },
  NR: { countryName: "Nauru", currency: "AUD", thousand: ",", decimal: "." },
  NU: { countryName: "Niue", currency: "NZD", thousand: ",", decimal: "." },
  NZ: { countryName: "New Zealand", currency: "NZD", thousand: ",", decimal: "." },
  OM: { countryName: "Oman", currency: "OMR", thousand: ",", decimal: "." },
  PA: { countryName: "Panama", currency: "PAB", thousand: ",", decimal: "." },
  PE: { countryName: "Peru", currency: "PEN", thousand: ",", decimal: "." },
  PF: { countryName: "French Polynesia", currency: "XPF", thousand: ".", decimal: "," },
  PG: { countryName: "Papua New Guinea", currency: "PGK", thousand: ",", decimal: "." },
  PH: { countryName: "Philippines", currency: "PHP", thousand: ",", decimal: "." },
  PK: { countryName: "Pakistan", currency: "PKR", thousand: ",", decimal: "." },
  PL: { countryName: "Poland", currency: "PLN", thousand: ".", decimal: "," },
  PM: { countryName: "Saint Pierre and Miquelon", currency: "EUR", thousand: ".", decimal: "," },
  PN: { countryName: "Pitcairn", currency: "NZD", thousand: ",", decimal: "." },
  PR: { countryName: "Puerto Rico", currency: "USD", thousand: ",", decimal: "." },
  PS: { countryName: "Palestine, State of", currency: "ILS", thousand: ",", decimal: "." },
  PT: { countryName: "Portugal", currency: "EUR", thousand: ".", decimal: "," },
  PW: { countryName: "Palau", currency: "USD", thousand: ",", decimal: "." },
  PY: { countryName: "Paraguay", currency: "PYG", thousand: ".", decimal: "," },
  QA: { countryName: "Qatar", currency: "QAR", thousand: ",", decimal: "." },
  RE: { countryName: "RÃ©union", currency: "EUR", thousand: " ", decimal: "," },
  RO: { countryName: "Romania", currency: "RON", thousand: ".", decimal: "," },
  RS: { countryName: "Serbia", currency: "RSD", thousand: ".", decimal: "," },
  RU: { countryName: "Russian Federation", currency: "RUB", thousand: ".", decimal: "," },
  RW: { countryName: "Rwanda", currency: "RWF", thousand: ",", decimal: "." },
  SA: { countryName: "Saudi Arabia", currency: "SAR", thousand: ",", decimal: "." },
  SB: { countryName: "Solomon Islands", currency: "SBD", thousand: ",", decimal: "." },
  SC: { countryName: "Seychelles", currency: "SCR", thousand: ",", decimal: "." },
  SD: { countryName: "Sudan", currency: "SDG", thousand: ",", decimal: "." },
  SE: { countryName: "Sweden", currency: "SEK", thousand: ".", decimal: "," },
  SG: { countryName: "Singapore", currency: "SGD", thousand: ",", decimal: "." },
  SH: { countryName: "Saint Helena, Ascension and Tristan da Cunha", currency: "SHP", thousand: ",", decimal: "." },
  SI: { countryName: "Slovenia", currency: "EUR", thousand: ".", decimal: "," },
  SJ: { countryName: "Svalbard and Jan Mayen", currency: "NOK", thousand: ".", decimal: "," },
  SK: { countryName: "Slovakia", currency: "EUR", thousand: ".", decimal: "," },
  SL: { countryName: "Sierra Leone", currency: "SLL", thousand: ",", decimal: "." },
  SM: { countryName: "San Marino", currency: "EUR", thousand: ".", decimal: "," },
  UY: { countryName: "Uruguay", currency: "UYU", thousand: ".", decimal: "," },
  UZ: { countryName: "Uzbekistan", currency: "UZS", thousand: ".", decimal: "," },
  VA: { countryName: "Holy See", currency: "EUR", thousand: ".", decimal: "," },
  VC: { countryName: "Saint Vincent and the Grenadines", currency: "XCD", thousand: ",", decimal: "." },
  VE: { countryName: "Venezuela (Bolivarian Republic of)", currency: "VES", thousand: ".", decimal: "," },
  VG: { countryName: "Virgin Islands (British)", currency: "USD", thousand: ",", decimal: "." },
  VI: { countryName: "Virgin Islands (U.S.)", currency: "USD", thousand: ",", decimal: "." },
  VN: { countryName: "Viet Nam", currency: "VND", thousand: ".", decimal: "," },
  VU: { countryName: "Vanuatu", currency: "VUV", thousand: ",", decimal: "." },
  WF: { countryName: "Wallis and Futuna", currency: "XPF", thousand: ".", decimal: "," },
  WS: { countryName: "Samoa", currency: "WST", thousand: ",", decimal: "." },
  YE: { countryName: "Yemen", currency: "YER", thousand: ",", decimal: "." },
  YT: { countryName: "Mayotte", currency: "EUR", thousand: " ", decimal: "," },
  ZA: { countryName: "South Africa", currency: "ZAR", thousand: ",", decimal: "." },
  ZM: { countryName: "Zambia", currency: "ZMW", thousand: ",", decimal: "." },
  ZW: { countryName: "Zimbabwe", currency: "USD", thousand: ",", decimal: "." },
};
/*Curr Symbols*/
var currency_symbols = {
  AED: { symbol: 'Ø¯.Ø¥', thousand: ",", decimal: "." },
  AFN: { symbol: 'Ø‹', thousand: ",", decimal: "." },
  ALL: { symbol: 'L', thousand: ",", decimal: "." },
  AMD: { symbol: 'Ö', thousand: ",", decimal: "." },
  ANG: { symbol: 'Æ’', thousand: ".", decimal: "," },
  AOA: { symbol: 'Kz', thousand: ".", decimal: "," },
  ARS: { symbol: '$', thousand: ".", decimal: "," },
  AUD: { symbol: '$', thousand: ",", decimal: "." },
  AWG: { symbol: 'Æ’', thousand: ".", decimal: "," },
  AZN: { symbol: 'â‚¼', thousand: " ", decimal: "," },
  BAM: { symbol: 'KM', thousand: ".", decimal: "," },
  BBD: { symbol: '$', thousand: ",", decimal: "." },
  BDT: { symbol: 'à§³', thousand: ",", decimal: "." },
  BGN: { symbol: 'Ð»Ð²', thousand: " ", decimal: "," },
  BHD: { symbol: '.Ø¯.Ø¨', thousand: ",", decimal: "." },
  BIF: { symbol: 'FBu', thousand: ",", decimal: "." },
  BMD: { symbol: '$', thousand: ",", decimal: "." },
  BND: { symbol: '$', thousand: ",", decimal: "." },
  BOB: { symbol: '$b', thousand: ".", decimal: "," },
  BOV: { symbol: 'BOV', thousand: ".", decimal: "," },
  BRL: { symbol: 'R$', thousand: ".", decimal: "," },
  BSD: { symbol: '$', thousand: ",", decimal: "." },
  BTC: { symbol: 'â‚¿', thousand: ",", decimal: "." },
  BTN: { symbol: 'Nu.', thousand: ",", decimal: "." },
  BWP: { symbol: 'P', thousand: ",", decimal: "." },
  BYN: { symbol: 'Br', thousand: " ", decimal: "," },
  BYR: { symbol: 'Br', thousand: ",", decimal: "." },
  BZD: { symbol: 'BZ$', thousand: ",", decimal: "." },
  CAD: { symbol: '$', thousand: ",", decimal: "." },
  CDF: { symbol: 'FC', thousand: ".", decimal: "," },
  CHE: { symbol: 'CHE', thousand: ".", decimal: "," },
  CHF: { symbol: 'CHF', thousand: "'", decimal: "." },
  CHW: { symbol: 'CHW', thousand: ".", decimal: "," },
  CLF: { symbol: 'CLF', thousand: ".", decimal: "," },
  CLP: { symbol: '$', thousand: ".", decimal: "," },
  CNH: { symbol: 'Â¥', thousand: ",", decimal: "." },
  CNY: { symbol: 'Â¥', thousand: ",", decimal: "." },
  COP: { symbol: '$', thousand: ".", decimal: "," },
  COU: { symbol: 'COU', thousand: ".", decimal: "," },
  CRC: { symbol: 'â‚¡', thousand: ",", decimal: "." },
  CUC: { symbol: '$', thousand: ".", decimal: "," },
  CUP: { symbol: 'â‚±', thousand: ".", decimal: "," },
  CVE: { symbol: '$', thousand: ".", decimal: "," },
  CZK: { symbol: 'KÄ', thousand: ".", decimal: "," },
  DJF: { symbol: 'Fdj', thousand: ",", decimal: "." },
  DKK: { symbol: 'kr', thousand: ".", decimal: "," },
  DOP: { symbol: 'RD$', thousand: ",", decimal: "." },
  DZD: { symbol: 'Ø¯Ø¬', thousand: ".", decimal: "," },
  EEK: { symbol: 'kr', thousand: ".", decimal: "," },
  EGP: { symbol: 'Â£', thousand: ",", decimal: "." },
  ERN: { symbol: 'Nfk', thousand: ",", decimal: "." },
  ETB: { symbol: 'Br', thousand: ",", decimal: "." },
  ETH: { symbol: 'Îž', thousand: ",", decimal: "." },
  EUR: { symbol: 'â‚¬', thousand: ".", decimal: "," },
  FJD: { symbol: '$', thousand: ",", decimal: "." },
  FKP: { symbol: 'Â£', thousand: ".", decimal: "," },
  GBP: { symbol: 'Â£', thousand: ",", decimal: "." },
  GEL: { symbol: 'â‚¾', thousand: ".", decimal: "," },
  GGP: { symbol: 'Â£', thousand: ".", decimal: "," },
  GHC: { symbol: 'â‚µ', thousand: ".", decimal: "," },
  GHS: { symbol: 'GHâ‚µ', thousand: ".", decimal: "," },
  GIP: { symbol: 'Â£', thousand: ".", decimal: "," },
  GMD: { symbol: 'D', thousand: ",", decimal: "." },
  GNF: { symbol: 'FG', thousand: ",", decimal: "." },
  GTQ: { symbol: 'Q', thousand: ",", decimal: "." },
  GYD: { symbol: '$', thousand: ".", decimal: "," },
  HKD: { symbol: '$', thousand: ",", decimal: "." },
  HNL: { symbol: 'L', thousand: ".", decimal: "," },
  HRK: { symbol: 'kn', thousand: ".", decimal: "," },
  HTG: { symbol: 'G', thousand: ".", decimal: "," },
  HUF: { symbol: 'Ft', thousand: ".", decimal: "," },
  IDR: { symbol: 'Rp', thousand: ".", decimal: "," },
  ILS: { symbol: 'â‚ª', thousand: ",", decimal: "." },
  IMP: { symbol: 'Â£', thousand: ".", decimal: "," },
  INR: { symbol: 'â‚¹', thousand: ",", decimal: "." },
  IQD: { symbol: 'Ø¹.Ø¯', thousand: ",", decimal: "." },
  IRR: { symbol: 'ï·¼', thousand: ",", decimal: "." },
  ISK: { symbol: 'kr', thousand: ".", decimal: "," },
  JEP: { symbol: 'Â£', thousand: ".", decimal: "," },
  JMD: { symbol: 'J$', thousand: ",", decimal: "." },
  JOD: { symbol: 'JD', thousand: ",", decimal: "." },
  JPY: { symbol: 'Â¥', thousand: ",", decimal: "." },
  KES: { symbol: 'KSh', thousand: ",", decimal: "." },
  KGS: { symbol: 'Ð»Ð²', thousand: ",", decimal: "." },
  KHR: { symbol: 'áŸ›', thousand: ",", decimal: "." },
  KMF: { symbol: 'CF', thousand: ",", decimal: "." },
  KPW: { symbol: 'â‚©', thousand: ",", decimal: "." },
  KRW: { symbol: 'â‚©', thousand: ",", decimal: "." },
  KWD: { symbol: 'KD', thousand: ".", decimal: "," },
  KYD: { symbol: '$', thousand: ",", decimal: "." },
  KZT: { symbol: 'â‚¸', thousand: ".", decimal: "," },
  LAK: { symbol: 'â‚­', thousand: ".", decimal: "," },
  LBP: { symbol: 'Â£', thousand: ".", decimal: "," },
  LKR: { symbol: 'â‚¨', thousand: ",", decimal: "." },
  LRD: { symbol: '$', thousand: ".", decimal: "," },
  LSL: { symbol: 'M', thousand: ",", decimal: "." },
  LTC: { symbol: 'Å', thousand: ",", decimal: "." },
  LTL: { symbol: 'Lt', thousand: ".", decimal: "," },
  LVL: { symbol: 'Ls', thousand: ".", decimal: "," },
  LYD: { symbol: 'LD', thousand: ".", decimal: "," },
  MAD: { symbol: 'MAD', thousand: ".", decimal: "," },
  MDL: { symbol: 'lei', thousand: ".", decimal: "," },
  MGA: { symbol: 'Ar', thousand: ",", decimal: "." },
  MKD: { symbol: 'Ð´ÐµÐ½', thousand: ".", decimal: "," },
  MMK: { symbol: 'K', thousand: ".", decimal: "," },
  MNT: { symbol: 'â‚®', thousand: ".", decimal: "," },
  MOP: { symbol: 'MOP$', thousand: ",", decimal: "." },
  MRO: { symbol: 'UM', thousand: ".", decimal: "," },
  MRU: { symbol: 'UM', thousand: ".", decimal: "," },
  MUR: { symbol: 'â‚¨', thousand: ",", decimal: "." },
  MVR: { symbol: 'Rf', thousand: ",", decimal: "." },
  MWK: { symbol: 'MK', thousand: ",", decimal: "." },
  MXN: { symbol: '$', thousand: ",", decimal: "." },
  MXV: { symbol: 'MXV', thousand: ".", decimal: "," },
  MYR: { symbol: 'RM', thousand: ",", decimal: "." },
  MZN: { symbol: 'MT', thousand: ".", decimal: "," },
  NAD: { symbol: '$', thousand: ",", decimal: "." },
  NGN: { symbol: 'â‚¦', thousand: ",", decimal: "." },
  NIO: { symbol: 'C$', thousand: ".", decimal: "," },
  NOK: { symbol: 'kr', thousand: ".", decimal: "," },
  NPR: { symbol: 'â‚¨', thousand: ",", decimal: "." },
  NZD: { symbol: '$', thousand: ",", decimal: "." },
  OMR: { symbol: 'ï·¼', thousand: ",", decimal: "." },
  PAB: { symbol: 'B/.', thousand: ",", decimal: "." },
  PEN: { symbol: 'S/.', thousand: ",", decimal: "." },
  PGK: { symbol: 'K', thousand: ".", decimal: "," },
  PHP: { symbol: 'â‚±', thousand: ",", decimal: "." },
  PKR: { symbol: 'â‚¨', thousand: ",", decimal: "." },
  PLN: { symbol: 'zÅ‚', thousand: ".", decimal: "," },
  PYG: { symbol: 'Gs', thousand: ".", decimal: "," },
  QAR: { symbol: 'ï·¼', thousand: ",", decimal: "." },
  RMB: { symbol: 'ï¿¥', thousand: ",", decimal: "." },
  RON: { symbol: 'lei', thousand: ".", decimal: "," },
  RSD: { symbol: 'Ð”Ð¸Ð½.', thousand: ".", decimal: "," },
  RUB: { symbol: 'â‚½', thousand: ".", decimal: "," },
  RWF: { symbol: 'Râ‚£', thousand: ".", decimal: "," },
  SAR: { symbol: 'ï·¼', thousand: ".", decimal: "," },
  SBD: { symbol: '$', thousand: ".", decimal: "," },
  SCR: { symbol: 'â‚¨', thousand: ".", decimal: "," },
  SDG: { symbol: 'Ø¬.Ø³.', thousand: ".", decimal: "," },
  SEK: { symbol: 'kr', thousand: ".", decimal: "," },
  SGD: { symbol: 'S$', thousand: ",", decimal: "." },
  SHP: { symbol: 'Â£', thousand: ".", decimal: "," },
  SLL: { symbol: 'Le', thousand: ",", decimal: "." },
  SOS: { symbol: 'S', thousand: ",", decimal: "." },
  SRD: { symbol: '$', thousand: ".", decimal: "," },
  SSP: { symbol: 'Â£', thousand: ".", decimal: "," },
  STD: { symbol: 'Db', thousand: ".", decimal: "," },
  STN: { symbol: 'Db', thousand: ".", decimal: "," },
  SVC: { symbol: '$', thousand: ".", decimal: "," },
  SYP: { symbol: 'Â£', thousand: ".", decimal: "," },
  SZL: { symbol: 'E', thousand: ",", decimal: "." },
  THB: { symbol: 'à¸¿', thousand: ",", decimal: "." },
  TJS: { symbol: 'SM', thousand: ",", decimal: "." },
  TMT: { symbol: 'T', thousand: ".", decimal: "," },
  TND: { symbol: 'Ø¯.Øª', thousand: ".", decimal: "," },
  TOP: { symbol: 'T$', thousand: ",", decimal: "." },
  TRL: { symbol: 'â‚¤', thousand: ".", decimal: "," },
  TRY: { symbol: 'â‚º', thousand: ".", decimal: "," },
  TTD: { symbol: 'TT$', thousand: ".", decimal: "." },
  TVD: { symbol: '$', thousand: ",", decimal: "." },
  TWD: { symbol: 'NT$', thousand: ",", decimal: "." },
  TZS: { symbol: 'TSh', thousand: ",", decimal: "." },
  UAH: { symbol: 'â‚´', thousand: ",", decimal: "." },
  UGX: { symbol: 'USh', thousand: ",", decimal: "." },
  USD: { symbol: '$', thousand: ",", decimal: "." },
  UYI: { symbol: 'UYI', thousand: ".", decimal: "," },
  UYU: { symbol: '$U', thousand: ".", decimal: "," },
  UYW: { symbol: 'UYW', thousand: ".", decimal: "," },
  UZS: { symbol: 'Ð»Ð²', thousand: ",", decimal: "." },
  VEF: { symbol: 'Bs', thousand: ".", decimal: "," },
  VES: { symbol: 'Bs.S', thousand: ".", decimal: "," },
  VND: { symbol: 'â‚«', thousand: ".", decimal: "," },
  VUV: { symbol: 'VT', thousand: ",", decimal: "." },
  WST: { symbol: 'WS$', thousand: ",", decimal: "." },
  XAF: { symbol: 'FCFA', thousand: ",", decimal: "." },
  XBT: { symbol: 'Éƒ', thousand: ",", decimal: "." },
  XCD: { symbol: '$', thousand: ".", decimal: "." },
  XOF: { symbol: 'CFA', thousand: ",", decimal: "." },
  XPF: { symbol: 'â‚£', thousand: ".", decimal: "." },
  XSU: { symbol: 'Sucre', thousand: ".", decimal: "." },
  XUA: { symbol: 'XUA', thousand: ".", decimal: "." },
  YER: { symbol: 'ï·¼', thousand: ".", decimal: "." },
  ZAR: { symbol: 'R', thousand: ",", decimal: "." },
  ZMW: { symbol: 'ZK', thousand: ".", decimal: "." },
  ZWD: { symbol: 'Z$', thousand: ",", decimal: "." },
  ZWL: { symbol: '$', thousand: ",", decimal: "." }
};
/* Languages */
var decimal_formats = {
  English: { decimal: ".", thousand: "," },
  French: { decimal: ",", thousand: " " },
  German: { decimal: ",", thousand: "." },
  Italian: { decimal: ",", thousand: "." },
  Portuguese: { decimal: ",", thousand: "." },
  Spanish: { decimal: ",", thousand: "." },
  Danish: { decimal: ",", thousand: "." },
  Dutch: { decimal: ",", thousand: "." },
  Finnish: { decimal: ",", thousand: " " },
  Japanese: { decimal: ".", thousand: "," },
  Norwegian: { decimal: ",", thousand: " " },
  Swedish: { decimal: ",", thousand: " " }
};

$(".pricing-plan-price-amount").wrapInner('<div class="ts-digital-pro"></div>');
$(".add-on-details .product-price").addClass('addon-ts-price');
$.fn.tsCurrOptions = function (options) {
  console.log("Buy the extionsion at sqspstarter.com/squarespace-plugins/p/squarespace-currency-converter-extension");
  var tsCurrOptions = {
    DesktopLocation: `[data-nc-base="header"] [data-nc-container="top-right"]`,
    MobileLocation: `.header-display-mobile ,[data-nc-base="mobile-bar"] [data-nc-container="top-right"]`,
    licenceKey: `your-licence-key`,
    AvailableCurrencies: ["GBP", "USD", "EUR", "AUD", "CAD"],
    GeoLocation: true,
    LangaugeStore: "English",
    BaseCurrency: "GBP",
    HideBaseCurrency: false,
    ShowCurrencyCode: true,
    ShowCurrencySymbol: true,
    DisclaimerText: '',
    DecimalPrecision: 2,
    customCSS: '',
    callback: function () { } // Add a callback option
  }
  var settingsCurr = $.extend(tsCurrOptions, options);
  $.fn.tsCurrFunction = function () {
    $(".product-price:not(.pricing-plan-product-price):not(.product-price-clone):not(.addon-ts-price):not(.sale-price):not(.original-price), .addon-ts-price , .ts-digital-pro, .cart-row-price, .cart-subtotal-price, .spend-target").after(`<div class="ts-currency-converter"></div> `);
    var licenceKey = settingsCurr.licenceKey;
    var DesktopLoc = settingsCurr.DesktopLocation;
    var MobileLoc = settingsCurr.MobileLocation;
    var HideBaseCurr = settingsCurr.HideBaseCurrency;
    var StoreLang = settingsCurr.LangaugeStore;
    console.log(StoreLang);
    var ShowCurrCode = settingsCurr.ShowCurrencyCode;
    var ShowCurrSymbol = settingsCurr.ShowCurrencySymbol;
    var DisclaimerText = settingsCurr.DisclaimerText;
    var GeoLoc = settingsCurr.GeoLocation;
    console.log(GeoLoc);
    var valuesCurr = settingsCurr.AvailableCurrencies;
    var values = valuesCurr;
    var baseCurr = settingsCurr.BaseCurrency;
    console.log(baseCurr);
    var deciP = settingsCurr.DecimalPrecision;
    var select = $('<select>').prop('id', 'currency').prop('name', 'currency');
    $(values).each(function () {
      select.append($("<option>").prop('value', this)
        .text(this.charAt(0).toUpperCase() + this.slice(1)));
    });
    var label = $("<label>").prop('for', 'currency').text("");
    var br = $("<br>");
    $(DesktopLoc).after(label).after(select).after(br);
    //
    var selectMob = $('<select>').prop('id', 'currencyMob').prop('name', 'currencyMob');
    $(values).each(function () {
      selectMob.append($("<option>").prop('value', this)
        .text(this.charAt(0).toUpperCase() + this.slice(1)));
    });
    var labelMob = $("<label>").prop('for', 'currencyMob').text("");
    var br = $("<br>");
    $(MobileLoc).after(labelMob).after(selectMob).after(br);
    //
    var resultCurr;
    fx.base = baseCurr
    fx.settings = {
      from: fx.base
    };
    const currencylocalStorage = localStorage.getItem('Currency');
    if (!currencylocalStorage) {
      localStorage.Currency = fx.base;
    }
    //hidebasecurr
    if (HideBaseCurr) {
      $('.product-price, .ts-digital-pro').css('display', 'none');
    }
    $.fn.currExcFunc = function () {
      $.getJSON('https://api.exchangerate-api.com/v4/latest/USD',
        function (data) {
          // Check money.js has finished loading:
          if (typeof fx !== "undefined" && fx.rates) {
            fx.rates = data.rates;
            fx.base = data.base;
          } else {
            // If not, apply to fxSetup global:
            var fxSetup = {
              rates: data.rates,
              base: data.base
            }
          }
          /* justtext function*/
          $.fn.justtext = function () {
            return $(this).clone()
              .children()
              .remove()
              .end()
              .text();
          };
          /* On pageload Currency */
          if (GeoLoc == false) {
            localCurr = localStorage.getItem('Currency');
          }
          $("select#currency").val(localCurr);
          $("select#currencyMob").val(localCurr);
          $.fn.hentryGrid = function () {
            $('.productDetails, .hentry:not(.ProductItem), .summary-item, .pricing-plan-price-amount, #sqs-cart-container, .product-details:not(.ProductItem-details), .ProductItem-product-price, .Main--products-item .ProductItem-details , .add-on-card, .spend-target').each(function PageloadCurr() {
              //
              var self = $(this);
              console.log(StoreLang + " 2");
              function convertAndFormatPrice(priceString, StoreLang, localCurr, deciP, currency_symbols) {
                // Unformat the price and remove decimal places beyond the second place
                // var UnformatPrice = accounting.unformat(priceString, currency_symbols[baseCurr].decimal);
                console.log(StoreLang + " 3");
                console.log(StoreLang + " " + decimal_formats[StoreLang].decimal);
                var UnformatPrice = accounting.unformat(priceString, decimal_formats[StoreLang].decimal);
                console.log(UnformatPrice);
                var UnformatPrice2Places = Math.floor(UnformatPrice * 100) / 100;
                console.log(UnformatPrice2Places);

                // Convert to the local currency
                var localupdateCurr = fx.convert(UnformatPrice2Places, { to: localCurr });

                // Format the converted price with the specified currency symbols
                localupdateCurr = accounting.formatMoney(
                  localupdateCurr,
                  "",
                  deciP,
                  currency_symbols[localCurr].thousand,
                  currency_symbols[localCurr].decimal
                );

                // Return the formatted price string
                console.log('Original Price (' + StoreLang + '):', priceString);
                console.log('Converted Price (' + localCurr + '):', localupdateCurr);
                return localupdateCurr;
              }
              // Find the product price element
              var productPrice = self.find('.product-price:not(.product-price-clone)');
              //Sale Products
              if (productPrice.find('.original-price').length > 0) {
                // Find the text node containing the sale price
                var salePriceNode = productPrice.contents().filter(function () {
                  return this.nodeType === 3 && this.nodeValue.trim() !== '';
                });
                salePriceNode.wrap('<span class="sale-price"></span>');
                productPrice.addClass('ts-sale-product');
                var salePrice = self.find('.sale-price').text();
                var saleConvertedPrice = convertAndFormatPrice(salePrice, StoreLang, localCurr, deciP, currency_symbols);
                var originalPrice = self.find('.original-price').text();
                var originalConvertedPrice = convertAndFormatPrice(originalPrice, StoreLang, localCurr, deciP, currency_symbols);
                $(this).find(".ts-currency-converter").html(`<div class="ts-price"><span class="ts-sale-price">` + `<span class="ts-curr-code">` + localCurr + `</span>` + ` ` + `<span class="ts-curr-symbol">` + (currency_symbols[localCurr].symbol) + `</span>` + saleConvertedPrice + `</span><span class= "ts-orignal-price">` + `<span class="ts-curr-code">` + localCurr + `</span>` + ` ` + `<span class="ts-curr-symbol">` + (currency_symbols[localCurr].symbol) + `</span>` + originalConvertedPrice + `</span></div> `);
              }
              // Other Products
              if (!(productPrice.find('.original-price').length > 0)) {
                console.log(self);
                // Get the price string
                var priceString = self.find('.product-price:not(.product-price-clone), .ts-digital-pro').text();
                var convertedPrice = convertAndFormatPrice(priceString, StoreLang, localCurr, deciP, currency_symbols);
                self.find(".ts-currency-converter").html(`<div class="ts-price">` + `` + `<span class="ts-curr-code">` + localCurr + `</span>` + ` ` + `<span class="ts-curr-symbol">` + (currency_symbols[localCurr].symbol) + `</span>` + convertedPrice + `</div> `);
              }
            });
          }
          $.fn.hentryGrid();

          /* On Change Currency */
          var updateCurr;
          $('#currency').on('change', function () {
            resultCurr = this.value;
            localCurr = resultCurr;
            localStorage.Currency = resultCurr;
            $.fn.hentryGrid();
            $("select#currencyMob").val(resultCurr);
          });
          $('#currencyMob').on('change', function () {
            resultCurr = this.value;
            localCurr = resultCurr;
            localStorage.Currency = resultCurr;
            $.fn.hentryGrid();
            $("select#currency").val(resultCurr);
          });
          /*Disclaimer*/
          if (!DisclaimerText) {
            $('.ProductItem-product-price').append(`<div class="ts-disclaimer"><p> </div>`);
          }
          if (DisclaimerText) {
            $('.ProductItem-product-price').append(`<div class="ts-disclaimer"><p>` + DisclaimerText + `</p>`);
          }
          //ShowCurrCode
          if (!ShowCurrCode) {
            $('.ts-curr-code').css('display', 'none');
          }
          //ShowCurrSymbol
          if (!ShowCurrSymbol) {
            $('.ts-curr-symbol').css('display', 'none');
          }
          /* On Change Variation */
          // Get the initial text of the .product-price element
          var initialText = $('.product-price').text();
          // Set up a MutationObserver to detect changes in the .product-price element
          var observer = new MutationObserver(function (mutationsList) {
            for (var mutation of mutationsList) {
              if (mutation.type === 'childList' && mutation.target.classList.contains('product-price')) {
                var currentText = $(mutation.target).text();
                if (currentText !== initialText) {
                  $.fn.hentryGrid();
                  // Update the initial text with the new text
                  initialText = currentText;
                  console.log('Mutate!!!');
                }
              }
            }
          });

          // Start observing the .product-price element
          observer.observe($('.product-price')[0], { subtree: true, characterData: true, childList: true });
          /* On Change Variation - end*/

          // Listen for changes on the select dropdown using class
            $('.variant-select-wrapper select').change(function() {
              var selectedSize = $(this).val();
              $.fn.hentryGrid();
            // Your function or logic here
            });
        });//currExcFunc
    };//tsCurrFunction
    var countryLoc;
    var GeoCurr;
    var localCurr;
    /* Geolocation */
    if (GeoLoc == true) {
    fetch("https://ipinfo.io/json")
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((jsonResponse) => {
      console.log(jsonResponse.ip, jsonResponse.country);
      countryLoc = jsonResponse.country;
      console.log(countryLoc);

      GeoCurr = CountryCurrCode[countryLoc]?.currency || baseCurr; // Fallback to baseCurr if no match
      console.log(GeoCurr);
      localCurr = GeoCurr;

      // Check and append GeoCurr to #currency and #currencyMob if not present
      if (!$('#currency option').filter(function () { return $(this).text() === GeoCurr; }).length) {
        $('#currency').append($("<option>").prop('value', GeoCurr).text(GeoCurr));
      }
      if (!$('#currencyMob option').filter(function () { return $(this).text() === GeoCurr; }).length) {
        $('#currencyMob').append($("<option>").prop('value', GeoCurr).text(GeoCurr));
      }

      $('#currency, #currencyMob').val(GeoCurr);
      $.fn.currExcFunc();
    })
    .catch((error) => {
      console.error("Fetch error or blocked request:", error);

      // Fallback to localStorage or baseCurr
      localCurr = localStorage.getItem('Currency') || baseCurr;
      console.log("Using fallback currency:", localCurr);

      // Set the currency in dropdowns
      $('#currency, #currencyMob').val(localCurr);
      $.fn.currExcFunc();
    });
    } else {
        // If GeoLoc is false, use localStorage currency or baseCurr
        localCurr = localStorage.getItem('Currency') || baseCurr;
        console.log("GeoLoc is false, using local currency:", localCurr);

        $('#currency, #currencyMob').val(localCurr); // Update dropdowns
        $.fn.currExcFunc();
    }
    
    /* Geolocation - End */
  };
  return $.fn.tsCurrFunction();
  // Apply custom CSS styles
  if (settingsCurr.customCSS) {
    var styleElement = document.createElement('style');
    styleElement.textContent = settingsCurr.customCSS;
    document.head.appendChild(styleElement);
  }
  /* Callback Function */
  if (settingsCurr.callback && typeof settingsCurr.callback === 'function') {
    settingsCurr.callback();
  }
};  SN: { countryName: "Senegal", currency: "XOF", thousand: ".", decimal: "," },
  SO: { countryName: "Somalia", currency: "SOS", thousand: ",", decimal: "." },
  SR: { countryName: "Suriname", currency: "SRD", thousand: ".", decimal: "," },
  SS: { countryName: "South Sudan", currency: "SSP", thousand: ",", decimal: "." },
  ST: { countryName: "Sao Tome and Principe", currency: "STN", thousand: ".", decimal: "," },
  SV: { countryName: "El Salvador", currency: "USD", thousand: ",", decimal: "." },
  SX: { countryName: "Sint Maarten (Dutch part)", currency: "ANG", thousand: ",", decimal: "." },
  SY: { countryName: "Syrian Arab Republic", currency: "SYP", thousand: ",", decimal: "." },
  SZ: { countryName: "Eswatini", currency: "SZL", thousand: ",", decimal: "." },
  TC: { countryName: "Turks and Caicos Islands", currency: "USD", thousand: ",", decimal: "." },
  TD: { countryName: "Chad", currency: "XAF", thousand: ".", decimal: "," },
  TF: { countryName: "French Southern Territories", currency: "EUR", thousand: ".", decimal: "," },
  TG: { countryName: "Togo", currency: "XOF", thousand: ".", decimal: "," },
  TH: { countryName: "Thailand", currency: "THB", thousand: ",", decimal: "." },
  TJ: { countryName: "Tajikistan", currency: "TJS", thousand: " ", decimal: "." },
  TK: { countryName: "Tokelau", currency: "NZD", thousand: ",", decimal: "." },
  TL: { countryName: "Timor-Leste", currency: "USD", thousand: ",", decimal: "." },
  TM: { countryName: "Turkmenistan", currency: "TMT", thousand: ",", decimal: "." },
  TN: { countryName: "Tunisia", currency: "TND", thousand: ".", decimal: "," },
  TO: { countryName: "Tonga", currency: "TOP", thousand: ",", decimal: "." },
  TR: { countryName: "Turkey", currency: "TRY", thousand: ".", decimal: "," },
  TT: { countryName: "Trinidad and Tobago", currency: "TTD", thousand: ",", decimal: "." },
  TV: { countryName: "Tuvalu", currency: "AUD", thousand: ",", decimal: "." },
  TW: { countryName: "Taiwan, Province of China", currency: "TWD", thousand: ",", decimal: "." },
  TZ: { countryName: "Tanzania, United Republic of", currency: "TZS", thousand: ",", decimal: "." },
  UA: { countryName: "Ukraine", currency: "UAH", thousand: " ", decimal: "." },
  UG: { countryName: "Uganda", currency: "UGX", thousand: ",", decimal: "." },
  UM: { countryName: "United States Minor Outlying Islands", currency: "USD", thousand: ",", decimal: "." },
  US: { countryName: "United States of America", currency: "USD", thousand: ",", decimal: "." },



