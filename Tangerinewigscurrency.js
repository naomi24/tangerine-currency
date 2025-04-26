(function ($) {
  const supportedCurrencies = ["USD", "GBP", "EUR", "AUD", "CAD", "NZD"];
  const baseCurrency = "AUD";
  const currencySymbolMap = {
    USD: "$", GBP: "£", EUR: "€", AUD: "$", CAD: "$", NZD: "$"
  };

  const priceSelector = ".sqs-money-native"; // Update if needed
  let conversionRates = {};

  function getUserCurrencyByGeo() {
    return fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => data.currency)
      .catch(() => null);
  }

  function fetchConversionRates() {
    return fetch(`https://api.exchangerate.host/latest?base=${baseCurrency}&symbols=${supportedCurrencies.join(",")}`)
      .then(res => res.json())
      .then(data => {
        conversionRates = data.rates || {};
      });
  }

  function convertAndDisplayPrices(currency) {
    $(priceSelector).each(function () {
      const originalText = $(this).text().replace(/[^0-9.]/g, "");
      const basePrice = parseFloat(originalText);
      if (isNaN(basePrice)) return;

      const adjustedPrice = basePrice + 100;
      const rate = conversionRates[currency] || 1;
      const converted = Math.round(adjustedPrice * rate);

      const symbol = currencySymbolMap[currency] || "";
      $(this).text(`${symbol}${converted} ${currency}`);
    });
  }

  function createCurrencyDropdown(currentCurrency) {
    const dropdown = $('<select id="currency-selector" style="margin: 1em 0; padding: 0.5em; font-size: 1em;"></select>');
    supportedCurrencies.forEach(cur => {
      const option = $('<option></option>').val(cur).text(cur);
      if (cur === currentCurrency) option.attr("selected", "selected");
      dropdown.append(option);
    });

    dropdown.on("change", function () {
      const selected = $(this).val();
      convertAndDisplayPrices(selected);
    });

    $("body").prepend(dropdown); // You can move this elsewhere if needed
  }

  $(document).ready(function () {
    Promise.all([fetchConversionRates(), getUserCurrencyByGeo()])
      .then(([_, detectedCurrency]) => {
        const isSupported = supportedCurrencies.includes(detectedCurrency);
        const currencyToUse = isSupported ? detectedCurrency : baseCurrency;

        convertAndDisplayPrices(currencyToUse);

        if (!isSupported) {
          createCurrencyDropdown(currencyToUse);
        }
      });
  });
})(jQuery);
