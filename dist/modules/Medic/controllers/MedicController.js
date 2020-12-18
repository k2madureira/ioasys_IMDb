"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Specialty = _interopRequireDefault(require("../../Specialty/models/Specialty"));

var _FakeSpecialty = _interopRequireDefault(require("../../Specialty/fakes/FakeSpecialty"));

var _Appointment = _interopRequireDefault(require("../../Appointment/models/Appointment"));

var _FakeAppointment = _interopRequireDefault(require("../../Appointment/fakes/FakeAppointment"));

var _Medic = _interopRequireDefault(require("../models/Medic"));

var _FakeMedic = _interopRequireDefault(require("../fakes/FakeMedic"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Medic = process.env.NODE_ENV === 'test' ? _FakeMedic.default : _Medic.default;
const Specialty = process.env.NODE_ENV === 'test' ? _FakeSpecialty.default : _Specialty.default;
const Appointment = process.env.NODE_ENV === 'test' ? _FakeAppointment.default : _Appointment.default;

class MedicController {
  async index(_, response) {
    try {
      const Medics = new Medic();
      const listMedics = await Medics.list();
      const Specialtys = new Specialty();
      const AllSpecialtys = await Specialtys.list();
      const AllMedics = listMedics.map(medic => {
        const index = AllSpecialtys.findIndex(find => find.id === medic.specialty_id);
        const specialty = AllSpecialtys[index];
        return {
          id: medic.id,
          name: medic.name,
          specialty: {
            id: medic.specialty_id,
            description: specialty.description
          }
        };
      });
      return response.json({
        medics: AllMedics
      });
    } catch (error) {
      return response.status(500).json({
        error: 'Error'
      });
    }
  }

  async create(request, response) {
    try {
      const {
        name,
        specialty_id
      } = request.body;
      const medic = new Medic();
      const specialtys = new Specialty();
      const allSpecialtys = await specialtys.list();
      const findSpecialtyIndex = allSpecialtys.findIndex(find => find.id === specialty_id);

      if (!name || !specialty_id) {
        return response.status(401).json({
          error: 'please fill in the fields [name, specialty_id] '
        });
      }

      if (findSpecialtyIndex === -1 || !specialty_id) {
        return response.status(401).json({
          error: 'Specialty ID not found!. Please select one these:',
          Specialtys: allSpecialtys
        });
      }

      const specialty = allSpecialtys[findSpecialtyIndex];
      const newMedic = await medic.create({
        name,
        specialty_id
      });
      const MedicSpecialty = {
        id: newMedic.id,
        name: newMedic.name,
        specialty: {
          id: specialty.id,
          description: specialty.description
        }
      };
      return response.json(MedicSpecialty);
    } catch (error) {
      return response.status(500).json({
        error: 'Error'
      });
    }
  }

  async update(request, response) {
    try {
      const {
        name,
        specialty_id
      } = request.body;
      const {
        id
      } = request.params;
      const Medics = new Medic();
      const Specialtys = new Specialty();
      const AllSpecialtys = await Specialtys.list();
      const findSpecialty = AllSpecialtys.find(specialty => specialty.id === specialty_id);

      if (!findSpecialty && specialty_id) {
        return response.status(401).json({
          error: 'Specialty ID not found!. Please select one these:',
          Specialtys: AllSpecialtys
        });
      }

      const AllMedics = await Medics.list();
      const currentMedic = AllMedics.find(medic => medic.id === id);

      if (!currentMedic) {
        return response.status(401).json({
          error: 'Medic ID not found!'
        });
      }

      const UpdatedMedic = await Medics.update({
        id,
        name: name || currentMedic.name,
        specialty_id: specialty_id || currentMedic.specialty_id
      });
      const MedicSpecialty = {
        id: UpdatedMedic.id,
        name: UpdatedMedic.name,
        specialty: AllSpecialtys.find(sp => sp.id === UpdatedMedic.specialty_id)
      };
      return response.status(200).json(MedicSpecialty);
    } catch (error) {
      return response.status(500).json({
        error: 'Error'
      });
    }
  }

  async delete(request, response) {
    try {
      const medics = new Medic();
      const appointments = new Appointment();
      const {
        id
      } = request.params;
      const allAppointments = await appointments.list();
      const allMedics = await medics.list();
      const currentMedic = allMedics.find(medic => medic.id === id);

      if (!currentMedic) {
        return response.status(401).json({
          error: 'Medic ID not found!'
        });
      }

      allAppointments.map(appointment => {
        if (appointment.medic_id === id) {
          const currentAppointment = { ...appointment,
            medic_id: ''
          };
          medics.update(currentAppointment);
        }

        return appointment;
      });
      await medics.delete(id);
      return response.status(200).json({
        success: 'deleted'
      });
    } catch (error) {
      return response.status(500).json({
        error: 'Error'
      });
    }
  }

}

exports.default = MedicController;