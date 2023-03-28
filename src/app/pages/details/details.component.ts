import { PokeApiService } from './../../service/poke-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{

  ngOnInit(): void {
    this.getPokemon();
  }

  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';

  public pokemon: any;
  public isLoading: boolean = false;
  public apiError: boolean = false;

  constructor(
//A função constructor() é o método construtor da classe que recebe o serviço ActivatedRoute e o serviço PokeApiService injetados como parâmetros.
 //Esses serviços são usados para obter informações sobre a rota ativa e para fazer chamadas à API PokeAPI.
    private activatedRoute: ActivatedRoute,
    private pokeApiService: PokeApiService
  ){}

  public getPokemon() {
//A função getPokemon() é responsável por fazer uma solicitação à API para obter as informações do Pokemon com o ID especificado na rota ativa.
//Ela começa extraindo o ID da rota ativa usando this.activatedRoute.snapshot.params['id'].
//As constantes pokemon e name são criadas chamando as funções apiGetPokemon() do serviço PokeApiService, passando URLs baseadas no ID do Pokemon extraído anteriormente.
    const id = this.activatedRoute.snapshot.params['id'];
    const pokemon = this.pokeApiService.apiGetPokemon(`${this.urlPokemon}/${id}`);
    const name = this.pokeApiService.apiGetPokemon(`${this.urlName}/${id}`);

    return forkJoin([pokemon, name]).subscribe(
//a função forkJoin() do pacote rxjs é chamada com um array que contém as constantes pokemon e name. Isso combina as duas solicitações de API em uma única solicitação.
//A função subscribe() é chamada em forkJoin(), que aguarda a resposta de ambas as chamadas de API.
// Se for bem-sucedida, a resposta é armazenada na variável res e definida como o valor da variável pokemon. 
//A variável isLoading é definida como true para sinalizar que o carregamento terminou.
      res => {
        this.pokemon = res;
        this.isLoading = true;
      },
      error => {
        this.apiError = true;
      }
    );
  }

}
