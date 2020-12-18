import { uuid } from 'uuidv4';

import IMedicRepository from '../repositories/IMedicRepository';
import ICreateMedicDTO from '../dtos/ICreateMedicDTO';

export default class Medic implements IMedicRepository {
  medics: Array<ICreateMedicDTO> = [];

  path: string;

  constructor() {
    this.medics = [
      {
        id: '_MEDICID_',
        name: '_NAME_',
        specialty_id: '_SPECIALTYID_',
      },
    ];
  }

  public async list(): Promise<ICreateMedicDTO[]> {
    return this.medics;
  }

  public async create({
    name,
    specialty_id,
  }: ICreateMedicDTO): Promise<ICreateMedicDTO> {
    const medic = {
      id: uuid(),
      name,
      specialty_id,
    };

    this.medics.push(medic);

    return medic;
  }

  public async update({
    id,
    name,
    specialty_id,
  }: ICreateMedicDTO): Promise<ICreateMedicDTO> {
    const findMedicIndex = this.medics.findIndex(find => find.id === id);

    const medic = {
      id,
      name,
      specialty_id,
    };

    this.medics[findMedicIndex] = medic;

    return medic;
  }

  public async delete(id: string): Promise<void> {
    const MedicIndex = this.medics.findIndex(find => find.id === id);
    this.medics.splice(MedicIndex, 1);
  }
}
