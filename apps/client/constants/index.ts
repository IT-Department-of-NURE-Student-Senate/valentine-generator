const STEPPER_TITLES = [
  'Що ти хочеш сказати йому/їй?',
  'Для кого ця валентика?',
  'Від кого?',
];

const VALENTINE_NOT_FOUND_ERR = {
  status: 404,
  message:
    'Блін, нажаль ми не знайшли цю валентинку, але не розстраюйся, ти завжди можеш створити свою!',
  fatal: true,
};

const VALENTINE_COOKIE_KEY = 'valentine-card-id';

export { STEPPER_TITLES, VALENTINE_NOT_FOUND_ERR, VALENTINE_COOKIE_KEY };
