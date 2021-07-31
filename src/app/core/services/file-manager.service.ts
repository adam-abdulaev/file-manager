import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DirectoryInterface } from '../models/directory.interface';

@Injectable({
  providedIn: 'root',
})
export class FileManagerService {
  constructor(private http: HttpClient) {}

  public fetchDirectories(id?: number): Observable<DirectoryInterface> {
    return this.http.get<DirectoryInterface>(
      id
        ? `http://164.90.161.80:3000/api/content?dirId=${id}`
        : 'http://164.90.161.80:3000/api/content',
    );
  }
}
