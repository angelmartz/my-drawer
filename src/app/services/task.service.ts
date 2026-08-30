import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

import { Task } from '~/app/tasks/task.model'

/**
 * Servicio de Angular registrado a nivel global (`providedIn: 'root'`),
 * por lo que puede inyectarse por dependencias en cualquier componente
 * o módulo de la aplicación sin necesidad de declararlo en `providers`.
 */
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _tasks: Task[] = [
    { id: 1, title: 'Explorar el ecosistema NativeScript', detail: 'Revisar CLI, plugins y playground.', done: true, priority: 'media' },
    { id: 2, title: 'Configurar coexistencia mobile y web', detail: 'Preparar el proyecto Angular compartido.', done: false, priority: 'alta' },
    { id: 3, title: 'Modularizar el enrutador del side drawer', detail: 'Cada feature con su submódulo de ruteo.', done: false, priority: 'alta' },
    { id: 4, title: 'Personalizar estilos por plataforma', detail: 'Sobrecarga de archivos .android y .ios.', done: false, priority: 'baja' },
    { id: 5, title: 'Agregar íconos a App_Resources', detail: 'Vector drawable personalizado.', done: false, priority: 'media' },
  ]

  private _tasks$ = new BehaviorSubject<Task[]>(this._tasks)

  getTasks(): Observable<Task[]> {
    return this._tasks$.asObservable()
  }

  getTask(id: number): Task | undefined {
    return this._tasks.find((task) => task.id === id)
  }

  toggleDone(id: number): void {
    const task = this.getTask(id)
    if (task) {
      task.done = !task.done
      this._tasks$.next([...this._tasks])
    }
  }

  addTask(title: string, detail: string): void {
    const nextId = this._tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1
    this._tasks.push({ id: nextId, title, detail, done: false, priority: 'media' })
    this._tasks$.next([...this._tasks])
  }
}
