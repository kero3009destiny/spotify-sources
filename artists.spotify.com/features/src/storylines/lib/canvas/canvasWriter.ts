// ignore-string-externalization
/*
  JS multiline canvas text writer inspiration: https://github.com/jbaylina/jsTifier
*/
type CanvasWord = {
  word: string | undefined;
  width: number | undefined;
};
type CanvasLine = {
  endsParagraph?: boolean;
  words: CanvasWord[];
};

export type ColorStop = {
  position: number;
  color: string;
};

/*
  drawLinearGradient()
  Takes a canvas context and ColorStop parameters
  and draws linear gradient in given boundary rectangle.
  Supports vertical and horizontal gradients.
*/
export function drawLinearGradient(
  canvasContext: CanvasRenderingContext2D,
  stops: ColorStop[],
  originX: number,
  originY: number,
  width: number,
  height: number,
  direction: string = 'vertical',
) {
  const gradient: CanvasGradient = canvasContext.createLinearGradient(
    originX,
    originY,
    direction === 'horizontal' ? originX : 0,
    direction === 'vertical' ? height : 0,
  );
  for (const { color, position } of stops) {
    gradient.addColorStop(position, color);
  }
  canvasContext.fillStyle = gradient;
  canvasContext.fillRect(originX, originY, width, height);
}

/*
  fillPositionedText()
  Takes a canvas context, text content, and positioning parameters
  and draws the text in given boundary rectangle.
  Supports left|center|right alignment and top|middle|bottom positions.
*/
export function fillPositionedText(
  canvasContext: CanvasRenderingContext2D,
  originalText: string,
  originX: number,
  originY: number,
  boundingWidth: number,
  boundingHeight: number,
  hAlign: string,
  vAlign: string,
  lineHeight: number,
) {
  const text = originalText.replace(/\r/g, '');
  let words: string[] = [];
  const inLines = text.split('\n');

  let i;
  for (i = 0; i < inLines.length; i++) {
    if (i) words.push('\n');
    words = words.concat(inLines[i].split(' '));
  }
  // words now contains an array of all words in the originalText

  const widthOfSpace: number = canvasContext.measureText(' ').width;
  const canvasLines: CanvasLine[] = [];
  let actualLineIndex = 0;
  let actualSize = 0;
  let currentWord: CanvasWord;

  // Initialize first canvasLine to empty CanvasLine
  canvasLines[actualLineIndex] = {
    words: [],
  };

  i = 0;
  while (i < words.length) {
    let word = words[i];

    if (word === '\n') {
      canvasLines[actualLineIndex].endsParagraph = true;
      actualLineIndex++;
      actualSize = 0;
      canvasLines[actualLineIndex] = { words: [] };
      i++;
    } else {
      currentWord = {
        word,
        width: 0,
      };
      currentWord.width = canvasContext.measureText(word).width;

      if (actualSize === 0) {
        // Split words that do not fit in a line
        while (currentWord.width > boundingWidth) {
          word = word.slice(0, word.length - 1);
          currentWord.width = canvasContext.measureText(word).width;
        }

        currentWord.word = word;
        canvasLines[actualLineIndex].words.push(currentWord);
        actualSize = currentWord.width;
        if (word !== words[i]) {
          // Return without writing if nothing fits
          if (word === '') return;
          words[i] = words[i].slice(word.length, words[i].length);
        } else {
          i++;
        }
      } else {
        if (actualSize + widthOfSpace + currentWord.width > boundingWidth) {
          canvasLines[actualLineIndex].endsParagraph = false;
          actualLineIndex++;
          actualSize = 0;
          canvasLines[actualLineIndex] = { words: [] };
        } else {
          currentWord.word = word;
          canvasLines[actualLineIndex].words.push(currentWord);
          actualSize += widthOfSpace + currentWord.width;
          i++;
        }
      }
    }
  }

  // Force last line to always end a paragraph
  canvasLines[actualLineIndex].endsParagraph = true;

  // Remove lines that do not fit.
  let totalHeight = lineHeight * canvasLines.length;
  while (totalHeight > boundingHeight) {
    canvasLines.pop();
    totalHeight = lineHeight * canvasLines.length;
  }

  // Calculate where to begin drawing text
  // writeX, writeY determine the writing cursor position
  let writeY;
  if (vAlign === 'bottom') {
    writeY = originY + boundingHeight - totalHeight + lineHeight;
  } else if (vAlign === 'middle') {
    writeY = originY + boundingHeight / 2 - totalHeight / 2 + lineHeight;
  } else {
    writeY = originY + lineHeight;
  }

  const oldTextAlign = canvasContext.textAlign;
  canvasContext.textAlign = 'left';

  let maxWidth = 0;
  for (const lineIndex in canvasLines) {
    if (!canvasLines[lineIndex]) continue;
    let totalWidth = 0;
    let writeX;
    let usp;

    for (currentWord of canvasLines[lineIndex].words) {
      if (currentWord.word && currentWord.width) {
        totalWidth += currentWord.width;
      }
    }

    // Calculate the x position and the distance betwen words in pixels
    if (hAlign === 'center') {
      usp = widthOfSpace;
      writeX =
        originX +
        boundingWidth / 2 -
        (totalWidth +
          widthOfSpace * (canvasLines[lineIndex].words.length - 1)) /
          2;
    } else if (hAlign === 'justify' && !canvasLines[lineIndex].endsParagraph) {
      writeX = originX;
      usp =
        (boundingWidth - totalWidth) /
        (canvasLines[lineIndex].words.length - 1);
    } else if (hAlign === 'right') {
      writeX =
        originX +
        boundingWidth -
        (totalWidth + widthOfSpace * (canvasLines[lineIndex].words.length - 1));
      usp = widthOfSpace;
    } else {
      // hAlign === 'left'
      writeX = originX;
      usp = widthOfSpace;
    }

    for (currentWord of canvasLines[lineIndex].words) {
      if (currentWord.word && currentWord.width) {
        canvasContext.fillText(currentWord.word, writeX, writeY);
        writeX += currentWord.width + usp;
      }
    }
    maxWidth = Math.max(maxWidth, writeX);
    writeY += lineHeight;
  }
  canvasContext.textAlign = oldTextAlign;
}
