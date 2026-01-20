import { ComponentStatus, EpsComponent } from './types';

export const INITIAL_COMPONENTS: EpsComponent[] = [
  // Serviceable
  { serialNumber: '80919', status: ComponentStatus.SERVICEABLE, fittedTo: 'M50-01', lastUpdated: '2024-03-01', history: [] },
  { serialNumber: '80996', status: ComponentStatus.SERVICEABLE, fittedTo: 'M50-05', lastUpdated: '2024-02-15', history: [] },
  { serialNumber: '81046', status: ComponentStatus.SERVICEABLE, fittedTo: 'M50-10', lastUpdated: '2024-03-05', history: [] },
  { serialNumber: '83218', status: ComponentStatus.SERVICEABLE, lastUpdated: '2024-01-20', history: [] },
  { serialNumber: '83241', status: ComponentStatus.SERVICEABLE, lastUpdated: '2024-01-22', history: [] },
  { serialNumber: '83244', status: ComponentStatus.SERVICEABLE, lastUpdated: '2024-02-10', history: [] },
  { serialNumber: '83411', status: ComponentStatus.SERVICEABLE, lastUpdated: '2024-03-01', history: [] },
  { serialNumber: '83515', status: ComponentStatus.SERVICEABLE, lastUpdated: '2024-03-02', history: [] },
  { serialNumber: '83526', status: ComponentStatus.SERVICEABLE, lastUpdated: '2024-02-28', history: [] },
  { serialNumber: '80992', status: ComponentStatus.SERVICEABLE, lastUpdated: '2024-03-01', history: [] },
  { serialNumber: '81001', status: ComponentStatus.SERVICEABLE, lastUpdated: '2024-03-03', history: [] },
  // Unserviceable
  { serialNumber: '80379', status: ComponentStatus.UNSERVICEABLE, repairSentDate: '2024-02-01', maintenanceRef: 'AWD-2024-001', lastUpdated: '2024-02-01', history: [] },
  { serialNumber: '81045', status: ComponentStatus.UNSERVICEABLE, repairSentDate: '2024-02-10', maintenanceRef: 'DMD-9921', lastUpdated: '2024-02-10', history: [] },
  { serialNumber: '81262', status: ComponentStatus.UNSERVICEABLE, repairSentDate: '2024-02-15', maintenanceRef: 'ASB-442', lastUpdated: '2024-02-15', history: [] },
  { serialNumber: '81308', status: ComponentStatus.UNSERVICEABLE, repairSentDate: '2024-02-18', maintenanceRef: 'REP-X21', lastUpdated: '2024-02-18', history: [] },
  { serialNumber: '81322', status: ComponentStatus.UNSERVICEABLE, lastUpdated: '2024-02-20', history: [] },
  { serialNumber: '81688', status: ComponentStatus.UNSERVICEABLE, lastUpdated: '2024-02-22', history: [] },
  { serialNumber: '81829', status: ComponentStatus.UNSERVICEABLE, lastUpdated: '2024-02-25', history: [] },
  { serialNumber: '83204', status: ComponentStatus.UNSERVICEABLE, lastUpdated: '2024-02-28', history: [] },
  { serialNumber: '83210', status: ComponentStatus.UNSERVICEABLE, lastUpdated: '2024-03-01', history: [] },
  { serialNumber: '83235', status: ComponentStatus.UNSERVICEABLE, lastUpdated: '2024-03-02', history: [] },
  { serialNumber: '83236', status: ComponentStatus.UNSERVICEABLE, lastUpdated: '2024-03-02', history: [] },
  { serialNumber: '83413', status: ComponentStatus.UNSERVICEABLE, lastUpdated: '2024-03-03', history: [] },
  { serialNumber: '83438', status: ComponentStatus.UNSERVICEABLE, lastUpdated: '2024-03-04', history: [] },
  { serialNumber: '81326', status: ComponentStatus.UNSERVICEABLE, lastUpdated: '2024-03-05', history: [] }
];