class UserCard extends HTMLElement {
  constructor() {
    super();

    let template = document.createElement('template');
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  get name() {
    return this.getAttribute('name');
  }

  get avatar() {
    return `https://randomuser.me/api/portraits/${this.getAttribute(
      'gender'
    )}/${~~(Math.random() * 50)}.jpg`;
  }

  get email() {
    return this.getAttribute('email');
  }

  get phone() {
    return this.getAttribute('phone');
  }

  connectedCallback() {
    this.getHTML();
  }

  getHTML = async () => {
    let _this = this;
    let res = await fetch(
      'http://localhost:5500/components/html/user-card.html'
    );

    let html = await res.text();
    _this.shadowRoot.innerHTML = html;
    _this.createCard();
  };

  createCard = () => {
    let _this = this;
    _this.shadowRoot.querySelector('h3').innerText = this.name;
    _this.shadowRoot.querySelector('#email').innerText = this.email;
    _this.shadowRoot.querySelector('#phone-number').innerText = this.phone;

    let image = _this.shadowRoot.querySelector('img');
    image.src = this.avatar;
  };
}

window.customElements.define('user-card', UserCard);
