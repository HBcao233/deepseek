import { ElElement, html, css, nothing } from '/assets/element-plus-lit.min.js';
import { getValue, setValue, formatDateLess } from './utils.js';
import { Bars, Mobile, NewChat } from '/src/svgs.js';
import { default_roles } from '/src/constants.js';


const version = '2025-12-01';
const changelogs = html`
<h3>2025-12-01</h3>
<ul>
  <li>修复有时无法切换历史对话的问题</li>
  <li>修复当前选择的内置角色始终显示为小派魔的问题</li>
</ul>
<h3>2025-11-30-1</h3>
<ul>
  <li>修复对话选项显示位置错误的问题</li>
</ul>
<h3>2025-11-30</h3>
<ul>
  <li>支持创建角色并指定系统提示词</li>
  <li>修复反复开关侧边栏导致页面显示出错的问题</li>
</ul>`;


class Layout extends ElElement {
  static styles = css`
el-container {
  padding: 0;
  height: 100%;
}


el-header {
  padding: 12px 10px 4px;
  display: flex;
  align-items: center;
  color: var(--dsw-alias-label-primary);
  z-index: 100;
}

el-icon {
  line-height: 0;
}

.sidebar-button::part(el-button) {
  border: none;
  width: 44px;
  height: 44px;
}
.sidebar-button el-icon {
  font-size: 20px;
  color: var(--dsw-alias-label-primary);
}

.download-app {
  margin-left: 4px;
}
.download-app::part(el-button) {
  padding: 6px 14px;
  font-size: 14px;
  line-height: 22px;
  min-width: 72px;
  font-weight: 400;
  color: var(--dsw-alias-label-primary);
  border: 1px solid rgba(0,0,0,.1);
}
.download-app::part(el-button):hover {
  background-color: var(--dsw-alias-interactive-bg-hover);
}
.download-app el-icon {
  font-size: 14px;
  line-height: 0;
}

.new-chat::part(el-button) {
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  color: var(--dsw-alias-label-primary);
}
.new-chat::part(el-button):hover {
  background-color: var(--dsw-alias-interactive-bg-hover);
}
.new-chat::part(content) {
  display: none;
}
.new-chat el-icon {
  font-size: 20px;
  color: var(--dsw-alias-label-primary);
}

el-footer {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  padding: 0;
}

el-footer[open] {
  display: block;
  position: relative;
  height: auto;
}
el-footer[open] ds-input {
  padding: 0 16px;
}
el-footer[open] ds-input::part(logo) {
  display: none;
}

.footer {
  display: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-align: center;
  background-color: #fff;
  color: #81858c;
  max-width: 712px;
  border: none;
  margin: 0;
  padding: 6px 0;
  font-size: 11px;
  line-height: 16px;
}
el-footer[open] .footer {
  display: block;
}

el-main {
  padding: 0;
  overflow-x: hidden;
}

.changelog {
  position: absolute;
  bottom: 0;
  padding: 2rem;
  max-height: 7rem;
  overflow: auto;
  z-index: 1;
}
el-footer[open] .changelog {
  display: none;
}
.changelog h2 {
  font-size: 1.3rem;
}
.changelog h3 {
  font-size: 1.1rem;
}

.changelog el-button::part(el-button) {
  border: none;
  position: absolute;
  top: 2.5rem;
  right: 2rem;
}
  `;
  
  static properties = {
    sidebar_open: {
      type: Boolean,
      state: true,
    },
    chats: {
      type: Array,
      state: true,
      default: [],
    },
    messages: {
      type: Array,
      state: true,
      default: [],
    },
    running: {
      type: Boolean,
      state: true,
      default: false,
    },
    currentChat: {
      type: String,
      state: true,
    },
    sidebars: {
      type: Object,
      state: true,
      default: [],
    },
    roles: {
      type: Array,
      state: true,
    },
    currentRole: {
      type: Number,
      state: true,
      default: -1,
    },
    version: {
      state: true,
    },
  }
  
  render() {
    return html`
<el-container>
  <el-aside>
    <ds-sidebar 
      .open="${this.sidebar_open}" 
      @update:open="${(e) => this.sidebar_open = e.detail.newValue}"
      .sidebars="${this.sidebars}" 
      .currentChat="${this.currentChat}" 
      .roles=${this.roles}
      .currentRole="${this.currentRole}"
      @update:currentRole="${(e) => this.currentRole = e.detail.newValue}"
      @switchChat="${this.switchChat}" 
      @newChat="${this.newChat}"
      @renameChat="${this.renameChat}"
      @deleteChat="${this.deleteChat}"
      @newRole="${this.newRole}"
      @editRole="${this.editRole}"
      @switchRole="${this.switchRole}"
      @deleteRole="${this.deleteRole}"
    ></ds-sidebar>
  </el-aside>
  <el-header height="60">
    <el-button class="sidebar-button" @click="${() => (this.sidebar_open = true)}">
      <el-icon slot="icon">${Bars}</el-icon>
    </el-button>
    <el-button round class="download-app" @click="${() => window.open('https://t.me/hbcao4bot')}">
      <el-icon slot="icon">${Mobile}</el-icon>
      下载应用
    </el-button>
    <div style="margin-left: auto"></div>
    <el-button class="new-chat" @click="${this.newChat}">
      <el-icon slot="icon">${NewChat}</el-icon>
    </el-button>
  </el-header>
  <el-main>
    <ds-content 
      .messages=${this.messages} 
      @retry="${this.onRetry}" 
      @reasoningtoggle="${(e) => { 
        this.messages[e.detail.index].reasoning_open = e.detail.open; 
        this.chats[this.currentChatIndex].messages = this.messages; 
        this.saveChats(); 
      } 
    }"></ds-content>
  </el-main>
  <el-footer ?open="${this.messages.length}">
    <ds-input ?disabled="${this.running}" @send="${this.onSend}"></ds-input>
    ${this.version ? html`<div class="changelog" style="${this.version === version ? 'display: none': ''}">
      <h2>更新日志</h2>
      ${changelogs}
      <el-button circle icon="Close" @click="${() => {this.version = version; setValue('version', version) }}"></el-button>
    </div>` : nothing}
    <div class="footer">内容由 AI 生成，请仔细甄别</div>
  </el-footer>
</el-container>`;
  }
  
  get currentChatIndex() {
    if (!this.currentChat) return -1;
    const index = this.getChatIndex(this.currentChat);
    if (index === -1) this.currentChat = '';
    return index;
  }
  
  getChatIndex(chat_id) {
    for (let i = 0; i < this.chats.length; i++) {
      if (this.chats[i].id == chat_id) {
        return i;
      }
    }
    return -1;
  }
  
  setup() {
    getValue('chats').then((v) => {
      if (v) this.chats = v;
      else {
        const t = window.localStorage.getItem('chats');
        if (t) {
          let chats;
          try {
            chats = JSON.parse(t);
          } catch(e) {}
          if (chats) {
            this.chats = chats;
            this.saveChats();
          }
          window.localStorage.removeItem('chats');
        }
      }
      if (window.location.pathname.includes('/a/chat/s/')) {
        this.currentChat = window.location.pathname.slice(10);
      }
    });
    getValue('roles').then((v) => {
      this.roles = v || [];
    });
    getValue('currentRole').then((v) => {
      this.currentRole = v ?? -1;
    });
    getValue('version').then((v) => {
      this.version = v || '-';
    })
  }
  
  saveChats() {
    setValue('chats', this.chats.filter(Boolean))
  }
  
  firstUpdated() {
    this.ds_sidebar = this.renderRoot.querySelector('ds-sidebar');
    this.ds_content = this.renderRoot.querySelector('ds-content');
    this.input = this.renderRoot.querySelector('ds-input');
  }
  
  onSend(e) {
    if (this.running) return;
    const text = e.target.value;
    this.messages = [
      ...this.messages, 
      {
        'role': this.messages[this.messages.length - 1]?.role == 'user' ? 'assistant': 'user', 
        'content': text,
      },
    ];
    
    const new_id = crypto.randomUUID();
    if (this.chats.length == 0) {
      this.chats = [{
        id: new_id,
        name: this.messages[0].content.slice(0, 15),
        messages: this.messages,
        create_time: parseInt(Date.now() / 1000),
      }]
    } else {
      const index = this.currentChatIndex;
      if (index !== -1) this.chats[index].messages = this.messages;
      else this.chats.push({
        id: new_id,
        name: this.messages[0].content.slice(0, 15),
        messages: this.messages,
        create_time: parseInt(Date.now() / 1000),
      })
    }
    if (!this.currentChat) this.currentChat = new_id;
    this.saveChats();
    this.request();
  }
  
  onRetry(e) {
    const message_id = e.detail.message_id;
    this.request(message_id);
  }
  
  async request(retry_id) {
    const index = this.currentChatIndex;
    const chat = this.chats[index];
    
    let role;
    if (this.currentRole < 0) {
      role = default_roles[-this.currentRole - 1];
    } else {
      role = this.roles[this.currentRole];
    }
    if (!role) {
      return alert('角色初始化错误, 请到派魔的频道 t.me/@HBcaoHouse 反馈bug喵')
    }
    const system_prompt = role?.prompt || default_roles[0].prompt;
    const msgs = [{
      role: 'system',
      content: system_prompt,
    }];
    
    const message_index = retry_id ? retry_id - 1: this.messages.length;
    for (let i = 0; i < message_index; i++) {
      const { role, content, error } = this.messages[i];
      if (!error) msgs.push({ role, content })
    }
    const message = {
      role: 'assistant',
      content: '',
      reasoning_content: '',
      reasoning: this.input.reasoning,
      created: 0,
      reasoning_end: 0,
      error: false,
      reasoning_open: true,
    };
    this.messages[message_index] = message;
    chat.messages = this.messages;
    this.requestUpdate();
    this.ds_content.requestUpdate();
      
    let url = new URL('https://hbcaodog--chat-chat.modal.run');
    let r;
    try {
      r = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          msgs: msgs,
          reasoning: this.input.reasoning,
        }),
      });
    } catch(e) {
      message.error = true;
      message.content = '请求错误，可点击下面按钮重试';
      this.requestUpdate();
      this.ds_content.requestUpdate();
      return
    }
    const reader = r.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    
    const content = [];
    const reasoning_content = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      
      // 保留最后一个可能不完整的行
      buffer = lines.pop();
      for (const line of lines) {
        if (line.trim()) {
          const res = JSON.parse(line);
          
          if (res.code !== 0) {
            content.push(res.data.content);
            break;
          }
          const { content: c, reasoning_content: r, created } = res.data;
          message.created = created;
          if (c && !r) message.reasoning_end = parseInt(Date.now() / 1000);
          if (c) content.push(c);
          if (r) reasoning_content.push(r)
          if (content) message.content = content.join('');
          if (reasoning_content) message.reasoning_content = reasoning_content.join('');
          
          this.saveChats();
          this.requestUpdate();
          this.ds_content.requestUpdate();
        }
      }
    }
  }
  
  willUpdate(changedProps) {
    this.chats = this.chats.filter(Boolean);
    const sidebars = {};
    for (const chat of this.chats.sort((a, b) => b.create_time - a.create_time)) {
      const d = formatDateLess(chat.create_time);
      if (!sidebars[d]) sidebars[d] = [];
      sidebars[d].push({
        id: chat.id,
        name: chat.name,
        create_time: chat.create_time,
      });
    }
    this.sidebars = sidebars;
  }
  
  updated(changedProps) {
    if (changedProps.has('currentChat')) {
      if (!this.currentChat) {
        this.messages = [];
        window.history.pushState(null, '', '/');
      } else {
        const index = this.currentChatIndex;
        if (index === -1) {
          window.history.pushState(null, '', '/');
        } else {
          this.messages = this.chats[index].messages;
          window.history.pushState(null, '', '/a/chat/s/' + this.currentChat);
        }
      }
    }  
  }
  
  switchChat(e) {
    const id = e.detail.id;
    if (!id) return;
    window.history.pushState(null, '', `/a/chat/s/${id}`);
    this.sidebar_open = false;
    this.currentChat = id;
  }
  
  newChat() {
    this.currentChat = '';
    this.sidebar_open = false;
  }
  
  renameChat(e) {
    const { chat:chat_id, newName } = e.detail;
    const index = this.getChatIndex(chat_id);
    if (!this.chats[index] || this.chats[index].name === newName) return;
    this.chats[index].name = newName;
    this.saveChats();
    this.requestUpdate();
  }
  
  deleteChat(e) {
    const { chat:chat_id } = e.detail;
    const index = this.getChatIndex(chat_id);
    if (!this.chats[index]) return;
    delete this.chats[index];
    this.saveChats();
    if (chat_id === this.currentChat) this.currentChat = '';
    this.requestUpdate();
  }
  
  switchRole(e) {
    this.currentRole = e.detail.index;
    setValue('currentRole', this.currentRole);
  }
  
  newRole(e) {
    const {
      name,
      avatar,
      prompt,
    } = e.detail;
    this.roles = [
      ...this.roles,
      {
        name,
        avatar,
        prompt,
      }
    ];
    setValue('roles', this.roles);
  }
  
  editRole(e) {
    const {
      index,
      name,
      avatar,
      prompt,
    } = e.detail;
    this.roles[index] = {
      name,
      avatar,
      prompt,
    };
    this.roles = [...this.roles];
    setValue('roles', this.roles);
  }
  
  deleteRole(e) {
    const index = e.detail.index;
    if (index < 0) return;
    if (index <= this.currentRole) {
      if (this.currentRole >= 0) {
        this.currentRole--;
        setValue('currentRole', this.currentRole);
      }
    }
    this.roles[index] = null;
    this.roles = this.roles.filter(Boolean);
    setValue('roles', this.roles);
  }
}

customElements.define('ds-app', Layout);
