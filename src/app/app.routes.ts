import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    loadComponent: () => import("./features/timeline/timeline.component").then((c) => c.TimelineComponent)
  }
];
