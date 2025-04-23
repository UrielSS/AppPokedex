import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { GetStatPipe } from 'src/app/pipes/get-stat.pipe';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.page.html',
  styleUrls: ['./detail-pokemon.page.scss'],
  standalone: false
})
export class DetailPokemonPage implements OnInit {

  public pokemon: Pokemon;

  constructor(private navParams: NavParams, private navCtrl: NavController) {
    this.pokemon = this.navParams.data["pokemon"];
    console.log(this.pokemon);
  }

  ngOnInit() {}

  goBack() {
    this.navCtrl.pop();
  }

}
