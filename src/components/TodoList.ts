import Dom from "../utils/Dom";
import Task from "./Task";
import FetchData from "../services/FetchData";

interface DomElements {
  form: HTMLFormElement;
  input: HTMLInputElement;
  sectionListTasks: HTMLElement;
}

interface TaskData {
  id: number ;
  name: string;
  done: boolean;
}

export default class TodoList extends Dom {
  private rootDom: HTMLElement;
  private domElts: DomElements;

  constructor() {
    super();
    this.rootDom = document.getElementById("root")!;
    this.domElts = this.render();

    this.manageEvents();

    (async () => {
      const tasks = await FetchData.loadTasks();
      this.renderTasks(tasks);
    })();
  }

  private manageEvents(): void {
    this.domElts.form.addEventListener("submit", (event) => {
      event.preventDefault();

      const taskName = this.domElts.input.value;

      if (taskName) {
        const newTask: TaskData = {
          id: Math.floor(Math.random() * 1000),
          name: taskName,
          done: false,
        };
        new Task(newTask.id, newTask.name, newTask.done, this.domElts.sectionListTasks);
        this.domElts.input.value = "";
        FetchData.addTask(newTask);
      }
    });
  }

  private render(): DomElements {
    const form = this.createMarkup("form", "", this.rootDom) as HTMLFormElement;
    const label = this.createMarkup("label", "", form, { for: "task" });
    const input = this.createMarkup("input", "", form, { id: "task", type: "text" }) as HTMLInputElement;
    const buttonSubmit = this.createMarkup("button", "Ajouter la tâche", form, { id: "task", type: "submit" });
    const sectionListTasks = this.createMarkup("section", "", this.rootDom);

    return {
      form,
      input,
      sectionListTasks,
    };
  }

  private renderTasks(tasks: TaskData[]): void {
    tasks.forEach((task) => {
      new Task(task.id, task.name, task.done, this.domElts.sectionListTasks);
    });
  }
}
