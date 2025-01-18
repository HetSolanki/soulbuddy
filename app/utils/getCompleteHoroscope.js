import { getDestinyNumber } from "./getDestinyNumber";
import { getLifePathNumber } from "./getLifePathNumber";
import { getNumerologyInsight } from "./getNumerologyInsights";
import { getPersonalityNumber } from "./getPersonalityNumber";

export function getCompleteNumerologyAndHoroscope(birthDate, name) {
  let lifePathNumber = getLifePathNumber(birthDate);
  let destinyNumber = getDestinyNumber(name);
  let personalityNumber = getPersonalityNumber(name);

  let numerologyInsights = getNumerologyInsight(
    lifePathNumber,
    destinyNumber,
    personalityNumber
  );

  return {
    numerology: numerologyInsights,
  };
}

// Example usage:
// let completeAnalysis = getCompleteNumerologyAndHoroscope("Leo", "10/25/1995", "John Doe");
// console.log(completeAnalysis);
