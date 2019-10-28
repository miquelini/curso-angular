
import { Component, OnInit } from '@angular/core';

import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html'
})
export class RestaurantsComponent implements OnInit {
  // Aqui estamos declarando uma propriedade
  restaurants: Restaurant []
  // Aqui estamos injetando um serviço como prorpiedade
  // Neste caso a injeção será de um serviço global, deve ser declarada
  // em app.modules// em app.modules
  constructor(private restaurantsService: RestaurantsService) { }
  // Este é o inicializador do Angular
  ngOnInit() {
    // Aqui estamos inicializando a nossa propriedade
    this.restaurantsService.restaurants()
     .subscribe(restaurants => this.restaurants = restaurants)
  }

}
