'use client'

import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSlider } from './components/HeroSlider';
import { TrustBanner } from './components/TrustBanner';
import { Catalog } from './components/Catalog';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { OrderForm } from './components/OrderForm';
import { CustomQuoteForm } from './components/CustomQuoteForm';
import { DeliverySection } from './components/DeliverySection';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Product } from './components/products';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsOrderFormOpen(true);
  };

  const handleScrollToBoutique = () => {
    const element = document.getElementById('boutique');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToDevis = () => {
    const element = document.getElementById('devis');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF6EE]">
      <Navigation
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
        onDevisClick={handleScrollToDevis}
      />

      <HeroSlider
        onBoutiqueClick={handleScrollToBoutique}
        onDevisClick={handleScrollToDevis}
      />

      <TrustBanner />

      <Catalog
        onAddToCart={handleAddToCart}
        onDevisClick={handleScrollToDevis}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <CustomQuoteForm />

      <DeliverySection />

      <FAQ />

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <OrderForm
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
        onEditBasket={() => { setIsOrderFormOpen(false); handleScrollToBoutique() }}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}
