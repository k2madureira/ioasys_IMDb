"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuidv = require("uuidv4");

var _path = require("path");

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Specialty {
  constructor() {
    this.specialtys = [];
    this.path = void 0;
    this.specialtys = [];
    this.path = (0, _path.resolve)(__dirname, '..', '..', '..', 'shared', 'database', process.env.NODE_ENV === 'test' ? 'fakes' : '', 'specialtys.json');
    this.loadJson();
  }

  loadJson() {
    const data = _fs.default.readFileSync(this.path);

    this.specialtys = JSON.parse(data.toString());
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

    _fs.default.writeFileSync(this.path, JSON.stringify(this.specialtys, null, 2));

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

    _fs.default.writeFileSync(this.path, JSON.stringify(this.specialtys, null, 2));

    return specialty;
  }

  async delete(id) {
    const SpecialtyIndex = this.specialtys.findIndex(find => find.id === id);
    this.specialtys.splice(SpecialtyIndex, 1);

    _fs.default.writeFileSync(this.path, JSON.stringify(this.specialtys, null, 2));
  }

  async truncate() {
    const empty = this.specialtys.splice(0, this.specialtys.length);
    this.specialtys = empty;

    _fs.default.writeFileSync(this.path, JSON.stringify(this.specialtys, null, 2));
  }

}

exports.default = Specialty;