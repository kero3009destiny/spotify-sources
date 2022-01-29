export function insertInlineStyle({ innerHTML }) {
    const style = document.createElement('style');
    style.innerHTML = innerHTML;
    document.head.appendChild(style);
}
//# sourceMappingURL=index.js.map