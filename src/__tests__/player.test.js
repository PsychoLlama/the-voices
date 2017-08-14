import child from 'child_process';
import path from 'path';
import fs from 'fs';

import playerSingleton, { Player } from '../player';

jest.mock('child_process', () => ({}));
jest.mock('fs');

describe('The player', () => {
  let proc, player;
  const format = file =>
    path.resolve(__dirname, `../../audio-files/${file}.mp3`);

  beforeEach(() => {
    player = new Player();
    fs.exists.mockImplementation((file, cb) => cb(null, true));

    child.spawn = jest.fn(() => {
      proc = { kill: jest.fn() };

      return proc;
    });
  });

  it('exports a player', () => {
    expect(playerSingleton).toBeInstanceOf(Player);
  });

  it('plays audio files', async () => {
    const name = 'bells';
    await player.play(name);

    expect(child.spawn).toHaveBeenCalledWith(
      'ffplay',
      expect.arrayContaining([format(name)]),
      expect.any(Function),
    );
  });

  it('pauses audio files', async () => {
    await player.play('bells');
    player.pause();

    expect(proc.kill).toHaveBeenCalledWith('SIGSTOP');
  });

  it('does not pause media twice', async () => {
    await player.play('bells');

    player.pause();
    player.pause();

    expect(proc.kill).toHaveBeenCalledTimes(1);
  });

  it('can resume audio', async () => {
    await player.play('siren');
    player.pause();
    player.resume();

    expect(proc.kill).toHaveBeenCalledWith('SIGCONT');
  });

  it('does not resume if nothing is playing', () => {
    const danger = () => player.resume();

    expect(danger).not.toThrow();
  });

  it('can stop a player', async () => {
    await player.play('siren');
    player.stop();

    expect(proc.kill).toHaveBeenCalledWith('SIGKILL');
    expect(player.process).toBe(null);
  });

  it('does not stop a player twice', async () => {
    await player.play('siren');
    player.stop();
    const danger = () => player.stop();

    expect(danger).not.toThrow();
  });

  it('throws if the file does not exist', async () => {
    fs.exists.mockImplementation((file, cb) => cb(null, false));

    await expect(player.play('something')).rejects.toEqual(expect.any(Error));
  });
});
