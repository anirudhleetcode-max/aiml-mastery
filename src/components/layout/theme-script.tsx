/**
 * Applies the saved theme and accessibility preferences before first paint.
 *
 * This has to be an inline blocking script: if it ran after hydration the user
 * would see a flash of the wrong theme, and someone who has asked for reduced
 * motion would see the animation they explicitly turned off.
 */
const script = `
(function () {
  try {
    var raw = localStorage.getItem('aiml.ui.v1');
    var prefs = raw ? JSON.parse(raw) : {};
    var theme = prefs.theme || 'dark';
    var root = document.documentElement;
    var systemLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    var light = theme === 'light' || (theme === 'system' && systemLight);
    root.classList.toggle('light', light);
    root.classList.toggle('dark', !light);
    if (prefs.reduceMotion) root.classList.add('reduce-motion');
    if (prefs.highContrast) root.classList.add('contrast-high');
    if (prefs.fontScale && prefs.fontScale !== 100) {
      root.style.setProperty('--root-font-size', prefs.fontScale + '%');
    }
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
