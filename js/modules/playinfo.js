import PlayList from "./playlist.js";

const PlayInfo = (() => {
  // state object
  const state = {
    songsCount: 0,
    isPlaying: false,
    currentSong: null,
  };

  // caching DOM element
  const platlistCountElement = document.querySelector(".song-count");
  const songName = document.querySelector(".song-name");
  const playerTrigger = document.querySelector(".btn-trigger");
  const playerPrev = document.querySelector(".fa-step-backward");
  const playerNext = document.querySelector(".fa-step-forward");
  const volume = document.querySelector("#btn-volume");
  //    initialized function
  const init = () => {
    render();
    togglePlayPause();
    playNext();
    playPrev();
  };

  const togglePlayPause = () => {
    playerTrigger.addEventListener("click", (event) => {
      //  1. change the state
      state.isPlaying = state.isPlaying ? false : true;
      // 2. render the application
      render();
      // 3. play or pause the song from playlist component
      PlayList.flip();
    });
  };

  const playPrev = () => {
    playerPrev.addEventListener("click", () => {
      PlayList.playPrev();
      render();
    });
  };

  const playNext = () => {
    playerNext.addEventListener("click", () => {
      PlayList.playNext();
      render();
    });
  };

  const setState = (obj) => {
    state.songsCount = obj.songsCount;
    state.isPlaying = obj.isPlaying;
    state.currentSong = obj.currentSong;
    render();
  };

  // volume.addEventListener('change', (e) => {
  //     state.currentSong.volume = e.currentTarget.value / 100;
  //     console.log('volume');
  //     render();
  // })

  // render function
  const render = () => {
    platlistCountElement.innerHTML =`${ state.songsCount} songs`;
    songName.innerHTML = `${state.currentSong.title}`;
    playerTrigger.children[0].className = state.isPlaying
      ? "fas fa-pause"
      : "fas fa-play";
  };

  return { init, setState };
})();

export default PlayInfo;
