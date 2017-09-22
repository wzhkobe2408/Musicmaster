import React ,{Component} from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component{
	constructor(props){
		super(props);
		this.state ={
			query:'',    //my query
			artist:null,    //my request
			tracks:[]
		}
	}

	search(){
		console.log('this.state',this.state);
		const BASE_URL='https://api.spotify.com/v1/search?';
		let FETCH_URL=`${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
		const ALBUM_URL='https://api.spotify.com/v1/artists/';
		const access_token='BQASjKOREnqokS0BijKqP50CPkgNgb4sr-ktOcFUyNHC1dpE7P2YfPGwf23ETwGjMgUCs69J9L_Mti1CLmQF5ZeT9m3gijOYEuMqdtHIjiaTR3q5e53uxErQ6mFfrbPW6_B2bOXVrfyzBW3pNI5smji_yqXsP-haSfSPbMXrw8Sxcyd8_mM&refresh_token=AQAglJ4NeJzqED6EszCzKWOp9nq8kF3x5MyV-9gfBqwWvaKDz5mHkN2IndWYMRJmCewBUW9oxaSyesiemcByTzhpCs1p0tAFt-SfjmS7Jfz2GppuTGWR090KeqhbhMN3d58';
		const myOptions = {
			method:'GET',
			headers:{
				'Authorization' : 'Bearer '+access_token
			},
			mode:'cors',
			cache:'default'
		};

		console.log('FETCH_URL', FETCH_URL);
		fetch(FETCH_URL,myOptions)
		.then(response => response.json())
		.then(json =>{
			const artist =json.artists.items[0];
			console.log('artist',artist);
			this.setState({artist});

			FETCH_URL=`${ALBUM_URL}${artist.id}/top-tracks?country=CA&`
			fetch(FETCH_URL,myOptions)
				.then(response => response.json())
				.then(json =>{
					console.log('top tracks',json);
					const tracks = json.tracks;
					this.setState({ tracks });
				})
		});


	}
	render(){
		return(
				<div className='App'>
					<div className='App-title panel panel-success'>
					<div className='panel-heading'>Music Master</div>
					<div className='panel-body'>
					<FormGroup>
						<InputGroup>
							<FormControl
							type='text'
							placeholder='Search for an artist...'
							value={this.state.query}
							onChange={event =>{this.setState({query:event.target.value})}}
							onKeyPress={event=>{
							if(event.key === 'Enter'){this.search()}
							}}
						/>
							<InputGroup.Addon onClick={()=>this.search()}>
								<Glyphicon glyph='search'></Glyphicon>
							</InputGroup.Addon>
						</InputGroup>
					</FormGroup>
					</div>
					</div>
					{
						this.state.artist !==null ?
						<div>
							<Profile
								artist={this.state.artist}
							 />
							<Gallery tracks={this.state.tracks} />
						</div>
						: <div></div>
					}
				</div>
			)
	}
}

export default App;
