import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileUploadService } from '../../services/file-upload.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public imgTemp: any = null;

  constructor( private fb: FormBuilder,
              //  private usuarioService: UsuarioService,
               private fileUploadService: FileUploadService) {
    
    // this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {


  }


}
