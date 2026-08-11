/**
 * Plays the WAVE audio file from stdin out of the computer's speakers
 * via `node-speaker`.
 */

import Speaker from 'speaker';
import { Reader } from '../index.js';

const reader = new Reader();

reader.on('format', function (format) {
  console.error('format:', format);
  const s = new Speaker(format);
  reader.pipe(s);
});

reader.on('error', function (err) {
  console.error('Reader error: %s', err);
});

process.stdin.pipe(reader);
