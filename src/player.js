import child from 'child_process';
import path from 'path';
import fs from 'fs';

const fileExists = file =>
  new Promise(resolve => {
    fs.access(file, error => {
      const exists = !error;
      resolve(exists);
    });
  });

// Tiny (and probably naive) controller over ffplay.
export class Player {
  static resolveFile(name) {
    return path.resolve(__dirname, '../audio-files', `${name}.mp3`);
  }

  process = null;
  paused = false;

  signal(type) {
    if (!this.process) {
      return;
    }

    this.process.kill(type);
  }

  async play(name) {
    const file = Player.resolveFile(name);
    const exists = await fileExists(file);

    if (!exists) {
      throw new Error(`Cannot play "${name}". The audio file doesn't exist.`);
    }

    this.process = child.spawn('ffplay', [file, '-nodisp', '-nostats']);

    this.paused = false;
  }

  pause() {
    if (this.paused) {
      return;
    }

    this.signal('SIGSTOP');
    this.paused = true;
  }

  resume() {
    this.signal('SIGCONT');
  }

  stop() {
    this.signal('SIGKILL');
    this.process = null;
  }
}

export default new Player();
