"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Specialty = _interopRequireDefault(require("../models/Specialty"));

var _FakeSpecialty = _interopRequireDefault(require("../fakes/FakeSpecialty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Specialty = process.env.NODE_ENV === 'test' ? _FakeSpecialty.default : _Specialty.default;

class SpecialtyController {
  async index(_, response) {
    try {
      const specialtys = new Specialty();
      const allSpecialtys = await specialtys.list();
      return response.json({
        specialtys: allSpecialtys
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
        description
      } = request.body;
      const specialtys = new Specialty();
      const allSpecialtys = await specialtys.list();

      if (!description) {
        return response.status(401).json({
          error: 'please fill in the field [description] '
        });
      }

      const findSpecialty = allSpecialtys.find(specialty => specialty.description === description);

      if (findSpecialty) {
        return response.status(401).json({
          error: 'Specialty already exist',
          Specialtys: allSpecialtys
        });
      }

      const newSpecialty = await specialtys.create({
        description
      });
      return response.json(newSpecialty);
    } catch (error) {
      return response.status(500).json({
        error: 'Error'
      });
    }
  }

  async update(request, response) {
    try {
      const {
        description
      } = request.body;
      const {
        id
      } = request.params;

      if (!description) {
        return response.status(401).json({
          error: 'please fill in the field [description] '
        });
      }

      const Specialties = new Specialty();
      const AllSpecialtys = await Specialties.list();
      const findSpecialty = AllSpecialtys.find(specialty => specialty.id === id);

      if (!findSpecialty && id) {
        return response.status(401).json({
          error: 'Specialty ID not found!'
        });
      }

      const UpdatedSpecialty = await Specialties.update({
        id,
        description: description || (findSpecialty === null || findSpecialty === void 0 ? void 0 : findSpecialty.description)
      });
      return response.status(200).json(UpdatedSpecialty);
    } catch (error) {
      return response.status(500).json({
        error: 'Error'
      });
    }
  }

  async delete(request, response) {
    try {
      const {
        id
      } = request.params;
      const specialtys = new Specialty();
      const allSpecialtys = await specialtys.list();
      const findSpecialty = allSpecialtys.find(find => find.id === id);

      if (!findSpecialty) {
        return response.status(401).json({
          error: 'Specialty ID not found!'
        });
      }

      await specialtys.delete(id);
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

exports.default = SpecialtyController;