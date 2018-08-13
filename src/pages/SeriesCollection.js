import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addEpisode, removeEpisode} from '../actions/seriesActions';
import {Route, Switch, Link} from 'react-router-dom';
import {SELECTORS} from '../reducers';
import styled from 'styled-components';
import {font, color} from '../styles/typography';
import Hero from '../components/Hero';

class SeriesCollection extends React.Component {
  constructor(...args) {
    super(...args);

    this.toggleEpisode = this.toggleEpisode.bind(this);
  }

  toggleEpisode(e, id) {
    const isChecked = e.target.checked;
    if (isChecked) {
      this.props.addEpisode(this.props.match.params.id, id);
    } else {
      this.props.removeEpisode(this.props.match.params.id, id);
    }
  }

  render() {
    const {details, season, trackedEpisodes, match} = this.props;

    return (
      <div>
        <Hero details={details} />
        <ul>
          {details &&
            details.seasons.map(season => (
              <li key={season.id}>
                <Link to={`${match.url}/season/${season.season_number}`}>{season.season_number}</Link>
              </li>
            ))}
        </ul>
        <table>
          <tbody>
            {season &&
              season.episodes.map(episode => (
                <tr key={episode.id}>
                  <td>{episode.episode_number}</td>
                  <td>{episode.name}</td>
                  <td>{episode.air_date}</td>
                  <td>{episode.overview}</td>
                  <td>
                    <input
                      type="checkbox"
                      defaultChecked={trackedEpisodes.includes(episode.id.toString())}
                      onChange={e => this.toggleEpisode(e, episode.id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  details: SELECTORS.SERIES.getSeriesDetails(state),
  season: SELECTORS.SERIES.getSeason(state),
  trackedEpisodes: SELECTORS.SERIES.getTrackedEpisodes(state),
});

const mapDispatchToProps = dispatch => ({
  addEpisode: bindActionCreators(addEpisode, dispatch),
  removeEpisode: bindActionCreators(removeEpisode, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SeriesCollection);
