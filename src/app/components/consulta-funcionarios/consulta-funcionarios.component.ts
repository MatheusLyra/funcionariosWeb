import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { config } from '../../config/config';

@Component({
  selector: 'app-consulta-funcionarios',
  standalone: true,
  imports: [CommonModule,RouterOutlet,MenuComponent],
  templateUrl: './consulta-funcionarios.component.html',
  styleUrl: './consulta-funcionarios.component.css'
})
export class ConsultaFuncionariosComponent {
  funcionarios: any [] = [];
  mensagem: string = '';

  constructor(private httpClient: HttpClient, private router: Router){}
    ngOnInit(): void {
      this.httpClient.get(config.apiFuncionarios + "Funcionarios")
       .subscribe({
        next: (data) =>{
         this.funcionarios = data as any[];
        },
        error:(e) =>{
          console.log(e);
        }
       })      
    }

    onDelete(id: string): void {
      if(confirm('Deseja realmente excluir o funcionário selecionado?') ) {
       
        //enviando uma requisição de exclusão para a API
        this.httpClient.delete(config.apiFuncionarios + "Funcionarios/" + id)
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
    this.router.navigate(['app/cadastro-funcionarios'], { queryParams: { idFuncionarios: id } });
  }

  redirecionarParaCadastro() {
    this.router.navigate(['app/cadastro-funcionarios']);
  }    
}
