export enum ComponentStatus {
  SERVICEABLE = 'Serviceable',
  UNSERVICEABLE = 'Unserviceable'
}

export interface EpsComponent {
  serialNumber: string;
  status: ComponentStatus;
  fittedTo?: string;
  repairSentDate?: string;
  maintenanceRef?: string;
  lastUpdated: string;
  history: StatusLog[];
}

export interface StatusLog {
  status: ComponentStatus;
  timestamp: string;
  details: string;
}

export interface FleetStats {
  total: number;
  serviceable: number;
  unserviceable: number;
  serviceabilityRate: number;
}