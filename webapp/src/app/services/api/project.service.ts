import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Project} from "../../models/Project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectsUrl = 'http://0.0.0.0:8000/projects/';

  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get<Project[]>(this.projectsUrl);
  }

  getProject(projectId: number) {
    return this.http.get<Project>(`${this.projectsUrl}${projectId}/`);
  }
}
