import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { config } from '../../config/config';
import { CadastroEmpresasComponent } from '../cadastro-empresas/cadastro-empresas.component';

@Component({
  selector: 'app-consulta-empresas',
  standalone: true,
  imports: [CommonModule,RouterOutlet,MenuComponent],
  templateUrl: './consulta-empresas.component.html',
  styleUrl: './consulta-empresas.component.css'
})
export class ConsultaEmpresasComponent {

  empresas: any[] = [];
  mensagem: string = '';

  constructor(private httpClient: HttpClient, private router: Router){}
  
   ngOnInit(): void {
     this.httpClient.get(config.apiEmpresas + "Empresas")
       .subscribe({
        next: (data) =>{
         this.empresas = data as any[];
        },
        error:(e) =>{
          console.log(e);
        }
       })
   }

  //função para realizar a exclusão da tarefa
  onDelete(id: string): void {
    if(confirm('Deseja realmente excluir a empresa selecionada?') ) {
     
      //enviando uma requisição de exclusão para a API
      this.httpClient.delete(config.apiEmpresas + "Empresas/" + id)
       .subscribe({
          next: (data: any) => {
            this.mensagem = data.mensagem;
            this.ngOnInit();
          },
          error: (e) => {
            this.mensagem = 'Falha ao excluir a empresa.';
            console.log(e.error);
          }
        })
    }
  }   

  onEdit(id: String){
    this.router.navigate(['app/cadastro-empresas'], { queryParams: { idEmpresa: id } });
  }

  redirecionarParaCadastro() {
    this.router.navigate(['app/cadastro-empresas']);
  }  
}
