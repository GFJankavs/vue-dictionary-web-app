const getFontFamily = (font: string, type: string) => {
  switch (font) {
    case 'Sans-Serif':
      return `"Inter${type}", sans-serif`
    case 'Serif':
      return `"Lora${type}", serif`
    case 'Mono':
      return `"Inconsolata${type}", monospace`
    default:
      return `"Inter${type}", sans-serif`
  }
}

export const setDarkModeVariable = (isDarkMode: boolean) => {
  const root = document.querySelector(':root') as HTMLElement;

  const colors = {
    light: '#fff',
    dark: '#050505',
  }

  if (root.style) {
    root.style.setProperty('--bg', isDarkMode ? colors.dark : colors.light);
  }
}

export default getFontFamily
