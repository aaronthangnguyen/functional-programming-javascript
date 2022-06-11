import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import {
  showFormMessage,
  mealInputMessage,
  calorieInputMessage,
  saveMealMessage,
} from './Update';

const { pre, div, h1, button, form, label, input } = hh(h);

const buttonSet = dispatch => {
  return div([
    button(
      {
        className: 'uk-button uk-button-primary uk-margin-small-right',
        type: 'submit',
      },
      'Save'
    ),
    button(
      {
        className: 'uk-button uk-button-default',
        type: 'button',
        onclick: () => dispatch(showFormMessage(false)),
      },
      'Cancel'
    ),
  ]);
};

const fieldSet = (labelText, inputValue, oninput) => {
  return div({ className: 'uk-margin' }, [
    label(
      {
        className: 'uk-form-label',
        for: `${labelText.toLowerCase()}-input`,
      },
      labelText
    ),
    div({ className: 'uk-form-controls' }, [
      input({
        className: 'uk-input',
        id: `${labelText.toLowerCase()}-input`,
        type: 'text',
        value: inputValue,
        oninput,
      }),
    ]),
  ]);
};

const formView = (dispatch, model) => {
  const { description, calories, showForm } = model;
  return showForm
    ? form(
        {
          className: 'uk-form-stacked',
          onsubmit: ev => {
            ev.preventDefault();
            dispatch(saveMealMessage);
          },
        },
        [
          fieldSet('Meal', description, ev =>
            dispatch(mealInputMessage(ev.target.value))
          ),
          fieldSet('Calorie', calories || '', ev =>
            dispatch(calorieInputMessage(ev.target.value))
          ),
          buttonSet(dispatch),
        ]
      )
    : button(
        {
          className: 'uk-button uk-button-primary',
          onclick: () => dispatch(showFormMessage(true)),
        },
        'Add Meal'
      );
};

const view = (dispatch, model) => {
  return div({ className: 'uk-container uk-container-xsmall uk-margin-top' }, [
    h1(
      { className: 'uk-heading-xsmall uk-heading-divider' },
      'Calorie Counter'
    ),
    formView(dispatch, model),
    pre(JSON.stringify(model, null, 2)),
  ]);
};

export default view;
