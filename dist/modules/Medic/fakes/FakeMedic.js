"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuidv = require("uuidv4");

class Medic {
  constructor() {
    this.medics = [];
    this.path = void 0;
    this.medics = [{
      id: '_MEDICID_',
      name: '_NAME_',
      specialty_id: '_SPECIALTYID_'
    }];
  }

  async list() {
    return this.medics;
  }

  async create({
    name,
    specialty_id
  }) {
    const medic = {
      id: (0, _uuidv.uuid)(),
      name,
      specialty_id
    };
    this.medics.push(medic);
    return medic;
  }

  async update({
    id,
    name,
    specialty_id
  }) {
    const findMedicIndex = this.medics.findIndex(find => find.id === id);
    const medic = {
      id,
      name,
      specialty_id
    };
    this.medics[findMedicIndex] = medic;
    return medic;
  }

  async delete(id) {
    const MedicIndex = this.medics.findIndex(find => find.id === id);
    this.medics.splice(MedicIndex, 1);
  }

}

exports.default = Medic;