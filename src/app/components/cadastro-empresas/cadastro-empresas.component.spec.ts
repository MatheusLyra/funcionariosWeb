import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEmpresasComponent } from './cadastro-empresas.component';

describe('CadastroEmpresasComponent', () => {
  let component: CadastroEmpresasComponent;
  let fixture: ComponentFixture<CadastroEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroEmpresasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
