import '../../scss/styles.scss';

import * as React from 'react';

// needed to reunder the GQL query
import { QueryRenderer, graphql } from 'react-relay';
import {WidgetTableContainer} from './widget-table';
import { environment } from '../environment';

export class Home extends React.Component {
  render() {
    return (
      <section className="flex-container">
        <QueryRenderer
          environment={environment}
          query={graphql`
        query homeQuery {
          viewer {
            id
            ...widgetTable_viewer
          }
        }
      `}
          render={ ({ error, props, retry }) => {
            if (props) {
              return (
                <WidgetTableContainer viewer={props.viewer} />
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