import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

/* Used to disable sanitization of HTML output, so we can insert HTML in the blog */
@Pipe({ name: 'keepHtml', pure: false })
export class EscapeHtmlPipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) { }

    transform(content) {
        return this.sanitizer.bypassSecurityTrustHtml(content);
    }

}
