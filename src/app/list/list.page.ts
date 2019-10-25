import { Component, OnInit } from "@angular/core";
import { AuthService } from "../service/auth.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: "app-list",
  templateUrl: "list.page.html",
  styleUrls: ["list.page.scss"]
})
export class ListPage implements OnInit {
  listrans = [];
  today = new Date();
  private selectedItem: any;
  public items: Array<{ somme: any; datetran: string }> = [];
  constructor(private detail: AuthService) {}
  form = new FormGroup({
    dateFrom : new FormControl(this.today, Validators.required),
    dateTo : new FormControl(this.today, Validators.required)
  });
  dateLessThan(from: string, to: string) {
    return (group: FormGroup): {[key: string]: any} => {
      const f = group.controls[from];
      const t = group.controls[to];
      const now = new Date();
      if (f.value > t.value) {
        return {
          dates: 'Date de debut doit etre plus petit que Date de fin'
        };
      }
      if (t.value > now) {
        return {
          dates: 'Date de fin doit etre plus grand  qu aujourd hui'
        };
      }
      return {};
    };
  }
  ngOnInit() {
    // this.listertran.listransac()
    // .subscribe(
    //   res => this.listrans = res,
    //   err => console.log(err)
    // );
  }
  onSubmit() {
    this.detail.listerenvoi(this.form.value).subscribe(
      listrans => {
        this.listrans = listrans;
        console.log(this.listrans);
        // if (detail.message) {
        //   this.presentAlert();
        // }
      },
      err => {
        console.log(err);
      }
    );
    // add back when alpha.4 is out
    // navigate(item) {
    //   this.router.navigate(['/list', JSON.stringify(item)]);
    // }
  }
}
