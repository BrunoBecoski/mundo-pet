export type PeriodType = 'morning' | 'afternoon' | 'evening';

export type AppointmentType = {
  id: string;
  time: string;
  petName: string;
  ownerName: string; 
  phone: string;
  description: string;
  scheduleAt: Date;
  period: PeriodType;
}

export type AppointmentPeriodType = {
  title: string;
  type: PeriodType;
  timeRange: string;
  appointments: AppointmentType[];
}

export type AppointmentPrismaType = {
  id: string;
  ownerName: string;
  petName: string;
  phone: string;
  description: string;
  scheduleAt: Date;
}