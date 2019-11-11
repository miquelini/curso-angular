
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate} from '@angular/animations'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';

import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/from'
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-heigth": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-heigth": "70px",
        "margin-top": "20px",
      })),
      transition('* => *', animate('250ms 0s ease-in-out') )
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden'
  // Aqui estamos declarando uma propriedade
  restaurants: Restaurant []

  searchForm: FormGroup
  searchControl: FormControl
  // Aqui estamos injetando um serviço como prorpiedade
  // Neste caso a injeção será de um serviço global, deve ser declarada
  // em app.modules// em app.modules
  constructor(private restaurantsService: RestaurantsService,
              private fb: FormBuilder) { }
  // Este é o inicializador do Angular
  ngOnInit() {

    this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      // .do(searchTerm => console.log(`q=${searchTerm}`))
      .switchMap(searchTerm => 
      this.restaurantsService
        .restaurants(searchTerm).catch(error=>Observable.from([])))
      .subscribe(restaurants => this.restaurants = restaurants)

    // Aqui estamos inicializando a nossa propriedade
    this.restaurantsService.restaurants()
     .subscribe(restaurants => this.restaurants = restaurants)
     console.log('Passou aqui this.restaurantsService.restaurants()')
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }

}
