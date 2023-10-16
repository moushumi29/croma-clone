export function getRandomDecimal() {
    // Generate a random decimal between 0 (inclusive) and 1 (exclusive)
    const min = 1.0;
    const max = 5.0;
    const randomDecimal = Math.random() * (max - min) + min;
    // Round to one decimal place
    const roundedDecimal = Math.round(randomDecimal * 10) / 10;
    return roundedDecimal;
  }

  export function getRandomInt(min, max) {
    // Generate a random decimal between 0 (inclusive) and 1 (exclusive)
    const randomDecimal = Math.random();
  
    // Scale the random decimal to the desired range and add the minimum value
    const randomInt = Math.floor(randomDecimal * (max - min + 1)) + min;
  
    return randomInt;
  }
  
  export const formatIndianRupee = (amount) => {
    // Convert the number to a string and split it into array of characters
    const amountStr = amount.toString().split('');
    
    // Initialize variables to keep track of commas and the formatted amount
    let formattedAmount = '';
    let commaCount = 0;
  
    // Iterate through each character in the reversed array
    for (let i = amountStr.length - 1; i >= 0; i--) {
      formattedAmount = amountStr[i] + formattedAmount;
      commaCount++;
  
      // Add a comma after every three digits, except for the last group
      if (commaCount === 3 && i !== 0) {
        formattedAmount = ',' + formattedAmount;
        commaCount = 0;
      }
    }
  
    return formattedAmount;
  };
  
  // Example usage
  // const amount = 1234567890;
  // const formattedAmount = formatIndianRupee(amount);
  // console.log('Formatted amount:', formattedAmount);  // Output: 1,23,45,67,890
  
  // Usage
//   const randomValue = getRandomInt(1, 5);
//   console.log('Random value between 1 and 5:', randomValue);
  
