function generateShortId(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const idLength = Math.floor(Math.random() * (length - 5 + 1)) + 5; // Generate length between 5 and 8
    let shortId = '';
  
    for (let i = 0; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      shortId += characters.charAt(randomIndex);
    }
  
    return shortId;
  }
  
  const uniqueShortId = generateShortId(8); // Change the parameter to set desired length
//   console.log(uniqueShortId);