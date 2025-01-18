export function getLifePathNumber(birthDate) {
  const dateParts = birthDate.split("-");
  const month = dateParts[0]; // e.g. "10"
  const day = dateParts[1]; // e.g. "25"
  const year = dateParts[2]; // e.g. "1995"

  // Reduce each part of the date to a single digit
  const monthSum = month.split("").reduce((sum, num) => sum + parseInt(num), 0);
  const daySum = day.split("").reduce((sum, num) => sum + parseInt(num), 0);
  const yearSum = year.split("").reduce((sum, num) => sum + parseInt(num), 0);

  // Sum the results and reduce to a single digit
  const totalSum = monthSum + daySum + yearSum;
  return totalSum
    .toString()
    .split("")
    .reduce((sum, num) => sum + parseInt(num), 0);
}

// Example usage:
// let lifePathNumber = getLifePathNumber("10/25/1995");
// console.log("Life Path Number: " + lifePathNumber);  // Output: Life Path Number: 5
