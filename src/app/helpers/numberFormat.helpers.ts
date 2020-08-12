export const formatThousands = (number: number) =>
  new Intl.NumberFormat().format(number) + '.00';
