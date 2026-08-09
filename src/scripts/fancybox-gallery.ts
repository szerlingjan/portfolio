import { Fancybox } from "@fancyapps/ui/dist/fancybox/";

export function initGalleryFancybox() {
  Fancybox.bind("[data-fancybox]", {
    theme: "auto",
    mainStyle: {
      "--f-button-width": "44px",
      "--f-button-height": "44px",
      "--f-button-border-radius": "50%",
      "--f-toolbar-padding": "16px",
    },
    Carousel: {
      Arrows: false,
      Toolbar: {
        display: {
          left: [],
          middle: [],
          right: ["download", "close"],
        },
      },
      transition: "slide",
    },
  });
}

initGalleryFancybox();
