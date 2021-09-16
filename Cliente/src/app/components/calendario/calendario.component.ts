import { Component, OnInit } from '@angular/core';
import {CalendarioService} from "../../services/calendario/calendario.service";
import {PanelService} from "../../services/panel/panel.service";
import * as moment from 'moment';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  ngOnInit() {
  }

  meetings = [{
    start:{
      dateTime:""
    },
    end:{
      dateTime:""
    },
    summary:"",
    description:""
  }]

  nuevaCarga: boolean = false;

  event = {
    start:{
      dateTime:"",
      timeZone: "America/Argentina/Mendoza"
    },
    end:{
      dateTime:"",
      timeZone: "America/Argentina/Mendoza"
    },
    sendUpdates: true,
    summary: "",
    description: "",
    attendees:[{
      email: ""
    }

    ],
    reminders:{
      useDefault: 'false',
      overrides: [
        { method: 'email', minutes: 24 * 60},
        { method: 'popup', minutes: 10},
      ]
    }
  };

  fechaInicio: any;
  fechaFin: any;
  maxResults: any;

  isloaded: boolean = false;

  data: any ={items:[]}


  constructor(private calendarService: CalendarioService, private panelService: PanelService) {
    let start = moment().startOf('day');
    let end = moment().endOf('day');
    if(!localStorage.getItem('apiToken') || localStorage.getItem('apiToken')==null){
      panelService.getCode();
    }
    this.calendarService.getEvents(30,start.toISOString(true),end.toISOString(true)).toPromise().then(res =>{
      this.data = res.body;
      this.meetings = this.data.items;
      if(this.meetings)
      this.isloaded = true;
    }).catch(e =>{
      if(e.status == 401){
        this.calendarService.refreshToken();
        alert('Renovando token...');
        window.location.reload();
      }
    })
  }

  getEventos(){
    this.fechaInicio = new Date(this.fechaInicio).toISOString();
    this.fechaFin = new Date(this.fechaFin).toISOString();
    this.calendarService.getEvents(this.maxResults,this.fechaInicio,this.fechaFin).subscribe(res =>{
      this.data = res.body;
      this.meetings = this.data.items;
      this.isloaded = true;
    })
  }

  crearEvento(event){
    this.event.start.dateTime = new Date(event.start.dateTime).toISOString();
    this.event.end.dateTime = new Date(event.end.dateTime).toISOString();
    this.calendarService.insertEvent(event).subscribe(res =>{
      window.location.reload();
    })
  }

}
