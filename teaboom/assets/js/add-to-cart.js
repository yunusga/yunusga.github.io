'use strict';

(() => {
	const globalData = {
		price: 0,
		regularPrice: 0,
		qty: 1,
	};

	function getHTMLPrice(price, qty) {
		const number = price * qty;
		const result = number.toFixed(2);

		// Для русского языка (разделитель тысяч — пробел, дробной части — запятая)
		const formatterRu = new Intl.NumberFormat('ru-RU', {
			minimumFractionDigits: 2, // Не показывать .00, если число целое (поставьте 2, если нужно всегда)
			maximumFractionDigits: 2  // Не более 2 знаков после запятой
		});

		return formatterRu.format(result);
	}

	function buildPriceView() {
		if (globalData.price !== globalData.regularPrice) {
			priceView.innerHTML = `
				<div class="tb-product-price tb-product-price--new"><b>${getHTMLPrice(globalData.price, globalData.qty)} ₽</b></div>
				<div class="tb-product-price tb-product-price--old"><s>${getHTMLPrice(globalData.regularPrice, globalData.qty)} ₽</s></div>
			`;
		} else {
			priceView.innerHTML = `<div class="tb-product-price"><b>${getHTMLPrice(globalData.price, globalData.qty)} ₽</b></div>`;
		}
	}

	const productDataJSON = document.getElementById('add-to-cart-form-variants');
	const priceView = document.querySelector('.-price-view-');

	if (!productDataJSON) {
		return;
	}

	const productData = JSON.parse(productDataJSON.innerHTML);

	// Выбор фасовки (если есть)
	if (productData.variants) {
		const productPackage = document.getElementById('product-package');
		const labelSku = document.querySelectorAll('.-sku-');
		const labelPackage = document.querySelectorAll('.-package-');
		const labelAvailability = document.querySelectorAll('.-availability-');

		globalData.price = parseFloat(productData.variants[0].price);
		globalData.regularPrice = parseFloat(productData.variants[0].regular_price);

		console.log(globalData)

		productPackage.addEventListener('change', () => {
			const selected = productData.variants.filter((item) => item.sku === productPackage.value)[0];

			globalData.price = parseFloat(selected.price);
			globalData.regularPrice = parseFloat(selected.regular_price);

			if (labelSku.length) {
				labelSku.forEach((item) => {
					item.innerHTML = selected.sku;
				});
			}

			if (labelPackage.length) {
				labelPackage.forEach((item) => {
					item.innerHTML = selected.name;
				});
			}

			if (labelAvailability.length) {
				labelAvailability.forEach((item) => {
					item.innerHTML = selected.availability;
				});
			}

			buildPriceView();
		});
	} else {
		globalData.price = parseFloat(productData.price);
		globalData.regularPrice = parseFloat(productData.regular_price);
	}

	const productQty = document.getElementById('product-qty');

	if (productQty) {
		const labelQty = document.querySelectorAll('.-qty-');

		globalData.qty = parseInt(productQty.value);

		productQty.addEventListener('input', () => {
			let qty = productQty.value;

			globalData.qty = parseInt(qty);

			labelQty.forEach((item) => {
				item.innerHTML = qty;
			});

			buildPriceView();
		});
	}
})();
