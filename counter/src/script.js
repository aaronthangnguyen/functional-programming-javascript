import hh from 'hyperscript-helpers';
import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

const { div, button, svg } = hh(h);

const initModel = 0;

const view = (dispatch, model) => {
  return div({ className: 'm-4' }, [
    div(
      {
        className: 'text-lg mb-2',
      },
      `Count: ${model}`
    ),
    button(
      {
        className:
          'text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800',
        onclick: () => dispatch(MESSAGES.ADD),
      },
      '+'
    ),
    button(
      {
        className:
          'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700',
        onclick: () => dispatch(MESSAGES.SUBTRACT),
      },
      '-'
    ),
  ]);
};

const MESSAGES = {
  ADD: 'ADD',
  SUBTRACT: 'SUBTRACT',
};

const update = (message, model) => {
  switch (message) {
    case 'ADD':
      return model + 1;
    case 'SUBTRACT':
      return model - 1;
    default:
      return model;
  }
};

// @impure
const app = (initModel, update, view, node) => {
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
  node.appendChild(viewNode);
};

const rootNode = document.getElementById('app');
app(initModel, update, view, rootNode);
