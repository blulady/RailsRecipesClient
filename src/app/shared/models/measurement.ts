export class Measurement {
  id: number;
  unit_measurement: string;

  constructor(measurement:any){
    this.id = measurement.id;
    this.unit_measurement = measurement.unit_measurement;
  }
}
