(function ($) {
  const supportedCurrencies = ["USD", "GBP", "EUR", "AUD", "CAD", "NZD"];
  const baseCurrency = "AUD";
  const currencySymbolMap = {
    USD: "$", GBP: "£", EUR: "€", AUD: "$", CAD: "$", NZD: "$"
  };

  // Example fixed conversion rates for demonstration
  const conversionRates = {
    USD: 0.65, GBP: 0.52, EUR: 0.61, AUD: 1, CAD: 0.88, NZD: 1.07
  };

  const priceSelector = ".sqs-money-native"; // Adjust if needed

  function getUserCurrencyByGeo() {
    return fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => data.currency)
      .catch(() => null);
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
    const dropdown = $('<select id="currency-selector" style="margin: 1em 0;"></select>');
    supportedCurrencies.forEach(cur => {
      const option = $('<option></option>').val(cur).text(cur);
      if (cur === currentCurrency) option.attr("selected", "selected");
      dropdown.append(option);
    });

    dropdown
