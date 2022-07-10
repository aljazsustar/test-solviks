import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import {User} from "../models/User";
import {ProjectService} from "../services/api/project.service";
import {Project} from "../models/Project";
import {Stats} from "../models/Stats";
import {StatsService} from "../services/api/stats.service";


@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  loading = false;
  projects: Project[] | undefined;
  stats: Stats | undefined;

  constructor(private projectService: ProjectService,
              private statsService: StatsService) { }

  ngOnInit() {
    this.loading = true;
    this.projectService.getProjects().pipe(first()).subscribe(projects => {
      this.loading = false;
      this.projects = projects;
    });
    this.statsService.getStats().subscribe(stats => this.stats=stats);
  }
}
