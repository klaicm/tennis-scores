import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { PlayerService } from '../player/player.service';
import { Player } from '../player/player.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Match } from '../player/matches/match.model';
import { SnackMessageService } from '../shared/services/snack-message.service';
import { FileUploadService } from '../shared/services/file-upload.service';

@Component({
  selector: 'app-match-input',
  templateUrl: './match-input.component.html',
  styleUrls: ['./match-input.component.scss']
})
export class MatchInputComponent implements OnInit {

  @Input() multiple = false;
  @ViewChild('fileInput') inputEl: ElementRef;

  allPlayers: Array<Player> = new Array<Player>();
  matchFormGroup: FormGroup;

  resultList: Array<String>;
  fileName: string;
  matchImporting = false;

  constructor(private playerService: PlayerService, private snackMessageService: SnackMessageService,
    private fileUploadService: FileUploadService) {

    this.resultList = [
      '6:0', '6:1', '6:2', '6:3', '6:4', '7:5', '7:6', '6:7', '4:6', '3:6', '2:6', '1:6', '0:6'
    ];

    this.matchFormGroup = new FormGroup({
      playerWinFormControl: new FormControl('', Validators.required),
      playerLostFormControl: new FormControl('', Validators.required),
      firstSetFormControl: new FormControl('', Validators.required),
      secondSetFormControl: new FormControl('', Validators.required),
      thirdSetFormControl: new FormControl(''),
      dateFormControl: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.playerService.getAllPlayers().subscribe((response: Array<Player>) => {
        if (response) {
          this.allPlayers = response;
        } else {
          this.snackMessageService.showError('Neuspješan dohvat igrača.');
        }
      });
    });
  }

  saveMatch(): void {
    const match = new Match;

    const playerW: Player = this.matchFormGroup.get('playerWinFormControl').value;
    const playerL: Player = this.matchFormGroup.get('playerLostFormControl').value;
    const firstSet: String = this.matchFormGroup.get('firstSetFormControl').value;
    const secondSet: String = this.matchFormGroup.get('secondSetFormControl').value;
    const thirdSet: String = this.matchFormGroup.get('thirdSetFormControl').value;
    const date: Date = this.matchFormGroup.get('dateFormControl').value;

    if (thirdSet) {
      match.result = firstSet + ' ' + secondSet + ' ' + thirdSet;
    } else {
      match.result = firstSet + ' ' + secondSet;
    }

    match.playerW = playerW;
    match.playerL = playerL;

    match.date = date;

    this.playerService.saveMatch(match).subscribe(response => {
      this.snackMessageService.showSuccess('Uspješno spremljeno');
    });
  }

  uploadFile() {
    this.matchImporting = true;
    const inputEl: HTMLInputElement = this.inputEl.nativeElement;
    const fileCount: number = inputEl.files.length;
    const formData = new FormData();
    if (fileCount > 0) {
      for (let i = 0; i < fileCount; i++) {
        formData.append('file', inputEl.files.item(i));
      }
      this.fileUploadService.importExcelFile(formData).subscribe(
        response => {
          this.matchImporting = false;
          this.snackMessageService.showSuccess(response);

        }, error => {
          this.matchImporting = false;
          this.snackMessageService.showError('Nešta nevelja ' + error);
        });
    }
  }

  onFileInput(inputEl: any) {
    this.fileName = inputEl.srcElement.files.item(0).name;
  }
}
