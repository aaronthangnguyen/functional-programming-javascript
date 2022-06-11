import * as R from 'ramda';

const MESSAGES = {
  SHOW_FORM: 'SHOW_FORM',
  MEAL_INPUT: 'MEAL_INPUT',
  CALORIES_INPUT: 'CALORIES_INPUT',
  SAVE_MEAL: 'SAVE_MEAL',
};

const showFormMessage = showForm => {
  return {
    type: MESSAGES.SHOW_FORM,
    showForm,
  };
};

const mealInputMessage = description => {
  return {
    type: MESSAGES.MEAL_INPUT,
    description,
  };
};

const calorieInputMessage = calories => {
  return {
    type: MESSAGES.CALORIES_INPUT,
    calories,
  };
};

const saveMealMessage = { type: MESSAGES.SAVE_MEAL };

const update = (message, model) => {
  switch (message.type) {
    case MESSAGES.SHOW_FORM: {
      const { showForm } = message;
      return { ...model, showForm, description: '', calories: 0 };
    }
    case MESSAGES.MEAL_INPUT: {
      const { description } = message;
      return { ...model, description };
    }
    case MESSAGES.CALORIES_INPUT: {
      const calories = R.pipe(parseInt, R.defaultTo(0))(message.calories);
      return { ...model, calories };
    }
    case MESSAGES.SAVE_MEAL: {
      return add(message, model);
    }
  }
  return model;
};

const add = (message, model) => {
  const { nextId, description, calories } = model;
  const meal = { id: nextId, description, calories };
  const meals = [...model.meals, meal];
  return {
    ...model,
    meals,
    nextId: nextId + 1,
    description: '',
    calories: 0,
    showForm: false,
  };
};

export {
  showFormMessage,
  mealInputMessage,
  calorieInputMessage,
  saveMealMessage,
};
export default update;
