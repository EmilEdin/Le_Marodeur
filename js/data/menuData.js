/**
 * menuData.js
 * Mock data representing the restaurant menu items.
 * Includes translations directly inside the item objects.
 */
const categoriesData = [
    { id: 'todays_special', i18n: 'category_special', defaultName: "Today's Special" },
    { id: 'starters', i18n: 'category_starters', defaultName: 'Starters' },
    { id: 'light_courses', i18n: 'category_light', defaultName: 'Light Courses' },
    { id: 'main_courses', i18n: 'category_main', defaultName: 'Main Courses' },
    { id: 'desserts', i18n: 'category_desserts', defaultName: 'Desserts' },
    { id: 'beverages', i18n: 'category_beverages', defaultName: 'Beverages' },
    { id: 'set_meal', i18n: 'category_set', defaultName: '2-Course Set Meal' }
];

const menuData = [
    // STARTERS
    {
        id: 'starters_1', categoryId: 'starters', price: 110, dietary: ['vegetarian', 'gluten_free'],
        names: { en: 'French Onion Soup', sv: 'Fransk Löksoppa', fr: 'Soupe à l\'Oignon' },
        descriptions: {
            en: 'Classic French onion soup with gruyère cheese crouton.',
            sv: 'Klassisk fransk löksoppa med gruyèreost-krutong.',
            fr: 'Soupe à l\'oignon classique avec croûton au gruyère.'
        }
    },
    {
        id: 'starters_2', categoryId: 'starters', price: 135, dietary: ['gluten_free', 'dairy'],
        names: { en: 'Escargots de Bourgogne', sv: 'Sniglar i vitlökssmör', fr: 'Escargots de Bourgogne' },
        descriptions: {
            en: 'Six classic Burgundy snails baked in garlic and parsley butter.',
            sv: 'Sex klassiska burgundiska sniglar bakade i vitlöks- och persiljesmör.',
            fr: 'Six escargots de Bourgogne classiques cuits dans un beurre persillé à l\'ail.'
        }
    },
    // LIGHT COURSES
    {
        id: 'light_1', categoryId: 'light_courses', price: 165, dietary: ['gluten_free'],
        names: { en: 'Salade Niçoise', sv: 'Sallad Niçoise', fr: 'Salade Niçoise' },
        descriptions: {
            en: 'Fresh mixed greens, tuna, hard-boiled eggs, Niçoise olives, and anchovies.',
            sv: 'Färsk blandsallad, tonfisk, hårdkokta ägg, Niçoise-oliver och ansjovis.',
            fr: 'Mesclun frais, thon, œufs durs, olives niçoises et anchois.'
        }
    },
    {
        id: 'light_2', categoryId: 'light_courses', price: 145, dietary: ['dairy'],
        names: { en: 'Quiche Lorraine', sv: 'Quiche Lorraine', fr: 'Quiche Lorraine' },
        descriptions: {
            en: 'Savory tart with a filling of cream, eggs, and smoked bacon.',
            sv: 'Matig paj fylld med grädde, ägg och rökt sidfläsk.',
            fr: 'Tarte salée avec une garniture de crème, d\'œufs et de lardons fumés.'
        }
    },
    // MAIN COURSES
    {
        id: 'main_1', categoryId: 'main_courses', price: 245, dietary: ['dairy'],
        names: { en: 'Beef Bourguignon', sv: 'Boeuf Bourguignon', fr: 'Bœuf Bourguignon' },
        descriptions: {
            en: 'Slow-cooked beef stew in red wine with mushrooms and pearl onions.',
            sv: 'Långkokt nötgryta i rödvin med svamp och pärllök.',
            fr: 'Ragoût de bœuf mijoté au vin rouge avec champignons et petits oignons.'
        }
    },
    {
        id: 'main_2', categoryId: 'main_courses', price: 220, dietary: ['dairy'],
        names: { en: 'Coq au Vin', sv: 'Coq au Vin', fr: 'Coq au Vin' },
        descriptions: {
            en: 'Chicken braised with wine, lardons, mushrooms, and garlic.',
            sv: 'Kyckling bräserad i vin med bacon, svamp och vitlök.',
            fr: 'Poulet braisé au vin avec lardons, champignons et ail.'
        }
    },
    {
        id: 'main_3', categoryId: 'main_courses', price: 195, dietary: ['vegan', 'gluten_free'],
        names: { en: 'Ratatouille', sv: 'Ratatouille', fr: 'Ratatouille Niçoise' },
        descriptions: {
            en: 'Traditional Provencal stewed vegetables.',
            sv: 'Traditionell provensalsk grönsaksgryta.',
            fr: 'Ragoût traditionnel de légumes provençaux.'
        }
    },
    // DESSERTS
    {
        id: 'dessert_1', categoryId: 'desserts', price: 85, dietary: ['vegetarian', 'dairy'],
        names: { en: 'Crème Brûlée', sv: 'Crème Brûlée', fr: 'Crème Brûlée' },
        descriptions: {
            en: 'Rich custard base topped with a layer of hardened caramelized sugar.',
            sv: 'Len vaniljkräm toppad med ett lager karamelliserat socker.',
            fr: 'Crème vanille onctueuse surmontée d\'une fine couche de caramel croquant.'
        }
    },
    {
        id: 'dessert_2', categoryId: 'desserts', price: 95, dietary: ['vegetarian', 'dairy'],
        names: { en: 'Mousse au Chocolat', sv: 'Chokladmousse', fr: 'Mousse au Chocolat' },
        descriptions: {
            en: 'Airy, rich dark chocolate mousse.',
            sv: 'Luftig, fyllig mörk chokladmousse.',
            fr: 'Mousse au chocolat noir riche et aérienne.'
        }
    },
    // BEVERAGES
    {
        id: 'bev_1', categoryId: 'beverages', price: 120, dietary: ['vegan', 'gluten_free'],
        names: { en: 'Bordeaux Red Wine', sv: 'Bordeaux Rödvin', fr: 'Vin Rouge de Bordeaux' },
        descriptions: {
            en: 'A glass of house selected full-bodied Bordeaux.',
            sv: 'Ett glas av husets utvalda fylliga Bordeaux.',
            fr: 'Un verre de Bordeaux corsé sélectionné par la maison.'
        }
    },
    {
        id: 'bev_2', categoryId: 'beverages', price: 45, dietary: ['vegan', 'gluten_free', 'non-alcoholic'],
        names: { en: 'Perrier Sparkling Water', sv: 'Perrier Kolsyrat Vatten', fr: 'Eau Gazeuse Perrier' },
        descriptions: {
            en: 'Crisp, carbonated natural mineral water (33cl).',
            sv: 'Friskt, kolsyrat naturligt mineralvatten (33cl).',
            fr: 'Eau minérale naturelle gazeuse et fraîche (33cl).'
        }
    },
    // SET MEAL
    {
        id: 'set_1', categoryId: 'set_meal', price: 320, dietary: [],
        names: { en: 'Formule du Midi', sv: '2-Rätters Meny', fr: 'Formule du Midi' },
        descriptions: {
            en: 'A classic 2-course meal: French Onion Soup followed by Beef Bourguignon.',
            sv: 'En klassisk 2-rätters: Fransk Löksoppa följd av Boeuf Bourguignon.',
            fr: 'Un repas classique en 2 plats : Soupe à l\'Oignon suivie d\'un Bœuf Bourguignon.'
        }
    },
    // TODAY'S SPECIAL
    {
        id: 'special_1', categoryId: 'todays_special', price: 285, dietary: ['dairy'],
        names: { en: 'Plat du Jour (Bouillabaisse)', sv: 'Dagens Rätt (Bouillabaisse)', fr: 'Plat du Jour (Bouillabaisse)' },
        descriptions: {
            en: 'Traditional Provençal fish stew served with rouille and toasted bread.',
            sv: 'Traditionell provensalsk fiskgryta serverad med rouille och rostat bröd.',
            fr: 'Ragoût de poisson provençal traditionnel servi avec de la rouille et du pain grillé.'
        }
    }
];