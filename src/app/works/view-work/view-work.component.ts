import { BackendService } from './../../../services/backend.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { RoleGuardService } from 'src/services/role-guard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiEndpoints } from 'src/services/api-endpoints';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-view-work',
  templateUrl: './view-work.component.html',
  styleUrls: ['./view-work.component.css']
})
export class ViewWorkComponent implements OnInit {
  workId: string;
  work;

  constructor(private userAuth: AuthService, private route: ActivatedRoute,
    private roleGuard: RoleGuardService, public backend: BackendService,
    private router: Router, private title: Title) { }

  canEdit(): boolean {
    return this.roleGuard.canUse('admin');
  }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.workId = params.get("workid");
        this.backend.fetchWork(this.workId)
          .subscribe(res => {
            this.work = res
            this.title.setTitle(`${this.work?.title} - Chinyere Odinukwe`)
          });
      });
  }

  deleteWork(): void {
    let c = confirm("Are you sure you want to delete the work?");
    if (c) {
      this.backend.performSimpleDelete(ApiEndpoints.WORK + `/${this.workId}`)
        .subscribe(res => this.router.navigateByUrl('/works'));
      // TODO if delete was successful, a 204 status will be received. Use this
    }
  }

  editWork(): void {
    this.router.navigateByUrl('/works/edit/' + this.workId);
  }

}
