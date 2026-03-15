function generateRandomParagraph(paragraphLength: number = 500, chunkLength: number = 50): string[] {
  // Function to generate a random letter
  const getRandomLetter = (): string => {
    const alphabet = 'ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  };

  // Generate the full paragraph
  let fullParagraph = '';
  for (let i = 0; i < paragraphLength; i++) {
    fullParagraph += getRandomLetter();
    // Add spaces and occasional punctuation to make it look more like a paragraph
    if (i > 0 && i % 10 === 0) {
      fullParagraph += ' ';
    } else if (i > 0 && i % 50 === 0) {
      fullParagraph += '. ';
    }
  }

  // Split the paragraph into chunks
  const chunks: string[] = [];
  for (let i = 0; i < fullParagraph.length; i += chunkLength) {
    chunks.push(fullParagraph.substring(i, i + chunkLength));
  }

  return chunks;
}

export const getFakeStream = (initialDelay: number, wordingDelay: number) => {
  const encoder = new TextEncoder()
  const messages = generateRandomParagraph(200, 70).map(i => `0: ${i}`)
  console.log(messages)

  const stream = new ReadableStream({
    async start(controller) {
      await new Promise(res => setTimeout(res, initialDelay))
      for (const msg of messages) {
        controller.enqueue(encoder.encode(msg + '\n'))
        await new Promise(res => setTimeout(res, wordingDelay))
      }
      controller.close()
    }
  })
  return stream
}
