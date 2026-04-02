# Le Marodeur – Restaurant Ordering System
A modern restaurant ordering system for tablets and mobile, developed with HTML, CSS and JavaScript in an MVC (Model-View-Controller) architecture.

---

## Features
- **Multi-page Menu Flow:** Support for starters, mains, desserts, beverages, set menus, and "Today's Special."
- **Ordering System:** Add dishes, manage cart, drag to reorder or remove, and proceed to payment.
- **Dietary & Allergen Tagging:** Clear tags for vegan, vegetarian, gluten, dairy, onion, non-alcoholic, etc.
- **Drag and Drop:** Easily add meals to your cart via drag-and-drop.
- **Cart Icon & Badge:** Prominent cart summary at the bottom of the app, always visible.
- **Responsive Design:** Looks great and works smoothly on both tablets and mobile devices.
- **Multi-language Support:** English, Swedish, and French UI – instantly switchable and saved between sessions.
- **Checkout System:** Pay by QR code, by card, or at the table.
- **Call Service:** Guests can call the staff directly from the app.

---

## Folder Structure
```text
Le_Marodeur/
├── css/
│   └── styles.css
├── html/
│   ├── call-service.html
│   ├── checkout.html
│   ├── menu.html
│   ├── order.html
│   ├── payment-card.html
│   ├── payment-qr.html
│   └── payment-waiter.html
├── js/
│   ├── data/
│   │   ├── dictionary.js       # Language translations (i18n)
│   │   └── menuData.js        # Menu categories and meals (Mock data / Model)
│   ├── model/
│   │   └── CartModel.js       # Cart logic and state (Model)
│   ├── view/
│   │   └── MenuView.js        # Rendering menu/categories (View)
│   ├── controller/
│   │   ├── LanguageController.js # Language switching and event logic (Controller)
│   │   ├── MenuController.js     # Menu/category interaction logic (Controller)
│   │   └── OrderController.js    # Order and cart management (Controller)
│   └── order_page.js          # Drag-and-drop logic for ordering (Controller-logic)
├── assets/
│   └── images/                # All image assets (dishes, QR, categories etc.)
├── index.html
└── README.md
```

---

## Architecture: Model-View-Controller (MVC)
**Model** (`js/model/*`, `js/data/*`):  
- Stores all application data such as meals, categories, and cart content.

**View** (`js/view/*`):  
- Only responsible for rendering HTML/DOM from data. No event logic here.

**Controller** (`js/controller/*`, `js/order_page.js`):  
- Handles user events, event listeners, and orchestrates logic and data flow between Model and View.
- All business and UI logic is handled here.

---

## Setup Instructions
1. **Clone the repository:**  
   ```bash
   git clone https://github.com/EmilEdin/Le_Marodeur.git
   ```
2. **Open:**  
   Open `index.html` in any modern web browser (no server needed – everything is static!).

3. **Develop:**  
   Work directly in the `js/`, `css/`, and `html/` folders as needed.

---

## Image and Icon Attribution
This application uses photos from [Unsplash](https://unsplash.com/) and icons from [Feathericons](https://feathericons.com/).

**Images**
All food, category and mockup images are stored in `/assets/images/`.
Below is attributions to all.

QR code: 
Photo by <a href="https://unsplash.com/@markuswinkler?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Markus Winkler</a> on <a href="https://unsplash.com/photos/black-android-smartphone-displaying-qr-code-kHMiTbqI5QU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

Bouillabaisse:
Photo by <a href="https://unsplash.com/@hjkp?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">henry perks</a> on <a href="https://unsplash.com/photos/cooked-food-on-brown-ceramic-plate-8ni7LN6vaQ8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

Salad:      
Photo by <a href="https://unsplash.com/@photographer_esmihel?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Dextar Vision</a> on <a href="https://unsplash.com/photos/a-plate-of-salad-on-a-black-table-kMpbi3TeFE4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

Snails:      
Photo by <a href="https://unsplash.com/@orlovamaria?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Maria Orlova</a> on <a href="https://unsplash.com/photos/seashell-dish-in-bowl-wysSMMJtSSQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

Main course:      
Photo by <a href="https://unsplash.com/@dpezto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Dai López</a> on <a href="https://unsplash.com/photos/a-bowl-of-food-71gD9JoiPQY?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

2 Course meal:      
Photo by <a href="https://unsplash.com/@torgonskayaa?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alena Torgonskaya</a> on <a href="https://unsplash.com/photos/a-plate-of-food-and-a-glass-of-wine-on-a-table-GdKIfczQGPs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

Wine: 
Photo by <a href="https://unsplash.com/@lefterisk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Lefteris kallergis</a> on <a href="https://unsplash.com/photos/person-pouring-red-wine-on-wine-glass-etWlaoFnTl4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
      
Placeholder food:
Photo by <a href="https://unsplash.com/@sebastiancoman?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Sebastian Coman Photography</a> on <a href="https://unsplash.com/photos/small-appetizers-are-arranged-on-a-silver-plate-ZGgIYaL9lYk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

Dessert: 
Photo by <a href="https://unsplash.com/@cmrcn_?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Cemrecan Yurtman</a> on <a href="https://unsplash.com/photos/a-piece-of-chocolate-cake-on-a-white-plate-MujR4e7o6Y0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>      
      

**Icons**
The code is using direct SVG code from feather icons (https://feathericons.com/). The used ones can also be found in the folder icons but they are not used directly.

## Credits
Project developed by [Emma Nöjd](https://github.com/nojdemma), []() and []().

---