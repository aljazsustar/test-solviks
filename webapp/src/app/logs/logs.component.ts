import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LogService} from "../services/api/log.service";
import {Log} from "../models/Log";
import {Project} from "../models/Project";
import {ProjectService} from "../services/api/project.service";

import {faArrowUp, faArrowDown} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  private projectId: number | undefined;
  logs: Log[] | undefined;
  project: Project | undefined;
  file: Blob | undefined;
  searchTerm: string | undefined;

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;

  constructor(private route: ActivatedRoute,
              private logService: LogService,
              private projectService: ProjectService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.projectId = +this.route.snapshot.paramMap.get('id')
    this.logService.getLogs(this.projectId).subscribe(logs => this.logs = logs);
    this.projectService.getProject(this.projectId).subscribe(project => this.project = project);
  }

  exportToFile() {
    this.logService.getExcel(this.projectId).subscribe(data => {
      this.file = new Blob([data], {type: 'application/vnd.ms-excel;charset=utf-8'});
      let downloadUrl = window.URL.createObjectURL(data);
      let link = document.createElement('a');
      link.href = downloadUrl;
      link.click();
    });
  }

  sortAsc(element: string) {
    this.logService.sortLogsAsc(this.projectId, element).subscribe(logs => this.logs = logs);
  }

  sortDesc(element: string) {
    this.logService.sortLogsDesc(this.projectId, element).subscribe(logs => this.logs = logs);
  }

  search() {
    this.logService.searchLogContents(this.projectId, this.searchTerm).subscribe(logs => this.logs = logs);
  }
}
