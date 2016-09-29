import React from 'react';
import {mapStateToProps} from '../Connection.js';
import { Link } from 'react-router';
import {createRoom} from '../actions/roomActions';
import {connect} from 'react-redux';
import {Router} from 'react-router';


class NewRoom extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      topic: undefined,
      class: undefined,
      lecturer: undefined
    }
  }
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired,
    };
  }

  handleInput(e){
    if (e.target.id === 'topic'){
      this.setState({
        topic: e.target.value
      })
    }
    if (e.target.id === 'class'){
      this.setState({
        className: e.target.value
      })
    }
    if (e.target.id === 'lecturer'){
      this.setState({
        lecturer: e.target.value
      })
    }
  }

  buttonClicked(el) {
    var context = this;
    var cb = function(err, success){
      if (err){
        context.setState({error: true});
      } else {
        context.context.router.push(`/lobby/${success}`);
      }
    }
    var data = {
      hostId: this.props.getState().user.information[0].id,
      topic: this.state.topic,
      className: this.state.className,
      lecturer: this.state.lecturer
    };
    console.log('button was clicked')
    this.props.dispatch(createRoom(data, cb));
  }

  render(){
    return (
      <div className="container new-room">
        <h2 className="new-room-title">New Room</h2>
        <form className="form-horizontal">
          <div className="form-group">
            <label className="control-label col-sm-2">Topic:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="topic" placeholder="(i.e. The Battle of Waterloo)" onChange={this.handleInput.bind(this)}>
              </input>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2">Class:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="class" placeholder="(i.e. World History)" onChange={this.handleInput.bind(this)}>
              </input>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2">Lecturer:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="lecturer" placeholder="(optional)" onChange={this.handleInput.bind(this)}>
              </input>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="button" onClick={this.buttonClicked.bind(this)} className="btn btn-default create-room">Create</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(NewRoom);
