import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

import { TasksRoutingModule } from './tasks-routing.module'
import { TasksComponent } from './tasks.component'
import { TaskDetailComponent } from './task-detail/task-detail.component'

@NgModule({
  imports: [NativeScriptCommonModule, TasksRoutingModule],
  declarations: [TasksComponent, TaskDetailComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class TasksModule {}
