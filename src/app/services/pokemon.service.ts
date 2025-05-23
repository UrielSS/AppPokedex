import { Injectable } from '@angular/core';
import { Capacitor, CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private nextUrl: string;
  

  constructor() {
    this.nextUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
   }

   getPokemons(){
    const url = this.nextUrl;

    if (url){
      const options = {
        url,
        headers: {},
        params:{}
      }
      return CapacitorHttp.get(options).then(async (response)=> {
        let pokemons: Pokemon[] = [];
        console.log(response);

        if (response.data){
          const results = response.data.results;
          this.nextUrl = response.data.next;

          const promises: Promise<HttpResponse>[] = [];
          for (let index = 0; index < results.length; index++) {
            const pokemon = results[index];
            const urlPokemon = pokemon.url;
            const options = {
              url: urlPokemon,
              headers: {},
              params: {}
            }
            promises.push(CapacitorHttp.get(options));
          }
           await Promise.all(promises).then((responses) =>{
            console.log(responses);
            for (const response of responses) {
              const pokemonData = response.data;
              console.log(pokemonData);

              const pokemonobj = new Pokemon();

              pokemonobj.id = pokemonData.order;
              pokemonobj.name = pokemonData.name;
              pokemonobj.type1 = pokemonData.types[0].type.name;
              if (pokemonData.types[1]){
                pokemonobj.type2 = pokemonData.types[1].type.name;
              }
              pokemonobj.sprite = pokemonData.sprites.front_default;
              pokemonobj.weight = pokemonData.weight / 10;
              pokemonobj.height = pokemonData.height / 10;
              pokemonobj.stats = pokemonData.stats;
              pokemonobj.abilities = pokemonData.abilities.filter(ab => !ab.is_hidden).map(ab => ab.ability.name);
              const hiddenAbility = pokemonData.abilities.find(ab => ab.is_hidden);
              if (hiddenAbility){
                pokemonobj.hiddenAbility = hiddenAbility.ability.name;
              } 
              pokemons.push(pokemonobj);
            }
          })
        }
        return pokemons;
      })
    }
    return null;
   }



}
