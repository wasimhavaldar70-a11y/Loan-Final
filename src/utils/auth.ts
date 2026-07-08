/**
 * Browser-native SHA-256 cryptographic hashing helper.
 * Used for salting and hashing local simulated credentials in Offline Safe Mode.
 */
export async function hashSHA256(value: string): Promise<string> {
  const salt = 'suvarna_gold_erp_salt_2026';
  const encoder = new TextEncoder();
  const data = encoder.encode(value + salt);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
