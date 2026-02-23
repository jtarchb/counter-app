/**
 * Copyright 2026 jtarchb
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `counter-app`
 * 
 * @demo index.html
 * @element counter-app
 */
export class CounterApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/counter-app.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
    this.counter =0
    this.min = 10;
    this.max = 25;
  }

  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      counter: { type: Number, reflect: true },
      min: { type: Number, reflect: true },
      max: { type: Number, reflect: true },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-primary);
          background-color: var(--ddd-theme-default-nittanyNavy);
          font-family: var(--ddd-font-navigation);
        }

        .wrapper {
          margin: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-4);
        }

        h3 {
          margin: 0 0 var(--ddd-spacing-4) 0;
          font-size: var(--ddd-font-size-xxl);
        }

        .buttons {
          display: inline-flex;
          gap: var(--ddd-spacing-2);
        }

        button {
          padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
          border-radius: var(--ddd-radius-sm);
          border: var(--ddd-border-sm);
          background-color: var(--ddd-theme-default-white);
          color: var(--ddd-theme-default-nittanyNavy);
          cursor: pointer;
        }

        button:hover {
          box-shadow: var(--ddd-boxShadow-sm);
        }

        button:focus-visible {
          outline: 3px solid var(--ddd-theme-default-original87Pink);
          outline-offset: 2px;
        }

        button[disabled] {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `,
    ];
  }


  get numberColor() {
    if (this.counter === this.min || this.counter === this.max) {
      return "var(--ddd-theme-default-inventOrange)";
    }
    if (this.counter === 18) {
      return "var(--ddd-theme-default-original87Pink)";
    }
    if (this.counter === 21) {
      return "var(--ddd-theme-default-wonderPurple)";
    }
    return "var(--ddd-theme-primary)";
  }

  render() {
    return html`
      <confetti-container id="confetti">
        <div class="wrapper">
          <h3 style="color:${this.numberColor}">${this.counter}</h3>
          <div class="buttons">
            <button
              @click=${this.decrement}
              ?disabled=${this.min === this.counter}
            >
              -
            </button>
            <button
              @click=${this.increment}
              ?disabled=${this.max === this.counter}
            >
              +
            </button>
          </div>
          <slot></slot>
        </div>
      </confetti-container>
    `;
  }

  increment() {
    if (this.counter < this.max) {
      this.counter++;
    }
  }

  decrement() {
    if (this.counter > this.min) {
      this.counter--;
    }
  }

  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    if (changedProperties.has("counter")) {
      if (this.counter === 21) {
        this.makeItRain();
      }
    }
  }

  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);