import { ElElement, html, css } from '/assets/element-plus-lit.min.js';
import { Thinking, Web, Attachment, Send, Logo } from '/src/svgs.js';


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
  gap: 10px;
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
  display: block;
  margin-left: auto;
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
    currentRoleName: {
      type: String,
    },
  }
  
  updated(changedProps) {
    if (changedProps.has('reasoning')) window.localStorage.setItem('reasoning', parseInt(this.reasoning));
  }

  render() {
    return html`
<div part="logo" class="logo">
  ${Logo}
  今天有什么可以帮到你？
</div>
<div part="ds-input" class="ds-input">
  <div class="inputarea">
    <textarea class="textarea" placeholder="给 ${this.currentRoleName ?? 'DeepSeek'} 发送消息" rows="2" .value="${this.value}"></textarea>
    <div class="textarea" .innerText="${this.value}"></div>
  </div>
  <div class="toolbar">
    <el-button circle class="toggle-reasoning${this.reasoning ? ' selected': ''}" @click=${this.toggleReasoning}>
      <el-icon slot="icon">${Thinking}</el-icon>
      <span>深度思考</span>
    </el-button>
    <el-button circle class="toggle-webing">
      <el-icon slot="icon">${Web}</el-icon>
      <span>联网搜索</span>
    </el-button>
    
    <el-button circle class="select-file right">
      <el-icon slot="icon">${Attachment}</el-icon>
    </el-button>
    <el-button class="ds-send" circle ?disabled="${this.disabled || this.value.trim() == ''}" @click=${this.onSend}>
      <el-icon slot="icon">${Send}</el-icon>
    </el-button>
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
