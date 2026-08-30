import { Component, OnInit } from '@angular/core'
import { RouterExtensions } from '@nativescript/angular'
import { Application, Device, isAndroid, isIOS } from '@nativescript/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Observable } from 'rxjs'

import { TaskService } from '~/app/services/task.service'
import { Task } from './task.model'

@Component({
  selector: 'Tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks$: Observable<Task[]>

  // Etiqueta que solo recibe un valor cuando la app corre en Android.
  platformNote = ''

  // Clase raíz que cambia según el sistema operativo (sobrecarga de estilos).
  platformClass = isIOS ? 'platform-ios' : 'platform-android'

  constructor(
    private taskService: TaskService,
    private routerExtensions: RouterExtensions,
  ) {}

  ngOnInit(): void {
    this.tasks$ = this.taskService.getTasks()

    // Requisito: asignar un valor a una variable únicamente cuando se está en Android.
    if (isAndroid) {
      const sdk = Device.sdkVersion
      this.platformNote = `Android detectado · API level ${sdk} · optimizado con Material`
    }
  }

  onTaskTap(task: Task): void {
    this.routerExtensions.navigate(['/tasks', task.id])
  }

  onToggle(task: Task): void {
    this.taskService.toggleDone(task.id)
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}
