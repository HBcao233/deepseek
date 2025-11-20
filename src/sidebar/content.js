import { ElElement, html, css } from '/static/element-plus-lit.min.js';

class SidebarContent extends ElElement {
  static styles = css`
.sidebar-group {
  margin-top: 16px;
  position: relative;
}
.sidebar-group:first-child {
  margin-top: 0;
}
.sidebar-group__title {
  z-index: 20;
  color: var(--dsw-alias-label-tertiary);
  background-color: #f9fafb;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 6px 10px 2px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}

.sidebar-link {
  box-sizing: border-box;
  height: 40px;
  color: var(--dsw-alias-label-primary);
  cursor: pointer;
  border-radius: 12px;
  justify-content: space-between;
  align-items: center;
  padding: 9px 6px 9px 10px;
  font-size: 14px;
  line-height: 22px;
  text-decoration: none;
  display: flex;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
.sidebar-link.active {
  background-color: #e4edfd;
  color: #3964fe;
}

.sidebar-link .link-text {
  max-width: 85%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


.sidebar-link-controls {
  --mask-base-color: 241,243,245;
  content: "";
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  justify-content: center;
  align-items: center;
  width: 56px;
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
}
.sidebar-link-controls el-button::part(el-button) {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background-color: transparent;
}
.sidebar-link-controls el-button::part(content) {
  display: none;
}
.sidebar-link-controls ::part(el-button):hover {
  background-color: var(--dsw-alias-interactive-bg-hover);
}

el-dropdown::part(el-popper) {
  padding: 0;
  border-radius: 12px;
  background-color: #fff;
  padding: 4px;
  color: #0f1115;
  min-width: 124px;
  max-width: 280px;
  box-sizing: border-box;
  box-shadow: 0 0 1px rgba(0,0,0,.2),0 0 4px rgba(0,0,0,.02),0 12px 32px rgba(0,0,0,.08);
}
el-dropdown-item {
  font-size: 14px;
  line-height: 24px;
  border-radius: 8px;
  min-height: 24px;
  padding: 8px 10px;
  color: #0f1115;
  cursor: pointer;
  box-sizing: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  align-items: center;
  display: flex;
  overflow: auto;
}
el-dropdown-item:hover {
  background-color: var(--dsw-alias-interactive-bg-hover);
}

el-dropdown-item el-icon {
  margin-right: 8px;
  font-size: 16px;
  display: flex;
  color: #0f1115;
}

el-dropdown-item.danger {
  color: #ec1313;
}

.rename-chat {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  box-shadow: none;
}

.rename-chat::part(wrapper) {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 9px 6px 9px 10px;
  box-shadow: none;
  border-radius: 12px;
  border: 1px solid #3964fe;
}

.rename-chat.show {
  display: block;
}

.delete-chat::part(content) {
  font-size: 14px;
  color: rgb(64, 64, 64);
  box-sizing: border-box;
  border: 1px solid transparent;
  border-radius: 24px;
  outline: none;
  width: 525px;
  max-width: calc(100vw - 32px);
  padding: 26px 24px 24px;
  line-height: 22px;
  box-shadow: 0 0 1px rgba(0,0,0,.2),0 0 4px rgba(0,0,0,.02),0 12px 32px rgba(0,0,0,.08);
}
.delete-chat::part(title) {
  font-weight: 600;
  font-size: 16px;
  color: var(--dsw-alias-label-primary);
  line-height: 24px;
}

.delete-chat el-button::part(el-button) { 
  border-radius: 100px;
  color: var(--dsw-alias-label-primary);
  padding: 6px 14px;
  font-size: 14px;
  line-height: 22px;
  min-width: 72px;
  border: 1px solid rgba(0, 0, 0, .1);
  height: auto;
}
.delete-chat el-button::part(el-button):hover {
  background-color: var(--dsw-alias-interactive-bg-hover);
}

.delete-chat el-button::part(content) {
  margin: 0;
}

.delete-chat el-button[type=danger]::part(el-button) {
  border: 1px solid var(--dsw-alias-state-error-primary);
  color: var(--dsw-alias-state-error-primary);
  background-color: #fff;
}
.delete-chat el-button[type=danger]::part(el-button):hover {
  background-color: var(--dsw-alias-interactive-bg-hover-danger);
}
  `;
  
  static properties = {
    sidebars: {
      type: Object,
      default: {},
      state: true,
    },
    currentChat: {
      state: true,
    },
  };
  
  render() {
    return html`
${Object.entries(this.sidebars).map(([title, items]) => html`
<div class="sidebar-group">
  <p class="sidebar-group__title">${title}</p>
  ${items.map(item => html`
    <a class="sidebar-link${this.currentChat == item.id ? ' active':''}" href="/a/chat/s/${item.id}" @click="${this.switchChat}" data-chat="${item.id}">
      <p class="link-text">${item.name}</p>
      <div class="sidebar-link-controls">
        <el-dropdown placement="bottom">
          <el-button>
            <el-icon slot="icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5514 8.00006C4.5514 8.63519 4.03653 9.15006 3.4014 9.15006C2.76628 9.15006 2.2514 8.63519 2.2514 8.00006C2.2514 7.36493 2.76628 6.85006 3.4014 6.85006C4.03653 6.85006 4.5514 7.36493 4.5514 8.00006Z" fill="currentColor"></path><path d="M9.14754 8.00006C9.14754 8.63519 8.63267 9.15006 7.99754 9.15006C7.36242 9.15006 6.84754 8.63519 6.84754 8.00006C6.84754 7.36493 7.36242 6.85006 7.99754 6.85006C8.63267 6.85006 9.14754 7.36493 9.14754 8.00006Z" fill="currentColor"></path><path d="M13.7486 8.00006C13.7486 8.63519 13.2337 9.15006 12.5986 9.15006C11.9634 9.15006 11.4486 8.63519 11.4486 8.00006C11.4486 7.36493 11.9634 6.85006 12.5986 6.85006C13.2337 6.85006 13.7486 7.36493 13.7486 8.00006Z" fill="currentColor"></path></svg>
            </el-icon>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click="${this.renameChat}">
              <el-icon>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.94073 1.34948C10.7047 0.902375 11.6503 0.90248 12.4143 1.34948C12.706 1.52022 12.9687 1.79124 13.3104 2.1329C13.652 2.47454 13.9231 2.73727 14.0938 3.029C14.5408 3.79301 14.5409 4.73862 14.0938 5.50257C13.9231 5.79422 13.652 6.0571 13.3104 6.39867L6.65929 13.0498C6.28065 13.4284 6.00692 13.7108 5.6654 13.9097C5.32388 14.1085 4.94312 14.2074 4.42702 14.3498L3.24391 14.6762C2.77524 14.8054 2.34535 14.9263 2.00128 14.9685C1.65193 15.0112 1.17961 15.0014 0.810733 14.6326C0.44189 14.2637 0.432076 13.7914 0.474829 13.442C0.517004 13.098 0.63787 12.668 0.767151 12.1994L1.09349 11.0163C1.23585 10.5002 1.33478 10.1194 1.53356 9.77791C1.73246 9.43639 2.01487 9.16266 2.39352 8.78402L9.04463 2.1329C9.38622 1.79132 9.64908 1.52023 9.94073 1.34948ZM15.5427 14.8399H7.5522L8.96704 13.425H15.5427V14.8399ZM3.39379 9.78429C2.96497 10.2131 2.84241 10.3437 2.75706 10.4901C2.6718 10.6366 2.61858 10.8079 2.4573 11.3926L2.13096 12.5757C2.0018 13.0439 1.92191 13.3419 1.8886 13.5536C2.10038 13.5204 2.39869 13.4417 2.86761 13.3123L4.05072 12.986C4.63541 12.8247 4.80666 12.7715 4.9532 12.6862C5.09965 12.6009 5.23019 12.4783 5.65902 12.0495L10.721 6.9865L8.45574 4.72128L3.39379 9.78429ZM11.7 2.57085C11.3774 2.38205 10.9777 2.38205 10.6551 2.57085C10.5602 2.62653 10.4487 2.72937 10.0449 3.13317L9.45601 3.72101L11.7212 5.98623L12.3101 5.3984C12.7139 4.99464 12.8168 4.88314 12.8725 4.78825C13.0612 4.46567 13.0612 4.06592 12.8725 3.74333C12.8168 3.64834 12.7145 3.53758 12.3101 3.13317C11.9057 2.72869 11.795 2.62647 11.7 2.57085Z" fill="currentColor"></path></svg>
              </el-icon>
              重命名
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.66003 0.96386L14.9887 7.29255L13.2308 7.64415L9.71481 11.1601L9.2033 14.2292C9.12307 14.7106 8.53228 14.8999 8.1872 14.5548L1.39779 7.76539C1.05271 7.4203 1.24203 6.82952 1.72341 6.74929L4.79249 6.23777L8.30844 2.72183L8.66003 0.96386Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"></path><path d="M4.4106 12.8147C3.98736 12.3894 3.56412 11.9641 3.14088 11.5388C3.09123 11.6014 3.04159 11.6641 2.99195 11.7267C2.09837 12.8541 1.20479 13.9814 0.311212 15.1088C0.261569 15.1714 0.211925 15.234 0.162282 15.2967C0.320997 15.4561 0.479711 15.6156 0.638426 15.7751C0.701296 15.7258 0.764165 15.6764 0.827035 15.6271C1.95868 14.7389 3.09034 13.8508 4.22199 12.9627C4.28486 12.9134 4.34773 12.864 4.4106 12.8147Z" fill="currentColor"></path></svg>
              </el-icon>
              置顶
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.7484 11.1004C15.6274 11.8866 15.5288 12.5365 15.3882 13.0496C15.243 13.579 15.0339 14.0407 14.6455 14.4162C14.5638 14.4952 14.4775 14.5699 14.387 14.6387C13.9568 14.9656 13.4683 15.1012 12.923 15.1642C12.3944 15.2252 11.7374 15.2245 10.9419 15.2245H5.05809C4.2626 15.2245 3.6056 15.2252 3.07703 15.1642C2.53171 15.1012 2.04317 14.9656 1.61296 14.6387C1.52248 14.5699 1.43618 14.4952 1.35447 14.4162C0.966081 14.0407 0.756961 13.579 0.611839 13.0496C0.471162 12.5365 0.372616 11.8866 0.251648 11.1004L1.6458 10.8864C1.77181 11.7054 1.85791 12.2602 1.97209 12.6767C2.08174 13.0767 2.1976 13.2701 2.3344 13.4024C2.37603 13.4426 2.42074 13.4807 2.46683 13.5158C2.6184 13.6308 2.8272 13.7161 3.23912 13.7636C3.66812 13.8131 4.22949 13.8145 5.05809 13.8145H10.9419C11.7705 13.8145 12.3319 13.8131 12.7609 13.7636C13.1728 13.7161 13.3816 13.6308 13.5332 13.5158C13.5793 13.4807 13.624 13.4426 13.6656 13.4024C13.8024 13.2701 13.9183 13.0767 14.0279 12.6767C14.1421 12.2602 14.2282 11.7054 14.3542 10.8864L15.7484 11.1004ZM7.71503 0.558394C7.90371 0.52798 8.09629 0.52798 8.28498 0.558394C8.63706 0.615181 8.91293 0.790123 9.14944 0.985327C9.37579 1.17216 9.62518 1.42894 9.90478 1.7163L13.387 5.29491L12.8817 5.78753L12.3763 6.27908L8.89412 2.70047C8.82608 2.63054 8.76286 2.56716 8.70555 2.50873V10.5336H7.29445V2.50873C7.23714 2.56716 7.17392 2.63054 7.10588 2.70047L3.62368 6.27908L3.11835 5.78753L2.61302 5.29491L6.09522 1.7163C6.37482 1.42894 6.62422 1.17216 6.85057 0.985327C7.08707 0.790123 7.36294 0.615181 7.71503 0.558394Z" fill="currentColor"></path></svg>
              </el-icon>
              分享
            </el-dropdown-item>
            <el-dropdown-item class="danger" @click="${this.deleteChat}">
              <el-icon>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.4782 4.84072L14.2138 10.1152C14.1102 12.1872 14.0671 13.0115 13.3867 13.9608C13.1044 14.3546 12.7499 14.6913 12.3425 14.9536C11.824 15.2873 11.2415 15.4316 10.5586 15.4998C9.88733 15.5669 9.04952 15.5657 8.00004 15.5657C6.95057 15.5657 6.11276 15.5669 5.44148 15.4998C4.75857 15.4316 4.17608 15.2873 3.65759 14.9536C3.25019 14.6913 2.89565 14.3546 2.61338 13.9608C1.93303 13.0115 1.88985 12.1872 1.78625 10.1152L1.52186 4.84072L2.89012 4.77282L3.15349 10.0463C3.26227 12.2218 3.32458 12.6015 3.72652 13.1625C3.90831 13.4161 4.13693 13.6335 4.39934 13.8024C4.6621 13.9715 5.00269 14.0792 5.57831 14.1367C6.16568 14.1953 6.92304 14.1964 8.00004 14.1964C9.07705 14.1964 9.8344 14.1953 10.4218 14.1367C10.9974 14.0792 11.338 13.9715 11.6008 13.8024C11.8632 13.6335 12.0918 13.4161 12.2736 13.1625C12.6755 12.6015 12.7378 12.2218 12.8466 10.0463L13.11 4.77282L14.4782 4.84072ZM5.43017 6.22854H6.79947V11.3909H5.43017V6.22854ZM9.20062 6.22854H10.5699V11.3909H9.20062V6.22854ZM8.53604 0.434484C9.17982 0.434484 9.65226 0.426979 10.0967 0.571311C10.2358 0.616504 10.3717 0.672607 10.502 0.739001C10.9183 0.95116 11.2465 1.29104 11.7016 1.74617L12.4978 2.54141H15.3743V3.91174H0.625793V2.54141H3.50225L4.29852 1.74617C4.75364 1.29105 5.0818 0.951161 5.49807 0.739001C5.62837 0.672607 5.76431 0.616504 5.9034 0.571311C6.34783 0.426979 6.82027 0.434484 7.46405 0.434484H8.53604ZM7.46405 1.80481C6.73214 1.80481 6.51647 1.81193 6.32623 1.87374C6.25551 1.89672 6.18674 1.92539 6.12047 1.95913C5.96404 2.03883 5.82354 2.16258 5.44148 2.54141H10.5586C10.1765 2.16258 10.036 2.03883 9.87961 1.95913C9.81335 1.92539 9.74458 1.89672 9.67386 1.87374C9.48362 1.81193 9.26795 1.80481 8.53604 1.80481H7.46405Z" fill="currentColor"></path></svg>
              </el-icon>
              删除
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-form @submit="${this.renameSubmit}">
        <el-input class="rename-chat" name="name" value="${item.name}" submit-on-blur></el-input>
      </el-form>
      <el-dialog class="delete-chat" title="永久删除对话">
        删除后，该对话将不可恢复。确认删除吗？
        <div slot="footer">
          <el-button @click="${(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.target.closest('el-dialog').hide();
          }}">取消</el-button>
          <el-button type="danger" @click="${this.deleteSubmit}">删除</el-button>
        </div>
      </el-dialog>
    </a>
  `)}
</div>
`)}
    `;
  }
  
  switchChat(e) {
    e.preventDefault();
    
    if (e.composedPath()[0].localName !== 'a') return;
    if (e.target.classList.contains('active')) return;
    this.dispatchEvent(new CustomEvent('switchchat', {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {
        href: e.target.href,
      },
    }));
  }
  
  renameChat(e) {
    const dropdown = e.target.closest('el-dropdown');
    dropdown.hide();
    const link = e.target.closest('a');
    const input = link.querySelector('.rename-chat');
    input.classList.add('show');
    input.focus();
    input.select();
  }
  
  renameSubmit(e) {
    e.preventDefault();
    const link = e.target.closest('a');
    const input = link.querySelector('.rename-chat');
    input.classList.remove('show');
    const chat_id = link.dataset.chat;
    this.dispatchEvent(new CustomEvent('renamechat', {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {
        chat: chat_id,
        newName: input.value,
      }
    }));
  }
  
  deleteChat(e) {
    const dropdown = e.target.closest('el-dropdown');
    dropdown.hide();
    const link = e.target.closest('a');
    const dialog = link.querySelector('.delete-chat');
    dialog.show();
  }
  
  deleteSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const dialog = e.target.closest('el-dialog');
    dialog.hide();
    const link = e.target.closest('a');
    const chat_id = link.dataset.chat;
    this.dispatchEvent(new CustomEvent('deletechat', {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {
        chat: chat_id,
      }
    }));
  }
}

customElements.define('ds-sidebar-content', SidebarContent);