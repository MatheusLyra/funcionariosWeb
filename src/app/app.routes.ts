import { Routes } from '@angular/router';
import { CadastroEmpresasComponent } from './components/cadastro-empresas/cadastro-empresas.component';
import { ConsultaEmpresasComponent } from './components/consulta-empresas/consulta-empresas.component';
import { EdicaoEmpresasComponent } from './components/edicao-empresas/edicao-empresas.component';
import { CadastroFuncionariosComponent } from './components/cadastro-funcionarios/cadastro-funcionarios.component';
import { ConsultaFuncionariosComponent } from './components/consulta-funcionarios/consulta-funcionarios.component';
import { EdicaoFuncionariosComponent } from './components/edicao-funcionarios/edicao-funcionarios.component';

export const routes: Routes = [
    {
        path:'app/cadastro-empresas',
        component: CadastroEmpresasComponent
    },
    {
        path:'app/consulta-empresas',
        component: ConsultaEmpresasComponent
    },
    {
        path:'app/edicao-empresas',
        component: EdicaoEmpresasComponent
    },
    {
        path:'app/cadastro-funcionarios',
        component: CadastroFuncionariosComponent
    },
    {
        path:'app/consulta-funcionarios',
        component: ConsultaFuncionariosComponent
    },
    {
        path:'app/edicao-funcionarios',
        component: EdicaoFuncionariosComponent
    },
    {
        path:'',
        pathMatch:'full',
        redirectTo:'/app/consulta-empresas'
    }    
];
