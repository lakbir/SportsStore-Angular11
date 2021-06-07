import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../services/token-storage.service';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  user: any = null;
  registerFormGroup: FormGroup;

  constructor(private authService: AuthService,
              private toastr: ToastrService,
              private usersService: UsersService,
              private router: Router,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.user = this.tokenStorage.getUser();
      this.registerFormGroup = new FormGroup({
        id: new FormControl(this.tokenStorage.getUser().id),
        username: new FormControl(this.tokenStorage.getUser().username, [Validators.required, Validators.maxLength(15),Validators.minLength(5)]),
        email: new FormControl(this.tokenStorage.getUser().email, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.maxLength(25), Validators.minLength(6)]),
        confirmPassword: new FormControl(null, [Validators.required, Validators.maxLength(25), Validators.minLength(6)])
      }, {validators: this.checkPasswords});
    }

  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { notSame: true }
  }

  onUpdateMyProfile() {
    this.usersService.updateProfile(this.registerFormGroup.get('username').value, this.registerFormGroup.get('email').value, this.registerFormGroup.get('password').value, this.registerFormGroup.get('id').value).subscribe(
      data => {
        console.log(data);
        this.toastr.success('Your profile has successfully updated', 'Success !');
        setTimeout(() =>
          {
            this.tokenStorage.signOut();
            window.location.reload();
          },
          2000);

      },
      err => {
        console.error(err.error.message)
        this.toastr.warning('Error update, ' + err.error.message, 'Wrning !');
      }
    );
  }
}
