import {debounce} from "@/utils/helpers.js";

let mEnter = null;
let mLeave = null;
let dOut = null;

export default {
  bind(el, binding) {
    let node = document.querySelector("#du-tooltip");
    let arg = binding.arg || "bottom";
    let margin = 8;
    el.alt = binding.value;
    if (!node) {
      node = document.createElement("div");
      node.id = "du-tooltip";
      document.body.appendChild(node);
    }

    // config timeout
    let timeout = 200;
    let clearTO = null;

    //mouse enter event
    mEnter = () => {
      if(clearTO) clearTimeout(clearTO);
      node.innerText = el.alt;
      let elBCR = el.getBoundingClientRect();
      let elHei = elBCR.height;
      let elTop = elHei + margin; //bottom
      let elLeft = 0;
      let nodeBCR = node.getBoundingClientRect();
      if (arg === "top") {
        elTop = -nodeBCR.height - margin;
      }
      else if(arg === "left"){
        elTop = elTop/2 + -nodeBCR.height/2;
        elLeft = -nodeBCR.width - margin; //left
      }
      else if(arg === "right"){
        elTop = elTop/2 + -nodeBCR.height/2;
        elLeft = elBCR.width + margin; //left
      }
      
      node.classList.add(arg);
      node.setAttribute(
        "style",
        "top:" +
          (elBCR.top + elTop) +
          "px;" +
          "left:" +
          (elBCR.left + elLeft) +
          "px;" +
          "opacity: 1"
      );
    };
    
    //mouse leave event
    mLeave = () => {
      clearTO = setTimeout(function(){
        node.style.opacity = 0;
      },timeout);
    }

    // document mouse out
    dOut = (e) =>  {
      let t = e.relatedTarget || e.toElement;
        if (!t || t.nodeName == "HTML") {
          node.style.opacity = 0;
        }
    }

    // add event
    el.addEventListener("mouseleave", mLeave, false);
    el.addEventListener("mouseenter", debounce(mEnter,timeout), false);
    document.addEventListener("mouseout", debounce(dOut,timeout), false);
  },

  unbind(el) {
    el.removeEventListener("mouseenter", mEnter, false);
    el.removeEventListener("mouseleave", mLeave, false);
    document.removeEventListener("mouseout", dOut, false);
  }
};
