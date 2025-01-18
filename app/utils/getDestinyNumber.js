export function getDestinyNumber(name) {
    const numerologyChart = {
        'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
        'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
        's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
    };
    
    name = name.toLowerCase().replace(/\s/g, '');  // Remove spaces and convert to lowercase
    let total = 0;

    for (let i = 0; i < name.length; i++) {
        total += numerologyChart[name[i]] || 0;
    }

    return total.toString().split('').reduce((sum, num) => sum + parseInt(num), 0);
}

// Example usage:
// let destinyNumber = getDestinyNumber("John Doe");
// console.log("Destiny Number: " + destinyNumber);  // Output: Destiny Number: 6
