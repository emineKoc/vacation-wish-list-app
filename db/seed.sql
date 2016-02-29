INSERT INTO users (f_name, l_name, current_city, email, password) VALUES ('emine', 'koc', 'new york', 'emine@koc', '1212');
INSERT INTO users (f_name, l_name, current_city, email, password) VALUES ('fatma', 'koc', 'istanbul', 'fatma@koc', '2121');
INSERT INTO users (f_name, l_name, current_city, email, password) VALUES ('ismail', 'koc', 'balikesir', 'ismail@koc', '3232');
INSERT INTO users (f_name, l_name, current_city, email, password) VALUES ('ferdane', 'koc', 'balikesir', 'emine@koc', '3232');

INSERT INTO attractions (name,location,besttimetodo,category,description,image) VALUES ( 'istanbul', 'istanbul', 'summer', 'cultural', 'some info', 'http://www.fashion-enterprise.com/wp-content/uploads/2013/03/Istanbul-306x250.jpg' );
INSERT INTO attractions (name,location,besttimetodo,category,description,image) VALUES ( 'rio', 'rio', 'summer', 'cultural', 'some info', 'http://2.bp.blogspot.com/-rSj5j-NetDo/UUCkgOEMmuI/AAAAAAAAAGg/Mqhmkfv_R9Y/s1600/DIVING.jpg' );
INSERT INTO attractions (name,location,besttimetodo,category,description,image) VALUES ( 'new york', 'new york', 'summer', 'cultural', 'some info', 'http://cdn-02.independent.ie/migration_catalog/article25148425.ece/05e47/ALTERNATES/h342/carnival2_getty' );
INSERT INTO attractions (name,location,besttimetodo,category,description,image) VALUES ( 'istanbul', 'location', 'summer', 'cultural', 'some info', 'http://www.worldfortravel.com/wp-content/uploads/2015/08/Arrivederci-Italy.jpg' );


INSERT INTO wishlist (user_id, attraction_id, wish, haveBeen ) VALUES (1,3,'high',false, false);
INSERT INTO wishlist (user_id, attraction_id, wish, haveBeen ) VALUES (2,3,'moderate', false, true);
INSERT INTO wishlist (user_id, attraction_id, wish, haveBeen ) VALUES (2,4,'moderate', false, false);
