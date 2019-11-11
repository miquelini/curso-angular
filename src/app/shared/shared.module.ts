


import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule} from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS} from '@angular/common/http'

import { RatingComponent } from './rating/rating.component';
import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';

import { OrderService } from './../order/order-items/order.service';
import { RestaurantsService } from './../restaurants/restaurants.service';
import { ShoppingCartService } from './../restaurant-detail/shopping-cart/shopping-cart.service';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NotificationService } from './messages/snackbar/notification.service';
import { LoginService} from '../security/login/login.service';
import { LoggedInGuard } from 'app/security/loggedin.guard';
import { leaveOrderGuard } from './../order/leave-order.guard';
import { AuthInterceptor } from './../security/auth.interceptor';

@NgModule({
    declarations: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule ],
    exports: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent,
              CommonModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders{
        return {
            ngModule: SharedModule,
            providers: [ShoppingCartService, 
                        RestaurantsService, 
                        OrderService, 
                        NotificationService, 
                        LoginService,
                        LoggedInGuard,
                        leaveOrderGuard,
                        {provide: HTTP_INTERCEPTORS, 
                                  useClass: AuthInterceptor,
                                  multi: true }    
                    ]
        }
    }
}