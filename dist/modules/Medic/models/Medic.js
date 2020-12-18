"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuidv = require("uuidv4");

var _path = require("path");

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Medic {
  constructor() {
    this.medics = [];
    this.path = void 0;
    this.medics = [];
    this.path = (0, _path.resolve)(__dirname, '..', '..', '..', 'shared', 'database', process.env.NODE_ENV === 'test' ? 'fakes' : '', 'medics.json');
    this.loadJson();
  }

  loadJson() {
    // console.log(this.path);
    const data = _fs.default.readFileSync(this.path);

    this.medics = JSON.parse(data.toString());
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

    _fs.default.writeFileSync(this.path, JSON.stringify(this.medics, null, 2));

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

    _fs.default.writeFileSync(this.path, JSON.stringify(this.medics, null, 2));

    return medic;
  }

  async delete(id) {
    const MedicIndex = this.medics.findIndex(find => find.id === id);
    this.medics.splice(MedicIndex, 1);

    _fs.default.writeFileSync(this.path, JSON.stringify(this.medics, null, 2));
  }

  async truncate() {
    const empty = this.medics.splice(0, this.medics.length);
    this.medics = empty;

    _fs.default.writeFileSync(this.path, JSON.stringify(this.medics, null, 2));
  }

}

exports.default = Medic;