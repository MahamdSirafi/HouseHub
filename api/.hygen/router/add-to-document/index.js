const { RoleCode } = require('../../../utils/enum');
const collectPromisesResults = (callback) => async (prevValues) => {
  const results = await callback(prevValues);

  return { ...prevValues, ...results };
};
const formatCamals = (input, index) => {
  let arr = input.trim().split(' ');
  let i = index;
  for (i; i < arr.length; i++)
    if (arr[i]) {
      arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);
    }
  return arr.join('');
};
const eqValueFormat = (values, field) => {
  values[field.charAt(0).toUpperCase() + field.slice(1)] = values[field]
    .trim()
    .split(' ')
    .map((word, index) => {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join('');
  values[field] =
    values[field.charAt(0).toUpperCase() + field.slice(1)]
      .charAt(0)
      .toLowerCase() +
    values[field.charAt(0).toUpperCase() + field.slice(1)].slice(1);
  return values;
};

module.exports = {
  prompt: ({ prompter, args }) =>
    prompter
      .prompt({
        type: 'input',
        name: 'name',
        message: "Entity name (e.g. 'User')",
        validate: (input) => {
          if (!input.trim()) {
            return 'Entity name is required';
          }

          return true;
        },
        format: (input) => {
          return formatCamals(input, 0);
        },
      })
      .then(
        collectPromisesResults((values) => {
          return eqValueFormat(values, 'name');
        }),
      )
      .then(
        collectPromisesResults(() => {
          return prompter.prompt({
            type: 'input',
            name: 'path',
            message: "enter path (e.g. 'mine/:id')",
            validate: (input) => {
              if (!input.trim()) {
                return 'path is required';
              }

              return true;
            },
            format: (input) => {
              return formatCamals(input, 1);
            },
          });
        }),
      )
      .then(
        collectPromisesResults((values) => {
          return eqValueFormat(values, 'path');
        }),
      )
      .then(
        collectPromisesResults(() => {
          return prompter.prompt({
            type: 'input',
            name: 'fun',
            message: "fun name (e.g. 'getForMe')",
            validate: (input) => {
              if (!input.trim()) {
                return 'fun name is required';
              }

              return true;
            },
            format: (input) => {
              return formatCamals(input, 1);
            },
          });
        }),
      )
      .then(
        collectPromisesResults((values) => {
          return eqValueFormat(values, 'fun');
        }),
      )
      .then(
        collectPromisesResults(() => {
          return prompter.prompt({
            type: 'multiselect',
            name: 'role',
            message: 'choose role',
            choices: Object.keys(RoleCode).map((key, index) => {
              return { name: key, value: key };
            }),
          });
        }),
      )
      .then(
        collectPromisesResults(() => {
          return prompter.prompt({
            type: 'select',
            name: 'role',
            message: 'choose method',
            choices: [
              { name: 'get', value: 'get' },
              { name: 'post', value: 'post' },
              { name: 'delete', value: 'delete' },
              { name: 'patch', value: 'patch' },
            ],
          });
        }),
      ),
};
