import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

export class CarTable extends React.Component {
  render() {
    return (
      <table className="flex-container-child">
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Color</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {this.props.viewer.cars.edges.map(
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
  }
}

export const CarTableContainer = createFragmentContainer(CarTable, graphql`
fragment carTable_viewer on Viewer {
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
`);