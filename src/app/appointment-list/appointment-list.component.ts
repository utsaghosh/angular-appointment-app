import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
export class AppointmentListComponent implements OnInit {
  apTitle: string = '';
  apDate: Date = new Date();
  appointments: Appointment[] = [];

  ngOnInit(): void {
    let savedAppointments = localStorage.getItem('appointments');

    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : [];
  }

  addAppointment() {
    if (this.apTitle.trim().length && this.apDate) {
      let newAppointment: Appointment = {
        id: Date.now(),
        title: this.apTitle,
        date: this.apDate,
      };
      this.appointments.push(newAppointment);

      this.apDate = new Date();
      this.apTitle = '';

      localStorage.setItem('appointments', JSON.stringify(this.appointments));
    }
  }

  deleteAppointment(index: number) {
    if (index >= 0) {
      this.appointments.splice(index, 1);
      localStorage.setItem('appointments', JSON.stringify(this.appointments));
    } else {
      alert('no appointment exists with such id');
    }
  }
}
