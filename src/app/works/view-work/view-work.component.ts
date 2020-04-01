import { BackendService } from './../../../services/backend.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { RoleGuardService } from 'src/services/role-guard.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-work',
  templateUrl: './view-work.component.html',
  styleUrls: ['./view-work.component.css']
})
export class ViewWorkComponent implements OnInit {

  workId: string;
  work;

  // TODO view-work throws error when user isn't logged in

  constructor(private userAuth: AuthService, private route: ActivatedRoute,
    private roleGuard: RoleGuardService, public backend: BackendService) { }

  canEdit(): boolean {
    return this.roleGuard.canUse('admin');
  }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.workId = params.get("workid");
        this.backend.fetchWork(this.workId)
          .subscribe(res => this.work = res);
      });
  }

}
