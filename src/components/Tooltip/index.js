export default {
  bind(el, binding) {
    let node = document.querySelector("#du-tooltip");
    let arg = binding.arg || "bottom";
    let top = arg === "top";
    el.alt = binding.value;
    if (!node) {
      node = document.createElement("div");
      node.id = "du-tooltip";
      document.body.appendChild(node);
    }

    //mouse enter event
    el.addEventListener("mouseenter", () => {
      node.innerText = el.alt;
      let elBCR = el.getBoundingClientRect();
      let elHei = elBCR.height;
      var elPos = elHei + 8; //bottom
      if (top) {
        let nodeBCR = node.getBoundingClientRect();

        elPos = -nodeBCR.height - 8;
        node.classList.add("top");
      }
      node.setAttribute(
        "style",
        "top:" +
          (elBCR.top + elPos) +
          "px;" +
          "left:" +
          elBCR.left +
          "px;" +
          "opacity: 1"
      );
    });

    //mouse leave event
    el.addEventListener("mouseleave", () => {
      node.style.opacity = 0;
    });
  },

  unbind(el) {
    el.removeEventListener("mouseenter", () => {});
    el.removeEventListener("mouseleave", () => {});
  }
};
