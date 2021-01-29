import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpEvent
} from "@angular/common/http";
import { map, tap, last } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UploaderService {
  public progressSource = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  upload1(file: File) {

    
    const uploadUrl = "http://localhost:9000/image/upload"

    const uploadImageData = new FormData();
    uploadImageData.append('imageFile',file, "1");

    const req = new HttpRequest(
      "POST",
      uploadUrl,
      uploadImageData,
      {
        reportProgress: true
      }
    );

    return this.http.request(req).pipe(
      map(event => this.getEventMessage(event, file)),
      tap((envelope: any) => this.processProgress(envelope)),
      last()
    );
    }
    upload2(file: File) {

    
      const uploadUrl = "http://localhost:9000/image/upload"
  
      const uploadImageData = new FormData();
      uploadImageData.append('imageFile',file, "2");
  
      const req = new HttpRequest(
        "POST",
        uploadUrl,
        uploadImageData,
        {
          reportProgress: true
        }
      );
  
      return this.http.request(req).pipe(
        map(event => this.getEventMessage1(event, file)),
        tap((envelope: any) => this.processProgress1(envelope)),
        last()
      );
      }
      upload3(file: File) {

    
        const uploadUrl = "http://localhost:9000/image/upload"
    
        const uploadImageData = new FormData();
        uploadImageData.append('imageFile',file, "3");
    
        const req = new HttpRequest(
          "POST",
          uploadUrl,
          uploadImageData,
          {
            reportProgress: true
          }
        );
    
        return this.http.request(req).pipe(
          map(event => this.getEventMessage1(event, file)),
          tap((envelope: any) => this.processProgress1(envelope)),
          last()
        );
        }
        upload4(file: File) {

    
          const uploadUrl = "http://localhost:9000/image/upload"
      
          const uploadImageData = new FormData();
          uploadImageData.append('imageFile',file, "4");
      
          const req = new HttpRequest(
            "POST",
            uploadUrl,
            uploadImageData,
            {
              reportProgress: true
            }
          );
      
          return this.http.request(req).pipe(
            map(event => this.getEventMessage1(event, file)),
            tap((envelope: any) => this.processProgress1(envelope)),
            last()
          );
          }
          upload5(file: File) {

    
            const uploadUrl = "http://localhost:9000/image/upload"
        
            const uploadImageData = new FormData();
            uploadImageData.append('imageFile',file, "5");
        
            const req = new HttpRequest(
              "POST",
              uploadUrl,
              uploadImageData,
              {
                reportProgress: true
              }
            );
        
            return this.http.request(req).pipe(
              map(event => this.getEventMessage1(event, file)),
              tap((envelope: any) => this.processProgress1(envelope)),
              last()
            );
            }
 // 
  processProgress(envelope: any): void {
    if (typeof envelope === "number") {
      this.progressSource.next(envelope);
    }
  }

  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;
      case HttpEventType.UploadProgress:
        return Math.round((100 * event.loaded) / event.total);
      case HttpEventType.Response:
        return `Le fichier "${file.name}" a été complètement téléchargé!`;
      default:
        return `Le fichier "${file.name}" a subit une erreur de type: ${event.type}.`;
    }
  }
  processProgress1(envelope: any): void {
    if (typeof envelope === "number") {
      this.progressSource.next(envelope);
    }
  }

  private getEventMessage1(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;
      case HttpEventType.UploadProgress:
        return Math.round((100 * event.loaded) / event.total);
      case HttpEventType.Response:
        return `File "${file.name}" was completely uploaded!`;
      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }
}
