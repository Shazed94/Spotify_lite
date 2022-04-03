import songList from "../data/songs.js";
import PlayInfo from "./playinfo.js";
import Trackbar from "./trackbar.js"
const PlayList = (() => {

    const songs = songList
    let currentlyPlayingIndex = 0;
    let currentSong = new Audio(songs[currentlyPlayingIndex].url)
    let isPlaying = false;

    const playlistEl = document.querySelector('ul')

    const init = () => {
        render()
        listeners()
    };

    const togglePlayPause = () => {
        return currentSong.paused ? currentSong.play() : currentSong.pause();
    }


    const mainPlay = (index) => {
        if (index === currentlyPlayingIndex) {
            // toggle play and pause
            togglePlayPause();
            isPlaying = currentSong.paused ? false : true;
        } else {
            //  change the currentlyPlayingIndex
            // pause the previous song if it's playing
            //  play the new song
            currentlyPlayingIndex = index
            currentSong.src = songs[currentlyPlayingIndex].url
            togglePlayPause();
            render();
            isPlaying = currentSong.paused ? false : true;
        }
    }

    const flip = () => {
        togglePlayPause();
        render()
    }

    const playNext = () => {
        if (songs[currentlyPlayingIndex + 1]) {
            currentlyPlayingIndex++
            currentSong.src = songs[currentlyPlayingIndex].url
            togglePlayPause();
            isPlaying = true
            render()
            PlayInfo.setState({
                songsCount: songs.length,
                currentSong: songs[currentlyPlayingIndex],
                isPlaying: isPlaying,

            })
        }
    }

    const playPrev = () => {
        if (songs[currentlyPlayingIndex - 1]) {
            currentlyPlayingIndex--
            currentSong.src = songs[currentlyPlayingIndex].url
            togglePlayPause();
            isPlaying = true
            render()
            PlayInfo.setState({
                songsCount: songs.length,
                currentSong: songs[currentlyPlayingIndex],
                isPlaying: isPlaying,
            })
        }
    }

    const listeners = () => {
        //  1. get the index of the li tag
        //  2. change the currentlyPlayingIndex to the index of the li tag


        playlistEl.addEventListener('click', (event) => {

            if (event.target.matches('.fas')) {
                const listEl = event.target.parentNode.parentNode;
                const clickedIndex = [...listEl.parentNode.children].indexOf(listEl);
                mainPlay(clickedIndex)
                render();
                PlayInfo.setState({
                    songsCount: songs.length,
                    isPlaying: isPlaying,
                    currentSong: songs[currentlyPlayingIndex]
                })
            }
        })

        currentSong.addEventListener('timeupdate', () => {
            Trackbar.setState(currentSong)
        })
    }

    PlayInfo.setState({
        songsCount: songs.length,
        isPlaying: isPlaying,
        currentSong: songs[currentlyPlayingIndex]
    })




    const render = () => {
        let markup = ''

        const toggleIcon = (index) => {
            if (currentlyPlayingIndex === index) {
                return currentSong.paused ? 'fa-play' : 'fa-pause';
            } else {
                return 'fa-play'
            }
        }

        songs.forEach((song, index) => {
            markup += `
                <li class="song-info ${index == currentlyPlayingIndex ? ' fa-play1' : ''}">
                        <div class="play-pause ">
                            <i class="fas ${toggleIcon(index)}"></i>
                        </div>
                        <div class="song-details">
                            <h3 class="song-name">${song.title}</h3>
                            <h5 class="song-artist">${song.artist}</h5>
                        </div>
                        <div class="song-duration">
                            <h4>${song.time}</h4>
                        </div>
                </li>
            `
        })
        playlistEl.innerHTML = markup
    }

    return {
        init,
        flip,
        playNext,
        playPrev
    }
})();

export default PlayList