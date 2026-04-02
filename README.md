# Le Marodeur - Restaurant Ordering System

This is a restaurant ordering system built using vanilla HTML, CSS, and JavaScript, following the Model-View-Controller (MVC) architecture. 

## Project Features
- **Menu Views**: Starters, light courses, main courses, desserts, beverages, set meals, and today's special.
- **Dietary Constraints Mapping**: Includes tags for vegan, vegetarian, allergens (lactose, gluten, onions), and non-alcoholic options.
- **Ordering System**: At-table single and group ordering.
- **Cart & Cost Computation**: See current order cost with and without tipping.
- **Dynamic Internationalization**: Three distinct interface languages switchable dynamically and remembered over the session.
- **Drag and Drop / Button Actions**: Alternative ways to interact with menu items.
- **Responsive Design**: Designed for 9" touch-screens and standard mobile phone screens without compromising functionality.

## Folder Structure
```text
Le_Marodeur/
├── css/
│   └── styles.css           # Thematic design and layout
├── html/
│   ├── call-service.html
│   ├── checkout.html
│   ├── menu.html
│   ├── order.html
│   ├── payment-card.html
│   ├── payment-qr.html
│   └── payment-waiter.html
├── js/
│   ├── data/                # Mock databases and language dictionaries
│   │   ├── dictionary.js
│   │   └── menuData.js
│   ├── model/               # Data and State Layer
│   │   └── CartModel.js
│   ├── view/                # Presentation Layer
│   │   └── MenuView.js
│   ├── controller/          # Logic Layer
│   │   ├── LanguageController.js
│   │   ├── MenuController.js
│   │   └── OrderController.js
│   └── order_page.js        # Drag and drop scripts
├── index.html               # Main Interface
└── README.md                # Project Documentation
```

## Setup Instructions
1. Clone the repository.
2. Open `index.html` in any modern web browser to run the application (No external dependencies or servers required).

## Image and Icon Attribution
This application uses photos from [Unsplash](https://unsplash.com/) and icons from [Flaticon](https://www.flaticon.com/).

### Images
Give cred to everyone here?
Photo by <a href="https://unsplash.com/@markuswinkler?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Markus Winkler</a> on <a href="https://unsplash.com/photos/black-android-smartphone-displaying-qr-code-kHMiTbqI5QU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
      
      

### Icons
Would have in svg if flaticon allowed it for free version
Use the direct SVG code but can also be retrieved from assets if you want to change the code. 
