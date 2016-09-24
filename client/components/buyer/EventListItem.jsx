import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { selectEvent, fetchAuctions } from '../../actions/index';

class EventListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.selectEvent(this.props.event);
    this.props.fetchAuctions(this.props.event.id);
    browserHistory.push(`/event/${this.props.event.id}`);
  }

  render() {
    return (
      <Card className="list-item" onClick={this.handleClick}>
        <CardTitle
          title={this.props.event.name}
          subtitle={
            <div>
              <div>
                {this.props.event.venue} - {this.props.event.city}, {this.props.event.state}
              </div>
              <div>
                {moment(this.props.event.datetime_local).format('MMMM Do, YYYY [@] h:mma')}
              </div>
            </div>
          }
        />
      </Card>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectEvent, fetchAuctions }, dispatch);
}

export default connect(null, mapDispatchToProps)(EventListItem);
