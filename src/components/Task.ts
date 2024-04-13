import Dom from "../utils/Dom.js";
import FetchData from "../services/FetchData.js";

export default class Task extends Dom {
  private id: number | string;
  private name: string;
  private done: boolean;
  private parent: HTMLElement;
  private domElts: {
    articleElt: HTMLElement;
    h2Elt: HTMLElement;
    buttonDeleteElt: HTMLElement;
    buttonValidateElt: HTMLElement;
  };

   /**
   * Crée une instance de Task.
   * @param id - L'identifiant de la tâche.
   * @param name - Le nom de la tâche.
   * @param done - Le statut de la tâche (effectuée ou non).
   * @param parent - L'élément parent dans lequel la tâche est rendue.
   */
  constructor(id: number, name: string, done: boolean, parent: HTMLElement) {
    super();
    this.id = id;
    this.name = name;
    this.done = done;
    this.parent = parent;
    this.domElts = this.render();

    this.manageEvents();

    console.log(`task créée : `, this);
  }

  private manageEvents(): void {
    this.domElts.buttonDeleteElt.addEventListener("click", async () => {
      console.log(`bouton delete cliqué`);
      this.domElts.articleElt.remove();
      console.log("task id " + this.id)
      const success = await FetchData.deleteTask(this.id);
      if (!success) {
        // Afficher un message d'erreur dans l'interface
        this.displayErrorMessage("Erreur lors de la suppression de la tâche. Veuillez réessayer.");
      }
    });
  
    this.domElts.buttonValidateElt.addEventListener("click", async () => {
      this.done = !this.done;
      this.domElts.h2Elt.classList.toggle("done");
      if (this.domElts.h2Elt.classList.contains("done")) this.parent.appendChild(this.domElts.articleElt);
      else this.parent.prepend(this.domElts.articleElt);
      this.domElts.buttonValidateElt.innerText = this.done ? "Invalider" : "Valider";
      
      const success = await FetchData.patchTask(this.id, { done: this.done });
      if (!success) {
        // Afficher un message d'erreur dans l'interface
        this.displayErrorMessage("Erreur lors de la mise à jour de la tâche. Veuillez réessayer.");
      }
    });
  }
  // Code pour afficher le message d'erreur dans l'interface
  private displayErrorMessage(message: string): void {
  
    const errorMessageElement = document.createElement('div');
    errorMessageElement.textContent = message;
    document.body.appendChild(errorMessageElement);
  }

  private render(): {
    articleElt: HTMLElement;
    h2Elt: HTMLElement;
    buttonContainer: HTMLElement; 
    buttonDeleteElt: HTMLElement;
    buttonValidateElt: HTMLElement;
  } {
    const articleElt = this.createMarkup("article", "", this.parent);
    const h2Elt = this.createMarkup("h2", this.name, articleElt);
    
    // Création de la div pour contenir les boutons
    const buttonContainer = document.createElement("div");
    const buttonDeleteElt = this.createMarkup("button", "Supprimer", buttonContainer);
    const buttonValidateElt = this.createMarkup("button", this.done ? "Invalider" : "Valider", buttonContainer);
      articleElt.appendChild(buttonContainer);
  
    if (this.done) {
      h2Elt.classList.add("done");
      this.parent.appendChild(articleElt);
    } else {
      this.parent.prepend(articleElt);
    }
  
    return {
      articleElt,
      h2Elt,
      buttonContainer, 
      buttonDeleteElt,
      buttonValidateElt,
    };
  }
  
}
