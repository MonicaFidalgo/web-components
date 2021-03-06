const template = document.createElement('template');

template.innerHTML = `
    <style>
    h3 {
        color: pink;
    }
    p {
        background-color: pink;
    }
    .user-card {
		font-family: 'Arial', sans-serif;
		background: #f4f4f4;
		width: 500px;
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-gap: 10px;
		margin-bottom: 15px;
		border-bottom: darkorchid 5px solid;
	}

	.user-card img {
		width: 100%;
	}

	.user-card button {
		cursor: pointer;
		background: darkorchid;
		color: #fff;
		border: 0;
		border-radius: 5px;
		padding: 5px 10px;
	}
    </style>

    <div class="user-card">
        <img>
        <div>
            <h3></h3>
            <div class="info">
                <p><slot name="email" /></p>
                <p><slot name="phone" /></p>
            </div>
            <button id="toggle-info">Hide info</button>
        </div>
    </div>
`;

//note that we dont use this.getAttribute inside our template because it doesnt know what this is

class UserCardwithShadowDom extends HTMLElement {
    constructor() {
        //in order to call the constructor of the class HTML we use the super method
        super();

        this.showInfo = true;

        this.attachShadow({mode: 'open'});
        //we need to add our shadow or else we dont see nothing
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('h3').innerHTML = this.getAttribute('name');
        this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
    }

    toggleInfo() {
        this.showInfo = !this.showInfo;

        const info = this.shadowRoot.querySelector('.info');
        const toggleBtn = this.shadowRoot.querySelector('#toggle-info');

        if(this.showInfo) {
            info.style.display = 'block';
            toggleBtn.innerText = 'Hide info';
        } else {
            info.style.display = 'none';
            toggleBtn.innerText = 'Show info';
        }
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo());
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').removeEventListener();
    }
}

window.customElements.define('user-card-with-shadow-dom', UserCardwithShadowDom);