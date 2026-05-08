// Helper to convert "HH:mm" to minutes since midnight
export function getMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

// Checks if scheduled time is within the last X minutes (inclusive of current, exclusive of window start)
export function isDueInWindow(scheduledTime: string, currentMinutes: number, windowSize: number = 5): boolean {
  const scheduledMins = getMinutes(scheduledTime);
  let diff = currentMinutes - scheduledMins;
  
  // Handle midnight wrap-around (e.g., current is 00:02, scheduled is 23:58)
  if (diff < 0) {
    diff += 24 * 60;
  }
  
  return diff >= 0 && diff < windowSize;
}
