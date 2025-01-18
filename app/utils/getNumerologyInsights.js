export function getNumerologyInsight(lifePathNumber, destinyNumber, personalityNumber) {
    const insights = {
        lifePath: {
            1: "You're a natural leader, independent and assertive.",
            2: "You're a peacemaker, sensitive and diplomatic.",
            3: "You are creative, expressive, and social.",
            4: "You're hardworking, practical, and reliable.",
            5: "You love freedom, adventure, and change.",
            6: "You're nurturing, family-oriented, and responsible.",
            7: "You're introspective, analytical, and spiritual.",
            8: "You are ambitious, determined, and focused on success.",
            9: "You are compassionate, idealistic, and humanitarian."
        },
        destiny: {
            1: "Your destiny is to be a trailblazer and leader.",
            2: "Your destiny is to bring harmony and cooperation.",
            3: "Your destiny is to inspire and create.",
            4: "Your destiny is to build something lasting and stable.",
            5: "Your destiny is to experience life’s full spectrum.",
            6: "Your destiny is to be a caretaker and nurturer.",
            7: "Your destiny is to seek wisdom and deeper knowledge.",
            8: "Your destiny is to achieve great success and power.",
            9: "Your destiny is to make the world a better place."
        },
        personality: {
            1: "You come across as independent and assertive.",
            2: "You come across as kind, empathetic, and considerate.",
            3: "You come across as charming, creative, and expressive.",
            4: "You come across as dependable, practical, and grounded.",
            5: "You come across as dynamic, energetic, and adaptable.",
            6: "You come across as responsible, caring, and family-oriented.",
            7: "You come across as intellectual, thoughtful, and private.",
            8: "You come across as ambitious, strong-willed, and authoritative.",
            9: "You come across as compassionate, idealistic, and selfless."
        }
    };

    return {
        lifePath: insights.lifePath[lifePathNumber],
        destiny: insights.destiny[destinyNumber],
        personality: insights.personality[personalityNumber]
    };
}

// Example usage:
// let numerologyInsights = getNumerologyInsight(lifePathNumber, destinyNumber, personalityNumber);
// console.log(numerologyInsights);
