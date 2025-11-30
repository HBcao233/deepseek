import { ElElement, html, css } from '/assets/element-plus-lit.min.js';

class Input extends ElElement {
  static styles = css`
:host {
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 840px;
  margin: auto;
  padding: 0 32px 64px;
  display: flex;
  position: relative;
}
@media not all and (min-width: 1024px) {
  :host {
    max-width: 712px;
  }
}

.logo {
  color: #0f1115;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  margin-bottom: 32px;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  display: flex;
}
@media not all and (min-width: 640px) {
  .logo {
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
  }
}

.logo svg {
  width: 34px;
  height: 25px;
  margin-right: 10px;
  color: #3964fe;
}

.ds-input {
  --line-height: 24px;
  flex-grow: 1;
  width: 100%;
  position: relative;
  cursor: text;
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  line-height: var(--line-height);
  transition: box-shadow var(--ds-transition-duration)var(--ds-ease-in-out);
  border: 1px solid rgba(0,0,0,.1);
  background: #fff;
  border-radius: 24px;
  flex-direction: column;
  display: flex;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,.02),0 2px 2px rgba(72,104,178,.01),0 30px 60px rgba(72,104,178,.03);
  z-index: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
}

.inputarea {
  width: 100%;
  max-height: 336px;
  position: relative;
}

.inputarea .textarea {
  --input-padding-top: 12px;
  font-variant-ligatures: no-contextual;
  font-size: inherit;
  line-height: inherit;
  width: 100%;
  padding-bottom: 0;
  padding-left: 18px;
  padding-right: 12px;
  padding-top: var(--input-padding-top);
  min-height: calc(var(--line-height)*2 + var(--input-padding-top));
  font-family: inherit;
  display: block;
  box-sizing: border-box;
  word-break: break-word;
  white-space: pre-wrap;
  border: none;
  margin: 0;
  overflow: auto;
  overscroll-behavior: contain;
  height: 100%;
  resize: none;
  color: #0f1115;
  caret-color: #3964fe;
  background-color: transparent;
  -webkit-mask: none;
  mask: none;
}
.inputarea textarea {
  position: absolute;
  outline: none;
}
.inputarea .textarea + div {
  visibility: hidden;
  pointer-events: none;
}
@media not all and (min-width: 640px) {
  .inputarea .textarea {
    min-height: calc(var(--line-height)*1.25 + var(--input-padding-top));
  }
}


.toolbar {
  box-sizing: border-box;
  align-items: center;
  width: 100%;
  padding: 12px;
  display: flex;
  overflow: hidden;
}

.toolbar el-button::part(el-button) {
  box-sizing: border-box;
  padding: 0 10px;
  width: auto;
  height: 34px;
}
.toolbar .toggle-reasoning {
  margin-right: 10px;
}

.toolbar el-button::part(el-button) {
  --el-button-text-color: #0f1115;
  --el-button-border-color: rgba(0,0,0,.1);
  --el-button-hover-text-color: #0f1115;
  --el-button-hover-border-color: rgba(0,0,0,.1);
  --el-button-hover-bg-color: rgba(38,49,72,.06);
  --el-button-active-text-color: #3964fe;
  --el-button-active-bg-color: #e4edfd;
  --el-button-active-border-color: #b7c8fe;
}
.toolbar el-button.selected::part(el-button) {
  color: var(--el-button-active-text-color);
  background-color: var(--el-button-active-bg-color);
  border-color: var(--el-button-active-border-color);
}

el-button[circle]::part(content) {
  display: none;
}

.toolbar el-button el-icon {
  color: inherit;
}

.toolbar .right {
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
  display: flex;
}

.toolbar .select-file {
  margin-right: 10px;
}
.toolbar .select-file::part(el-button) {
  border: none;
  width: 34px;
  height: 34px;
}
.toolbar .select-file::part(el-button):hover {
  background-color: var(--dsw-alias-interactive-bg-hover);
}
.toolbar .select-file el-icon {
  font-size: 16px;
}

.toolbar .ds-send::part(el-button) {
  --el-button-text-color: #fff;
  --el-button-hover-text-color: #fff;
  --el-button-active-text-color: #fff;
  --el-button-disabled-text-color: #fff;
  --el-button-bg-color: #3964fe;
  --el-button-disabled-bg-color: #3964fe;
  --el-button-active-bg-color: #3964fe;
  --el-button-hover-bg-color: #5686fe;
  width: 34px;
  height: 34px;
  border: none;
}
.toolbar .ds-send[disabled]::part(el-button) {
  opacity: .4;
}
  `;
  
  static properties = {
    reasoning: {
      type: Boolean,
      state: true,
      default: !!window.localStorage.getItem('reasoning'),
    },
    value: {
      type: String,
      state: true,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
      attribute: true,
    },
  }
  
  updated(changedProps) {
    if (changedProps.has('reasoning')) window.localStorage.setItem('reasoning', parseInt(this.reasoning));
  }

  render() {
    return html`

<div part="logo" class="logo">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 26" fill="currentColor"><path d="M33.615 2.598c-.36-.176-.515.16-.726.33-.072.055-.132.127-.193.193-.526.562-1.14.93-1.943.887-1.174-.067-2.176.302-3.062 1.2-.188-1.107-.814-1.767-1.766-2.191-.498-.22-1.002-.441-1.35-.92-.244-.341-.31-.721-.433-1.096-.077-.226-.154-.457-.415-.496-.282-.044-.393.193-.504.391-.443.81-.614 1.702-.598 2.605.04 2.033.898 3.652 2.603 4.803.193.132.243.264.182.457-.116.397-.254.782-.376 1.179-.078.253-.194.308-.465.198-.936-.391-1.744-.97-2.458-1.669-1.213-1.173-2.31-2.467-3.676-3.48a16.254 16.254 0 0 0-.975-.668c-1.395-1.354.183-2.467.548-2.599.382-.138.133-.612-1.102-.606-1.234.005-2.364.42-3.803.97a4.34 4.34 0 0 1-.66.193 13.577 13.577 0 0 0-4.08-.143c-2.667.297-4.799 1.558-6.365 3.712C.116 8.436-.327 11.378.215 14.444c.57 3.233 2.22 5.91 4.755 8.002 2.63 2.17 5.658 3.233 9.113 3.03 2.098-.122 4.434-.403 7.07-2.633.664.33 1.362.463 2.518.562.892.083 1.75-.044 2.414-.182 1.04-.22.97-1.184.593-1.36-3.05-1.421-2.38-.843-2.99-1.311 1.55-1.834 3.918-5.093 4.648-9.531.072-.49.164-1.18.153-1.577-.006-.242.05-.336.326-.364a5.903 5.903 0 0 0 2.187-.672c1.977-1.08 2.774-2.853 2.962-4.978.028-.325-.006-.661-.35-.832ZM16.39 21.73c-2.956-2.324-4.39-3.089-4.982-3.056-.554.033-.454.667-.332 1.08.127.407.293.688.526 1.046.16.237.271.59-.161.854-.952.589-2.607-.198-2.685-.237-1.927-1.134-3.537-2.632-4.673-4.68-1.096-1.972-1.733-4.087-1.838-6.345-.028-.545.133-.738.676-.837A6.643 6.643 0 0 1 5.086 9.5c3.017.441 5.586 1.79 7.74 3.927 1.229 1.217 2.159 2.671 3.116 4.092 1.02 1.509 2.115 2.946 3.51 4.125.494.413.887.727 1.263.958-1.135.127-3.028.154-4.324-.87v-.002Zm1.417-9.114a.434.434 0 0 1 .587-.408c.06.022.117.055.16.105a.426.426 0 0 1 .122.303.434.434 0 0 1-.437.435.43.43 0 0 1-.432-.435Zm4.402 2.257c-.283.116-.565.215-.836.226-.421.022-.88-.149-1.13-.358-.387-.325-.664-.506-.78-1.073-.05-.242-.022-.617.022-.832.1-.463-.011-.76-.338-1.03-.265-.22-.603-.28-.974-.28a.8.8 0 0 1-.36-.11c-.155-.078-.283-.27-.161-.508.039-.077.227-.264.271-.297.504-.286 1.085-.193 1.623.022.498.204.875.578 1.417 1.107.553.639.653.815.968 1.295.25.374.476.76.632 1.2.094.275-.028.5-.354.638Z"></path></svg>
  今天有什么可以帮到你？
</div>
<div part="ds-input" class="ds-input">
  <div class="inputarea">
    <textarea class="textarea" placeholder="给 DeepSeek 发送消息 " rows="2" .value="${this.value}"></textarea>
    <div class="textarea" .innerText="${this.value}"></div>
  </div>
  <div class="toolbar">
    <el-button circle class="toggle-reasoning${this.reasoning ? ' selected': ''}" @click=${this.toggleReasoning}>
      <el-icon slot="icon">
        <svg viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7.06431 5.93342C7.68763 5.93342 8.19307 6.43904 8.19322 7.06233C8.19322 7.68573 7.68772 8.19123 7.06431 8.19123C6.44099 8.19113 5.9354 7.68567 5.9354 7.06233C5.93555 6.43911 6.44108 5.93353 7.06431 5.93342Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8.6815 0.963693C10.1169 0.447019 11.6266 0.374829 12.5633 1.31135C13.5 2.24805 13.4277 3.75776 12.911 5.19319C12.7126 5.74431 12.4386 6.31796 12.0965 6.89729C12.4969 7.54638 12.8141 8.19018 13.036 8.80647C13.5527 10.2419 13.6251 11.7516 12.6883 12.6883C11.7516 13.625 10.242 13.5527 8.8065 13.036C8.19022 12.8141 7.54641 12.4969 6.89732 12.0965C6.31797 12.4386 5.74435 12.7125 5.19322 12.911C3.75777 13.4276 2.2481 13.5 1.31138 12.5633C0.374859 11.6266 0.447049 10.1168 0.963724 8.68147C1.17185 8.10338 1.46321 7.50063 1.82896 6.8924C1.52182 6.35711 1.27235 5.82825 1.08872 5.31819C0.572068 3.88278 0.499714 2.37306 1.43638 1.43635C2.37308 0.499655 3.8828 0.572044 5.31822 1.08869C5.82828 1.27232 6.35715 1.5218 6.89243 1.82893C7.50066 1.46318 8.10341 1.17181 8.6815 0.963693ZM11.3573 8.01154C10.9083 8.62253 10.3901 9.22873 9.80943 9.8094C9.22877 10.3901 8.62255 10.9083 8.01158 11.3572C8.4257 11.5841 8.8287 11.7688 9.21275 11.9071C10.5456 12.3868 11.4246 12.2547 11.8397 11.8397C12.2548 11.4246 12.3869 10.5456 11.9071 9.21272C11.7688 8.82866 11.5841 8.42568 11.3573 8.01154ZM2.56529 8.02912C2.37344 8.39322 2.21495 8.74796 2.09263 9.08772C1.61291 10.4204 1.74512 11.2995 2.16001 11.7147C2.57505 12.1297 3.45415 12.2618 4.78697 11.7821C5.11057 11.6656 5.44786 11.5164 5.7938 11.3367C5.249 10.9223 4.70922 10.4533 4.19029 9.9344C3.57578 9.31987 3.03169 8.67633 2.56529 8.02912ZM6.90708 3.2469C6.24065 3.70479 5.5646 4.26321 4.91392 4.91389C4.26325 5.56456 3.70482 6.24063 3.24693 6.90705C3.72674 7.63325 4.32777 8.37459 5.03892 9.08576C5.64943 9.69627 6.28183 10.2265 6.90806 10.6678C7.59368 10.2025 8.2908 9.63076 8.96079 8.96076C9.6308 8.29075 10.2025 7.59366 10.6678 6.90803C10.2265 6.2818 9.69631 5.6494 9.08579 5.03889C8.37462 4.32773 7.63328 3.72672 6.90708 3.2469ZM11.7147 2.15998C11.2996 1.74509 10.4204 1.61288 9.08775 2.0926C8.74835 2.21479 8.39382 2.37271 8.03013 2.56428C8.67728 3.03065 9.31995 3.5758 9.93443 4.19026C10.4534 4.7092 10.9223 5.24896 11.3368 5.79377C11.5164 5.44785 11.6656 5.11052 11.7821 4.78694C12.2618 3.45416 12.1297 2.57502 11.7147 2.15998ZM4.91197 2.2176C3.57922 1.73788 2.70004 1.86995 2.28501 2.28498C1.87001 2.70003 1.73791 3.5792 2.21763 4.91194C2.31709 5.18822 2.44112 5.47427 2.58677 5.7674C3.01931 5.1887 3.51474 4.6158 4.06529 4.06526C4.61584 3.5147 5.18872 3.01928 5.76743 2.58674C5.47431 2.4411 5.18824 2.31706 4.91197 2.2176Z"></path></svg>
      </el-icon>
      <span>深度思考</span>
    </el-button>
    <el-button circle class="toggle-webing">
      <el-icon slot="icon">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.00003 0.150391C10.7832 0.150391 13.8496 3.21685 13.8496 7C13.8496 10.7832 10.7832 13.8496 7.00003 13.8496C3.21688 13.8496 0.150421 10.7832 0.150421 7C0.150421 3.21685 3.21688 0.150391 7.00003 0.150391ZM5.37796 7.59961C5.4267 9.03204 5.64754 10.2965 5.97366 11.2197C6.15996 11.7471 6.36946 12.1301 6.57327 12.3701C6.77751 12.6105 6.92343 12.6504 7.00003 12.6504C7.07663 12.6504 7.22255 12.6105 7.42679 12.3701C7.6306 12.1301 7.8401 11.7471 8.0264 11.2197C8.35252 10.2965 8.57336 9.03204 8.6221 7.59961H5.37796ZM1.38187 7.59961C1.61456 9.80492 3.11593 11.6304 5.14261 12.3359C5.03268 12.1128 4.93227 11.8724 4.8428 11.6191C4.46342 10.5451 4.22775 9.13988 4.17874 7.59961H1.38187ZM9.82132 7.59961C9.77232 9.13988 9.53664 10.5451 9.15726 11.6191C9.06774 11.8726 8.96648 12.1127 8.85648 12.3359C10.8836 11.6307 12.3855 9.80524 12.6182 7.59961H9.82132ZM7.00003 1.34961C6.92343 1.34961 6.77751 1.38949 6.57327 1.62988C6.36946 1.86988 6.15996 2.25291 5.97366 2.78027C5.64754 3.70351 5.4267 4.96796 5.37796 6.40039H8.6221C8.57336 4.96796 8.35252 3.70351 8.0264 2.78027C7.8401 2.25291 7.6306 1.86988 7.42679 1.62988C7.22255 1.38949 7.07663 1.34961 7.00003 1.34961ZM8.85648 1.66309C8.96663 1.88656 9.06763 2.12715 9.15726 2.38086C9.53664 3.45487 9.77232 4.86012 9.82132 6.40039H12.6182C12.3855 4.19465 10.8837 2.36828 8.85648 1.66309ZM5.14261 1.66309C3.11578 2.3685 1.61457 4.19497 1.38187 6.40039H4.17874C4.22775 4.86012 4.46342 3.45487 4.8428 2.38086C4.93237 2.1273 5.03253 1.88645 5.14261 1.66309Z"></path></svg>
      </el-icon>
      <span>联网搜索</span>
    </el-button>
    <div class="right">
      <el-button circle class="select-file">
        <el-icon slot="icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5498 9.75006V5.00006H6.9502V9.75006C6.9502 10.33 7.4201 10.7999 8 10.7999C8.5799 10.7999 9.0498 10.33 9.0498 9.75006V4.50006C9.0498 2.95366 7.7964 1.70026 6.25 1.70026C4.7036 1.70026 3.4502 2.95366 3.4502 4.50006V9.75006C3.4502 12.263 5.4871 14.2999 8 14.2999C10.5129 14.2999 12.5498 12.263 12.5498 9.75006V4.00006H13.9502V9.75006C13.9502 13.0362 11.2861 15.7003 8 15.7003C4.71391 15.7003 2.0498 13.0362 2.0498 9.75006V4.50006C2.04981 2.18047 3.9304 0.299867 6.25 0.299866C8.5696 0.299866 10.4502 2.18046 10.4502 4.50006V9.75006C10.4502 11.1032 9.3531 12.2003 8 12.2003C6.6469 12.2003 5.5498 11.1032 5.5498 9.75006Z" fill="currentColor"></path></svg>
        </el-icon>
      </el-button>
      <el-button class="ds-send" circle ?disabled="${this.disabled || this.value.trim() == ''}" @click=${this.onSend}>
        <el-icon slot="icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.3125 0.981648C8.66767 1.05456 8.97902 1.20565 9.2627 1.4338C9.48724 1.61444 9.73029 1.85939 9.97949 2.1086L14.707 6.83614L13.293 8.2502L9 3.95723V15.0432H7V3.95723L2.70703 8.2502L1.29297 6.83614L6.02051 2.1086C6.26971 1.85939 6.51277 1.61444 6.7373 1.4338C6.97662 1.24132 7.28445 1.04548 7.6875 0.981648C7.8973 0.948471 8.1031 0.956625 8.3125 0.981648Z" fill="currentColor"></path></svg>
        </el-icon>
      </el-button>
    </div>
  </div>
</div>`
  }
  
  toggleReasoning() {
    this.reasoning = !this.reasoning;
  }
  
  firstUpdated() {
    this.textarea = this.renderRoot.querySelector('textarea');
    this.textarea.addEventListener('input', (e) => {
      this.value = this.textarea.value;
    });
  }
  
  onSend() {
    this.dispatchEvent(new Event('send', {
      bubbles: true,
      composed: true,
      cancelable: false,
    }));
    this.value = '';
  }
}

customElements.define('ds-input', Input);
