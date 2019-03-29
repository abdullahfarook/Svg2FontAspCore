import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetAllSvgsResponse } from 'src/model/svg2font.model';
import { Observable } from 'rxjs';

@Injectable()
export class SvgService {
public api = 'http://localhost:5000/api';
constructor(private http: HttpClient) { }

getAllSvgs():Observable<GetAllSvgsResponse>{
    return this.http.get<GetAllSvgsResponse>(`${this.api}/Uploader/GetAll`);
}
}
