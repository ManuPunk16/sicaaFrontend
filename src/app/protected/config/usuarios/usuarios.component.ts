import { Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild } from '@angular/core';
import { UserService } from "../../services/user.service";
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  constructor(private userService: UserService) { }

  dtOptions: DataTables.Settings = {};
  usuarios: any[] = [];
  NumberOfUsuarios: number = 0;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective | undefined;
  dtTrigger: Subject<DataTableDirective> = new Subject();

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Hay que dessuscribirse del evento dtTrigger, para poder recrear la tabla.
    this.dtTrigger.unsubscribe();
  }

  reDraw(): void {
    this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destruimos la tabla
      dtInstance.destroy();
      // dtTrigger la reconstruye
      this.dtTrigger.next();
    });
  }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      info: true,
      language: {
        emptyTable: '',
        zeroRecords: 'No hay coincidencias',
        lengthMenu: 'Mostrar _MENU_ elementos',
        search: 'Buscar:',
        info: 'De _START_ a _END_ de _TOTAL_ elementos',
        infoEmpty: 'De 0 a 0 de 0 elementos',
        infoFiltered: '(filtrados de _MAX_ elementos totales)',
        paginate: {
          first: 'Prim.',
          last: 'Últ.',
          next: 'Sig.',
          previous: 'Ant.'
        },
      },
      ajax: (dataTablesParameters: any, callback) => {
        this.userService.usuariosDataTable(dataTablesParameters)
          .subscribe(resp => {
            this.usuarios = resp.data;
            this.NumberOfUsuarios = resp.data.length;
            $('.dataTables_length>label>select, .dataTables_filter>label>input').addClass('form-control-sm');
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
            if (this.NumberOfUsuarios > 0) {
              $('.dataTables_empty').css('display', 'none');
            }
          }
        );
      },
      columns: [
        { data: 'id' },
        { data: 'name' },
        { data: 'email' },
        { data: 'mkey', searchable: false }
      ],
      initComplete: function(settings, json){
        console.log(settings);
      }
    };

  }

  accion(key:string){
    console.log(key);
    this.reDraw();
  }

  borrar(key:string){
    Swal.fire({
      title: 'Eliminación de usuario ?',
      text: "No podra revertir este precedimiento !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.borrarUsuario(key)
          .subscribe(resp=>{
            Swal.fire(
              'Eliminado !',
              'Usuario eliminado.',
              'success'
            )
            this.reDraw();
          })
      }
    })
  }

  addUser(){
    
  }

}
