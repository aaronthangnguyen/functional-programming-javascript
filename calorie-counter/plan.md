# PLAN

## Data Model

```js
meal = {
  id: 1,
  description: 'Breakfast',
  calories: 460,
};

model = {
  meals: [],
  editId: 3,
  nextId: 1,
  description: 'Dinner',
  calories: 600,
  showForm: false,
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
