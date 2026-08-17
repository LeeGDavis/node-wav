import {
  FileWriter,
  Reader,
  Writer,
  type FileWriterOptions,
  type ReaderFormat,
  type WaveFormat
} from 'wav';

const reader = new Reader();
reader.on('format', (format: ReaderFormat) => {
  const waveFormat: WaveFormat = format;
  console.log(waveFormat.sampleRate);
});

const writer = new Writer({
  bitDepth: 16,
  channels: 2,
  sampleRate: 44100
});
writer.on('header', (header) => console.log(header.length));

const fileWriterOptions: FileWriterOptions = {
  bitDepth: 16,
  channels: 2,
  flags: 'w',
  sampleRate: 44100
};
const fileWriter = new FileWriter('output.wav', fileWriterOptions);
fileWriter.on('done', () => console.log(fileWriter.path));
