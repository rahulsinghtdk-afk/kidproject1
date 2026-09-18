import { PlayAdventure } from "@/components/play/play-adventure";
import { PlayChildAudioOverlay } from "@/components/play/play-child-audio-overlay";

export default function PlayPage() {
  return (
    <PlayChildAudioOverlay>
      <PlayAdventure />
    </PlayChildAudioOverlay>
  );
}
