import React from 'react';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from './../Playlist/Playlist';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchResults: [{name: 'name1', artist: 'artist1', album: 'album1',id:1}],
      playlistName: 'Jack Stauber', playlistTracks: [{name: 'name2', artist: 'artist2', album: 'album2',id:2}]
    }
  }
  
  render() { 
    return (  
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults}
            />
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks}
            />
          </div>
        </div>
    </div>
    );
  }
}
 
export default App;