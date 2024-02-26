import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { config } from '../../config/config';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro-empresas',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './cadastro-empresas.component.html',
  styleUrl: './cadastro-empresas.component.css'
})
export class CadastroEmpresasComponent implements OnInit{

  mensagem: string = '';

  idEmpresa: String ='';
  nomeFantasia: String='';
  RazaoSocial:String='';
  cnpj:String='';

  empresas: any [] = [];

  constructor(private httpClient: HttpClient, private route: ActivatedRoute){
  }

   form = new FormGroup({
      nomeFantasia: new FormControl('',[
        Validators.required, Validators.minLength(8),
        Validators.maxLength(80)]
        ),
      razaoSocial: new FormControl('',[
        Validators.required, Validators.minLength(8),
        Validators.maxLength(160)
      ]),
      cnpj: new FormControl('',[
        Validators.required, Validators.minLength(14),
        Validators.maxLength(18)
      ])
      });


      get f() {
        return this.form.controls;
      }    
      
      onSubmit(): void {
          //fazendo uma requisição HTTP POST para a API
          this.httpClient.post(config.apiEmpresas + "Empresas", this.form.value)
          .subscribe({
                next: (data: any) => {
                  //exibir a mensagem obtida da API
                  this.mensagem = data.mensagem;
                  //limpar o formulário
                  this.form.reset();
                },
                error: (e) => {
                  this.mensagem = 'Falha ao cadastrar empresa. Erro: '+e.error;
                  console.log(e.error);
                }
            });
      }


      ngOnInit() {
        // Recupera o parâmetro 'idEmpresa' da URL
        this.route.queryParams.subscribe(params => {
          this.idEmpresa = params['idEmpresa'];
        });
    
        this.httpClient.get(config.apiEmpresas + "Empresas/" + this.idEmpresa)
        .subscribe({
         next: (data) =>{
          this.empresas = data as any;
         },
         error:(e) =>{
           console.log(e);
         }
        })
 
      }

}
