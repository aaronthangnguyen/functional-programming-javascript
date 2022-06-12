import * as R from 'ramda';

const MESSAGES = {
  SHOW_FORM: 'SHOW_FORM',
  MEAL_INPUT: 'MEAL_INPUT',
  CALORIES_INPUT: 'CALORIES_INPUT',
  SAVE_MEAL: 'SAVE_MEAL',
  DELETE_MEAL: 'DELETE_MEAL',
  EDIT_MEAL: 'EDIT_MEAL',
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

const deleteMealMessage = id => {
  return {
    type: MESSAGES.DELETE_MEAL,
    id,
  };
};

const editMealMessage = editId => {
  return {
    type: MESSAGES.EDIT_MEAL,
    editId,
  };
};

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
      const { editId } = model;
      const updatedModel =
        editId != null //
          ? editId(message, model)
          : add(message, model);
    }
    case MESSAGES.DELETE_MEAL: {
      const { id } = message;
      const meals = R.filter(
        meal => meal.id !== id, //
        model.meals
      );
      return { ...model, meals };
    }
    case MESSAGES.EDIT_MEAL: {
      const { editId } = message;
      const meal = R.find(
        meal => meal.id === editId, //
        model.meals
      );

      const { description, calories } = meal;

      return {
        ...model,
        editId,
        description,
        calories,
        showForm: true,
      };
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

const edit = (message, model) => {
  const { description, calories, editId } = model;
  const meals = R.map(meal => {
    if (meal.id === editId) {
      return { ...meal, description, calories };
    }
    return meal;
  });

  return {
    ...model, //
    meals,
    description: '',
    calories: 0,
    editId: null,
  };
};

export {
  showFormMessage,
  mealInputMessage,
  calorieInputMessage,
  saveMealMessage,
  deleteMealMessage,
  editMealMessage,
};
export default update;
