import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

export interface Chef {
    _id: string,
    name: string,
    image: string,
    description: string,
    isDeleted: boolean,
    weekChef: boolean
}

type ChefType = Chef;
export type ChefsType = ChefType[];

@Injectable({
    providedIn: 'root'
})
export class ChefService implements OnInit {
    constructor(private http: HttpClient) { }
    ngOnInit(): void { }

    createChef(body:any){
        this.http.post('http://localhost:3000/api/chefs/', body).subscribe((res)=>{console.log(res);});
    }

    getChefs() {
        return this.http.get<ChefsType>('http://localhost:3000/api/chefs')
    }

    updateChefById(_id:string, body:any){
         this.http.put(`http://localhost:3000/api/chefs/${_id}`, body).subscribe((res)=>{console.log(res);});
    }

    getChefById(id:string){
        return this.http.get<ChefsType>(`http://localhost:3000/api/chefs/${id}`);
    }

    deleteChefById(_id:string){
        this.http.delete(`http://localhost:3000/api/chefs/${_id}` ).subscribe((res)=>{console.log(res);});

    }
}