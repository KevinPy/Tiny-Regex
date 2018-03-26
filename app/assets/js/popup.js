let regex = () => {
  let text = document.querySelector('#text');
  let pattern = document.querySelector('#pattern');
  let flags = document.querySelector('#flags');

  [text, pattern, flags].map(x => {
    x.addEventListener('keyup', () => {
      let regex = new RegExp(pattern.value, flags.value);
      document.querySelector('#result').innerHTML = text.value
              .replace(regex, '<>$&</>')
              .replace(/&/g, '&amp;')
              .replace(/<(?!\/?)/g, '&lt;')
              .replace(//g, 'mark');
    });
  });

};

regex();