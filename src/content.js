import { ElElement, html, css, nothing } from '/static/element-plus-lit.min.js';
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
    ${this.messages.map((m, index) => html`<div class="message ${m.role == 'user'? 'user-message' : 'assistant-message'}" data-um-id="${index+1}">
      <div class="ds-message">
        ${m.role == 'user' ? html`<div class="ds-message-content" .innerText="${m.content}"></div>` : html`${m.reasoning ? html`<details class="reasoning">
  <summary class="reasoning-title">
    <el-icon>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.00198 6.6446C8.75032 6.6446 9.35738 7.25175 9.35745 8.00007C9.35745 8.74844 8.75036 9.35554 8.00198 9.35554C7.25373 9.35539 6.64749 8.74835 6.64749 8.00007C6.64756 7.25184 7.25377 6.64474 8.00198 6.6446Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M9.97171 1.29987C11.5854 0.718977 13.271 0.642258 14.3145 1.68561C15.3578 2.72908 15.2811 4.41472 14.7002 6.02839C14.4708 6.66567 14.1505 7.32943 13.75 8.00007C14.1505 8.67068 14.4708 9.3345 14.7002 9.97175C15.2811 11.5854 15.3579 13.2711 14.3145 14.3145C13.2711 15.3579 11.5854 15.2812 9.97171 14.7003C9.33446 14.4708 8.67065 14.1505 8.00003 13.7501C7.32939 14.1505 6.66564 14.4708 6.02835 14.7003C4.41467 15.2812 2.72905 15.3578 1.68558 14.3145C0.642216 13.2711 0.718931 11.5854 1.29984 9.97175C1.52921 9.3346 1.84871 8.67055 2.24905 8.00007C1.84872 7.32959 1.52921 6.66551 1.29984 6.02839C0.718913 4.41465 0.642131 2.72906 1.68558 1.68561C2.72903 0.642173 4.41462 0.718948 6.02835 1.29987C6.66547 1.52925 7.32956 1.84876 8.00003 2.24909C8.67051 1.84875 9.33457 1.52925 9.97171 1.29987ZM12.9405 9.21296C12.4392 9.89306 11.8617 10.5681 11.2149 11.2149C10.5681 11.8617 9.89302 12.4392 9.21292 12.9405C9.62538 13.1579 10.0271 13.338 10.4121 13.4766C11.9147 14.0175 12.9173 13.8738 13.3955 13.3956C13.8738 12.9173 14.0175 11.9147 13.4766 10.4122C13.338 10.0272 13.1579 9.62541 12.9405 9.21296ZM3.05862 9.21296C2.84127 9.62529 2.66203 10.0273 2.52347 10.4122C1.98258 11.9147 2.12633 12.9173 2.60452 13.3956C3.08284 13.8737 4.08551 14.0175 5.58792 13.4766C5.9727 13.3381 6.37395 13.1578 6.78616 12.9405C6.1063 12.4393 5.43174 11.8615 4.78519 11.2149C4.13829 10.568 3.55999 9.8932 3.05862 9.21296ZM7.99905 3.79206C7.23185 4.31425 6.45312 4.95519 5.70413 5.70417C4.95515 6.45315 4.31421 7.2319 3.79202 7.99909C4.31437 8.76672 4.95477 9.54659 5.70413 10.296C6.45315 11.045 7.23277 11.6849 8.00003 12.2071C8.76731 11.6849 9.54689 11.045 10.2959 10.296C11.045 9.54692 11.6848 8.76735 12.2071 8.00007C11.6848 7.23281 11.0449 6.45318 10.2959 5.70417C9.54656 4.95481 8.76668 4.3144 7.99905 3.79206ZM5.58792 2.52351C4.08539 1.98261 3.08278 2.12632 2.60452 2.60456C2.12627 3.08281 1.98258 4.08542 2.52347 5.58796C2.66195 5.97259 2.84146 6.37415 3.05862 6.7862C3.55989 6.10617 4.13846 5.43196 4.78519 4.78522C5.43193 4.13849 6.10612 3.55993 6.78616 3.05866C6.37411 2.8415 5.97255 2.66198 5.58792 2.52351ZM13.3955 2.60456C12.9173 2.12637 11.9146 1.98263 10.4121 2.52351C10.0272 2.66207 9.62525 2.84131 9.21292 3.05866C9.89316 3.56002 10.568 4.13833 11.2149 4.78522C11.8614 5.43178 12.4393 6.10633 12.9405 6.7862C13.1577 6.37399 13.3381 5.97273 13.4766 5.58796C14.0174 4.08555 13.8737 3.08287 13.3955 2.60456Z" fill="currentColor"></path></svg>
    </el-icon>
    <span>${m.reasoning_end ? `已深度思考（用时 ${m.reasoning_end - m.created} 秒）` : '正在思考'}</span>
    <el-icon>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.50003 2.15137L5.92386 2.57617L8.6514 5.30273C8.90709 5.55843 9.13385 5.78438 9.29788 5.98828C9.46886 6.20088 9.61759 6.44405 9.66605 6.75C9.69225 6.91565 9.69225 7.08435 9.66605 7.25C9.61759 7.55595 9.46886 7.79912 9.29788 8.01172C9.13385 8.21561 8.90709 8.44157 8.6514 8.69727L5.92386 11.4238L5.50003 11.8486L4.6514 11L5.0762 10.5762L7.80276 7.84863C8.07735 7.57405 8.24852 7.40124 8.36234 7.25977C8.46907 7.12709 8.47816 7.07728 8.4805 7.0625C8.48706 7.02105 8.48706 6.97895 8.4805 6.9375C8.47816 6.92272 8.46907 6.87291 8.36233 6.74023C8.24852 6.59876 8.07735 6.42595 7.80276 6.15137L5.0762 3.42383L4.6514 3L5.50003 2.15137Z" fill="currentColor"></path>
        <path d="M11.8487 5.5L11.4239 5.92383L8.6973 8.65137C8.4416 8.90706 8.21565 9.13382 8.01175 9.29785C7.79915 9.46883 7.55598 9.61756 7.25003 9.66602C7.08438 9.69222 6.91568 9.69222 6.75003 9.66602C6.44408 9.61756 6.20091 9.46883 5.98831 9.29785C5.78442 9.13382 5.55846 8.90706 5.30276 8.65137L2.5762 5.92383L2.1514 5.5L3.00003 4.65137L3.42386 5.07617L6.1514 7.80273C6.42598 8.07732 6.59879 8.24849 6.74026 8.3623C6.87294 8.46904 6.92275 8.47813 6.93753 8.48047C6.97898 8.48703 7.02108 8.48703 7.06253 8.48047C7.07731 8.47813 7.12712 8.46904 7.2598 8.3623C7.40127 8.24849 7.57408 8.07732 7.84866 7.80273L10.5762 5.07617L11 4.65137L11.8487 5.5Z" fill="currentColor"></path>
      </svg>
    </el-icon>
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