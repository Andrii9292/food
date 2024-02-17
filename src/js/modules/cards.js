import {getResourse} from "../services/services";
function cards() {
  class MenuCard {
    constructor(src, alt, title, description, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.description = description;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
      this.exchangeRates = 35;
      this.convertToUAH();
    }
    
    convertToUAH() {
      this.price = this.price * this.exchangeRates
    }
    
    render() {
      const div = document.createElement("div");
      
      if(this.classes.length === 0) {
        div.classList.add('menu__item')
      } else {
        this.classes.forEach(className => div.classList.add(className))
      }
      
      div.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.description}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `
      this.parent.append(div)
    }
  }
  
  getResourse( 'http://localhost:3000/menu')
    .then(data => {
      data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container'
        ).render()
      })
  })
}

export default cards