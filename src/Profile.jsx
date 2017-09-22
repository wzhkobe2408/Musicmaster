import React,{Component} from 'react';
import './App.css'

class Profile extends Component{
	render() {
		let artist = {name:'',followers:{total:''},images:[{url:''}],genres:[]};
		if(this.props.artist) {
			artist = this.props.artist;
		}

		return (
			<div className='profile well'>
			<img alt='Profile'
			className = 'profile-img'
			src={artist.images[0].url}
			 />
			<div className='profile-info'>
					<div className='profile-name'>{artist.name}</div>
					<div className='profile-followers'>
					<button className="btn btn-success">
					  <strong>Followers</strong> <span className="label label-success">{artist.followers.total}</span>
					</button>
					</div>
					<div className='profile-genres'>
						{
							artist.genres.map((genre,k) => {
								return (
									<span className="badge badge-primary" key={k}>{genre}</span>
								)
							})
						}
					</div>
				</div>
			</div>
		)
	}
}

export default Profile
