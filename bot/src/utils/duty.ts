export default function DutyHandler(duty: string) {
  const dutyString = duty.toLowerCase();
  switch (dutyString) {
    case 'ucob':
      return 'The Unending Coil of Bahamut (Ultimate)';
    case 'uwu':
      return 'The Weapon\'s Refrain (Ultimate)';
    case 'tea':
      return 'The Epic of Alexander (Ultimate)';
    case 'dsr':
      return 'Dragonsong\'s Reprise (Ultimate)';
    case 'top':
      return 'The Omega Protocol (Ultimate)';
    default:
      return;
  }
  return;
}