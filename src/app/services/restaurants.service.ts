import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

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

    createRestaurant(body:any){
        this.http.post('http://localhost:3000/api/restaurants/', body).subscribe((res)=>{console.log(res);});
    }

    getRestaurants() {
        return this.http.get<RestaurantsType>('http://localhost:3000/api/restaurants')
    }

    updateRestaurantById(_id:string, body:any){
         this.http.put(`http://localhost:3000/api/restaurants/${_id}`, body).subscribe((res)=>{console.log(res);});
    }

    getRestaurantById(id:string){
        return this.http.get<RestaurantType>(`http://localhost:3000/api/restaurants/${id}`);
    }

    deleteRestaurantById(_id:string){
        this.http.delete(`http://localhost:3000/api/restaurants/${_id}` ).subscribe((res)=>{console.log(res);});

    }
}