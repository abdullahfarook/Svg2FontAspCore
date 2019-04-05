import { Component, ViewChild, ElementRef, OnInit, Inject, AfterViewInit } from '@angular/core';
import { FileRestrictions, SelectEvent, ErrorEvent, RemoveEvent, FileInfo, FileState, UploadComponent, UploadEvent, SuccessEvent } from '@progress/kendo-angular-upload';
import { SvgService } from 'src/services/svg.service';
import { createElement } from '@syncfusion/ej2-base';
import { DOCUMENT } from '@angular/platform-browser';
import { NotificationService } from '@progress/kendo-angular-notification';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { FontGeneratorConfig } from 'src/model/svg2font.model';
import { List } from 'linqts';
// import * as DOMParser  from 'xmldom'
import { from } from 'rxjs';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public fontConfig: FontGeneratorConfig;
    public host = 'http://localhost:5000'
    public api = this.host + '/api';
    private colors:Array<Array<string>>;
    uploadSaveUrl = this.api + '/Uploader/Save';
    uploadRemoveUrl = this.api + '/Uploader/Remove';
    @ViewChild('upload')
    uploadComponent: UploadComponent;
    myRestrictions: FileRestrictions = {
        allowedExtensions: ['.svg']
    };
    allFiles: Array<FileInfo> = [];
    selectEventHandler(e: SelectEvent) {
        console.log('select');
        e.preventDefault();
        for (let index = 0; index < e.files.length; index++) {
            const element = e.files[index];
            this.uploadComponent.cancelUploadByUid(element.uid);
        }
        // e.files.forEach((file) => this.allFiles.push(file));
    }

    ngOnInit(): void {
        this.SvgService.getAllSvgs().subscribe(res => {
            var files = res.files;
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
                this.generateUploadedPreview();
            }, 10);



        });
    }
    public generateUploadedPreview() {
        Array.from(document.getElementsByClassName("k-file-extension-wrapper")).forEach((item: HTMLElement, i) => {
            let preview: HTMLImageElement = <HTMLImageElement>this.createElement('img', { className: 'img-preview' });
            this.getUrlAsBlob(`${this.host}/svg/${this.allFiles[i].name}`).then(reader => {
                preview.src = reader.result as string;
                item.appendChild(preview);
            })
        });
    }
    // public generateSelectedPreview(e: UploadEvent) {
    //     setTimeout(() => {
    //         e.files.forEach(f => {

    //         })
    //     }, 10);
    // }
    public ValidateSvgAndGeneratePreview(e: UploadEvent) {
        // e.preventDefault();
        this.colors = [];
        for (let index = 0; index < e.files.length; index++) {
            const newFile = e.files[index];
            let fileReader = new FileReader();
            fileReader.onload = (load) => {
                //  console.log(fileReader.result);

                // Validate SVG
                var parser = new DOMParser();
                var svg = parser.parseFromString(fileReader.result.toString(), 'image/svg+xml').getElementsByTagName('svg')[0];
                // console.log(svg);
                var col: string[] = [];
                // var filtered=  Array.from(svg.childNodes).filter(f=> f.nodeType!==3);
                // console.log(filtered);
                 Array.from(svg.childNodes).forEach(f=> this.parseNode(f,col));
                 if(col.length){
                     this.uploadComponent.cancelUploadByUid(newFile.uid);
                     this.onError({
                         response:<any>{
                             statusText:'Colored SVG not supported',
                            },
                         files:[],
                         operation:'upload'
                         
                        });
                    //  newFile.state=0;
                    //  e.preventDefault();
                    //  throw new Error('error');
                 } else{
                    setTimeout(() => {
                        var selectedFile = document.querySelectorAll(`[data-uid='${newFile.uid}'] `)[0];
                        var parent = selectedFile.getElementsByClassName('k-file-extension-wrapper')[0] as HTMLElement;
                        let preview: HTMLImageElement = <HTMLImageElement>this.createElement('img', { className: 'img-preview' });
                        let file: File = newFile.rawFile; let reader: FileReader = new FileReader();
                        reader.addEventListener('load', () => {
                            preview.src = reader.result as string;
                            parent.appendChild(preview);
                        }, false);
                        if (file) { reader.readAsDataURL(file); }
                    }, 10);
                 }
                // var child = svgDom.firstChild;
                // console.log(svgDom);
                // var childList = new List<ChildNode>(Array.from(child.childNodes));
                // var elements = 
                // childList
                // .Where(c=> c.nodeType!==3)
                // .Where((c,i)=> c.parentElement.getAttribute('fill')!=='' || c.parentElement.style.fill!=='')
                // .ToArray();
                // var color;
                // elements.forEach((item, i) => {
                //     var fill = item.parentElement.getAttribute('fill');
                //     if(fill){

                //     }
                //     // if (!color) {
                //     //     color = item.style.fill;
                //     // } else {
                //     //     var valid = color === item.style.fill ? true : false;
                //     //     if (!valid) {
                //     //        console.log('not');
                //     //     }
                //     // }
                // });
                // console.log(elements);

                // for (let index = 0; index < child.childNodes.length; index++) {
                //     const node = child.childNodes[index];
                //     console.log('Node ==> '+node);
                    
                // }
                // var svgPaths = svgDom.getElementsByTagName('path');
                // if (svgPaths.length > 1) {
                //     var color;
                //     Array.from(svgPaths).forEach((item: SVGPathElement, i) => {
                //         if (!color) {
                //             color = item.style.fill;
                //         } else {
                //             var valid = color === item.style.fill ? true : false;
                //             if (!valid) {
                //                console.log('not');
                //             }
                //         }
                //     });
                // }

                // Generate Preview of Svg
                
            }
            fileReader.readAsText(newFile.rawFile);

        }
    }
    hasDuplicates(array:string[]) {
        var valuesSoFar = Object.create(null);
        for (var i = 0; i < array.length; ++i) {
            var value = array[i];
            if (value in valuesSoFar) {
                return true;
            }
            valuesSoFar[value] = true;
        }
        return false;
    }
    generateFonts() {
        this.SvgService.generateFonts(this.fontConfig).subscribe(blob => {
            saveAs(blob, 'icoons.zip', {
                type: 'application/zip' // --> or whatever you need here
            });
        }
            , (err: HttpErrorResponse) => {
                var res = err as unknown as HttpResponse<any>;
                this.onError({ operation: 'upload', response: res, files: [] });
            });
    }
    private parseNode(node:ChildNode,colors:string[]){
        if(node.nodeType===3){
            return;
        }
        if(node.hasChildNodes){
           Array.from(node.childNodes).forEach(n=> this.parseNode(n,colors));
        }
        
        var nodeElement = node as HTMLElement;
        if(nodeElement){
             
            var attrFill =nodeElement.getAttribute('fill');
            if(attrFill){
                colors.push(attrFill);
            }
            var styleFill = nodeElement.style.fill;
            if(styleFill){
                colors.push(styleFill);
            }
        }

    }
    public onUploadSuccess(e: SuccessEvent) {
        if (e.operation === 'remove' && e.response instanceof HttpResponse) {
            this.notificationService.show({
                content: `File Removed Successfully`,
                hideAfter: 1500,
                position: { horizontal: 'center', vertical: 'top' },
                animation: { type: 'fade', duration: 400 },
                type: { style: 'success', icon: true }
            });
        }
        if (e.operation === 'upload' && e.response instanceof HttpResponse) {
            this.notificationService.show({
                content: `File Uploaded Successfully`,
                hideAfter: 1500,
                position: { horizontal: 'center', vertical: 'top' },
                animation: { type: 'fade', duration: 400 },
                type: { style: 'success', icon: true }
            });
        }

    }
    public onError(e: ErrorEvent) {
        this.notificationService.show({
            content: `${e.response.statusText}`,
            hideAfter: 1500,
            position: { horizontal: 'center', vertical: 'top' },
            animation: { type: 'fade', duration: 400 },
            type: { style: 'error', icon: true }
        });
    }
    constructor(public SvgService: SvgService, private notificationService: NotificationService) {
        this.fontConfig = <FontGeneratorConfig>{
            fontName: 'icoons',
            clasPrefix: 'icon-',
            classSufix: ' ',
            ie7: false,
            sass: false
        }
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

            }, false)
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
