import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  loading: boolean;

  constructor(private loaderService: LoaderService) { 
    this.loaderService.loading.subscribe(isLoading => {
      this.loading = isLoading;
    });
  }

  ngOnInit() {
  }

}
