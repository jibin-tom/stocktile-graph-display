
import React, { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AudioPlayerProps {
  src: string;
  autoPlay?: boolean;
  loop?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, autoPlay = false, loop = true }) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex items-center">
      <audio 
        ref={audioRef}
        src={src} 
        autoPlay={autoPlay}
        loop={loop}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={togglePlay}
        className="rounded-full"
        aria-label={isPlaying ? "Mute audio" : "Play audio"}
      >
        {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </Button>
    </div>
  );
};

export default AudioPlayer;
