import '../../scss/styles.scss';

import * as React from 'react';

// needed to reunder the GQL query
import { QueryRenderer, graphql } from 'react-relay';

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
            cars {
              edges {
                node {
                  id
                  make
                  model
                  year
                  color
                  price
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
                    {props.viewer.cars.edges.map(
                      ({ node: car }) => (
                        <tr key={car.id}>
                          <th>{car.make}</th>
                          <th>{car.model}</th>
                          <th>{car.year}</th>
                          <th>{car.color}</th>
                          <th>{car.price}</th>
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