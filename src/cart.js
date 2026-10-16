
function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Количество должно быть больше нуля');
  }

  const existingProduct = cart.find(item => item.id === product.id);

  if (existingProduct) {
    const newQuantity = existingProduct.quantity + quantity;

    if (newQuantity > product.stock) {
      throw new RangeError('Недостаточно товара на складе');
    }

    return cart.map(item =>
      item.id === product.id
        ? { ...item, quantity: newQuantity }
        : item
    );
  }

  if (quantity > product.stock) {
    throw new RangeError('Недостаточно товара на складе');
  }

  return [...cart, { ...product, quantity }];
}

function changeQuantity(cart, productId, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Количество должно быть больше нуля');
  }

  const product = cart.find(item => item.id === productId);

  if (!product) {
    return cart;
  }

  if (quantity > product.stock) {
    throw new RangeError('Недостаточно товара на складе');
  }

  return cart.map(item =>
    item.id === productId
      ? { ...item, quantity }
      : item
  );
}

function removeFromCart(cart, productId) {
  return cart.filter(item => item.id !== productId);
}

function calculateCartSubtotal(cart) {
  return cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
}

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);

  let discount = 0;

  if (promoCode === 'SAVE10' && subtotal >= 20000) {
    discount = Math.round(subtotal * 0.1);
  }

  const delivery = subtotal < 50000 ? 30000 : 0;
  const total = subtotal - discount + delivery;

  return {
    subtotal,
    discount,
    delivery,
    total,
  };
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
