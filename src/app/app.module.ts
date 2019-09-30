import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { TableComponent } from './table/table.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TrophiesComponent } from 'src/app/player/trophies/trophies.component';
import { PlayerService } from 'src/app/player/player.service';
import { TableService } from 'src/app/table/table.service';
import { HttpClientModule } from '@angular/common/http';
import { MatchesComponent } from './player/matches/matches.component';
import { DetailsComponent } from 'src/app/player/details/details.component';
import { ChartModule } from 'angular2-highcharts';
import { MatTabsModule, MatButtonModule, MatSidenavModule, MatToolbarModule,
  MatListModule, MatTableModule, MatSortModule, MatIconModule, MatCardModule, MatExpansionModule } from '@angular/material';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'table', component: TableComponent },
  { path: 'player/:id', component: PlayerComponent },
  { path: 'trophies', component: TrophiesComponent },
  { path: 'matches', component: MatchesComponent },
  { path: 'details', component: DetailsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    TableComponent,
    HomeComponent,
    TrophiesComponent,
    MatchesComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTabsModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    RouterModule.forRoot(appRoutes),
    ChartModule.forRoot(require('highcharts'))
  ],
  exports: [
    MatTabsModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule
  ],
  providers: [
    PlayerService,
    TableService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
