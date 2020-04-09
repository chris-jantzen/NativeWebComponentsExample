class UserList extends HTMLElement {
  constructor() {
    super();

    let template = document.createElement('template');
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.getHTML();
  }

  getHTML = async () => {
    let _this = this;
    let res = await fetch(
      'http://localhost:5500/components/html/user-list.html'
    );

    let html = await res.text();
    _this.shadowRoot.innerHTML = html;
  };
}

window.customElements.define('user-list', UserList);
