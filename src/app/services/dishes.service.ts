import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

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

    createDish(body:any){
        this.http.post('http://localhost:3000/api/dishes/', body).subscribe((res)=>{console.log(res);});
    }

    getDishes() {
        return this.http.get<DishesType>('http://localhost:3000/api/dishes')
    }

    updateDishById(_id:string, body:any){
         this.http.put(`http://localhost:3000/api/dishes/${_id}`, body).subscribe((res)=>{console.log(res);});
    }

    getDishById(id:string){
        return this.http.get<DishesType>(`http://localhost:3000/api/dishes/${id}`);
    }

    deleteDishById(_id:string){
        this.http.delete(`http://localhost:3000/api/dishes/${_id}` ).subscribe((res)=>{console.log(res);});

    }
}