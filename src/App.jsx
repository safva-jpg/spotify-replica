\import { useState } from "react";
import "./App.css";

const songs = [
  {
    id: 1,
    title: "Perfect",
    artist: "Ed Sheeran",
    color: "linear-gradient(135deg, #e96443, #904e95)",
    icon: "❤️",
    duration: "4:23",
  },
  {
    id: 2,
    title: "Starboy",
    artist: "The Weeknd",
    color: "linear-gradient(135deg, #141e30, #6b7280)",
    icon: "🌟",
    duration: "3:50",
  },
  {
    id: 3,
    title: "Shape of You",
    artist: "Ed Sheeran",
    color: "linear-gradient(135deg, #f7971e, #ffd200)",
    icon: "🎸",
    duration: "3:53",
  },
  {
    id: 4,
    title: "Night Changes",
    artist: "One Direction",
    color: "linear-gradient(135deg, #232526, #414345)",
    icon: "🌙",
    duration: "4:00",
  },
  {
    id: 5,
    title: "Love Yourself",
    artist: "Justin Bieber",
    color: "linear-gradient(135deg, #42275a, #734b6d)",
    icon: "💜",
    duration: "3:54",
  },
  {
    id: 6,
    title: "Levitating",
    artist: "Dua Lipa",
    color: "linear-gradient(135deg, #fc466b, #3f5efb)",
    icon: "✨",
    duration: "3:23",
  },
];

const playlists = [
  { title: "Today's Top Hits", subtitle: "The biggest hits right now", emoji: "🔥" },
  { title: "Chill Vibes", subtitle: "Relax and enjoy your day", emoji: "🌊" },
  { title: "Romantic Hits", subtitle: "Songs for your heart", emoji: "💗" },
  { title: "Workout Mix", subtitle: "Music to keep you moving", emoji: "💪" },
];

function App() {
  const [activeSong, setActiveSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [search, setSearch] = useState("");
  const [likedSongs, setLikedSongs] = useState([]);
  const [activeMenu, setActiveMenu] = useState("Home");
  const [progress, setProgress] = useState(30);
  const [volume, setVolume] = useState(70);

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
  );

  const playSong = (song) => {
    if (activeSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveSong(song);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  const toggleLike = (songId) => {
    setLikedSongs((previous) =>
      previous.includes(songId)
        ? previous.filter((id) => id !== songId)
        : [...previous, songId]
    );
  };

  return (
    <div className="spotify-app">
      <aside className="sidebar">
        <div className="logo">
          <span className="logo-icon">◖))</span>
          <span>Spotify</span>
        </div>

        <nav className="main-nav">
          <button
            className={activeMenu === "Home" ? "nav-link active" : "nav-link"}
            onClick={() => {
              setActiveMenu("Home");
              setSearch("");
            }}
          >
            <span>⌂</span> Home
          </button>

          <button
            className={activeMenu === "Search" ? "nav-link active" : "nav-link"}
            onClick={() => setActiveMenu("Search")}
          >
            <span>⌕</span> Search
          </button>

          <button
            className={activeMenu === "Library" ? "nav-link active" : "nav-link"}
            onClick={() => setActiveMenu("Library")}
          >
            <span>▤</span> Your Library
          </button>
        </nav>

        <div className="sidebar-section">
          <p className="section-label">YOUR COLLECTION</p>

          <button
            className="collection-link"
            onClick={() => setActiveMenu("Create Playlist")}
          >
            <span className="create-icon">＋</span> Create Playlist
          </button>

          <button
            className="collection-link"
            onClick={() => setActiveMenu("Liked Songs")}
          >
            <span className="liked-icon">♥</span> Liked Songs
          </button>
        </div>

        <div className="sidebar-playlist">
          <p>MY PLAYLISTS</p>
          <button onClick={() => setActiveMenu("Daily Mix")}>Daily Mix</button>
          <button onClick={() => setActiveMenu("Chill Hits")}>Chill Hits</button>
          <button onClick={() => setActiveMenu("Love Songs")}>Love Songs</button>
          <button onClick={() => setActiveMenu("Discover Weekly")}>
            Discover Weekly
          </button>
        </div>

        <div className="sidebar-bottom">
          <span>♪</span>
          Made for music lovers
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="history-buttons">
            <button aria-label="Go back" onClick={() => setActiveMenu("Home")}>
              ‹
            </button>
            <button aria-label="Go forward" onClick={() => setActiveMenu("Home")}>
              ›
            </button>
          </div>

          <div className="search-box">
            <span>⌕</span>
            <input
              type="text"
              placeholder="What do you want to listen to?"
              value={search}
              onFocus={() => setActiveMenu("Search")}
              onChange={(event) => setSearch(event.target.value)}
            />
            {search && (
              <button onClick={() => setSearch("")} aria-label="Clear search">
                ×
              </button>
            )}
          </div>

          <button className="premium-button" onClick={() => alert("Welcome to Spotify!")}>
            Explore Premium
          </button>

          <button className="profile-button" title="Your profile">
            S
          </button>
        </header>

        <section className="welcome-section">
          <p className="eyebrow">YOUR PERSONAL MUSIC SPACE</p>
          <h1>
            Good music.
            <br />
            <span>Good mood.</span>
          </h1>
          <p className="welcome-description">
            Discover your next favourite song and make every moment sound better.
          </p>
          <button
            className="green-button"
            onClick={() => playSong(songs[0])}
          >
            <span>{isPlaying ? "Ⅱ" : "▶"}</span>
            {isPlaying ? "Now Playing" : "Start Listening"}
          </button>

          <div className="hero-decoration hero-circle-one"></div>
          <div className="hero-decoration hero-circle-two"></div>
          <div className="hero-music-note">♫</div>
        </section>

        <section className="music-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">MADE FOR YOU</p>
              <h2>
                {activeMenu === "Liked Songs"
                  ? "Your Liked Songs"
                  : activeMenu === "Search"
                    ? "Find Your Sound"
                    : activeMenu === "Library"
                      ? "Your Library"
                      : activeMenu === "Home"
                        ? "Made for your mood"
                        : activeMenu}
              </h2>
            </div>
            <button className="show-all" onClick={() => setActiveMenu("Library")}>
              View library →
            </button>
          </div>

          {activeMenu === "Create Playlist" && (
            <div className="notice-card">
              <h3>Create your music collection</h3>
              <p>Choose your favourite songs and save them to your liked songs.</p>
              <button onClick={() => setActiveMenu("Home")}>Explore music</button>
            </div>
          )}

          <div className="playlist-grid">
            {playlists.map((playlist, index) => (
              <button
                className="playlist-card"
                key={playlist.title}
                onClick={() => {
                  setActiveMenu(playlist.title);
                  setSearch("");
                }}
              >
                <div className={`playlist-art art-${index + 1}`}>
                  <span>{playlist.emoji}</span>
                  <span className="art-note">♫</span>
                </div>
                <h3>{playlist.title}</h3>
                <p>{playlist.subtitle}</p>
                <span className="card-play">▶</span>
              </button>
            ))}
          </div>
        </section>

        <section className="music-section tracks-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">YOUR NEXT FAVOURITE</p>
              <h2>
                {activeMenu === "Liked Songs" ? "Liked Songs" : "Popular tracks"}
              </h2>
            </div>
          </div>

          <div className="track-list">
            <div className="track-header">
              <span>#</span>
              <span>Title</span>
              <span>Album</span>
              <span>♡</span>
              <span>Time</span>
            </div>

            {(activeMenu === "Liked Songs"
              ? filteredSongs.filter((song) => likedSongs.includes(song.id))
              : filteredSongs
            ).map((song, index) => (
              <div
                className={`track-row ${
                  activeSong?.id === song.id ? "playing-track" : ""
                }`}
                key={song.id}
              >
                <button
                  className="track-number"
                  onClick={() => playSong(song)}
                  aria-label={`Play ${song.title}`}
                >
                  {activeSong?.id === song.id && isPlaying ? "Ⅱ" : index + 1}
                </button>

                <button className="track-info" onClick={() => playSong(song)}>
                  <div className="track-art" style={{ background: song.color }}>
                    {song.icon}
                  </div>
                  <div>
                    <h4>{song.title}</h4>
                    <p>{song.artist}</p>
                  </div>
                </button>

                <span className="track-album">{song.title}</span>

                <button
                  className={`like-button ${
                    likedSongs.includes(song.id) ? "is-liked" : ""
                  }`}
                  onClick={() => toggleLike(song.id)}
                  aria-label="Like song"
                >
                  {likedSongs.includes(song.id) ? "♥" : "♡"}
                </button>

                <span className="track-duration">{song.duration}</span>
              </div>
            ))}

            {filteredSongs.length === 0 && (
              <div className="empty-state">
                <span>♫</span>
                <h3>No songs found</h3>
                <p>Try searching for another song or artist.</p>
              </div>
            )}

            {activeMenu === "Liked Songs" &&
              filteredSongs.filter((song) => likedSongs.includes(song.id))
                .length === 0 && (
                <div className="empty-state">
                  <span>♡</span>
                  <h3>Your favourites live here</h3>
                  <p>Tap the heart next to a song to add it to your collection.</p>
                </div>
              )}
          </div>
        </section>

        <footer className="footer">
          <div>
            <span className="footer-logo">◖)) Spotify</span>
            <p>Your soundtrack, your story.</p>
          </div>
          <span>Made with ♡ for music lovers</span>
        </footer>
      </main>

      <div className="player-bar">
        <div className="now-playing">
          {activeSong ? (
            <>
              <div
                className="now-playing-art"
                style={{ background: activeSong.color }}
              >
                {activeSong.icon}
              </div>
              <div className="now-playing-info">
                <h4>{activeSong.title}</h4>
                <p>{activeSong.artist}</p>
              </div>
              <button
                className={`player-like ${
                  likedSongs.includes(activeSong.id) ? "is-liked" : ""
                }`}
                onClick={() => toggleLike(activeSong.id)}
              >
                {likedSongs.includes(activeSong.id) ? "♥" : "♡"}
              </button>
            </>
          ) : (
            <div className="no-song">
              <span>♫</span>
              <div>
                <h4>Select a song</h4>
                <p>Your music journey starts here</p>
              </div>
            </div>
          )}
        </div>

        <div className="player-controls">
          <div className="control-buttons">
            <button
              aria-label="Previous song"
              onClick={() => {
                if (activeSong) {
                  const index = songs.findIndex((song) => song.id === activeSong.id);
                  const previous = songs[(index - 1 + songs.length) % songs.length];
                  playSong(previous);
                }
              }}
            >
              |◀
            </button>

            <button
              className="main-play-button"
              aria-label={isPlaying ? "Pause" : "Play"}
              onClick={() => {
                if (activeSong) {
                  setIsPlaying(!isPlaying);
                } else {
                  playSong(songs[0]);
                }
              }}
            >
              {isPlaying ? "Ⅱ" : "▶"}
            </button>

            <button
              aria-label="Next song"
              onClick={() => {
                if (activeSong) {
                  const index = songs.findIndex((song) => song.id === activeSong.id);
                  playSong(songs[(index + 1) % songs.length]);
                } else {
                  playSong(songs[0]);
                }
              }}
            >
              ▶|
            </button>
          </div>

          <div className="progress-area">
            <span>0:00</span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(event) => setProgress(Number(event.target.value))}
              aria-label="Song progress"
            />
            <span>{activeSong?.duration || "0:00"}</span>
          </div>
        </div>

        <div className="player-extra">
          <span>♫</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            aria-label="Volume"
          />
          <span>{volume}%</span>
        </div>
      </div>
    </div>
  );
}

export default App;