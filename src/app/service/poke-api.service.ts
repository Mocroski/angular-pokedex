import {  Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

//Observable
import { Observable } from "rxjs";
import {map, tap} from "rxjs/operators"

@Injectable({
    providedIn: 'root'
})
export class PokeApiService{
    private url: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151';

    constructor(
        private http: HttpClient
    ){}

    get apiListAllPokemons():Observable<any>{ //Este método é um getter que retorna um Observable que emite uma lista de Pokémons.
        return this.http.get<any>(this.url).pipe( //Faz uma solicitação HTTP GET para a PokeAPI e retorna um Observable que emite a resposta da solicitação.
            tap(res => res), //Registra a resposta da solicitação HTTP usando o operador RxJS tap.
            tap(res => { //Itera sobre a lista de Pokémons na resposta da solicitação, chama o método apiGetPokemon para cada Pokemon e define o atributo status do objeto Pokemon com a resposta recebida.
                res.results.map( (resPokemons: any) => {
                    this.apiGetPokemon(resPokemons.url).subscribe(
                        res => resPokemons.status = res
                    );
                })
            })
        )
    }

    public apiGetPokemon(url: string):Observable<any>{
//Este é um método público que recebe uma URL como argumento e retorna um Observable que emite informações detalhadas de um Pokemon.
        return this.http.get<any>(url).pipe(
//Este método faz uma solicitação HTTP GET para a URL passada como argumento usando o serviço http do Angular. O método get retorna um Observable que emite a resposta da solicitação.
            map(
//Este operador RxJS map é usado para transformar os valores emitidos pelo Observable. Neste caso, estamos mapeando a resposta da solicitação HTTP para ela mesma, ou seja, estamos apenas passando a resposta adiante sem modificá-la.
                res => res
            )
        )
    }
}
