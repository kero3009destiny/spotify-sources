import React, {Component} from 'react';
import * as api from '../api/api';
import userIcon from '../images/user.png';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      product: '',
      imageURL: '',
    };

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadProfile();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  loadProfile() {
    api.getProfile().then((payload) => {
      if (payload !== undefined && this._isMounted) {
        this.setState({
          fullName: payload.data.display_name !== null ? payload.data.display_name : payload.data.id,
          product: payload.data.product === 'open' ? 'free' : payload.data.product,
          imageURL: payload.data.images.length > 0 ? payload.data.images[0].url : userIcon,
        });
      }
    });
  }

  render() {
    return (
      <span>
        <div className="certomatoHeaderText" style={{marginRight: 0}}>
          <span>{this.state.fullName}</span>
        </div>
        <div className="certomatoHeaderContentRightStack" style={{marginRight: 0}}>
          <div className="certomatoHeaderContentRight">
            <img src={this.state.imageURL} style={{float: 'right', width: 40, height: 40, borderRadius: 25, marginRight: 0, padding: 0, marginTop: 20}}/>
          </div>
        </div>
      </span>
    );
  }
}

export default Profile;
