import { GraphQLStringType } from 'graphql';

import { mutationWithClientMutationId, offsetToCursor } from 'graphql-relay';

import { insertWidgetType } from './widget-input-types';
import { viewerType } from './viewer-type';
import { widgetEdgeType } from '../connections/widgets';

import { WidgetData } from '../models/widget-data';
import { Viewer, Widget } from '../models/graphql-models';


export const insertWidgetMutationType = mutationWithClientMutationId({
  name: 'InsertWidget',
  inputFields: {
    widget: { 
      type: insertWidgetType
    },
    // objects that we send to the server will need to be tagged with an ID
    // this will tie the client-side graph operation to the server-side data operation
    clientMutationId: {
      type: GraphQLStringType
    }

  },

  // mutate -> and produce the response data
  mutateAndGetPayload: ({ widget },  {baseUrl }) => {
    const widgetData = new WidgetData(baseUrl);
    // merge props into the new Widget
    return widgetData.insert(widget).then(widget => Object.assign(new Widget(), widget));
  },

  outputFields: {
    viewer: {
      type: viewerType,
      resolve: () => Object.assign(new Viewer(), { id: 1 }),
    },
    widgetEdge: {
      type: widgetEdgeType,
      // outputs public viewer we're working with 
      resolve: (widget, _, { baseUrl }) => {
      
        const widgetData = new WidgetData(baseUrl);
        return widgetData.all().then(widgets => {

          const widgetIndex = widgets.findIndex(w => w.id === widget.id);
          return {
            cursor: offsetToCursor(widgetIndex),  // has to know where widget ended up in the actual collection
            node: widget,
          };

        });
      }
    }
  },
});