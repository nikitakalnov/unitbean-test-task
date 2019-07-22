const createTextPreview = (fullText, symbolsLimit) => {
  let textPreview;
  if(fullText.length < symbolsLimit)
    textPreview = fullText;
  else {
    let s, spaceIsFound = false;
    for(s = symbolsLimit; s >= 0 && !spaceIsFound; s--) {
      if(fullText[s] === ' ')
        spaceIsFound = true;
    }

    textPreview = fullText.slice(0, s + 1).concat('...');
  }

  return textPreview;
}

const constructDate = (stringDate) => {
  let resultDate;

  const date = new Date(Date.parse(stringDate));
  const months = ['янв', 'февр', 'марта', 'апр', 'мая', 'июня', 'июля', 'авг', 'сент', 'окт', 'нояб', 'дек'];

  resultDate = `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;

  return resultDate;
}

export { createTextPreview, constructDate };