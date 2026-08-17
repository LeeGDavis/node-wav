import type { createWriteStream, PathLike, WriteStream } from 'node:fs';
import { Transform, type TransformOptions } from 'node:stream';

export type Endianness = 'LE' | 'BE';

export interface WaveFormat {
  audioFormat: number;
  endianness: Endianness;
  channels: number;
  sampleRate: number;
  byteRate: number;
  blockAlign: number;
  bitDepth: number;
  signed: boolean;
  float?: boolean;
  alaw?: boolean;
  ulaw?: boolean;
}

export type ReaderFormat = WaveFormat;

export interface WaveChunk {
  id: string;
  data: Buffer;
}

export type ReaderOptions = TransformOptions;

export class Reader extends Transform {
  constructor(options?: ReaderOptions);

  riffId?: string;
  endianness?: Endianness;
  chunkSize?: number;
  waveId?: string;
  chunkId?: string;
  subchunk1Size?: number;
  audioFormat?: number;
  channels?: number;
  sampleRate?: number;
  byteRate?: number;
  blockAlign?: number;
  bitDepth?: number;
  signed?: boolean;
  numSamples?: number;
  unknownID?: string;

  on(event: 'format', listener: (this: Reader, format: WaveFormat) => void): this;
  on(event: 'chunk', listener: (this: Reader, chunk: WaveChunk) => void): this;
  on(event: string | symbol, listener: (...args: any[]) => void): this;
}

export interface WriterOptions extends TransformOptions {
  format?: number;
  channels?: number;
  sampleRate?: number;
  bitDepth?: number;
}

export class Writer extends Transform {
  constructor(options?: WriterOptions);

  endianness: Endianness;
  format: number;
  channels: number;
  sampleRate: number;
  bitDepth: number;
  bytesProcessed: number;
  dataLength?: number;
  byteRate?: number;
  blockAlign?: number;
  headerLength: number;

  on(event: 'header', listener: (this: Writer, header: Buffer) => void): this;
  on(event: string | symbol, listener: (...args: any[]) => void): this;
}

type FileSystemWriteStreamOptions = Extract<
  NonNullable<Parameters<typeof createWriteStream>[1]>,
  object
>;

export type FileWriterOptions = WriterOptions & FileSystemWriteStreamOptions;

export class FileWriter extends Writer {
  constructor(path: PathLike, options?: FileWriterOptions);

  path: PathLike;
  file: WriteStream;

  on(event: 'header', listener: (this: FileWriter, header: Buffer) => void): this;
  on(event: 'done', listener: (this: FileWriter) => void): this;
  on(event: string | symbol, listener: (...args: any[]) => void): this;
}
