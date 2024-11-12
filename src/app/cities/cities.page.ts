import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

interface City {
  name: string;
  image: string;
}

interface ApiResponse {
  data: City[];
}

@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
})
export class CitiesPage implements OnInit {
  cities: City[] = [];

  constructor(
    private http: HttpClient,
    public toastController: ToastController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.getCities().subscribe({
      next: (response: ApiResponse) => (this.cities = response.data),
    });
  }

  getCities() {
    const url = '/assets/files/cities.json';
    return this.http.get<ApiResponse>(url);
  }

  async presentToast1() {
    const toast = await this.toastController.create({
      message: 'Ciudad seleccionada',
      duration: 500,
      position: 'middle',
    });

    toast.present();
  }

  async presentAlert1() {
    const alert = await this.alertController.create({
      header: 'Borrar ciudad',
      message: 'Se ha borrado la ciudad correctamente',
      buttons: ['OK'],
    });

    await alert.present();
    await alert.onDidDismiss();
  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      header: 'Borrar ciudad',
      message: '¿Estás seguro?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No cancel');
          },
        },
        {
          text: 'Si',
          handler: () => {
            console.log('Ciudad eliminada');
          },
        },
      ],
    });

    await alert.present();
    await alert.onDidDismiss();
  }
}
