import { useState } from "react";
// import { tracks } from '../data/tracks';
// import components
// import DisplayTrack from './DisplayTrack';
// import Controls from './Controls';
// import ProgressBar from './ProgressBar';

const AudioPlayer = (props) => {
  // const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const host = "http://AISound.aipet.vip:8000";
  // const host = "http://localhost:8000"
  const url = host + "/download?name=" + props.value;
  return (
    <div className="audio-player">
      <div className="inner">
        <audio src={url} controls />
        {/* <DisplayTrack currentTrack={currentTrack} /> */}
        {/* <Controls /> */}
        {/* <ProgressBar /> */}
      </div>
    </div>
  );
};
export default AudioPlayer;
