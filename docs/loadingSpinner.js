const currentScript = document.currentScript;
if (currentScript) {
  const scriptSrc = currentScript.src;
  console.log("当前脚本的 src:", scriptSrc);
  console.log(new URLSearchParams(new URL(scriptSrc).search).get('c-title'))
} else {
  console.error("无法获取当前脚本标签。");
}

class LoadingSpinner extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'closed' });
    // 读取attr
    const cTitle = this.getAttribute("c-title");
    const cDescription = this.getAttribute("c-description");
    // HTML Template
    const template = document.createElement('template');

    template.innerHTML = `
      <div id="loader-wrapper">
        <div id="loader"></div>
        <div class="loader-section section-left"></div>
        <div class="loader-section section-right"></div>
        <div class="load_title">
        ${cTitle ? cTitle : ''}
          <br/>
          ${cDescription ? '<span>思必驰对话大模型</span><br/>' : ''}
          <slot name="slot"></slot>
        </div>
      </div>
      <style>
        #loader-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10;
        }

        #loader {
          display: block;
          position: relative;
          left: 50%;
          top: 50%;
          width: 100px;
          height: 100px;
          margin: -80px 0 0 -50px;
          border-radius: 50%;
          border: 3px solid transparent;
          border-top-color: #ccc;
          animation: spin 2s linear infinite;
          z-index: 1001;
        }

        #loader:before {
          content: "";
          position: absolute;
          top: 5px;
          left: 5px;
          right: 5px;
          bottom: 5px;
          border-radius: 50%;
          border: 3px solid transparent;
          border-top-color: #ccc;
          animation: spin 3s linear infinite;
        }

        #loader:after {
          content: "";
          position: absolute;
          top: 15px;
          left: 15px;
          right: 15px;
          bottom: 15px;
          border-radius: 50%;
          border: 3px solid transparent;
          border-top-color: #ccc;
          animation: spin 1.5s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        #loader-wrapper .loader-section {
          position: fixed;
          top: 0;
          width: 51%;
          height: 100%;
          background: #fff;
          z-index: 1000;
          transform: translateX(0);
        }

        #loader-wrapper .loader-section.section-left {
          left: 0;
        }

        #loader-wrapper .loader-section.section-right {
          right: 0;
        }

        .loaded #loader-wrapper .loader-section.section-left {
          transform: translateX(-100%);
          transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);
        }

        .loaded #loader-wrapper .loader-section.section-right {
          transform: translateX(100%);
          transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);
        }

        .loaded #loader {
          opacity: 0;
          transition: all 0.3s ease-out;
        }

        .loaded #loader-wrapper {
          visibility: hidden;
          transform: translateY(-100%);
          transition: all 0.3s 1s ease-out;
        }

        .no-js #loader-wrapper {
          display: none;
        }

        .no-js h1 {
          color: #222222;
        }

        #loader-wrapper .load_title {
          font-family: 'Open Sans';
          color: #000;
          font-size: 18px;
          width: 100%;
          text-align: center;
          z-index: 9999999999999;
          position: absolute;
          top: 60%;
          opacity: 1;
          line-height: 30px;
        }

        #loader-wrapper .load_title span {
          font-weight: normal;
          font-style: italic;
          font-size: 13px;
          color: #000;
          opacity: 0.5;
        }
      </style>
    `;
    shadow.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('loading-spinner', LoadingSpinner);

// const app = document.getElementById('app')
// if (app) {
//   app.innerHTML = ` <loading-spinner c-title="正在加载...，请耐心等待" c-description="思必驰对话大模型">
//   <!-- <div slot="slot">slot</div> -->
// </loading-spinner>`
// } 