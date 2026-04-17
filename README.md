#  Amazon Clone (Full Stack)

A full-stack e-commerce web application inspired by Amazon, built to replicate core shopping functionalities along with a clean and intuitive user experience.

---

## Live Demo

🔗 **Frontend:** https://amazon-clone-kappa-virid.vercel.app/  
🔗 **Backend API:** https://amazon-clone-backend-a7zs.onrender.com

---

##  Project Overview

This project focuses on building a scalable and modular e-commerce platform with features like product browsing, cart management, and order placement.

The goal was not just to make it work, but to design it in a way that closely resembles Amazon’s UI/UX while maintaining clean architecture and code quality.

---

##  Features

-  Product listing with categories
-  Search and filter functionality
-  Ratings display for products
-  Product badges (Deal, Prime)
-  Add to cart & update quantity
-  Checkout with address input
-  Order placement & confirmation page
-  Orders history page
-  Responsive UI (Amazon-like layout)

---

##  Functionality

All core features are implemented and working correctly:

- Products can be browsed and filtered by category
- Users can search for products dynamically
- Cart updates in real-time (add/remove/update quantity)
- Checkout flow includes address and order summary
- Orders are stored and displayed properly
- Navigation between pages is smooth and consistent

---

##  UI / UX

- Designed to closely mimic **Amazon’s layout and experience**
- Clean product cards with:
  - Ratings 
  - Price styling
  - Discount indicators
  - Prime badges
- Structured navigation bar with:
  - Category dropdown
  - Search bar
  - Cart and orders section
- Consistent spacing, colors, and hierarchy for readability

---

##  Database Design

The database is structured using PostgreSQL with a clear schema:

### Tables:
- `products` → stores product details (name, price, category, image, rating, etc.)
- `cart` → manages user cart items
- `orders` → stores order details
- `order_items` → stores items inside each order

### Highlights:
- Proper relationships between orders and products
- Scalable structure for adding users, payments, etc.
- Fields like `rating`, `is_prime`, and `discount` enhance UI logic

---

##  Code Quality

- Clean and readable code with meaningful naming
- Consistent formatting across frontend and backend
- Avoided unnecessary complexity
- Proper use of async/await for API calls

---

##  Code Modularity

The project follows good separation of concerns:

### Frontend:
- Components split into:
  - Navbar
  - ProductList
  - Cart
  - Checkout
  - Orders
- Reusable hooks (e.g., `useTitle`)
- Context API used for global state (Cart)

### Backend:
- Organized into:
  - Routes
  - Controllers
  - Database config
- API endpoints clearly structured

---

##  Code Understanding

This project is written with clarity in mind and can be easily explained:

- Each component has a single responsibility
- Data flow is predictable and easy to trace
- API integration is straightforward
- UI logic (ratings, badges, filters) is clearly separated

---

##  Tech Stack

### Frontend:
- React (Vite)
- CSS (custom styling)

### Backend:
- Node.js
- Express.js

### Database:
- PostgreSQL


###  Note:
- Refresh the website 2-3 time for it to appear properly
---

##  Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/ag19bhoomi/amazon-clone.git
cd amazon-clone


