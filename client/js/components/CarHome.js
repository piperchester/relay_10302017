import '../../scss/styles.scss';

import * as React from 'react';

// needed to render the GQL query
import { QueryRenderer, graphql } from 'react-relay';

import { CarTableContainer } from './car-table';

import { environment } from '../environment';

// Query is built based on this class name so,
// CarHome + Query - that should be the template tag
export class CarHome extends React.Component {
  render() {
    return (
      <section className="flex-container">
        <QueryRenderer
          environment={environment}
          query={graphql`
            query CarHomeQuery {
              viewer {
                id
                ...carTable_viewer
              }
            }
      `}
          render={ ({ error, props, retry }) => {
            if (props) {
              return (
                <CarTableContainer viewer={props.viewer} />
              );
            } else {
              return (
                <div>Loading...</div>
              );
            }
          }}
          variables={{}}
        />
      </section>
    );
  }
}