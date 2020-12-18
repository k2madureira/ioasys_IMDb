import { Request, Response } from 'express';

import SpecialtyModel from '@modules/Specialty/models/Specialty';
import SpecialtyFake from '@modules/Specialty/fakes/FakeSpecialty';

import MedicModel from '@modules/Medic/models/Medic';
import MedicFake from '@modules/Medic/fakes/FakeMedic';
import IAppointmentDTO from '../dtos/ICreateAppointmentDTO';

import AppointmentModel from '../models/Appointment';
import AppointmentFake from '../fakes/FakeAppointment';

const Medic = process.env.NODE_ENV === 'test' ? MedicFake : MedicModel;
const Specialty =
  process.env.NODE_ENV === 'test' ? SpecialtyFake : SpecialtyModel;
const Appointment =
  process.env.NODE_ENV === 'test' ? AppointmentFake : AppointmentModel;

export default class AppointmentController {
  public async index(
    _: Request,
    response: Response,
  ): Promise<Response<IAppointmentDTO[]>> {
    try {
      const Appointments = new Appointment();
      const medics = new Medic();
      const specialtys = new Specialty();

      const allSpecialtys = await specialtys.list();
      const allMedics = await medics.list();
      const appointments = await Appointments.list();

      const appointmentsFormated = appointments.map(appointment => {
        const currentMedic = allMedics.find(
          medic => medic.id === appointment.medic_id,
        );

        return {
          id: appointment.id,
          name: appointment.name,
          species: appointment.species,
          breed: appointment.breed,
          urgent: appointment.urgent,
          status: appointment.status,
          medic: {
            id: currentMedic ? currentMedic.id : '',
            name: currentMedic ? currentMedic.name : '',
            specialty: allSpecialtys.find(
              sp => sp.id === appointment.specialty_id,
            ),
          },
          created_at: appointment.created_at,
          updated_at: appointment.updated_at,
        };
      });

      return response.json({ appointments: appointmentsFormated });
    } catch (error) {
      return response.status(500).json({ error: 'Error' });
    }
  }

  public async findMedicAppointment(
    request: Request,
    response: Response,
  ): Promise<Response<IAppointmentDTO>> {
    const { id } = request.params;
    const Appointments = new Appointment();
    const Medics = new Medic();

    const appointments = await Appointments.list();
    const allMedics = await Medics.list();

    const currentMedic = allMedics.find(medic => medic.id === id);

    if (!currentMedic) {
      return response.status(401).json({ error: 'Medic ID not found!' });
    }

    const findNextAppointment = appointments.find(appointment => {
      return (
        appointment.status !== 'Atendido' &&
        appointment.status !== 'Cancelado' &&
        (appointment.medic_id === currentMedic.id || !appointment.medic_id)
      );
    });

    return response
      .status(200)
      .json({ appointment: findNextAppointment || [] });
  }

  public async findAllMedicAppointment(
    request: Request,
    response: Response,
  ): Promise<Response<IAppointmentDTO>> {
    const { id } = request.params;
    const Appointments = new Appointment();
    const Medics = new Medic();

    const appointments = await Appointments.list();
    const allMedics = await Medics.list();

    const currentMedic = allMedics.find(medic => medic.id === id);

    if (!currentMedic) {
      return response.status(401).json({ error: 'Medic ID not found!' });
    }

    const findNextAppointment = appointments.filter(appointment => {
      return (
        appointment.status !== 'Atendido' &&
        appointment.status !== 'Cancelado' &&
        (appointment.medic_id === currentMedic.id ||
          appointment.medic_id === '')
      );
    });

    return response
      .status(200)
      .json({ appointments: findNextAppointment || [] });
  }

  public async create(
    request: Request,
    response: Response,
  ): Promise<Response<IAppointmentDTO>> {
    try {
      const {
        name,
        species,
        breed,
        urgent,
        status,
        specialty_id,
        medic_id,
      } = request.body;

      const medics = new Medic();
      const appointment = new Appointment();
      const specialtys = new Specialty();

      const allSpecialtys = await specialtys.list();
      const allMedics = await medics.list();

      const currentMedic = allMedics.find(medic => medic.id === medic_id);
      const findSpecialty = allSpecialtys.find(
        specialty => specialty.id === specialty_id,
      );

      if (!findSpecialty && specialty_id) {
        return response.status(401).json({
          error: 'Specialty ID not found!. Please select one these:',
          Specialtys: allSpecialtys,
        });
      }

      if (!name || !specialty_id || !species) {
        return response.status(401).json({
          error:
            'please fill in the fields [name, specialty_id, species, urgent] ',
        });
      }

      if (
        status &&
        status !== 'Pendente' &&
        status !== 'Cancelado' &&
        status !== 'Atendido'
      ) {
        return response.status(401).json({
          error: `please fill in the field status with [ Atendido ; Pendente ; Cancelado]`,
        });
      }

      const newAppointment = await appointment.create({
        name,
        species,
        breed,
        specialty_id,
        medic_id: medic_id || null,
        urgent: typeof urgent !== 'boolean' ? false : urgent,
        status,
        created_at: new Date(),
        updated_at: new Date(),
      });

      if (currentMedic) {
        delete currentMedic.specialty_id;
      }

      const AppointmentResponse = {
        id: newAppointment.id,
        name,
        species,
        breed,
        urgent: newAppointment.urgent,
        status: newAppointment.status,
        medic: {
          id: currentMedic ? currentMedic.id : '',
          name: currentMedic ? currentMedic.name : '',
          specialty: allSpecialtys.find(sp => sp.id === specialty_id),
        },
        created_at: newAppointment.created_at,
      };

      return response.json(AppointmentResponse);
    } catch (error) {
      return response.status(500).json({ error: 'Error' });
    }
  }

  public async update(
    request: Request,
    response: Response,
  ): Promise<Response<IAppointmentDTO> | Response> {
    try {
      const medics = new Medic();
      const Appointments = new Appointment();
      const specialtys = new Specialty();

      const allMedics = await medics.list();
      const appointments = await Appointments.list();
      const allSpecialtys = await specialtys.list();

      const { id } = request.params;
      const {
        name,
        species,
        breed,
        urgent,
        status,
        specialty_id,
        medic_id,
      } = request.body;

      const currentAppointment = appointments.find(
        appointment => appointment.id === id,
      );

      if (!currentAppointment) {
        return response.status(401).json({ error: 'Appointment not found!' });
      }

      if (
        status &&
        status !== 'Pendente' &&
        status !== 'Cancelado' &&
        status !== 'Atendido'
      ) {
        return response.status(401).json({
          error: `please fill in the field status with [ Atendido ; Pendente ; Cancelado]`,
        });
      }

      let urgentValidation = typeof urgent !== 'boolean' ? false : urgent;
      urgentValidation =
        typeof urgent !== 'undefined'
          ? urgentValidation
          : currentAppointment.urgent;

      const medicIdValidation =
        typeof medic_id === 'undefined' && currentAppointment.medic_id === null
          ? null
          : currentAppointment.medic_id;

      const updatedAppointment = await Appointments.update({
        id,
        name: name || currentAppointment.name,
        species: species || currentAppointment.species,
        breed: breed || currentAppointment.breed,
        medic_id: medicIdValidation,
        specialty_id: specialty_id || currentAppointment.specialty_id,
        urgent: urgentValidation,
        status: status || currentAppointment.status,
        created_at: currentAppointment.created_at,
        updated_at: new Date(),
      });

      const currentMedic = allMedics.find(
        medic =>
          medic.id === currentAppointment.medic_id || medic.id === medic_id,
      );
      if (currentMedic) {
        delete currentMedic.specialty_id;
      }

      const deleteAppointment =
        updatedAppointment.status === 'Atendido'
          ? await Appointments.delete(id)
          : false;

      const AppointmentResponse = {
        id: updatedAppointment.id,
        name: name || currentAppointment.name,
        species: species || currentAppointment.species,
        breed: breed || currentAppointment.breed,
        urgent: updatedAppointment.urgent,
        status:
          typeof deleteAppointment !== 'undefined'
            ? updatedAppointment.status
            : 'Atendido ( Appointment Deleted ❌)',
        medic: {
          id: currentMedic ? currentMedic.id : '',
          name: currentMedic ? currentMedic.name : '',
          specialty: allSpecialtys.find(sp => sp.id === specialty_id),
        },
        created_at: updatedAppointment.created_at,
        updated_at: updatedAppointment.updated_at,
      };

      return response.status(200).json(AppointmentResponse);
    } catch (error) {
      return response.status(500).json({ error: 'Error' });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const Appointments = new Appointment();
      const appointments = await Appointments.list();
      const { id } = request.params;

      const findIndex = appointments.findIndex(find => find.id === id);

      if (findIndex === -1 || !id) {
        return response.status(401).json({ error: 'Appointment not found!' });
      }

      await Appointments.delete(id);

      return response.status(200).json({ success: 'deleted' });
    } catch (error) {
      return response.status(500).json({ error: 'Error' });
    }
  }
}
