import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ComplexInput from './ComplexFormInput';

class MultipleComplex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountToRender: ['1'],
    };
  }

  renderAnother(e) {
    e.preventDefault();
    const copy = this.state.amountToRender.slice();
    copy.push('1');
    this.setState({ amountToRender: copy });
  }

  render() {
    return (
      <>
        {this.state.amountToRender.map((num, i) => (
          <ComplexInput key={num + i} mainName={this.props.mainName} subInputs={this.props.subInputs} />
        ))}
        <div className={'extraComplexButton'}>
          <button onClick={this.renderAnother.bind(this)}>{`Add another ${this.props.mainName}`}</button>
        </div>
      </>
    );
  }
}


MultipleComplex.propTypes = {
  mainName: PropTypes.string,
  subInputs: PropTypes.array,
};

export default MultipleComplex;
