import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import {
  showFormMessage,
  mealInputMessage,
  calorieInputMessage,
  saveMealMessage,
  deleteMealMessage,
  editMealMessage,
} from './Update';
import * as R from 'ramda';

const {
  pre,
  div,
  h1,
  button,
  form,
  label,
  input,
  table,
  thead,
  tbody,
  tfoot,
  tr,
  th,
  td,
  i,
} = hh(h);

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
    h1({ className: 'uk-heading-xsmall uk-margin-bottom	' }, 'CALORIE COUNTER'),
    formView(dispatch, model),
    tableView(dispatch, model.meals),
    pre(JSON.stringify(model, null, 2)),
  ]);
};

const cell = (tag, className, value) => {
  return tag(className, value);
};

const tableView = (dispatch, meals) => {
  return meals.length < 1
    ? div({ className: 'uk-margin-top' }, 'No meal to display...')
    : table({ className: 'uk-table uk-table-striped uk-margin-top' }, [
        tableHeader,
        mealsBody(dispatch, meals),
        totalRow(meals),
      ]);
};

const tableHeader = thead([
  tr([
    cell(th, '', 'Meal'), //
    cell(th, '', 'Calories'),
    cell(th, '', ''),
  ]),
]);

const mealsBody = (dispatch, meals) => {
  const rows = R.map(
    R.partial(mealRow, [dispatch]), //
    meals
  );

  return tbody(rows);
};

const mealRow = (dispatch, meal) => {
  return tr([
    cell(td, '', meal.description), //
    cell(td, '', meal.calories.toString()),
    cell(td, '', [
      i({
        className: 'fa-solid fa-trash',
        style: 'cursor: pointer',
        onclick: () => dispatch(deleteMealMessage(meal.id)),
      }),
      i({
        className: 'fa-solid fa-pencil',
        style: 'cursor: pointer',
        onclick: () => dispatch(editMealMessage(meal.id)),
      }),
    ]),
  ]);
};

const totalRow = meals => {
  const total = R.pipe(
    R.map(meal => meal.calories),
    R.sum
  )(meals);
  return tfoot([
    tr([
      cell(td, 'Total: '), //
      cell(td, total),
      cell(td, ''),
    ]),
  ]);
};

export default view;
