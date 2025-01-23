import { beeBuzzSound } from '../assets/sounds/bee-buzz';

class SoundManager {
  constructor() {
    this.audio = new Audio(beeBuzzSound);
    this.audio.volume = 0.3; // Set volume to 30%
  }

  playBeeSound() {
    this.audio.currentTime = 0;
    this.audio.play().catch(error => {
      console.log('Audio playback failed:', error);
    });
  }
}

export const soundManager = new SoundManager();
