import { ElElement, html, css } from '/static/element-plus-lit.min.js';
import { copyToClipboard } from './utils.js';

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
  font: var(--dsw-font-markdown-base);
  color: var(--dsw-alias-label-primary);
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
    ${this.messages.map((m, index) => html`<div class="message ${m.role == 'user'? 'user-message' : 'assistant-message'}" data-um-id="${index+1}">
      <div class="ds-message">
        ${m.role == 'user' ? html`<div class="ds-message-content" .innerText="${m.content}"></div>` : html`<el-markdown class="ds-markdown" .value="${m.content}"></el-markdown>`}
      </div>
      <div class="message-controls-wrapper">
        <div class="message-controls">
          <el-button class="message-copy" @click="${copyToClipboard.bind(null, m.content)}">
            <el-icon slot="icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.14926 4.02039C7.11194 4.02039 7.8798 4.02023 8.49594 4.07605C9.12125 4.13276 9.65789 4.25194 10.1414 4.53113C10.7201 4.86536 11.2008 5.34597 11.535 5.92468C11.8142 6.40824 11.9334 6.94488 11.9901 7.57019C12.0459 8.18631 12.0457 8.95426 12.0457 9.91687C12.0457 10.8795 12.0459 11.6474 11.9901 12.2635C11.9334 12.8889 11.8142 13.4255 11.535 13.9091C11.2008 14.4877 10.7201 14.9684 10.1414 15.3026C9.65789 15.5818 9.12125 15.701 8.49594 15.7577C7.87981 15.8135 7.11193 15.8134 6.14926 15.8134C5.18664 15.8134 4.41871 15.8135 3.80258 15.7577C3.17727 15.701 2.64063 15.5818 2.15707 15.3026C1.57837 14.9684 1.09775 14.4877 0.763519 13.9091C0.484335 13.4255 0.365153 12.8889 0.308441 12.2635C0.252618 11.6474 0.252777 10.8795 0.252777 9.91687C0.252777 8.95425 0.252634 8.18632 0.308441 7.57019C0.365153 6.94488 0.484335 6.40824 0.763519 5.92468C1.09774 5.34596 1.57836 4.86535 2.15707 4.53113C2.64063 4.25194 3.17727 4.13276 3.80258 4.07605C4.41871 4.02024 5.18663 4.02039 6.14926 4.02039ZM6.14926 5.37781C5.16178 5.37781 4.46631 5.37768 3.92563 5.42664C3.39431 5.47479 3.07856 5.5658 2.83578 5.70593C2.46317 5.92112 2.15351 6.23077 1.93832 6.60339C1.7982 6.84617 1.70718 7.16192 1.65903 7.69324C1.61007 8.23391 1.6102 8.9294 1.6102 9.91687C1.6102 10.9044 1.61006 11.5998 1.65903 12.1405C1.70718 12.6718 1.7982 12.9876 1.93832 13.2303C2.15352 13.6029 2.46318 13.9126 2.83578 14.1278C3.07856 14.2679 3.39431 14.3589 3.92563 14.4071C4.46631 14.4561 5.16179 14.4559 6.14926 14.4559C7.13679 14.4559 7.83221 14.4561 8.37289 14.4071C8.90422 14.3589 9.21996 14.2679 9.46274 14.1278C9.83532 13.9126 10.145 13.6029 10.3602 13.2303C10.5003 12.9876 10.5913 12.6718 10.6395 12.1405C10.6885 11.5998 10.6883 10.9044 10.6883 9.91687C10.6883 8.92941 10.6885 8.23391 10.6395 7.69324C10.5913 7.16192 10.5003 6.84617 10.3602 6.60339C10.145 6.23078 9.83533 5.92113 9.46274 5.70593C9.21996 5.5658 8.90421 5.47479 8.37289 5.42664C7.83221 5.37766 7.13679 5.37781 6.14926 5.37781ZM9.80161 0.368042C10.7638 0.368042 11.5314 0.367947 12.1473 0.423706C12.7725 0.480374 13.3093 0.598826 13.7928 0.877808C14.3716 1.21198 14.8521 1.69361 15.1864 2.27234C15.4655 2.75581 15.5857 3.29171 15.6424 3.91687C15.6983 4.53307 15.6971 5.30167 15.6971 6.26453V7.82996C15.6971 8.29271 15.6989 8.59 15.6649 8.84851C15.4668 10.3526 14.4009 11.5739 12.9832 11.9989V10.5468C13.6973 10.1904 14.2104 9.49669 14.3192 8.67175C14.3387 8.52354 14.3407 8.33586 14.3407 7.82996V6.26453C14.3407 5.27713 14.3398 4.58155 14.2909 4.04089C14.2427 3.50975 14.1526 3.19379 14.0125 2.95105C13.7974 2.57856 13.4875 2.26876 13.1151 2.05359C12.8723 1.91353 12.5564 1.82244 12.0252 1.77429C11.4847 1.72534 10.7888 1.72546 9.80161 1.72546H7.71469C6.75617 1.72565 5.92662 2.27704 5.52328 3.07898H4.07016C4.54218 1.51138 5.99317 0.368253 7.71469 0.368042H9.80161Z" fill="currentColor"></path></svg>
            </el-icon>
          </el-button>
          <el-button class="message-edit">
            <el-icon slot="icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.94073 1.34948C10.7047 0.902375 11.6503 0.90248 12.4143 1.34948C12.706 1.52022 12.9687 1.79124 13.3104 2.1329C13.652 2.47454 13.9231 2.73727 14.0938 3.029C14.5408 3.79301 14.5409 4.73862 14.0938 5.50257C13.9231 5.79422 13.652 6.0571 13.3104 6.39867L6.65929 13.0498C6.28065 13.4284 6.00692 13.7108 5.6654 13.9097C5.32388 14.1085 4.94312 14.2074 4.42702 14.3498L3.24391 14.6762C2.77524 14.8054 2.34535 14.9263 2.00128 14.9685C1.65193 15.0112 1.17961 15.0014 0.810733 14.6326C0.44189 14.2637 0.432076 13.7914 0.474829 13.442C0.517004 13.098 0.63787 12.668 0.767151 12.1994L1.09349 11.0163C1.23585 10.5002 1.33478 10.1194 1.53356 9.77791C1.73246 9.43639 2.01487 9.16266 2.39352 8.78402L9.04463 2.1329C9.38622 1.79132 9.64908 1.52023 9.94073 1.34948ZM15.5427 14.8399H7.5522L8.96704 13.425H15.5427V14.8399ZM3.39379 9.78429C2.96497 10.2131 2.84241 10.3437 2.75706 10.4901C2.6718 10.6366 2.61858 10.8079 2.4573 11.3926L2.13096 12.5757C2.0018 13.0439 1.92191 13.3419 1.8886 13.5536C2.10038 13.5204 2.39869 13.4417 2.86761 13.3123L4.05072 12.986C4.63541 12.8247 4.80666 12.7715 4.9532 12.6862C5.09965 12.6009 5.23019 12.4783 5.65902 12.0495L10.721 6.9865L8.45574 4.72128L3.39379 9.78429ZM11.7 2.57085C11.3774 2.38205 10.9777 2.38205 10.6551 2.57085C10.5602 2.62653 10.4487 2.72937 10.0449 3.13317L9.45601 3.72101L11.7212 5.98623L12.3101 5.3984C12.7139 4.99464 12.8168 4.88314 12.8725 4.78825C13.0612 4.46567 13.0612 4.06592 12.8725 3.74333C12.8168 3.64834 12.7145 3.53758 12.3101 3.13317C11.9057 2.72869 11.795 2.62647 11.7 2.57085Z" fill="currentColor"></path></svg>
            </el-icon>
          </el-button>
        </div>
      </div>
    </div>`)}
  </div>
</el-scrollbar>`;
  }
}

customElements.define('ds-content', Content)