export const copyToClipboard = (text) => {
  let nav = navigator || window.navigator;
  if (nav && nav.clipboard && nav.clipboard.writeText) {
    nav.clipboard.writeText(text);
    return
  }
  const tempInput = document.createElement("textarea");
  tempInput.value = text;
  let t = $('dialog[open]');
  if (!t) t = document.body;
  t.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  t.removeChild(tempInput);
}

export function formatDateTime(d) {
  if (d < 9999999999) d *= 1000;
  const formatter = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
  return formatter.format(d).replaceAll('/', '-');
}
export function formatDateLess(d) {
  d = parseInt(d);
  if (d < 9999999999) d *= 1000;
  if (d === NaN) d = undefined;
  const t = formatDateTime(d);
  const now = new Date();
  const date = new Date(d);
  const dayStart = new Date().setHours(0, 0, 0, 0);
  if (date.getTime() > dayStart) return '今天';
  if (date.getTime() > dayStart - 3600 * 24 * 1000) return '昨天';
  if (date.getFullYear() == now.getFullYear()) return t.slice(t.indexOf('-') + 1, t.lastIndexOf(' '));
  return t.slice(0, t.lastIndexOf(' '));
}

export const easeOutQuad = (t) => {
  return 1.74 * t ** 2 - 0.74 * t** 3;
}
export function scrollTo(element, to, duration) {
  const start = element.scrollTop ?? 0;
  const change = to - start;
  let startTime = null;

  function animateScroll(currentTime) {
    if (element.scrolling) return;
    if (startTime === null) {
      startTime = currentTime;
    }
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easedProgress = easeOutQuad(progress); // 使用缓动函数
    element.scrollTop = start + change * easedProgress;

    if (timeElapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  }
  requestAnimationFrame(animateScroll);
}