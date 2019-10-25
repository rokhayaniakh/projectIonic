import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private listrans = "http://localhost:8000/api/listrans";
  jwt: string;
  roles: Array<string>;
  username: string;

  private headers = {
    headers: new HttpHeaders().set(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    )
  };
  private loginUrl = "http://localhost:8000/api/login_check";
  constructor(private http: HttpClient) {}
  login(user) {
    return this.http.post<any>(this.loginUrl, user, { observe: "response" });
  }
  Transaction(Trans) {
    const endpoint = "http://localhost:8000/api/trans";
    const formData: FormData = new FormData();
    formData.append("status", Trans.status);
    formData.append("agence", Trans.agence);
    formData.append("somme", Trans.somme);
    formData.append("nomcomplet", Trans.nomcomplet);
    formData.append("nomcompletben", Trans.nomcompletben);
    formData.append("tel", Trans.tel);
    formData.append("tele", Trans.tele);
    return this.http.post(endpoint, formData, this.headers);
  }
  Retrait(retrait) {
    const endpoint = "http://localhost:8000/api/retrait";
    const formData: FormData = new FormData();
    formData.append("status", retrait.status);
    formData.append("code", retrait.code);
    formData.append("cni", retrait.cni);
    return this.http.post(endpoint, formData, this.headers);
  }
  commission(com) {
    const endpoint = "http://localhost:8000/api/com";
    const formData: FormData = new FormData();
    formData.append("somme", com.somme);
    return this.http.post(endpoint, formData, this.headers);
  }
  listerenvoi(envoip) {
    const endpoint = 'http://localhost:8000/api/listerenvoi';
    // const formData: FormData = new FormData();
    // formData.append('datefrom', envoip.Datefrom);
    // formData.append('dateTo', envoip.DateTo);
    return this.http.post<any>(endpoint, envoip, this.headers);
  }
  listransac() {
    return this.http.get<any>(this.listrans, this.headers);
  }
  getToken(): string {
    return localStorage.getItem("token");
  }
  saveToken(jwt: string) {
    localStorage.setItem("token", jwt["token"]);
    this.jwt = jwt["token"];
    this.parseJWT();
  }
  parseJWT() {
    const jwtHelper = new JwtHelperService();
    const objJWT = jwtHelper.decodeToken(this.jwt);
    this.username = objJWT.username;
    this.roles = objJWT.roles;
    console.log(this.roles);
  }
  isAuthentificated() {
    return this.roles;
  }
}
