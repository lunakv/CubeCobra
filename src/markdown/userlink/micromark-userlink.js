import assert from 'assert';
import markdownLineEndingOrSpace from 'micromark/dist/character/markdown-line-ending-or-space';

function tokenizeUserlink(effects, ok, nok) {
  const self = this;
  return start;

  function start(code) {
    assert(code === 64, 'expected `@`');
    // '@' shouldn't be preceded by an actual character
    if (!self.previous || markdownLineEndingOrSpace(self.previous)) {
      effects.enter('userlink');
      effects.enter('userlinkMarker');
      effects.consume(code);
      effects.exit('userlinkMarker');
      return open;
    }

    return nok(code);
  }

  // make sure at least one alphanum. char is after the '@'
  function open(code) {
    if (/[a-zA-Z0-9]/.test(String.fromCharCode(code))) {
      effects.enter('userlinkValue');
      effects.consume(code);
      return more;
    }
    return nok(code);
  }

  function more(code) {
    if (/[a-zA-Z0-9]/.test(String.fromCharCode(code))) {
      effects.consume(code);
      return more;
    }
    effects.exit('userlinkValue');
    effects.exit('userlink');
    return ok(code);
  }
}

const userlink = {
  tokenize: tokenizeUserlink,
};

export default {
  text: {
    64: userlink, // '@'
  },
};
