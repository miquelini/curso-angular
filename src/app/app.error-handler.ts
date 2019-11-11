import { ErrorHandler, Injectable, Injector } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/throw'

import { NotificationService } from './shared/messages/snackbar/notification.service';
import { LoginService } from './security/login/login.service';

@Injectable()
export class AplicationErrorHandler extends ErrorHandler{
    
    constructor (private ns: NotificationService, private injector: Injector){
        super()
    }

    handlerError(errorResponse: HttpErrorResponse | any){
        console.log('Passou aqui handlerError(errorResponse: HttpErrorResponse | any){')
        if(errorResponse instanceof HttpErrorResponse){
            const message = errorResponse.error.message
            switch(errorResponse.status){
                case 401: 
                    this.injector.get(LoginService).handleLogin()
                    break;
                case 403:
                    this.ns.notify(message || 'Não autorizado')
                    break;
                case 404:
                        console.log('Passou aqui 404 de app.error-han')
                        this.ns.notify(message || 'Recurso não encontrado. Verifique o console para mais detalhes')
                    break;
            }
        }
        console.log('Passou aqui handlerError(errorResponse: HttpErrorResponse | any){')
        super.handleError(errorResponse)
    }
}