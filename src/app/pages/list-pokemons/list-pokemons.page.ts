import { Component, OnInit } from '@angular/core';
import { LoadingController, NavParams, NavController } from '@ionic/angular';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
  standalone: false,
  providers: [PokemonService]
})
export class ListPokemonsPage implements OnInit {
  public pokemons: Pokemon[];

  constructor(
    private pokemonService: PokemonService,
    public loadingCtrl: LoadingController,
    public navParams: NavParams, 
    public navController: NavController,
  ) { 
    this.pokemons = [];
  }

  ngOnInit() {
    this.morePokemons();
  }

  async morePokemons($event = null) {
    const promise = this.pokemonService.getPokemons();

    if (promise){

      let loading = null;
      if (!$event) {
        loading = await this.loadingCtrl.create({
          message: 'Loading...',
          spinner: 'crescent',
          duration: 2000
        });
        await loading.present();
      }


      promise.then((result: Pokemon[]) => {
        console.log(result);
        this.pokemons = this.pokemons.concat(result);
        console.log(this.pokemons);

      if ($event) {
        $event.target.complete();
      }
      if (loading) {
        loading.dismiss();
      }
      }).catch  ((error) => {
        if ($event) {
          $event.target.complete();
        }
        if (loading) {
          loading.dismiss();
        }
      });
    }
  }

  goToDetails(pokemon:Pokemon) {
    this.navParams.data["pokemon"] = pokemon;
    this.navController.navigateForward('detail-pokemon')
  }
}
