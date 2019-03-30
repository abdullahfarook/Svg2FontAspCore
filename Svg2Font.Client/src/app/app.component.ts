import { Component, ViewChild, ElementRef, OnInit, Inject, AfterViewInit } from '@angular/core';
import { FileRestrictions, SelectEvent, ClearEvent, RemoveEvent, FileInfo, FileState, UploadComponent, UploadEvent } from '@progress/kendo-angular-upload';
import { SvgService } from 'src/services/svg.service';
import { createElement } from '@syncfusion/ej2-base';
import { DOCUMENT } from '@angular/platform-browser';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    public previewElements = [];
    ngAfterViewInit(): void {
       
    }
    private delFlag = false;
    public host = 'http://localhost:5000'
    public api = this.host + '/api';
    uploadSaveUrl = this.api + '/Uploader/Save';
    uploadRemoveUrl = this.api + '/Uploader/Remove';
    @ViewChild('upload')
    uploadComponent: UploadComponent;
    myRestrictions: FileRestrictions = {
        allowedExtensions: ['.svg', '.png', '.jpg']
    };
    allFiles: Array<FileInfo> = [];
    selectEventHandler(e: SelectEvent) {
        console.log('select');
        e.files.forEach((file) => this.allFiles.push(file));
    }

    ngOnInit(): void {
        this.SvgService.getAllSvgs().subscribe(res => {
            var files = res.files;
            console.log(files);
            var fileInfos = files.map(file =>
                <FileInfo>{
                    name: file.name,
                    size: file.size,
                    extension: file.name.split('.')[1],
                    state: FileState.Uploaded,
                    rawFile: <File>{
                        lastModified: 1552467399643,
                        name: file.name,
                        size: file.size,
                        type: `image/${file.name.split('.')[1]}`
                    }
                }
            );
            this.allFiles = fileInfos;
            setTimeout(() => {
                this.renderImages();
            }, 10);
           
           

        });
    }
    public renderImages(){
        Array.from(document.getElementsByClassName("k-file-extension-wrapper")).forEach((item:HTMLElement,i)=> {
        item.childNodes.forEach(n=> item.removeChild(n));
        let preview: HTMLImageElement = <HTMLImageElement>this.createElement('img', { className: 'img-preview' });
        this.getUrlAsBlob(`${this.host}/svg/${this.allFiles[i].name}`).then(reader => {
            preview.src = reader.result as string;
            item.appendChild(preview);
        })
         });
        // this.previewElements = document.getElementsByClassName('k-file-extension-wrapper') as any;
        // for (const iterator:Htmle of this.previewElements) {
        //     console.log(iterator);
        // }      
        //  console.log(this.previewElements);
    }
    public uploadEventHandler(e: UploadEvent) {
        e.data = {
            description: 'File upload'
        };
    }

    public selectFile(e:SelectEvent){
        console.log(e);
    }
    public removeEventHandler(e: RemoveEvent) {
        
        
        e.preventDefault();
        return;
        // if(this.delFlag){
        //     e.preventDefault();
        //     this.delFlag = false;
        //     return;
        // }
        // console.log(e);
        // this.delFlag = true;
        // this.remove(e.files[0].uid);
        // e.preventDefault();
        // e.data = {
        //     description: 'File remove'
        // };
    }
    public remove(uid: string) {
      
    }

    public showButton(state: FileState): boolean {
        return (state === FileState.Uploaded) ? true : false;
    }
    constructor(public SvgService: SvgService) {
    }
    private getUrlAsBlob(url: string): Promise<FileReader> {
        return new Promise<FileReader>((res, rej) => {
            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.onerror = function (err) { console.log(err) };
            request.responseType = 'blob';
            // request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            request.addEventListener('load', () => {
                console.log(url);
                var reader = new FileReader();
                reader.readAsDataURL(request.response);
                reader.onload = function (e) {
                    res(reader);
                };

            },false)
            request.send();
        });
    }
    private createElement(tagName, properties) {
        var SVG_REG = /^svg|^path|^g/;
        //tslint:disable-next-line
        var element = (SVG_REG.test(tagName) ? document.createElementNS('http://www.w3.org/2000/svg', tagName) : document.createElement(tagName));
        if (typeof (properties) === 'undefined') {
            return element;
        }
        element.innerHTML = (properties.innerHTML ? properties.innerHTML : '');
        if (properties.className !== undefined) {
            element.className = properties.className;
        }
        if (properties.id !== undefined) {
            element.id = properties.id;
        }
        if (properties.styles !== undefined) {
            element.setAttribute('style', properties.styles);
        }
        if (properties.attrs !== undefined) {
            this.attributes(element, properties.attrs);
        }
        return element;
    }
     private attributes(element, attributes) {
        var keys = Object.keys(attributes);
        var ele = element;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            ele.setAttribute(key, attributes[key]);
        }
        return ele;
    }
}
