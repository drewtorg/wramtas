import React from 'react';

export default class IFrame extends React.Component<{iframe: string}> {
    iframe() {
      return {
        __html: this.props.iframe
      }
    }
  
    render() {
      return (
        <div className="row justify-content-center">
          <div dangerouslySetInnerHTML={ this.iframe() } />
        </div>
      );
    }
  };