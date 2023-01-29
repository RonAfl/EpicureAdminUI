import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

export interface Restaurant {
    _id: string,
    name: string,
    image: string,
    chef: { _id: string, name: string },
    isDeleted: boolean,
    stars: string
}

type RestaurantType = Restaurant;
export type RestaurantsType = RestaurantType[];

@Injectable({
    providedIn: 'root'
})
export class RestaurantService implements OnInit {
    constructor(private http: HttpClient) { }
    ngOnInit(): void { }
    //restaurants: RestaurantsType = [];

    createRestaurant(body:any, token:string){
       
        const headers= new HttpHeaders({
            'Content-Type': 'application/json', 
            'token': token
        } )
      return this.http.post('http://localhost:3000/api/restaurants/', body ,{headers:headers});
    }

    getRestaurants() {
        return this.http.get<RestaurantsType>('http://localhost:3000/api/restaurants')
    }

    updateRestaurantById(_id:string, body:any, token:string){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'token':token
        })
         this.http.put(`http://localhost:3000/api/restaurants/${_id}`, body, {headers:headers}).subscribe((res)=>{console.log(res);});
    }

    getRestaurantById(id:string){
        return this.http.get<RestaurantType>(`http://localhost:3000/api/restaurants/${id}`);
    }

    deleteRestaurantById(_id:string,token:string){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'token':token
        })
        this.http.delete(`http://localhost:3000/api/restaurants/${_id}`, {headers:headers} ).subscribe((res)=>{console.log(res);});

    }
}