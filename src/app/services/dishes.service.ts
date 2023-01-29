import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

export interface Dish {
    _id: string,
    name: string,
    image: string,
    ingredients: string,
    price: number,
    tags: string,
    restaurant: {_id:string, name: string},
    isDeleted: boolean,
}

type DishType = Dish;
export type DishesType = DishType[];

@Injectable({
    providedIn: 'root'
})
export class DishService implements OnInit {
    constructor(private http: HttpClient) { }
    ngOnInit(): void { }

    createDish(body:any,token:string){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'token': token
        })
        return this.http.post('http://localhost:3000/api/dishes/', body, {headers:headers});
    }

    getDishes() {
        return this.http.get<DishesType>('http://localhost:3000/api/dishes')
    }

    updateDishById(_id:string, body:any, token:string){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'token': token
        })
         this.http.put(`http://localhost:3000/api/dishes/${_id}`, body, {headers:headers}).subscribe((res)=>{console.log(res);});
    }

    getDishById(id:string){
        return this.http.get<DishesType>(`http://localhost:3000/api/dishes/${id}`);
    }

    deleteDishById(_id:string,token:string){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'token': token
        })
        this.http.delete(`http://localhost:3000/api/dishes/${_id}`, {headers:headers} ).subscribe((res)=>{console.log(res);});

    }
}