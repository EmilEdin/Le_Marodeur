/**
 * menuData.js
 * Mock data representing the restaurant menu items.
 * Includes translations directly inside the item objects.
 */
const menuData = [
    {
        id: 'starters_1',
        categoryId: 'starters',
        price: 110,
        dietary: ['vegetarian', 'gluten_free'],
        names: { 
            en: 'French Onion Soup', 
            sv: 'Fransk Löksoppa', 
            fr: 'Soupe à l\'Oignon' 
        },
        descriptions: {
            en: 'Classic French onion soup with gruyère cheese.',
            sv: 'Klassisk fransk löksoppa med gruyèreost.',
            fr: 'Soupe à l\'oignon classique avec fromage gruyère.'
        }
    },
    {
        id: 'main_1',
        categoryId: 'main_courses',
        price: 245,
        dietary: ['dairy'],
        names: { 
            en: 'Beef Bourguignon', 
            sv: 'Boeuf Bourguignon', 
            fr: 'Bœuf Bourguignon' 
        },
        descriptions: {
            en: 'Slow-cooked beef stew in red wine with mushrooms and pearl onions.',
            sv: 'Långkokt nötgryta i rödvin med svamp och pärllök.',
            fr: 'Ragoût de bœuf mijoté au vin rouge avec champignons et petits oignons.'
        }
    },
    {
        id: 'main_2',
        categoryId: 'main_courses',
        price: 195,
        dietary: ['vegan', 'gluten_free'],
        names: { 
            en: 'Ratatouille', 
            sv: 'Ratatouille', 
            fr: 'Ratatouille Niçoise' 
        },
        descriptions: {
            en: 'Traditional Provencal stewed vegetables.',
            sv: 'Traditionell provensalsk grönsaksgryta.',
            fr: 'Ragoût traditionnel de légumes provençaux.'
        }
    },
    {
        id: 'dessert_1',
        categoryId: 'desserts',
        price: 85,
        dietary: ['vegetarian', 'dairy'],
        names: { 
            en: 'Crème Brûlée', 
            sv: 'Crème Brûlée', 
            fr: 'Crème Brûlée' 
        },
        descriptions: {
            en: 'Rich custard base topped with a layer of hardened caramelized sugar.',
            sv: 'Len vaniljkräm toppad med ett lager karamelliserat socker.',
            fr: 'Crème vanille onctueuse surmontée d\'une fine couche de caramel croquant.'
        }
    }
];