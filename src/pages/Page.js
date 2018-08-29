import React from 'react';
import posed, {PoseGroup} from 'react-pose';

const PosedPage = posed.div({
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
});

class Page extends React.Component {
  render() {
    const {key} = this.props;

    return (
      <PoseGroup animateOnMount>
        <PosedPage className="page" key={key}>
          {this.props.children}
        </PosedPage>
      </PoseGroup>
    );
  }
}
export default Page;
