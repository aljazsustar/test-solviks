import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Stats} from "../../models/Stats";

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  statsUrl = 'http://0.0.0.0:8000/stats/'

  constructor(private http: HttpClient) { }

  getStats() {
    return this.http.get<Stats>(this.statsUrl);
  }
}
