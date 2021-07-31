import {Component, OnInit} from '@angular/core';
import { FileManagerService } from './core/services/file-manager.service';
import { DirectoryInterface } from './core/models/directory.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  directories!: DirectoryInterface;

  constructor(private fileManagerService: FileManagerService) {}

  ngOnInit(): void {
    this.fileManagerService.fetchDirectories().subscribe((directories: DirectoryInterface) => {
      this.directories = directories.children.map((item: any) => ({...item, isOpen: false}));
    });
  }
}
