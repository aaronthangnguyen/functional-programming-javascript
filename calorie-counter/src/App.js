import { diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

const app = (initModel, update, view, rootNode) => {
  const dispatch = message => {
    model = update(message, model);
    const updatedView = view(dispatch, model);
    const patches = diff(currentView, updatedView);
    viewNode = patch(viewNode, patches);
    currentView = updatedView;
  };
  let model = initModel;
  let currentView = view(dispatch, model);
  let viewNode = createElement(currentView);
  rootNode.appendChild(viewNode);
};

export default app;
