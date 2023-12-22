(() => {
  "use strict";
  
  function t(t, e) {
    const n = document.querySelector(t);
    n.classList.add("show"), n.classList.remove("hide"), document.body.style.overflow = "hidden", e && clearTimeout(e)
  }
  
  function e(t) {
    const e = document.querySelector(t);
    e.classList.add("hide"), e.classList.remove("show"), document.body.style.overflow = "unset"
  }
  
  document.addEventListener("DOMContentLoaded", (() => {
    const n = setTimeout((() => t(".modal")), 5e4);
    (function(t, e, n, o) {
      const s = document.querySelectorAll(t), a = document.querySelectorAll(e), r = document.querySelector(n);
      
      function c() {
        a.forEach((t => {
          t.classList.add("hide"), t.classList.remove("show", "fade")
        })), s.forEach((t => {
          t.classList.remove(o)
        }))
      }
      
      function i(t = 0) {
        a[t].classList.add("show", "fade"), a[t].classList.remove("hide"), s[t].classList.add(o)
      }
      
      c(), i(), r.addEventListener("click", (e => {
        const n = e.target;
        n.classList.contains(t.slice(1)) && s.forEach(((t, e) => {
          n == t && (c(), i(e))
        }))
      }))
    })(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active"), function(t, e) {
      function n(t) {
        return t >= 0 && t < 10 ? `0${t}` : t
      }
      
      !function(t, e) {
        const o = document.querySelector(t), s = o.querySelector("#days"), a = o.querySelector("#hours"),
          r = o.querySelector("#minutes"), c = o.querySelector("#seconds"), i = setInterval(l, 1e3);
        
        function l() {
          const t = function(t) {
            let e, n, o, s;
            const a = Date.parse(t) - new Date;
            return a <= 0 ? (e = 0, n = 0, o = 0, s = 0) : (e = Math.floor(a / 864e5), n = Math.floor(a / 36e5 % 60), o = Math.floor(a / 6e4 % 60), s = Math.floor(a / 1e3 % 60)), {
              total: a,
              days: e,
              hours: n,
              minutes: o,
              seconds: s
            }
          }(e);
          s.innerHTML = n(t.days), a.innerHTML = n(t.hours), r.innerHTML = n(t.minutes), c.innerHTML = n(t.seconds), t.total <= 0 && clearInterval(i)
        }
        
        l()
      }(t, e)
    }(".timer", "2023-12-31"), function(n, o, s) {
      const a = document.querySelectorAll(n), r = document.querySelector(o);
      a.forEach((e => {
        e.addEventListener("click", (() => t(o, s)))
      })), r.addEventListener("click", (t => {
        t.target !== r && "" !== t.target.getAttribute("data-close") || e(o)
      })), document.addEventListener("keydown", (t => {
        "Escape" === t.code && r.classList.contains("show") && e(o)
      })), window.addEventListener("scroll", (function e() {
        window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight && (t(o, s), removeEventListener("scroll", e))
      }))
    }("[data-modal]", ".modal", n), function() {
      class t {
        constructor(t, e, n, o, s, a, ...r) {
          this.src = t, this.alt = e, this.title = n, this.description = o, this.price = s, this.parent = document.querySelector(a), this.classes = r, this.exchangeRates = 35, this.convertToUAH()
        }
        
        convertToUAH() {
          this.price = this.price * this.exchangeRates
        }
        
        render() {
          const t = document.createElement("div");
          0 === this.classes.length ? t.classList.add("menu__item") : this.classes.forEach((e => t.classList.add(e))), t.innerHTML = `\n        <img src=${this.src} alt=${this.alt}>\n        <h3 class="menu__item-subtitle">${this.title}</h3>\n        <div class="menu__item-descr">${this.description}</div>\n        <div class="menu__item-divider"></div>\n        <div class="menu__item-price">\n          <div class="menu__item-cost">Цена:</div>\n          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>\n        </div>\n      `, this.parent.append(t)
        }
      }
      
      (async t => {
        const e = await fetch(t);
        if(!e.ok) throw new Error(`Could not fetch ${t}, status: ${e.status}`);
        return await e.json()
      })("http://localhost:3000/menu").then((e => {
        e.forEach((({img: e, altimg: n, title: o, descr: s, price: a}) => {
          new t(e, n, o, s, a, ".menu .container").render()
        }))
      }))
    }(), function(n, o) {
      function s(n) {
        const s = document.querySelector(".modal__dialog");
        s.classList.add("hide"), t(".modal", o);
        const a = document.createElement("div");
        a.classList.add("modal__dialog"), a.innerHTML = `\n            <div class="modal__content">\n                <div class="modal__close" data-close>×</div>\n                <div class="modal__title">${n}</div>\n            </div>\n        `, document.querySelector(".modal").append(a), setTimeout((() => {
          a.remove(), s.classList.add("show"), s.classList.remove("hide"), e(".modal")
        }), 3e3)
      }
      
      document.querySelectorAll(n).forEach((t => {
        var e;
        (e = t).addEventListener("submit", (t => {
          t.preventDefault();
          let n = document.createElement("img");
          n.src = "./src/img/form/spinner.svg", n.style.cssText = "\n        display: block;\n        margin: 0 auto;\n      ", e.appendChild(n);
          const o = new FormData(e);
          (async(t, e) => {
            const n = await fetch("http://localhost:3000/requests", {
              method: "POST",
              headers: {"Content-type": "application/json"},
              body: e
            });
            return await n.json()
          })(0, JSON.stringify(Object.fromEntries(o.entries()))).then((t => {
            s("Спасибо! Скоро мы с вами свяжемся"), n.remove()
          })).catch((() => {
            s("Что-то пошло не так...")
          })).finally((() => e.reset()))
        }))
      }))
    }("form", n), function({
      container: t,
      slide: e,
      nextArrow: n,
      prevArrow: o,
      totalCounter: s,
      currentCounter: a,
      wrapper: r,
      field: c
    }) {
      let i = 0, l = 1;
      const d = document.querySelectorAll(e), u = document.querySelector(t), m = document.querySelector(o),
        h = document.querySelector(n), g = document.querySelector(s), f = document.querySelector(a),
        y = document.querySelector(r), p = window.getComputedStyle(y).width, v = document.querySelector(c);
      d.length < 10 ? (g.textContent = `0${d.length}`, f.textContent = `0${l}`) : (g.textContent = d.length, f.textContent = l), v.style.width = 100 * d.length + "%", v.style.display = "flex", v.style.transition = "0.7s all", y.style.overflow = "hidden", d.forEach((t => {
        t.style.width = p
      })), u.style.position = "relative";
      const _ = document.createElement("ol"), L = [];
      _.classList.add("carousel-indicators"), _.style.cssText = "\n        position: absolute;\n        right: 0;\n        bottom: 0;\n        left: 0;\n        z-index: 15;\n        display: flex;\n        justify-content: center;\n        margin-right: 15%;\n        margin-left: 15%;\n        list-style: none;\n    ", u.append(_);
      for(let t = 0; t < d.length; t++) {
        const e = document.createElement("li");
        e.setAttribute("data-slide-to", t + 1), e.style.cssText = "\n            box-sizing: content-box;\n            flex: 0 1 auto;\n            width: 30px;\n            height: 6px;\n            margin-right: 3px;\n            margin-left: 3px;\n            cursor: pointer;\n            background-color: #fff;\n            background-clip: padding-box;\n            border-top: 10px solid transparent;\n            border-bottom: 10px solid transparent;\n            opacity: .5;\n            transition: opacity .6s ease;\n        ", 0 == t && (e.style.opacity = 1), _.append(e), L.push(e)
      }
      
      function x(t) {
        return Number(t.replace(/\D/gi, ""))
      }
      
      h.addEventListener("click", (() => {
        i == x(p) * (d.length - 1) ? i = 0 : i += x(p), v.style.transform = `translateX(-${i}px)`, l == d.length ? l = 1 : l++, d.length < 10 ? f.textContent = `0${l}` : f.textContent = l, L.forEach((t => t.style.opacity = ".5")), L[l - 1].style.opacity = 1
      })), m.addEventListener("click", (() => {
        0 == i ? i = x(p) * (d.length - 1) : i -= x(p), v.style.transform = `translateX(-${i}px)`, 1 == l ? l = d.length : l--, d.length < 10 ? f.textContent = `0${l}` : f.textContent = l, L.forEach((t => t.style.opacity = ".5")), L[l - 1].style.opacity = 1
      })), L.forEach((t => {
        t.addEventListener("click", (t => {
          const e = t.target.getAttribute("data-slide-to");
          l = e, i = x(p) * (e - 1), v.style.transform = `translateX(-${i}px)`, d.length < 10 ? f.textContent = `0${l}` : f.textContent = l, L.forEach((t => t.style.opacity = ".5")), L[l - 1].style.opacity = 1
        }))
      }))
    }({
      container: ".offer__slider",
      slide: ".offer__slide",
      nextArrow: ".offer__slider-next",
      prevArrow: ".offer__slider-prev",
      totalCounter: "#total",
      currentCounter: "#current",
      wrapper: ".offer__slider-wrapper",
      field: ".offer__slider-inner"
    }), function() {
      const t = document.querySelector(".calculating__result span");
      let e, n, o, s, a;
      
      function r(t, e) {
        document.querySelectorAll(t).forEach((t => {
          t.classList.remove("calculating__choose-item_active"), t.getAttribute("id") === localStorage.getItem("sex") && t.classList.add(e), t.getAttribute("data-ratio") === localStorage.getItem("ratio") && t.classList.add(e)
        }))
      }
      
      function c() {
        t.textContent = e && n && o && s && a ? "female" === e ? Math.round((447.6 + 9.2 * o + 3.1 * n - 4.3 * s) * a) : Math.round((88.36 + 13.4 * o + 4.8 * n - 5.7 * s) * a) : "____"
      }
      
      function i(t, n) {
        const o = document.querySelectorAll(`${t} div`);
        o.forEach((t => {
          t.addEventListener("click", (t => {
            t.target.getAttribute("data-ratio") ? (a = +t.target.getAttribute("data-ratio"), localStorage.setItem("ratio", +t.target.getAttribute("data-ratio"))) : (e = t.target.getAttribute("id"), localStorage.setItem("sex", t.target.getAttribute("id"))), o.forEach((t => {
              t.classList.remove(n)
            })), t.target.classList.add(n), c()
          }))
        }))
      }
      
      function l(t) {
        const e = document.querySelector(t);
        e.addEventListener("input", (() => {
          switch(e.value.match(/\D/g) ? e.style.border = "1px solid red" : e.style.border = "none", e.getAttribute("id")) {
            case"height":
              n = +e.value;
              break;
            case"weight":
              o = +e.value;
              break;
            case"age":
              s = +e.value
          }
          c()
        }))
      }
      
      localStorage.getItem("sex") ? e = localStorage.getItem("sex") : (e = "female", localStorage.setItem("sex", "female")), localStorage.getItem("ratio") ? a = +localStorage.getItem("ratio") : (a = 1.375, localStorage.setItem("ratio", 1.375)), r("#gender div", "calculating__choose-item_active"), r(".calculating__choose div", "calculating__choose-item_active"), c(), i("#gender", "calculating__choose-item_active"), i(".calculating__choose_big", "calculating__choose-item_active"), l("#height"), l("#weight"), l("#age")
    }()
  }))
})();
//# sourceMappingURL=bundle.js.map