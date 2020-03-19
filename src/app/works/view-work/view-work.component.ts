import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { RoleGuardService } from 'src/services/role-guard.service';

@Component({
  selector: 'app-view-work',
  templateUrl: './view-work.component.html',
  styleUrls: ['./view-work.component.css']
})
export class ViewWorkComponent implements OnInit {

  constructor(private userAuth: AuthService, private roleGuard: RoleGuardService) { }

  canEdit(): boolean {
    return this.roleGuard.canUse('admin');
  }

  ngOnInit(): void {
  }

}
