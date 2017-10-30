import '../../scss/styles.scss';

import * as React from 'react';
import PropTypes from 'prop-types';

// needed to reunder the GQL query
import { QueryRenderer, graphql } from 'react-relay';

import { environment } from '../environment';

export class Home extends React.Component {

  static propTypes = {
    children: PropTypes.object,
  };

  render() {
    return (
      <section className="flex-container">
        <QueryRenderer
          environment={environment}
          query={graphql`
        query homeQuery {
          viewer {
            widgets {
              edges {
                node {
                  id
                  name
                  description
                  size
                  quantity
                }
              }
            }
          }
        }
      `}
          render={ ({ error, props, retry }) => {
            if (props) {
              return (
                <table className="flex-container-child">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Size</th>
                      <th>Color</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.viewer.widgets.edges.map(
                      ({ node: widget }) => (
                        <tr key={widget.id}>
                          <th>{widget.name}</th>
                          <th>{widget.description}</th>
                          <th>{widget.size}</th>
                          <th>{widget.color}</th>
                          <th>{widget.quantity}</th>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
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