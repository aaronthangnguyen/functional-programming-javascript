# PLAN

## Data Model

```js
meal = {
  id: 1,
  description: 'Breakfast',
  calories: 460,
};

model = {
  description: 'Dinner',
  calories: 600,
  showForm: false,
  nextId: 1,
  editId: 3,
  meals: [],
};
```

## View Functions

- view
  - formView
    - fieldSet
    - buttonSet
  - tableView
    - tableHeader
    - mealsBody
      - mealRow
        - cell
      - totalRow

## Interactions

- Click add meal
- Meal input
- Calorie input
- Click save (add/ update)
- Click edit icon
- Click delete icon
