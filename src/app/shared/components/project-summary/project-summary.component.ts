import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { Router} from '@angular/router';
import { ProjectSummaryService } from './project-summary.service';
import { Projects } from '../../models/projects.model';

@Component({
    selector: 'app-project-summary',
    templateUrl: 'project-summary.component.html',
    styleUrls: ['project-summary.component.css']
})

export class ProjectSummaryComponent implements OnInit, OnChanges {

  loading = false;
  noResult = false;

    @Input() searchRequestParams;
    projectSummaryList: Array<Projects.ResponseModel>;

    constructor(private router: Router,
                private projectSummaryService: ProjectSummaryService) {}

    defSerQuery: String = 'All';

    ngOnInit() {
      this.setProjectSummaryList(this.defSerQuery);
    }

    ngOnChanges() {

        if (this.searchRequestParams) {
            const searchRequestParamsLen = this.searchRequestParams.split(',').length;

            let projSummaryRequestParams;
            if (searchRequestParamsLen === 1) {
                projSummaryRequestParams = `${this.searchRequestParams.split(',')[0]}`;
                this.setProjectSummaryList(projSummaryRequestParams);
            } else if(searchRequestParamsLen === 2) {
                projSummaryRequestParams = `${this.searchRequestParams.split(',')[1]}/${this.searchRequestParams.split(',')[0]}`;
                this.setProjectSummaryList(projSummaryRequestParams);
            } else if(searchRequestParamsLen === 3) {
                this.showProjectDetails(this.searchRequestParams.split(',')[2], this.searchRequestParams.split(',')[0]);
            }

        }
    }

    public setProjectSummaryList(defSerQuery) {
        this.loading = true;
        this.projectSummaryService.getProjectSummaryList(defSerQuery).subscribe((apiData: Array<Projects.ResponseModel>) => {
          this.loading = false;
            if (apiData && apiData.length) {
                this.noResult = false;
                this.projectSummaryList = [...apiData];
            } else {
              this.noResult = true;
            }
        });
    }

    public showProjectDetails(location:string, project:string):void{
       this.router.navigate(['project-details',location,project]);
    }
}
