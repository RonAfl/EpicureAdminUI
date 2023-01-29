import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

export interface User {
    _id: string,
    username: string,
    password: string,
    isSuper: boolean,
    isDeleted: boolean
}

export type UserType = User;
export type UsersType = UserType[];

@Injectable({
    providedIn: 'root'
})
export class UsersService implements OnInit {
    constructor(private http: HttpClient) { }
    ngOnInit(): void { }

    createUser(body:any){
        this.http.post('http://localhost:3000/api/users/', body).subscribe((res)=>{console.log(res);});
    }

    getUsers(_username:string,_password:string) {
        const headers= new HttpHeaders({
            'Content-Type': 'application/json',
            'username': _username,
            'password': _password
        })
        return this.http.get<{user:UserType, accessToken:string}>('http://localhost:3000/api/users', {headers:headers});
    }

    updateUserById(_id:string, body:any){
         this.http.put(`http://localhost:3000/api/users/${_id}`, body).subscribe((res)=>{console.log(res);});
    }

    deleteUserById(_id:string){
        this.http.delete(`http://localhost:3000/api/users/${_id}` ).subscribe((res)=>{console.log(res);});

    }
}