import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import Swal from 'sweetalert2'
import {Store} from "@ngrx/store";
import {AppState} from "../../../app.reducer";
import * as ui from "../../../actions/ui.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss'
  ]
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private authService: AuthService,
    private store: Store<AppState>
  ) {  }

  ngOnInit(): void {

    this.store.dispatch(ui.stopLoading());

  }

  miFormulario: FormGroup = this.fb.group({
    email: ['petermedrano@hotmail.com',[ Validators.required, Validators.email ]],
    password: ['Denver',[ Validators.required, Validators.minLength(6) ]]
  });

  login(){
    const { email, password } = this.miFormulario.value;

    this.authService.login(email, password).subscribe(resp=>{
      if(resp === true){
        this.router.navigateByUrl('/app/dashboard');
      }
      else
      {
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Error',resp,'error');
      }

    });
  }

}
