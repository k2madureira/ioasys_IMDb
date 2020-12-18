"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuidv = require("uuidv4");

class Specialty {
  constructor() {
    this.specialtys = [];
    this.path = void 0;
    this.specialtys = [{
      id: '_SPECIALTYID_',
      description: '_REPEAT_'
    }];
  }

  async list() {
    return this.specialtys;
  }

  async create({
    description
  }) {
    const specialty = {
      id: (0, _uuidv.uuid)(),
      description
    };
    this.specialtys.push(specialty);
    return specialty;
  }

  async update({
    id,
    description
  }) {
    const findSpecialtyIndex = this.specialtys.findIndex(find => find.id === id);
    const specialty = {
      id,
      description
    };
    this.specialtys[findSpecialtyIndex] = specialty;
    return specialty;
  }

  async delete(id) {
    const SpecialtyIndex = this.specialtys.findIndex(find => find.id === id);
    this.specialtys.splice(SpecialtyIndex, 1);
  }

  async truncate() {
    const empty = this.specialtys.splice(0, this.specialtys.length);
    this.specialtys = empty;
  }

}

exports.default = Specialty;