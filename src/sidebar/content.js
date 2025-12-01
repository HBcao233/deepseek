import { ElElement, html, css } from '/assets/element-plus-lit.min.js';
import { More, Edit, Pin, Share, Trash } from '/src/svgs.js';


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
    <a 
      class="sidebar-link${this.currentChat === item.id ? ' active':''}" 
      href="/a/chat/s/${item.id}" 
      @click="${(e) => this.switchChat(e, item.id)}" 
      data-chat="${item.id}"
    >
      <p class="link-text">${item.name}</p>
      <div class="sidebar-link-controls">
        <el-dropdown placement="bottom">
          <el-button>
            <el-icon slot="icon">${More}</el-icon>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click="${this.renameChat}">
              <el-icon>${Edit}</el-icon>
              重命名
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon>${Pin}</el-icon>
              置顶
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon>${Share}</el-icon>
              分享
            </el-dropdown-item>
            <el-dropdown-item class="danger" @click="${this.deleteChat}">
              <el-icon>${Trash}</el-icon>
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
  
  switchChat(e, id) {
    e.preventDefault();
    const paths = e.composedPath();
    if (paths[0].localName !== 'a' && paths[0].localName !== 'p') return;
    if (this.currentChat === id) return;
    this.dispatchEvent(new CustomEvent('switchChat', {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {
        id,
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
    this.dispatchEvent(new CustomEvent('renameChat', {
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
    this.dispatchEvent(new CustomEvent('deleteChat', {
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