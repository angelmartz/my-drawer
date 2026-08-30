import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'
import { Application, isAndroid } from '@nativescript/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'

import { TaskService } from '~/app/services/task.service'
import { Task } from '../task.model'

@Component({
  selector: 'TaskDetail',
  templateUrl: './task-detail.component.html',
})
export class TaskDetailComponent implements OnInit {
  task: Task | undefined
  backLabel = 'Volver'

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private routerExtensions: RouterExtensions,
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id']
    this.task = this.taskService.getTask(id)

    // Valor asignado solo en Android.
    if (isAndroid) {
      this.backLabel = '← Regresar'
    }
  }

  onToggle(): void {
    if (this.task) {
      this.taskService.toggleDone(this.task.id)
    }
  }

  goBack(): void {
    this.routerExtensions.back()
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}
