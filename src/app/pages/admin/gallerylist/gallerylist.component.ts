import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Console } from '@angular/core/src/console';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gallerylist',
  templateUrl: './gallerylist.component.html',
  styleUrls: ['./gallerylist.component.css', '../admin.component.css']
})
export class GallerylistComponent implements OnInit {
  uploadForm: FormGroup;
  uploadfile: any;
  loading = false;
  BuildId;
  BuildName;
  ProjName;
  removeLoad = false;
  constructor(private adminservice: AdminService, private actRoute: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder) { }
  galarylist: any;

  projid: any;
  public ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      gimage: ['']
    });

    this.actRoute.params.subscribe((project) => {
      this.projid = project.id;
      this.ProjName = project.name;
      this.listgalleries(this.projid);
    });

    this.BuildId = localStorage.getItem('BuilderId');
    this.BuildName = localStorage.getItem('BuilderName');
  }
listgalleries(projid) {
    this.loading = true;
    this.adminservice.listgallery(projid).subscribe((res) => {
    console.log(res);
    this.galarylist = res.response;
    console.log(this.galarylist);
    this.loading = false;
    },err => {
      this.router.navigate(['admin']);
    });
}
remove(galleryID) {
  this.removeLoad =  true;
  this.adminservice.deletegallery(galleryID).subscribe((res) => {
    console.log(res);
  //  this.loading = false;
  this.listgalleries(this.projid);
   },err => {
    this.router.navigate(['admin']);
  });
  // this.listgalleries(this.projid);
  this.removeLoad =  false;
  console.log(galleryID);
}
main_img(gID) {
  this.removeLoad =  true;
  this.adminservice.change_main_img(gID, this.projid).subscribe((res) => {
    console.log(res);
  this.listgalleries(this.projid);
   },err => {
    this.router.navigate(['admin']);
  });
  this.removeLoad =  false;
 }

onFileSelect(event) {
  const formData = new FormData();
   if (event.target.files.length > 0) {
    this.removeLoad =  true;
    const files = event.target.files;
        for (const file of files) {
      formData.append('gimage[]', file, file.name);
    }
  this.adminservice.addgallery(this.projid, formData).subscribe((res) => {
      console.log(res);
       this.listgalleries(this.projid);
     },
    (error) => {
             this.router.navigate(['admin']);
        });
    this.removeLoad =  false;
    this.uploadForm.reset();
  }

}

}
