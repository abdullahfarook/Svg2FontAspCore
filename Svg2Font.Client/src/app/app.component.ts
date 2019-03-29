import { Component, ViewChild, ElementRef, OnInit, Inject, AfterViewInit } from '@angular/core';
import { FileRestrictions, SelectEvent, ClearEvent, RemoveEvent, FileInfo, FileState, UploadComponent, UploadEvent } from '@progress/kendo-angular-upload';
import { SvgService } from 'src/services/svg.service';
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
            item.parentNode.removeChild(item);
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
}
