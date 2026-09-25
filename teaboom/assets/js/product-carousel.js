'use strict';

(() => {
	const productCarousel = document.querySelector('.tb-product-carousel');

	if (!productCarousel) {
		return;
	}

	waitFor(['embla'], () => {
		const OPTIONS = {};

		const viewportNodeMainCarousel = productCarousel.querySelector('.embla__viewport');
		const emblaApiMain = EmblaCarousel(viewportNodeMainCarousel, OPTIONS);

		const viewportNodeThumbCarousel = document.querySelector('.embla-thumbs__viewport');

		if (viewportNodeThumbCarousel) {
			const OPTIONS_THUMBS = {
				containScroll: 'keepSnaps',
				dragFree: true
			};

			const emblaApiThumb = EmblaCarousel(viewportNodeThumbCarousel, OPTIONS_THUMBS);

			addThumbButtonClickHandlers(emblaApiMain, emblaApiThumb);
			addToggleThumbButtonsActive(emblaApiMain, emblaApiThumb);
		}
	});
})();
