import { ElElement, html, css, nothing } from '/assets/element-plus-lit.min.js';
import { copyToClipboard, scrollTo } from './utils.js';
import { Reasoning, Arrow, Copy, Edit, Refresh } from '/src/svgs.js';


class Content extends ElElement {
  static styles = css`
.messages {
  height: 100%;
  padding: 0 calc((100% - var(--message-list-max-width))/2);
  flex-direction: column;
  margin: auto;
  display: flex;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
}

.messages-content {
  box-sizing: border-box;
  margin: 0 var(--message-list-padding-horizontal)24px;
  flex-grow: 1;
  padding-top: 34px;
}

.message {
  box-sizing: border-box;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 16px;
  display: flex;
  position: relative;
}
.ds-message {
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  display: flex;
}
.ds-message-content {
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-specific-bubble);
  box-sizing: border-box;
  white-space: pre-wrap;
  word-break: break-word;
  border-radius: 22px;
  max-width: calc(100% - 88px);
  padding: 10px 16px;
  font-size: 16px;
  line-height: 24px;
  position: relative;
}
@media not all and (min-width: 640px) {
  max-width: calc(100% - 68px);
}

.message-controls-wrapper {
  width: 100%;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 6px;
  display: flex;
  visibility: hidden;
  opacity: 0;
}
.message:hover .message-controls-wrapper {
  visibility: visible;
  opacity: 1;
}

.message-controls {
  align-items: center;
  height: 28px;
  display: flex;
  gap: 10px;
}

.message-controls el-button::part(el-button) {
  border: none;
  padding: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: var(--dsw-alias-label-tertiary);
}
.message-controls el-button::part(content) {
  display: none;
}
.message-controls el-button::part(el-button):hover {
  background-color: var(--dsw-alias-interactive-bg-hover);
}

.assistant-message {
  box-sizing: border-box;
  padding: 0;
  position: relative;
}

.assistant-message .ds-message,
.assistant-message .message-controls-wrapper {
  align-items: flex-start;
}

.ds-markdown {
  font-family: "quote-cjk-patch","Inter",system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
  font-size: 16px;
  line-height: 28px;
  color: var(--dsw-alias-label-primary);
}

details {
  margin-bottom: 10px;
}

summary {
  list-style: none;
  color: #61666b;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  flex-grow: 1;
  align-items: center;
  height: 100%;
  transition: color .2s;
  display: flex;
}

summary el-icon:first-child {
  line-height: 0;
  display: inline-flex;
  color: #3964fe;
  margin-right: 6px;
  font-size: 16px;
  width: 16px;
  height: 16px;
}
summary span {
  font-family: "quote-cjk-patch","Inter",system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
  font-size: 16px;
  line-height: 28px;
  align-items: center;
  margin-right: 6px;
  display: inline-flex;
}
summary:hover {
  color: #0f1115;
}

summary el-icon:last-child {
  line-height: 0;
  display: inline-flex;
  font-size: 14px;
  width: 14px;
  height: 14px;
}
details:not([open]) summary el-icon:last-child svg path:last-child {
  display: none;
}
details[open] summary el-icon:last-child svg path:first-child {
  display: none;
}

details .reasoning-content {
  margin: 0;
  padding: 5px 0 5px 22px;
  position: relative;
}
details[open] .reasoning-content {
  padding-bottom: 0;
}

details .reasoning-content .ds-markdown {
  font-size: 14px;
  line-height: 24px;
  color: #61666b;
  height: calc(100% - 32px);
}

.dot {
  justify-content: center;
  align-items: center;
  display: inline-flex;
  color: var(--dsw-alias-brand-primary);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: absolute;
  top: 9px;
  left: 0;
  width: 16px;
  height: 16px;
}
.dot div {
  border-radius: 50%;
  width: 5px;
  height: 5px;
  background-color: var(--dsw-alias-label-tertiary);
  animation: none;
}

.line {
  border-left: 1px solid #e1e5ea;
  position: absolute;
  top: 31px;
  left: 7.5px;
  height: calc(100% - 32px);
}
  `;
  
  static properties = {
    messages: {
      type: Array,
      state: true,
      default: [],
    },
  }
  
  render() {
    return html`
<el-scrollbar class="messages">
  <div class="messages-content">
    ${this.messages.map((m, index) => html`<div class="message ${m.role == 'user'? 'user-message' : 'assistant-message'}" data-message="${index+1}">
      <div class="ds-message">
        ${m.role == 'user' ? html`<div class="ds-message-content" .innerText="${m.content}"></div>` : html`${m.reasoning ? html`<details class="reasoning" .open="${m.reasoning_open}" @toggle="${(e) => { 
    m.reasoning_open = e.target.open; 
    this.dispatchEvent(new CustomEvent('reasoningtoggle', {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {
        index, 
        open: e.target.open,
      },
    })); }}">
  <summary class="reasoning-title">
    <el-icon>${Reasoning}</el-icon>
    <span>${m.reasoning_end ? `已深度思考（用时 ${m.reasoning_end - m.created} 秒）` : '正在思考'}</span>
    <el-icon>${Arrow}</el-icon>
  </summary>
  <div class="reasoning-content">
    <div class="dot"><div></div></div>
    <div class="line"></div>
    <el-markdown class="ds-markdown" .value="${m.reasoning_content}"></el-markdown>
  </div>
</details>` : nothing}
<el-markdown class="ds-markdown" .value="${m.content}"></el-markdown>`}
      </div>
      <div class="message-controls-wrapper">
        <div class="message-controls">
          <el-button class="message-copy" @click="${copyToClipboard.bind(null, m.content)}">
            <el-icon slot="icon">${Copy}</el-icon>
          </el-button>
          ${m.role === 'user' ? html`<el-button class="message-edit">
            <el-icon slot="icon">${Edit}</el-icon>
          </el-button>`: html`<el-button class="message-retry" @click="${this.retry}">
            <el-icon slot="icon">${Refresh}</el-icon>
          </el-button>`}
        </div>
      </div>
    </div>`
    )}
  </div>
</el-scrollbar>`;
  }
  
  firstUpdated() {
    let scroll_timer = null;
    this.scrollbar = this.renderRoot.firstElementChild;
    const preventAutoScroll = () => {
      this.scrollbar.scrolling = true;
      clearTimeout(scroll_timer);
      scroll_timer = setTimeout(() => {
        this.scrollbar.scrolling = false;
      }, 2000);
    }
    this.scrollbar.addEventListener('wheel', preventAutoScroll);
    this.scrollbar.addEventListener('touchmove', preventAutoScroll);
  }
  
  updated(changedProps) {
    if (this.messages.length > 0) requestAnimationFrame(() => {
      const element = this.scrollbar.renderRoot.firstElementChild;
      if (element && !this.scrollbar.scrolling) {
        scrollTo(element, element.scrollHeight, 300);
      }
    })
  }
  
  retry(e) {
    const message = e.target.closest('.message');
    const id = message.dataset.message;
    this.dispatchEvent(new CustomEvent('retry', {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {
        message_id: id,
      },
    }));
  }
}

customElements.define('ds-content', Content)