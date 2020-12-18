import { uuid } from 'uuidv4';
import { resolve } from 'path';
import fs from 'fs';
import IAppointmentRepository from '../repositories/IAppointmentRepository';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

export default class Appointment implements IAppointmentRepository {
  appointments: Array<ICreateAppointmentDTO> = [];

  path: string;

  constructor() {
    this.appointments = [];
    this.path = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'shared',
      'database',
      'appointments.json',
    );
    this.loadJson();
  }

  loadJson(): void {
    const data = fs.readFileSync(this.path);
    this.appointments = JSON.parse(data.toString());
  }

  public async list(): Promise<ICreateAppointmentDTO[]> {
    return this.appointments.sort((a, b) => {
      return a.urgent < b.urgent ? 1 : -1;
    });
  }

  public async listById(id: string): Promise<ICreateAppointmentDTO[]> {
    return this.appointments
      .filter(medic => medic.id === id)
      .sort((a, b) => {
        return a.urgent < b.urgent ? 1 : -1;
      });
  }

  public async create({
    name,
    species,
    breed,
    specialty_id,
    medic_id,
    urgent,
    status,
    created_at,
    updated_at,
  }: ICreateAppointmentDTO): Promise<ICreateAppointmentDTO> {
    const appointment = {
      id: uuid(),
      name,
      species,
      breed,
      specialty_id,
      medic_id,
      urgent,
      status: status || 'Pendente',
      created_at,
      updated_at,
    };

    this.appointments.push(appointment);
    fs.writeFileSync(this.path, JSON.stringify(this.appointments, null, 2));

    return appointment;
  }

  public async update({
    id,
    name,
    species,
    breed,
    specialty_id,
    medic_id,
    urgent,
    status,
    created_at,
    updated_at,
  }: ICreateAppointmentDTO): Promise<ICreateAppointmentDTO> {
    const Index = this.appointments.findIndex(find => find.id === id);
    // const updatedAppointment = this.appointments[Index];

    const appointment = {
      id,
      name,
      species,
      breed,
      specialty_id,
      medic_id,
      urgent,
      status,
      created_at,
      updated_at,
    };
    // updatedAppointment.status = 'Atendido';

    this.appointments[Index] = appointment;

    fs.writeFileSync(this.path, JSON.stringify(this.appointments, null, 2));

    return appointment;
  }

  public async delete(id: string): Promise<void> {
    const Index = this.appointments.findIndex(find => find.id === id);
    this.appointments.splice(Index, 1);

    fs.writeFileSync(this.path, JSON.stringify(this.appointments, null, 2));
  }
}
