import { Component, Input, OnInit } from '@angular/core';
import { FileManagerService } from '../core/services/file-manager.service';
import { DirectoryInterface } from '../core/models/directory.interface';
import { animate, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [ animate('300ms')]),
      transition(':leave', [ animate('300ms')]),
    ]),
  ],
})
export class FileManagerComponent {
  @Input() directories!: any;

  rotateArrow = false;

  loadingDirectory = false;

  directoryTitle!: string;

  directoryId = 0;

  constructor(private fileManagerService: FileManagerService) {
  }

  openDirectory(directory: any): void {
    this.directoryTitle = directory.title;
    this.directoryId = directory.id;

    this.directories = this.directories.map((item: any) => {
      if (item.id === directory.id) {
        return { ...item, isOpen: !item?.isOpen };
      }
      return item;
    });

    const isFolder = directory.hasOwnProperty('children');

    if (isFolder && directory?.children.length === 0) {

      this.loadingDirectory = true;
      this.fileManagerService
        .fetchDirectories(directory.id)

        .subscribe((newDirectory: DirectoryInterface) => {
          this.directories = this.directories.map((item: any) => {
            if (item.id === directory.id) {
              return { ...newDirectory, isOpen: true };
            }
            return item;
          });
          this.loadingDirectory = false;
        });
    }


  }
}
