import { ElElement, html, css, repeat, svg } from '/assets/element-plus-lit.min.js';
import { DeepseekLogo, SidebarClose, SidebarNewChat, More, Copy } from '/src/svgs.js';
import { default_roles } from '/src/constants.js';
import { copyToClipboard } from '/src/utils.js';


class Sidebar extends ElElement {
  static styles = css`
el-sidebar {
  --el-sidebar-width: 261px;
  --el-sidebar-bg-color: #f9fafb;
}

el-sidebar::part(el-overlay) {
  background-color: rgba(0,0,0,.4)
}

el-sidebar::part(el-sidebar) {
  box-sizing: border-box;
  padding: 6px 12px 10px;
  border-right: 1px solid rgba(0,0,0,.04);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.logo-box {
  box-sizing: border-box;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  margin-bottom: 16px;
  padding: 15px 0 10px 4px;
  display: flex;
}
.logo {
  cursor: pointer;
  width: 143px;
  height: 23px;
}

.sidebar-back::part(el-button) {
  background-color: transparent;
  border: none;
  padding: 0;
}

.sidebar-new-chat::part(el-button) {
  box-sizing: border-box;
  background-color: #fff;
  color: var(--dsw-alias-label-primary);
  width: 100%;
  height: 40px;
  border-radius: 100px;
  border: 1px solid rgba(103, 158, 254, 0);
  box-shadow: 0 -2px 2px rgba(72,104,178,.04),0 2px 2px rgba(106,111,117,.09),0 1px 2px rgba(72,104,178,.08);
}
.sidebar-new-chat::part(el-button):hover {
  box-shadow: 0 4px 4px rgba(72,104,178,.04),0 -3px 4px rgba(72,104,178,.04),0 6px 6px rgba(106,111,117,.1);
}

el-scrollbar {
  flex: 1;
  min-height: 0;
  margin-top: 16px;
  position: relative;
}

.role {
  margin-top: auto;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 12px;
  align-items: center;
  width: 100%;
  padding: 6px 2px 6px 6px;
  display: flex;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
.role:hover {
  background-color: #f1f3f5;
}

.role .avatar {
  cursor: pointer;
  width: 32px;
  height: 32px;
  color: #81858c;
  background-color: rgba(0, 0, 0, 0.04);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-radius: 50%;
  outline: none;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  position: relative;
  overflow: hidden;
}
.role .avatar img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.role .name {
  color: rgb(82, 82, 82);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-left: 8px;
  font-size: 14px;
}
.role .more {
  color: #81858c;
  margin-left: auto;
  margin-right: 8px;
}

.roles {
  top: unset;
  left: 0;
  bottom: 3rem;
  box-sizing: border-box;
  border-radius: 12px;
  background-color: var(--el-sidebar-bg-color);
  max-height: 10rem;
  overflow: auto;
  margin: 6px 12px 10px 8px;
  height: auto;
  border: none;
  width: calc(80% - 6px);
}

.roles .role {
  background-color: var(--el-sidebar-bg-color);
}
.roles .role.active {
  background-color: #e4edfd;
}

el-dialog::part(content) {
  width: 90%;
  max-width: 500px;
  max-height: 80%;
}

el-form-item {
  flex-wrap: wrap;
}
el-form-item::part(content) {
  width: 100%;
}

el-form-item::part(label-wrap) {
  width: 100%;
}
el-form-item::part(label) {
  width: 100%;
}

el-form-item [slot=label] {
  width: 100%;
  display: flex;
}
el-form-item el-button::part(el-button) {
  margin-left: auto;
  border: none;
}

el-input::part(inner) {
  color: #0f1115;
}
  `;
  
  static properties = {
    open: {
      type: Boolean,
      attribute: true,
      reflect: true,
      default: false,
    },
    sidebars: {
      type: Object,
      default: {},
      state: true,
    },
    currentChat: {
      attribute: 'current-chat',
    },
    roles: {
      type: Array,
      state: true,
    },
    currentRole: {
      type: String,
      state: true,
      default: -1,
    },
    roleDialogModal: {
      type: Object,
      state: true,
      default: {},
    },
    dialogOpen: {
      type: Boolean,
      state: true,
    },
  }
  
  render() {
    let role;
    if (this.currentRole < 0) {
      role = default_roles[-this.currentRole-1];
    } else {
      role = this.roles?.[this.currentRole] ?? { avatar: '/assets/0.jpg', name: '小派魔' };
    }
    return html`
<el-sidebar .open="${this.open}" @update:open="${(e) => this.open = e.detail.newValue}">
  <div class="logo-box">
    <div class="logo" @click="${this.newChat}">${DeepseekLogo}</div>
    
    <el-button class="sidebar-back" @click=${() => this.open = false}>
      <el-icon slot="icon">${SidebarClose}</el-icon>
    </el-button>
  </div>
  <el-button class="sidebar-new-chat" @click="${this.newChat}">
    <el-icon slot="icon">${SidebarNewChat}</el-icon>
    开启新对话
  </el-button>
  <el-scrollbar>
    <ds-sidebar-content .sidebars="${this.sidebars}" .currentChat="${this.currentChat}"></ds-sidebar-content>
  </el-scrollbar>
  <div class="role currentRole" @click="${this.roleClick}">
    <div class="avatar">
      ${role?.avatar ? html`<img src="${role?.avatar}" onerror="this.src = '/assets/avatar.svg'">` : svg`<svg viewBox="0 0 32 32"><text x="16" y="16" text-anchor="middle" dominant-baseline="middle" fill="currentColor" font-size="20">${role?.name[0]}</text></svg>`}
    </div>
    <div class="name">${this.roles?.[this.currentRole]?.name ?? '小派魔'}</div>
    <el-icon class="more">${More}</el-icon>
    <div class="roles" popover="auto">
      ${repeat([
        ...default_roles.map((item, index) => (item.index = -(index+1), item)),
        ...(this.roles || []).map((item, index) => (item.index = index, item)),
      ], (item) => item.index, (item) => html`
        <div class="role${this.currentRole === item.index ? ' active': ''}" @click="${() => { if (this.currentRole !== item.index) this.switchRole(item.index)} }">
          <div class="avatar">
            ${item.avatar ? html`<img src="${item.avatar}" onerror="this.src = '/assets/avatar.svg'">` : svg`<svg viewBox="0 0 32 32"><text x="16" y="16" text-anchor="middle" dominant-baseline="middle" fill="currentColor" font-size="20">${item.name[0]}</text></svg>`}
          </div>
          <div class="name">${item.name}</div>
          <el-icon class="more" @click="${this.showRoleDialog.bind(this, item.index)}">${More}</el-icon>
        </div>
      `)}
      <div class="role add-role" @click="${this.showRoleDialog.bind(this, null)}">
        <div class="avatar">
          <el-icon icon="Plus"></el-icon>
        </div>
        <div class="name">新建</div>
      </div>
    </div>
  </div>
  
  <el-dialog .open="${this.dialogOpen}" @update:open="${(e) => {
    this.dialogOpen = e.detail.newValue;
    this.rolesRef.showPopover() 
  } }" .title="${this.roleDialogModal.title}">
    <el-form @submit="${this.onSubmit}">
      <el-form-item label="名称">
        <el-input name="name" placeholder="新角色" .value="${this.roleDialogModal.name}" ?disabled="${this.roleDialogModal.internal}"></el-input>
      </el-form-item>
      <el-form-item label="头像链接">
        <el-input name="avatar" placeholder="" .value="${this.roleDialogModal.avatar}" ?disabled="${this.roleDialogModal.internal}"></el-input>
      </el-form-item>
      <el-form-item>
        <div slot="label">
          <span>系统提示词</span>
          <el-button circle @click="${() => copyToClipboard(this.roleDialogModal.prompt)}"><el-icon slot="icon">${Copy}</el-icon></el-button>
        </div>
        <el-input type="textarea" name="prompt" placeholder="你是一个AI助手" autosize .value="${this.roleDialogModal.prompt}" ?disabled="${this.roleDialogModal.internal}"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="danger" ?disabled="${!this.roleDialogModal.edit}" @click="${this.deleteRole}">删除</el-button>
      <el-button type="primary" @click="${() => this.form.submit()}">${this.roleDialogModal.new ? '创建' : '确定'}</el-button>
      <el-button @click="${() => this.dialogOpen = false}">取消</el-button>
    </div>
  </el-dialog>
</el-sidebar>`;
  }
  
  firstUpdated() {
    this.el_sidebar = this.renderRoot.firstElementChild;
    this.rolesRef = this.renderRoot.querySelector('.roles');
    this.roleDialog = this.renderRoot.querySelector('el-dialog');
    this.form = this.renderRoot.querySelector('el-form');
  }
  
  updated(changedProps) {
    if (changedProps.has('open')) {
      this.dispatchUpdate('open', changedProps.get('open'));
      if (this.open) {
        this.dispatchEvent(new Event('show', {
          bubbles: true,
          composed: false,
          cancelable: false,
        }));
      } else {
        this.dispatchEvent(new Event('hide', {
          bubbles: true,
          composed: false,
          cancelable: false,
        }));
      }
    }
  }
  
  show() {
    this.open = true;
  }
  
  hide() {
    this.open = false;
  }
  
  toggle() {
    this.open = !this.open;
  }
  
  newChat() {
    this.dispatchEvent(new Event('newchat', {
      bubbles: true,
      composed: true,
      cancelable: false,
    }));
  }
  
  roleClick(e) {
    if (e.composedPath()[0].classList.contains('currentRole')) this.rolesRef.showPopover();
  }
  
  switchRole(index) {
    this.dispatchEvent(new CustomEvent('switchRole', {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {
        index,
      },
    }));
    this.rolesRef.hidePopover();
  }
  
  showRoleDialog(index) {
    if (index === undefined || index === null) {
      this.roleDialogModal = { 
        name: '',
        avatar: '',
        prompt: '',
        title: '创建角色',
        new: true,
      }
    } else {
      let role;
      if (index >= 0) {
        role = this.roles[index];
        this.roleDialogModal = {
          ...role,
          title: `修改角色 ${role.name}`,
          index, 
          edit: true,
          internal: false,
        }
      } else {
        role = default_roles[-index-1];
        this.roleDialogModal = {
          ...role,
          title: `查看角色 ${role.name}`,
          internal: true,
        }
      }
      if (!role) return alert('不存在的角色');
    }
    this.dialogOpen = true;
  }
  
  onSubmit(e) {
    e.preventDefault()
    this.dialogOpen = false;
    const {
      name = '新角色',
      avatar = '',
      prompt = '你是一个AI助手',
    } = e.target.value;
    if (this.roleDialogModal.new) {
      this.dispatchEvent(new CustomEvent('newRole', {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: {
          name,
          avatar,
          prompt,
        },
      }));
    } else if (this.roleDialogModal.edit) {
      this.dispatchEvent(new CustomEvent('editRole', {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: {
          index: this.roleDialogModal.index,
          name,
          avatar,
          prompt,
        },
      }));
    }
    
  }
  
  deleteRole() {
    const success = confirm('删除后无法恢复，是否继续？');
    if (success) {
      this.dispatchEvent(new CustomEvent('deleteRole', {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: {
          index: this.roleDialogModal.index,
        },
      }));
      this.dialogOpen = false;
    }
  }
}

customElements.define('ds-sidebar', Sidebar);
