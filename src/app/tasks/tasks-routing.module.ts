import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { TasksComponent } from './tasks.component'
import { TaskDetailComponent } from './task-detail/task-detail.component'

const routes: Routes = [
  { path: '', component: TasksComponent },
  { path: ':id', component: TaskDetailComponent },
]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class TasksRoutingModule {}
