export default class Burger {
  constructor(open, close, menu) {
    this.open = open;
    this.close = close;
    this.menu = menu;

    this.open.addEventListener('click', () => {
      this.open.classList.remove('active');
      this.close.classList.add('active');
      this.menu.classList.add('active');
      document.dispatchEvent(new CustomEvent('menu-opened', {
        detail: { message: 'Меню открыто' }
      }));
    })

    this.close.addEventListener('click', () => {
      this.open.classList.add('active');
      this.close.classList.remove('active');
      this.menu.classList.remove('active');
      document.dispatchEvent(new CustomEvent('menu-closed', {
        detail: { message: 'Меню закрыто' }
      }));
    });
  };
}