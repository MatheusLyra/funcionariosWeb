import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { config } from '../../config/config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-funcionarios',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cadastro-funcionarios.component.html',
  styleUrl: './cadastro-funcionarios.component.css'
})
export class CadastroFuncionariosComponent {

  empresas: any[] = [];
  httpHeaders: HttpHeaders | null = null;
  mensagem: string = '';   

  //método construtor (injeção de dependência)
  constructor(private httpClient: HttpClient) {}


  //estrutura do formulário
  form = new FormGroup({
    nome : new FormControl('', [Validators.required]),
    matricula: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required]),
    dataAdmissao: new FormControl('', [Validators.required]),
    empresaId: new FormControl('', [Validators.required]),
  });


  //função para verificar se os campos do formulário
  //possuem algum erro de validação
  get f() {
    return this.form.controls;
  }

  ngOnInit(): void{

    //fazendo uma requisição HTTP GET na API
    this.httpClient.get(config.apiEmpresas + "Empresas")
      .subscribe({ //capturando o retorno da API
        next: (data) => {
          //guardar o resultado no atributo do componente
          this.empresas = data as any[];
        },
        error: (e) => {
          console.log(e);
        }
      })   
  }


  onSubmit(): void {

      //fazendo uma requisição HTTP POST para a API
      this.httpClient.post(config.apiFuncionarios + "Funcionarios", this.form.value)
        .subscribe({
            next: (data: any) => {
              //exibir a mensagem obtida da API
              this.mensagem = data.mensagem;
              //limpar o formulário
              this.form.reset();
            },
            error: (e) => {
              this.mensagem = 'Falha ao cadastrar funcionário. Erro: '+e.error;
              console.log(e.error);
            }
        });

  }


}
