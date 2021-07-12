class UserCardwithoutShadowDom extends HTMLElement {
    constructor() {
        //in order to call the constructor of the class HTML we use the super method
        super();
        // this.innerHTML = `John Doe`;
        this.innerHTML = `<style>h3{color: blue;}</style><h3>${this.getAttribute('name')}</h3>`;

    }
}

window.customElements.define('user-card-without-shadow-dom', UserCardwithoutShadowDom);

