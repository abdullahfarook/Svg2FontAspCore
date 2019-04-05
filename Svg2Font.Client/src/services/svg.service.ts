import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetAllSvgsResponse, FontGeneratorConfig } from 'src/model/svg2font.model';
import { Observable } from 'rxjs';

@Injectable()
export class SvgService {
public api = 'http://localhost:5000/api';
constructor(private http: HttpClient) { }

getAllSvgs():Observable<GetAllSvgsResponse>{
    return this.http.get<GetAllSvgsResponse>(`${this.api}/Uploader/GetAll`);
}
generateFonts(config:FontGeneratorConfig):Observable<any>{
    var req = Object.keys(config).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(config[k])}`).join('&');
    console.log(this.api+'/font/generate?'+req);
    return this.http.get(this.api+'/font/generate?'+req,{responseType:'blob'})
}
}
