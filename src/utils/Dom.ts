export default class Dom {
  /**
   * Crée un élément du dom, lui ajoute du texte, le place comme dernier
   * enfant de parent et ajoute un attribut en utilisant le paramètre attributes
   * @param {String} markupName 
   * @param {String} text 
   * @param {HTMLElement} parent 
   * @param {Object} attributes
   * @returns HTMLElement
   */
  createMarkup(markupName: string, text: string, parent: HTMLElement, attributes: { [key: string]: string } = {}): HTMLElement {
    const markup = document.createElement(markupName);
    markup.textContent = text;
    parent.appendChild(markup);
    for (let key in attributes) {
      markup.setAttribute(key, attributes[key]);
    }
    return markup;
  }
}
