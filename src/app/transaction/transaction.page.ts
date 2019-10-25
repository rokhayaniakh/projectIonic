import { Component, OnInit } from "@angular/core";
import { AuthService } from "../service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-transaction",
  templateUrl: "./transaction.page.html",
  styleUrls: ["./transaction.page.scss"]
})
export class TransactionPage implements OnInit {
  TransData = {};
  retraitData = {};
    comData = {};
      tarif:any;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}
  Transaction() {
    console.log(this.TransData);
    this.auth.Transaction(this.TransData).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
  Retrait() {
    console.log(this.retraitData);
    this.auth.Retrait(this.retraitData).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
  com() {
    //.log(this.comData);
    this.auth.commission(this.TransData).subscribe(
      res => {
        this.tarif=res;
        console.log(this.tarif);
      },
      err => {
        console.log(err);
      }
    );
  }
}
