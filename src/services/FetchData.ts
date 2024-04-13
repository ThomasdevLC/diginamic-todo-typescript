export default class FetchData {
  static url: string = "http://localhost:3000/tasks";


   /**
   * Charge les tâches depuis le serveur.
   * @returns Une promesse résolue avec un tableau contenant les tâches récupérées depuis le serveur.
   * @throws Une erreur si le chargement des tâches échoue.
   */

  static async loadTasks(): Promise<void> {
    try {
      const response = await fetch(FetchData.url);
      if (!response.ok) {
        throw new Error("Problème lors du chargement des tâches");
      }
      const tasks = await response.json();
      console.log("Tâches chargées :", tasks);
      return tasks;
    } catch (error) {
      console.error("Erreur lors du chargement des tâches :", error);
    
    }
  }
  /**
   * Ajoute une nouvelle tâche sur le serveur.
   * @param newTask La nouvelle tâche à ajouter.
   * @returns Une promesse résolue avec la tâche ajoutée.
   * @throws Une erreur si l'ajout de la tâche échoue.
   */
  static async addTask(newTask: any): Promise<any> {
    try {
      const response = await fetch(FetchData.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error("Problème lors de l'ajout de la tâche");
      }

      const addedTask = await response.json();
      console.log("Tâche ajoutée :", addedTask);
      return addedTask;
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche :", error);
      return null;
    }
  }
  
 /**
   * Met à jour une tâche existante sur le serveur.
   * @param id L'identifiant de la tâche à mettre à jour.
   * @param updatedTask Les nouvelles données de la tâche à mettre à jour.
   * @returns Une promesse résolue avec la tâche mise à jour.
   * @throws Une erreur si la mise à jour de la tâche échoue.
   */
  static async patchTask(id: number | string, updatedTask: any): Promise<any> {
    try {
      const response = await fetch(`${FetchData.url}/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error("Problème lors de la mise à jour de la tâche");
      }

      const task = await response.json();
      console.log("Tâche mise à jour :", task);
      return task;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche :", error);
      return null;
    }
  }

/**
   * Supprime une tâche existante sur le serveur.
   * @param taskId L'identifiant de la tâche à supprimer.
   * @throws Une erreur si la suppression de la tâche échoue.
   */
  static async deleteTask(taskId: number | string): Promise<boolean> {
    try {
      const response = await fetch(`${FetchData.url}/${taskId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Problème lors de la suppression de la tâche");
      }
  
      const responseData = await response.json();
      if (!responseData) {
        throw new Error("La tâche n'a pas été trouvée sur le serveur");
      }
  
      console.log("Tâche supprimée avec succès");
      return true;
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche :", error);
      return false;
    }
  }
}
