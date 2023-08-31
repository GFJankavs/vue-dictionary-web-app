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

export default getFontFamily
