import {IUser} from "../models/IUser";
import AuthService from "../services/AuthService";
import axios from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";

export default class Store {
    
    user = {} as IUser;
    isAuth = false;
    code: number | undefined
    tempMail: string | undefined

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setUser(user: IUser) {
        this.user = user
    }

    setCode(code: number){
        this.code = code
    }

    setMail(email: string | undefined){
        this.tempMail = email
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
            return true
        } catch (e:any) {
            return e.response?.data?.message
        }
    }

    async registration(email: string, password: string) {
        try {
            await AuthService.registration(email, password)
            return true
        } catch (e:any) {
            return e.response?.data?.message
        }
    }

    async logout() {
        localStorage.removeItem('token')
        await AuthService.logout()
        this.setAuth(false)
        this.setUser({} as IUser)
    }

    async checkAuth() {
        const response = await axios.get<AuthResponse>(`${process.env.REACT_APP_API_URL}/api/refresh`, {withCredentials: true})
        localStorage.setItem('token', response.data.accessToken)
        this.setAuth(true)
        this.setUser(response.data.user)
    }
}
