import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Router } from '@angular/router';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.scss']
})
export class ImagenesComponent implements OnInit {
  columnas:number=1;
  anchoImg:number=5;
  altoImg:number=5;
  archivosSubidos: any[] = [];
  
  constructor(
    private messageService: MessageService,
    private _router: Router
  ) { }

  ngOnInit(): void {

  }

  onUpload(event:any) {
    // for(let file of event.files) {
    //     this.uploadedFiles.push(file);
    // }

    // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}

regresarIncio(){
  this._router.navigate(["home"]);
}

async generarPDF(event:any){  
  this.archivosSubidos = [];
    for(let file of event.files) {
      this.archivosSubidos.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'Se convirtieron los archivos', detail: ''});
    pdfMake.createPdf(await this.construirPdf()).open();
}


  imagenBase64 = async (url) => {
    var res = await fetch(url);
    var blob = await res.blob();
    const result = await new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);
      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
    return result
  }


  async convertirImagenes(){
    const infoBase64=[];
    for(let imagen of this.archivosSubidos){
      await this.imagenBase64(window.URL.createObjectURL(imagen)).then(
        conversor => {
          infoBase64.push(conversor);
        }
      );
    }
      return infoBase64;
  }



async construirPdf(){
  let content = [];
  let body = [];
  let matrizImagenes = [];
  
  const info = await this.convertirImagenes().then();

  let contador = 0;
  this.columnas = Math.floor( 15/this.anchoImg);
  console.log(this.columnas);
  
  for (let i = 0; i < Math.max(info.length/this.columnas); i++){
    let infoImagenes=[];
    for (let j = 0; j < this.columnas; j++){
      
       if(info[contador] != undefined){
              const imagen =  { 
              image: ''+info[contador], 
              width: this.anchoImg*30,//150, 
              height: this.altoImg*30//150
            };
            infoImagenes.push(imagen); 
        contador++;
      }else{
        const imagen =  { 
         text:''
        };
        infoImagenes.push(imagen);
        contador++;
      }
    }
    
    matrizImagenes.push(infoImagenes);
  }


  console.log(matrizImagenes[1]);
  
    for (let i = 0; i < matrizImagenes.length; i ++){
      body.push(
        [
          ...matrizImagenes[i],
        ],
      );
    }
   
 

  
 return  {
        content:[
          {
            table: {
              body
              }
          }
        ] 
      }

  }

  

}
