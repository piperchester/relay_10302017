import * as React from 'react';

import { createFragmentContainer, graphql } from 'react-relay';

export class WidgetTable extends React.Component {
  render() {
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
          {this.props.viewer.widgets.edges.map(
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
  }
}

export const WidgetTableContainer = createFragmentContainer(WidgetTable, graphql`
fragment widgetTable_viewer on Viewer {
  widgets {
    edges {
      node {
        id
        name
        description
        color
        size
        quantity
      }
    }
  }
}
`);