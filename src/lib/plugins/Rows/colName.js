export default function(i) {
  const AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let floor = Math.floor(i/26);
  let result = floor ? AZ[floor - 1] : '';
  result += AZ[i%26];
  return result;
}