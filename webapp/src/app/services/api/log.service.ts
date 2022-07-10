import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Log} from "../../models/Log";

@Injectable({
  providedIn: 'root'
})
export class LogService {

  logsUrl = 'http://0.0.0.0:8000/projects/'

  constructor(private http: HttpClient) { }

  getLogs(projectId: number) {
    return this.http.get<Log[]>(`${this.logsUrl}${projectId}/logs/`)
  }

  getExcel(projectId: number | undefined) {
    return this.http.get(`${this.logsUrl}${projectId}/logs/export/`, {responseType: 'blob'})
  }

  searchLogContents(projectId: number | undefined, term: string | undefined) {
    return this.http.get<Log[]>(`${this.logsUrl}${projectId}/logs?search=${term}`)
  }

  sortLogsAsc(projectId: number | undefined, attribute: string | undefined) {
    return this.http.get<Log[]>(`${this.logsUrl}${projectId}/logs?ordering=${attribute}`)
  }

  sortLogsDesc(projectId: number | undefined, attribute: string | undefined) {
    return this.http.get<Log[]>(`${this.logsUrl}${projectId}/logs?ordering=-${attribute}`)
  }
}
