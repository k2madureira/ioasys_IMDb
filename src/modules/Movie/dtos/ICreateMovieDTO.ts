export default interface ICreateAppointmentDTO {
  id?: string;
  name: string;
  species: string;
  breed: string;
  urgent: boolean;
  specialty_id: string;
  medic_id: string | null;
  status?: 'Pendente' | 'Cancelado' | 'Atendido';
  created_at: Date;
  updated_at: Date;
}
