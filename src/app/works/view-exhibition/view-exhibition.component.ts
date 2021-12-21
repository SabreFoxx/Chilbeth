import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleGuardService } from 'src/services/role-guard.service';
import { BackendService } from 'src/services/backend.service';
import { ApiEndpoints } from 'src/services/api-endpoints';
import { DomSanitizer } from '@angular/platform-browser';
import { getYoutubeVideoId } from 'src/app/others/functions';

@Component({
  selector: 'app-view-exhibition',
  templateUrl: './view-exhibition.component.html',
  styleUrls: ['./view-exhibition.component.css']
})
export class ViewExhibitionComponent implements OnInit {
  exhibitionId: string;
  exhibition;
  youtubeUrl: any = null;

  constructor(private userAuth: AuthService, private route: ActivatedRoute,
    private roleGuard: RoleGuardService, private sanitizer: DomSanitizer,
    public backend: BackendService,
    private router: Router) { }

  canEdit(): boolean {
    return this.roleGuard.canUse('admin');
  }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.exhibitionId = params.get("exhibitionid");
        this.backend.fetchExhibition(this.exhibitionId)
          .subscribe(res => {
            this.exhibition = res;
            if (this.exhibition.videoUrl) {
              this.youtubeUrl = `https://youtube.com/embed/${getYoutubeVideoId(this.exhibition.videoUrl)}`
              this.youtubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeUrl);
            }
          });
      });
  }

  deleteExhibition(): void {
    let c = confirm("Are you sure you want to delete this?");
    if (c) {
      this.backend.performSimpleDelete(ApiEndpoints.EXHIBITION + `/${this.exhibitionId}`)
        .subscribe(res => this.router.navigateByUrl('/exhibitions'));
      // TODO if delete was successful, a 204 status will be received. Use this
    }
  }

  editExhibition(): void {
    this.router.navigateByUrl('/exhibitions/edit/' + this.exhibitionId);
  }

}
