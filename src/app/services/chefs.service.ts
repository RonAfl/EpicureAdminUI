import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

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

    createChef(body: any, token: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'token': token
        })
        return this.http.post('http://localhost:3000/api/chefs/', body, {headers:headers});
    }

    getChefs() {
        return this.http.get<ChefsType>('http://localhost:3000/api/chefs')
    }

    updateChefById(_id: string, body: any, token:string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'token': token
        })
        this.http.put(`http://localhost:3000/api/chefs/${_id}`, body, {headers:headers}).subscribe((res) => { console.log(res); });
    }

    getChefById(id: string) {
        return this.http.get<ChefsType>(`http://localhost:3000/api/chefs/${id}`);
    }

    deleteChefById(_id: string, token:string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'token': token
        })
        this.http.delete(`http://localhost:3000/api/chefs/${_id}`, {headers:headers}).subscribe((res) => { console.log(res); });

    }
}